export type SortingMode = 'brightness' | 'hue' | 'saturation' | 'red' | 'green' | 'blue';

export interface SortOptions {
    mode: SortingMode;
    thresholdMode: SortingMode | 'none'; // 'none' means use the same as 'mode'
    angle: number; // 0-360
    thresholdLower: number;
    thresholdUpper: number;
    reverse: boolean;
    invertMask: boolean;
}

const getPixelValue = (r: number, g: number, b: number, mode: SortingMode): number => {
    switch (mode) {
        case 'brightness':
            return (r + g + b) / 3;
        case 'red':
            return r;
        case 'green':
            return g;
        case 'blue':
            return b;
        case 'hue': {
            const rN = r / 255;
            const gN = g / 255;
            const bN = b / 255;
            const max = Math.max(rN, gN, bN);
            const min = Math.min(rN, gN, bN);
            let h = 0;
            if (max === min) {
                h = 0;
            } else if (max === rN) {
                h = (gN - bN) / (max - min);
            } else if (max === gN) {
                h = 2 + (bN - rN) / (max - min);
            } else {
                h = 4 + (rN - gN) / (max - min);
            }
            h *= 60;
            if (h < 0) h += 360;
            return h; // 0-360
        }
        case 'saturation': {
            const rN = r / 255;
            const gN = g / 255;
            const bN = b / 255;
            const max = Math.max(rN, gN, bN);
            const min = Math.min(rN, gN, bN);
            let s = 0;
            if (max === 0) {
                s = 0;
            } else {
                s = (max - min) / max;
            }
            return s * 100; // 0-100
        }
        default:
            return 0;
    }
};

export const sortPixels = (
    imageData: ImageData,
    options: SortOptions,
    maskData?: ImageData
): ImageData => {
    const { width, height, data } = imageData;
    const newData = new Uint8ClampedArray(data);
    const { mode, thresholdMode, thresholdLower, thresholdUpper, reverse, invertMask } = options;

    const effectiveThresholdMode = thresholdMode === 'none' ? mode : thresholdMode;

    // Always sort horizontally (row by row)
    // Rotation is handled by the caller (CanvasEditor)
    const outerLimit = height;
    const innerLimit = width;

    for (let i = 0; i < outerLimit; i++) {
        let start = 0;
        let end = 0;

        while (end < innerLimit) {
            // Helper to check if a pixel is "sortable"
            const isSortable = (index: number) => {
                const r = newData[index];
                const g = newData[index + 1];
                const b = newData[index + 2];

                // 1. Check Mask
                if (maskData) {
                    // Map current rotated pixel back to original mask coordinates?
                    // The maskData passed here MUST be rotated to match the current imageData orientation
                    // for this simple 1:1 mapping to work.
                    // We assume the caller handles rotating the mask if needed.
                    const maskR = maskData.data[index];
                    // Simple brightness mask: White = Sort, Black = Lock
                    // If invertMask is true: Black = Sort, White = Lock
                    const maskVal = maskR; // Assuming grayscale mask
                    if (invertMask) {
                        if (maskVal > 128) return false;
                    } else {
                        if (maskVal < 128) return false;
                    }
                }

                // 2. Check Threshold
                const val = getPixelValue(r, g, b, effectiveThresholdMode);
                return val >= thresholdLower && val <= thresholdUpper;
            };

            // Find start of interval
            start = end;
            let pixelIndex = (i * width + start) * 4;

            while (end < innerLimit && !isSortable(pixelIndex)) {
                end++;
                if (end >= innerLimit) break;
                pixelIndex = (i * width + end) * 4;
            }

            if (end >= innerLimit) break;

            // Found start of sortable segment
            start = end;
            while (end < innerLimit) {
                pixelIndex = (i * width + end) * 4;
                if (!isSortable(pixelIndex)) {
                    break;
                }
                end++;
            }

            // Sort the interval [start, end)
            const segmentLength = end - start;
            if (segmentLength > 1) {
                const pixels: { r: number; g: number; b: number; a: number; val: number }[] = [];

                for (let k = 0; k < segmentLength; k++) {
                    const idx = (i * width + (start + k)) * 4;

                    const r = newData[idx];
                    const g = newData[idx + 1];
                    const b = newData[idx + 2];
                    const a = newData[idx + 3];
                    pixels.push({ r, g, b, a, val: getPixelValue(r, g, b, mode) });
                }

                pixels.sort((p1, p2) => reverse ? p2.val - p1.val : p1.val - p2.val);

                for (let k = 0; k < segmentLength; k++) {
                    const idx = (i * width + (start + k)) * 4;

                    newData[idx] = pixels[k].r;
                    newData[idx + 1] = pixels[k].g;
                    newData[idx + 2] = pixels[k].b;
                    newData[idx + 3] = pixels[k].a;
                }
            }
        }
    }

    return new ImageData(newData, width, height);
};
