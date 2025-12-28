import { default as React } from 'react';
interface ImageUploaderProps {
    onImageUpload: (file: File) => void;
}
export declare const ImageUploader: React.FC<ImageUploaderProps>;
export {};
