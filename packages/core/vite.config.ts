import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
    plugins: [
        dts({
            include: ['src'],
            insertTypesEntry: true,
        })
    ],
    build: {
        lib: {
            entry: path.resolve(import.meta.dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
