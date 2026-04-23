import { useState } from 'react';
import { UploadZone } from './components/UploadZone';
import { ComparisonDashboard } from './components/ComparisonDashboard';
import { CompressionVisualization } from './components/CompressionVisualization';
import { LzoEngine, type LzoResult } from './lib/LzoEngine';
import { Headphones, Loader2, Download, Unlock, Lock, CheckCircle2, AlertCircle, Settings } from 'lucide-react';

// Global mock storage to simulate lossless decompression.
// Maps "filename.aac.lzo" -> original File object
const mockStorage = new Map<string, File>();

function App() {
  const [appMode, setAppMode] = useState<'compress' | 'decompress'>('compress');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<LzoResult | null>(null);
  
  // Decompress state
  const [decompressStatus, setDecompressStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [decompressedFile, setDecompressedFile] = useState<File | null>(null);

  // Simulation settings
  const [showSettings, setShowSettings] = useState(false);
  const [targetRatio, setTargetRatio] = useState(15);

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsProcessing(true);
    setResult(null);

    try {
      // Simulate slight delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const compressionResult = await LzoEngine.processFile(uploadedFile, targetRatio / 100);
      
      // Save to mock storage for future decompression
      const lzoFileName = uploadedFile.name + '.lzo';
      mockStorage.set(lzoFileName, uploadedFile);
      
      setResult(compressionResult);
    } catch (error) {
      console.error("Compression failed:", error);
      alert("Failed to process the audio file.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
      {/* Header */}
      <header className="bg-slate-900/50 border-b border-slate-800 sticky top-0 z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                AAC LZO Compressor
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm font-medium text-slate-400 hidden md:block">
              Advanced Audio Coding Compression Analysis
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                title="Simulation Settings"
              >
                <Settings className="w-5 h-5" />
              </button>
              
              {showSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-sm font-semibold text-white mb-2">Simulation Target Ratio</h3>
                  <p className="text-xs text-slate-400 mb-3">
                    Set the expected percentage of size reduction for the simulation (Default: 15%).
                  </p>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="range" 
                      min="1" 
                      max="99" 
                      value={targetRatio}
                      onChange={(e) => setTargetRatio(parseInt(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                    <span className="text-sm font-mono font-bold text-blue-400">{targetRatio}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Compress audio faster with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
              Lempel Ziv Oberhumer
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Upload your AAC files to analyze compression ratios, redundancy, and dictionary building in real-time.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-slate-800 p-1 rounded-xl flex space-x-1 border border-slate-700">
            <button
              onClick={() => {
                setAppMode('compress');
                setFile(null);
                setResult(null);
                setDecompressStatus('idle');
              }}
              className={`px-6 py-2.5 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all ${
                appMode === 'compress' 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Compress</span>
            </button>
            <button
              onClick={() => {
                setAppMode('decompress');
                setFile(null);
                setResult(null);
                setDecompressStatus('idle');
              }}
              className={`px-6 py-2.5 rounded-lg flex items-center space-x-2 text-sm font-medium transition-all ${
                appMode === 'decompress' 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>Decompress</span>
            </button>
          </div>
        </div>

        {appMode === 'compress' && (
          <>
            {!result && !isProcessing && (
              <UploadZone onFileUpload={handleFileUpload} />
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center mt-20 space-y-4 animate-in fade-in zoom-in duration-300">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="text-lg font-medium text-slate-300">Analyzing & Compressing...</p>
                <p className="text-sm text-slate-500">Building hexadecimal dictionary</p>
              </div>
            )}

            {result && file && !isProcessing && (
              <div className="space-y-10 animate-in slide-in-from-bottom-8 fade-in duration-700">
                <div className="flex justify-center space-x-4 mt-6">
                  <button 
                    onClick={() => {
                      setFile(null);
                      setResult(null);
                    }}
                    className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-full transition-colors border border-slate-700 hover:border-slate-600"
                  >
                    Upload Another File
                  </button>
                  <button 
                    onClick={() => {
                      if (!result || !file) return;
                      const blob = new Blob([result.outputBuffer], { type: 'application/octet-stream' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = file.name + '.lzo';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-full transition-colors flex items-center space-x-2 shadow-lg shadow-blue-500/20"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Result (.lzo)</span>
                  </button>
                </div>
                
                <ComparisonDashboard 
                  fileName={file.name} 
                  originalSize={file.size} 
                  result={result} 
                />
                
                <CompressionVisualization result={result} />
              </div>
            )}
          </>
        )}

        {appMode === 'decompress' && (
          <div className="animate-in fade-in duration-500">
            {decompressStatus === 'idle' && (
              <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-3xl p-12 text-center hover:bg-slate-800/80 transition-all group relative cursor-pointer">
                <input
                  type="file"
                  accept=".lzo"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => {
                    const uploadedFile = e.target.files?.[0];
                    if (!uploadedFile) return;
                    
                    setIsProcessing(true);
                    setTimeout(() => {
                      const originalFile = mockStorage.get(uploadedFile.name);
                      if (originalFile) {
                        setDecompressedFile(originalFile);
                        setDecompressStatus('success');
                      } else {
                        setDecompressStatus('error');
                      }
                      setIsProcessing(false);
                    }, 800);
                  }}
                />
                <div className="w-20 h-20 mx-auto mb-6 bg-indigo-500/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Unlock className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Decompress LZO File</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Drag and drop your <span className="text-indigo-400 font-mono">.lzo</span> file here, or click to browse.
                </p>
              </div>
            )}

            {isProcessing && decompressStatus === 'idle' && (
              <div className="flex flex-col items-center justify-center mt-20 space-y-4">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-lg font-medium text-slate-300">Decompressing File...</p>
                <p className="text-sm text-slate-500">Restoring original AAC format</p>
              </div>
            )}

            {decompressStatus === 'success' && decompressedFile && (
              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-3xl p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 mx-auto mb-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Decompression Successful!</h3>
                <p className="text-emerald-300/80 mb-8">
                  The file <span className="font-mono text-emerald-300 bg-emerald-900/40 px-2 py-0.5 rounded">{decompressedFile.name}</span> has been 100% restored with zero data loss.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => {
                      setDecompressStatus('idle');
                      setDecompressedFile(null);
                    }}
                    className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-full transition-colors border border-slate-700"
                  >
                    Decompress Another
                  </button>
                  <button 
                    onClick={() => {
                      const url = URL.createObjectURL(decompressedFile);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = decompressedFile.name;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-full transition-colors flex items-center space-x-2 shadow-lg shadow-emerald-600/20"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download Original File</span>
                  </button>
                </div>
              </div>
            )}

            {decompressStatus === 'error' && (
              <div className="bg-red-900/20 border border-red-500/30 rounded-3xl p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Decompression Failed</h3>
                <p className="text-red-300/80 mb-8 max-w-lg mx-auto">
                  Could not find the original file signature in memory. 
                  <br className="mb-2"/>
                  For this web simulation, you must compress the file first in the <b>same session</b> before decompressing it, without refreshing the browser.
                </p>
                <button 
                  onClick={() => {
                    setDecompressStatus('idle');
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-full transition-colors border border-slate-700"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center justify-center mt-20 space-y-4 animate-in fade-in zoom-in duration-300">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
            <p className="text-lg font-medium text-slate-300">Analyzing & Compressing...</p>
            <p className="text-sm text-slate-500">Building hexadecimal dictionary</p>
          </div>
        )}


      </main>
    </div>
  );
}

export default App;
