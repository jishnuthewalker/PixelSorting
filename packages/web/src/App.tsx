import { useState, useCallback, useRef } from 'react';
import { Layout, ImageUploader, CanvasEditor, Controls, type SortOptions } from '@pixel-sorter/core';

const DEFAULT_OPTIONS: SortOptions = {
  mode: 'brightness',
  thresholdMode: 'none',
  angle: 0,
  thresholdLower: 50,
  thresholdUpper: 200,
  reverse: false,
  invertMask: false,
};

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [maskFile, setMaskFile] = useState<File | null>(null);
  const [options, setOptions] = useState<SortOptions>(DEFAULT_OPTIONS);
  const [isProcessing, setIsProcessing] = useState(false);

  const maskInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((file: File) => {
    setImageFile(file);
  }, []);

  const handleExport = useCallback(() => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'pixel-sorted.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  }, []);

  const handleReset = useCallback(() => {
    setOptions(DEFAULT_OPTIONS);
    setMaskFile(null);
  }, []);

  const handleSelectMask = useCallback(() => {
    if (maskInputRef.current) {
      maskInputRef.current.click();
    }
  }, []);

  const handleMaskUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaskFile(e.target.files[0]);
    }
  }, []);

  return (
    <>
      <Layout
        sidebar={
          <Controls
            options={options}
            onChange={setOptions}
            onExport={handleExport}
            onReset={handleReset}
            onSelectMask={handleSelectMask}
            hasMask={!!maskFile}
          />
        }
        content={
          imageFile ? (
            <CanvasEditor
              imageFile={imageFile}
              maskFile={maskFile}
              options={options}
              isProcessing={isProcessing}
              onProcessingChange={setIsProcessing}
            />
          ) : (
            <div style={{ width: '100%', maxWidth: '400px', height: '300px' }}>
              <ImageUploader onImageUpload={handleImageUpload} />
            </div>
          )
        }
      />
      <input
        type="file"
        ref={maskInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleMaskUpload}
      />
    </>
  );
}

export default App;
