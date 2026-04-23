import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { LzoResult } from '../lib/LzoEngine';
import { BookOpen, Activity } from 'lucide-react';

interface CompressionVisualizationProps {
  result: LzoResult;
}

export const CompressionVisualization: React.FC<CompressionVisualizationProps> = ({ result }) => {
  const [activeTab, setActiveTab] = useState<'dictionary' | 'chart'>('dictionary');

  const chartData = [
    {
      name: 'Before (Bits)',
      size: result.originalSizeBits,
      fill: '#94a3b8' // slate-400
    },
    {
      name: 'After (Bits)',
      size: result.compressedSizeBits,
      fill: '#3b82f6' // blue-500
    }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveTab('dictionary')}
          className={`flex items-center px-6 py-4 space-x-2 text-sm font-medium transition-colors ${
            activeTab === 'dictionary'
              ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Dictionary Building</span>
        </button>
        <button
          onClick={() => setActiveTab('chart')}
          className={`flex items-center px-6 py-4 space-x-2 text-sm font-medium transition-colors ${
            activeTab === 'chart'
              ? 'bg-blue-500/10 text-blue-400 border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Size Comparison</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {activeTab === 'dictionary' && (
          <div className="animate-in fade-in duration-500 space-y-8">
            <p className="text-sm text-slate-400">
              Menampilkan proses kompresi berdasarkan 20 hexadecimal pertama dari file audio (sesuai jurnal):
            </p>
            
            {/* Tabel 1 */}
            <div>
              <h3 className="text-md font-bold text-slate-200 mb-3">Tabel 1. Inisialisasi</h3>
              <div className="overflow-y-auto max-h-64 rounded-lg border border-slate-700/50 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-900 z-10">
                    <tr className="text-slate-300 text-sm">
                      <th className="p-3 border-b border-slate-700">Langkah</th>
                      <th className="p-3 border-b border-slate-700">Posisi, [kode] & karakter (P)</th>
                      <th className="p-3 border-b border-slate-700">Gabungan Posisi & Karakter (Q)</th>
                      <th className="p-3 border-b border-slate-700">Dictionary (P+Q)</th>
                      <th className="p-3 border-b border-slate-700">Kode</th>
                      <th className="p-3 border-b border-slate-700">Output</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-mono text-slate-300">
                    {result.table1.map((item, idx) => (
                      <tr key={`t1-${idx}`} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="p-3">{item.langkah}</td>
                        <td className="p-3">{item.p}</td>
                        <td className="p-3">{item.q}</td>
                        <td className="p-3 text-blue-300">{item.dict}</td>
                        <td className="p-3">{item.kode}</td>
                        <td className="p-3">{item.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel 2 */}
            <div>
              <h3 className="text-md font-bold text-slate-200 mb-3">Tabel 2. Tahapan Kompresi Selanjutnya</h3>
              <div className="overflow-y-auto max-h-64 rounded-lg border border-slate-700/50 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-900 z-10">
                    <tr className="text-slate-300 text-sm">
                      <th className="p-3 border-b border-slate-700">Langkah</th>
                      <th className="p-3 border-b border-slate-700">Posisi, [kode] & karakter (P)</th>
                      <th className="p-3 border-b border-slate-700">Gabungan posisi & Karakter (Q)</th>
                      <th className="p-3 border-b border-slate-700">Dictionary (P + Q)</th>
                      <th className="p-3 border-b border-slate-700">Kode</th>
                      <th className="p-3 border-b border-slate-700">Output</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-mono text-slate-300">
                    {result.table2.map((item, idx) => (
                      <tr key={`t2-${idx}`} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="p-3">{item.langkah}</td>
                        <td className="p-3">{item.p}</td>
                        <td className="p-3">{item.q}</td>
                        <td className="p-3 text-blue-300">{item.dict}</td>
                        <td className="p-3">{item.kode}</td>
                        <td className="p-3 font-bold text-green-400">{item.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tabel 3 */}
            <div>
              <h3 className="text-md font-bold text-slate-200 mb-3">Tabel 3. Hasil Kompresi</h3>
              <div className="overflow-y-auto max-h-64 rounded-lg border border-slate-700/50 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-slate-900 z-10">
                    <tr className="text-slate-300 text-sm">
                      <th className="p-3 border-b border-slate-700 w-1/2">Dictionary</th>
                      <th className="p-3 border-b border-slate-700 w-1/2">Output</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm font-mono text-slate-300">
                    {result.table3.map((item, idx) => (
                      <tr key={`t3-${idx}`} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                        <td className="p-3 text-blue-300">{item.dictionary}</td>
                        <td className="p-3 font-bold text-green-400">{item.output}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'chart' && (
          <div className="h-80 animate-in fade-in zoom-in-95 duration-500">
             <h3 className="text-center text-slate-300 font-medium mb-6">Bit Size Comparison</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 40, bottom: 25 }}>
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Bar dataKey="size" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
