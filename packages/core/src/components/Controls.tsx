import React from 'react';
import type { SortOptions, SortingMode } from '../utils/pixelSorter';
import './Controls.css';

interface ControlsProps {
    options: SortOptions;
    onChange: (options: SortOptions) => void;
    onExport: () => void;
    onReset: () => void;
    onSelectMask: () => void;
    hasMask: boolean;
}

export const Controls: React.FC<ControlsProps> = ({
    options,
    onChange,
    onExport,
    onReset,
    onSelectMask,
    hasMask
}) => {

    const updateOption = <K extends keyof SortOptions>(key: K, value: SortOptions[K]) => {
        onChange({ ...options, [key]: value });
    };

    return (
        <div className="controls-container">
            <div className="control-group">
                <label>Sorting Mode</label>
                <select
                    value={options.mode}
                    onChange={(e) => updateOption('mode', e.target.value as SortingMode)}
                >
                    <option value="brightness">Brightness</option>
                    <option value="hue">Hue</option>
                    <option value="saturation">Saturation</option>
                    <option value="red">Red Channel</option>
                    <option value="green">Green Channel</option>
                    <option value="blue">Blue Channel</option>
                </select>
            </div>

            <div className="control-group">
                <label>Threshold Mode</label>
                <select
                    value={options.thresholdMode}
                    onChange={(e) => updateOption('thresholdMode', e.target.value as SortingMode | 'none')}
                >
                    <option value="none">Same as Sorting Mode</option>
                    <option value="brightness">Brightness</option>
                    <option value="hue">Hue</option>
                    <option value="saturation">Saturation</option>
                    <option value="red">Red Channel</option>
                    <option value="green">Green Channel</option>
                    <option value="blue">Blue Channel</option>
                </select>
            </div>

            <div className="control-group">
                <label>Angle ({options.angle}°)</label>
                <input
                    type="range"
                    min="0"
                    max="360"
                    value={options.angle}
                    onChange={(e) => updateOption('angle', Number(e.target.value))}
                />
            </div>

            <div className="control-group">
                <label>Threshold Lower ({options.thresholdLower})</label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={options.thresholdLower}
                    onChange={(e) => updateOption('thresholdLower', Number(e.target.value))}
                />
            </div>

            <div className="control-group">
                <label>Threshold Upper ({options.thresholdUpper})</label>
                <input
                    type="range"
                    min="0"
                    max="255"
                    value={options.thresholdUpper}
                    onChange={(e) => updateOption('thresholdUpper', Number(e.target.value))}
                />
            </div>

            <div className="control-group checkbox-group">
                <label>
                    <input
                        type="checkbox"
                        checked={options.reverse}
                        onChange={(e) => updateOption('reverse', e.target.checked)}
                    />
                    Reverse Sort
                </label>
            </div>

            <div className="control-section">
                <label className="section-label">Masking</label>
                <button className="btn-secondary" onClick={onSelectMask}>
                    {hasMask ? 'Update Mask from Selection' : 'Use Selection as Mask'}
                </button>
                {hasMask && (
                    <div className="control-group checkbox-group" style={{ marginTop: '8px' }}>
                        <label>
                            <input
                                type="checkbox"
                                checked={options.invertMask}
                                onChange={(e) => updateOption('invertMask', e.target.checked)}
                            />
                            Invert Mask
                        </label>
                    </div>
                )}
            </div>

            <div className="actions">
                <button className="btn-secondary" onClick={onReset}>Reset Image</button>
                <button className="btn-primary" onClick={onExport}>Apply to Canvas</button>
            </div>
        </div>
    );
};
