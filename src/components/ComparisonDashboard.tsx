import React from 'react';
import { FileAudio, Zap, ShieldCheck } from 'lucide-react';
import type { LzoResult } from '../lib/LzoEngine';

interface ComparisonDashboardProps {
  fileName: string;
  originalSize: number; // in bytes
  result: LzoResult;
}

export const ComparisonDashboard: React.FC<ComparisonDashboardProps> = ({
  fileName,
  originalSize,
  result,
}) => {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const compressedSizeBytes = result.compressedSizeBits / 8;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Before Panel */}
      <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-slate-700 rounded-lg">
            <FileAudio className="w-6 h-6 text-slate-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Before Compression</h2>
            <p className="text-sm text-slate-400">Original AAC File</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900/50 p-4 rounded-xl">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">File Name</span>
            <span className="text-slate-200 font-mono text-sm truncate block">{fileName}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Size (Bytes)</span>
              <span className="text-slate-200 text-lg font-semibold">{originalSize.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Formatted Size</span>
              <span className="text-slate-200 text-lg font-semibold">{formatBytes(originalSize)}</span>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl">
            <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hexadecimal Sample</span>
            <div className="font-mono text-xs text-blue-300 break-all leading-relaxed">
              {result.originalHex.slice(0, 20).join(', ')} ...
            </div>
          </div>
        </div>
      </div>

      {/* After Panel */}
      <div className="bg-gradient-to-br from-blue-900/40 to-slate-800/80 backdrop-blur-sm border border-blue-500/30 rounded-2xl p-6 shadow-xl shadow-blue-900/20">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">After Compression</h2>
            <p className="text-sm text-blue-300/80">LZO Method Result</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-blue-500/10">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">New Size (Bytes)</span>
              <span className="text-blue-300 text-lg font-semibold">{compressedSizeBytes.toLocaleString()}</span>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-blue-500/10">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Formatted Size</span>
              <span className="text-blue-300 text-lg font-semibold">{formatBytes(compressedSizeBytes)}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-900/50 p-3 rounded-xl border border-green-500/20 text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" title="Ratio of Compression">Rc</span>
              <span className="text-green-400 text-lg font-bold">{result.rc}</span>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-purple-500/20 text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" title="Compression Ratio">CR</span>
              <span className="text-purple-400 text-lg font-bold">{result.cr}%</span>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-xl border border-orange-500/20 text-center">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1" title="Redundancy">Rd</span>
              <span className="text-orange-400 text-lg font-bold">{result.rd}%</span>
            </div>
          </div>

          <div className="bg-slate-900/50 p-4 rounded-xl mt-4 flex items-center space-x-3 border border-blue-500/10">
            <ShieldCheck className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm font-medium text-slate-200">Lossless Compression</p>
              <p className="text-xs text-slate-400">Audio quality is fully preserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
