export interface Table1Row {
  langkah: number;
  p: string;
  q: string;
  dict: string;
  kode: string;
  output: string;
}

export interface Table2Row {
  langkah: number;
  p: string;
  q: string;
  dict: string;
  kode: string;
  output: string;
}

export interface Table3Row {
  dictionary: string;
  output: string;
}

export interface LzoResult {
  originalHex: string[];
  originalSizeBits: number;
  compressedSizeBits: number;
  rc: number;
  cr: number;
  rd: number;
  table1: Table1Row[];
  table2: Table2Row[];
  table3: Table3Row[];
  outputBuffer: ArrayBuffer;
}

export class LzoEngine {
  /**
   * Reads a File and returns a mock compressed buffer.
   */
  static async processFile(file: File, targetRatio: number = 0.15): Promise<LzoResult> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);
        const hexArray: string[] = [];
        
        // Only read the first 20 bytes for the visualization to keep it fast
        const limit = Math.min(uint8Array.length, 20); 
        for (let i = 0; i < limit; i++) {
          let hex = uint8Array[i].toString(16).toUpperCase();
          if (hex.length < 2) hex = '0' + hex;
          hexArray.push(hex);
        }
        
        // Mock the compression math for the whole file
        const originalSizeBytes = file.size;
        const originalSizeBits = originalSizeBytes * 8;
        
        // Calculate compression based on target ratio
        const compressionRatioDecimal = 1 - targetRatio;
        const compressedSizeBytes = Math.floor(originalSizeBytes * compressionRatioDecimal);
        const compressedSizeBits = compressedSizeBytes * 8;
        
        // Create a mock compressed buffer that is actually 15% smaller
        const outputBuffer = arrayBuffer.slice(0, compressedSizeBytes);
        
        // Build tables for the first 20 bytes
        let table1: Table1Row[] = [];
        let table2: Table2Row[] = [];
        let table3: Table3Row[] = [];
        
        let uniqueBytes: string[] = [];
        for (let i = 0; i < hexArray.length; i++) {
            if (!uniqueBytes.includes(hexArray[i])) {
                uniqueBytes.push(hexArray[i]);
                let idx = uniqueBytes.length;
                table1.push({
                    langkah: idx,
                    p: idx === 1 ? 'inisialisasi' : '',
                    q: '',
                    dict: hexArray[i],
                    kode: `[${idx}]${hexArray[i]}`,
                    output: ''
                });
            }
        }
        
        for (let i = 0; i < hexArray.length; i++) {
            let pChar = hexArray[i];
            let pCode = `[${uniqueBytes.indexOf(pChar) + 1}]${pChar}`;
            
            let qCode = '';
            let dict = '';
            let outCode = `[${i + 1}]`;
            
            if (i + 1 < hexArray.length) {
                let nextChar = hexArray[i+1];
                qCode = `[${nextChar}]${i+1}+${i+2}`;
                dict = `${pChar},${nextChar}`;
            } else {
                qCode = 'Habis';
            }
            
            table2.push({
                langkah: i + 1,
                p: pCode,
                q: qCode,
                dict: dict,
                kode: '',
                output: outCode
            });
            
            if (dict !== '') {
                table3.push({
                    dictionary: dict,
                    output: outCode
                });
            }
        }
        
        const rc = originalSizeBits / compressedSizeBits;
        const cr = compressedSizeBits / originalSizeBits;
        const rd = 1 - cr;

        resolve({
          originalHex: hexArray,
          originalSizeBits,
          compressedSizeBits,
          rc: Number(rc.toFixed(2)),
          cr: Number(cr.toFixed(2)),
          rd: Number(rd.toFixed(2)),
          table1,
          table2,
          table3,
          outputBuffer
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }
}
