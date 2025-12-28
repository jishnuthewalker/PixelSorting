export type SortingMode = 'brightness' | 'hue' | 'saturation' | 'red' | 'green' | 'blue';
export interface SortOptions {
    mode: SortingMode;
    thresholdMode: SortingMode | 'none';
    angle: number;
    thresholdLower: number;
    thresholdUpper: number;
    reverse: boolean;
    invertMask: boolean;
}
export declare const sortPixels: (imageData: ImageData, options: SortOptions, maskData?: ImageData) => ImageData;
