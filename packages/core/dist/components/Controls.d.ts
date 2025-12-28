import { default as React } from 'react';
import { SortOptions } from '../utils/pixelSorter';
interface ControlsProps {
    options: SortOptions;
    onChange: (options: SortOptions) => void;
    onExport: () => void;
    onReset: () => void;
    onSelectMask: () => void;
    hasMask: boolean;
}
export declare const Controls: React.FC<ControlsProps>;
export {};
