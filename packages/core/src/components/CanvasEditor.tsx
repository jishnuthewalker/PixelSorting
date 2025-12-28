import React, { useEffect, useRef, useState } from 'react';
import { sortPixels, type SortOptions } from '../utils/pixelSorter';
import './CanvasEditor.css';

interface CanvasEditorProps {
    imageFile: File | null;
    maskFile: File | null;
    options: SortOptions;
    isProcessing: boolean;
    onProcessingChange: (isProcessing: boolean) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
    imageFile,
    maskFile,
    options,
    isProcessing,
    onProcessingChange
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [maskImage, setMaskImage] = useState<HTMLImageElement | null>(null);
    const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

    // Load image when file changes
    useEffect(() => {
        if (!imageFile) return;

        const img = new Image();
        img.onload = () => {
            setOriginalImage(img);

            // Calculate display size
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            const maxWidth = window.innerWidth - 360; // Sidebar width + padding
            const maxHeight = window.innerHeight - 40;

            let w = img.naturalWidth;
            let h = img.naturalHeight;

            if (w > maxWidth) {
                w = maxWidth;
                h = w / aspectRatio;
            }
            if (h > maxHeight) {
                h = maxHeight;
                w = h * aspectRatio;
            }

            setDisplaySize({ width: w, height: h });
        };
        img.src = URL.createObjectURL(imageFile);
    }, [imageFile]);

    // Load mask when file changes
    useEffect(() => {
        if (!maskFile) {
            // Use a cleanup-like pattern: schedule the state update
            const clearMask = () => setMaskImage(null);
            clearMask();
            return;
        }

        const img = new Image();
        const objectUrl = URL.createObjectURL(maskFile);
        img.onload = () => {
            setMaskImage(img);
        };
        img.src = objectUrl;

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [maskFile]);

    // Apply sorting when options change
    useEffect(() => {
        if (!originalImage || !canvasRef.current) return;

        const applySort = async () => {
            onProcessingChange(true);

            // Use setTimeout to allow UI to update before heavy processing
            setTimeout(() => {
                const canvas = canvasRef.current!;
                const ctx = canvas.getContext('2d', { willReadFrequently: true })!;

                const width = originalImage.naturalWidth;
                const height = originalImage.naturalHeight;

                canvas.width = width;
                canvas.height = height;

                // 1. Calculate dimensions for the rotated container
                const angleRad = (options.angle * Math.PI) / 180;
                const absCos = Math.abs(Math.cos(angleRad));
                const absSin = Math.abs(Math.sin(angleRad));

                const tempWidth = Math.ceil(width * absCos + height * absSin);
                const tempHeight = Math.ceil(width * absSin + height * absCos);

                // 2. Create offscreen canvas for rotation
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = tempWidth;
                tempCanvas.height = tempHeight;
                const tempCtx = tempCanvas.getContext('2d', { willReadFrequently: true })!;

                // 3. Draw rotated image onto temp canvas
                tempCtx.save();
                tempCtx.translate(tempWidth / 2, tempHeight / 2);
                tempCtx.rotate(angleRad);
                tempCtx.drawImage(originalImage, -width / 2, -height / 2);
                tempCtx.restore();

                // 4. Get pixel data from temp canvas
                const tempData = tempCtx.getImageData(0, 0, tempWidth, tempHeight);

                // 5. Prepare Mask Data (Rotated)
                let rotatedMaskData: ImageData | undefined;
                if (maskImage) {
                    const maskCanvas = document.createElement('canvas');
                    maskCanvas.width = tempWidth;
                    maskCanvas.height = tempHeight;
                    const maskCtx = maskCanvas.getContext('2d', { willReadFrequently: true })!;

                    maskCtx.save();
                    maskCtx.translate(tempWidth / 2, tempHeight / 2);
                    maskCtx.rotate(angleRad);
                    // Draw mask stretched to fit image? Or centered?
                    // Assuming mask should match image dimensions.
                    maskCtx.drawImage(maskImage, -width / 2, -height / 2, width, height);
                    maskCtx.restore();

                    rotatedMaskData = maskCtx.getImageData(0, 0, tempWidth, tempHeight);
                }

                // 6. Sort pixels (horizontally)
                const sortedData = sortPixels(tempData, options, rotatedMaskData);

                // 7. Put sorted data back to temp canvas
                tempCtx.putImageData(sortedData, 0, 0);

                // 8. Draw temp canvas back onto main canvas with reverse rotation
                ctx.save();
                ctx.clearRect(0, 0, width, height);
                ctx.translate(width / 2, height / 2);
                ctx.rotate(-angleRad);
                ctx.drawImage(tempCanvas, -tempWidth / 2, -tempHeight / 2);
                ctx.restore();

                onProcessingChange(false);
            }, 10);
        };

        applySort();
    }, [options, originalImage, maskImage, onProcessingChange]);

    if (!imageFile) return null;

    return (
        <div className="canvas-container" style={{ width: displaySize.width, height: displaySize.height }}>
            <canvas
                ref={canvasRef}
                className="editor-canvas"
            />
            {isProcessing && (
                <div className="processing-overlay">
                    <div className="spinner"></div>
                    <span>Sorting Pixels...</span>
                </div>
            )}
        </div>
    );
};
