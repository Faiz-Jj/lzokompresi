import React, { useCallback, useState } from 'react';
import { UploadCloud, FileAudio } from 'lucide-react';

interface UploadZoneProps {
  onFileUpload: (file: File) => void;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.aac')) {
        onFileUpload(file);
      } else {
        alert("Please upload an .aac file");
      }
    }
  }, [onFileUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.name.endsWith('.aac')) {
        onFileUpload(file);
      } else {
        alert("Please upload an .aac file");
      }
    }
  }, [onFileUpload]);

  return (
    <div
      className={`relative w-full max-w-2xl mx-auto mt-10 p-10 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out ${
        isDragging
          ? 'border-blue-500 bg-blue-500/10 scale-105'
          : 'border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-500'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="p-4 bg-slate-700/50 rounded-full">
          {isDragging ? (
            <FileAudio className="w-12 h-12 text-blue-400 animate-bounce" />
          ) : (
            <UploadCloud className="w-12 h-12 text-slate-400" />
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-200">
            Drag & Drop your AAC file here
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            or click to browse from your computer
          </p>
        </div>
        <input
          type="file"
          accept=".aac"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
        />
      </div>
    </div>
  );
};
