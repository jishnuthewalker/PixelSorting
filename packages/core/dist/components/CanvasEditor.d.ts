import { default as React } from 'react';
import { SortOptions } from '../utils/pixelSorter';
interface CanvasEditorProps {
    imageFile: File | null;
    maskFile: File | null;
    options: SortOptions;
    isProcessing: boolean;
    onProcessingChange: (isProcessing: boolean) => void;
}
export declare const CanvasEditor: React.FC<CanvasEditorProps>;
export {};
