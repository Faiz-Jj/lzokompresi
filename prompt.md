# Prompt: Pengembangan Aplikasi Web Kompresi Audio AAC dengan Metode LZO

## Context & Goal
Saya ingin membangun aplikasi berbasis web untuk mengompresi file audio berformat Advanced Audio Coding (AAC). Aplikasi ini harus sepenuhnya mengikuti metodologi dan perhitungan yang dipaparkan dalam jurnal "Kompresi File Advanced Audio Coding (AAC) Menggunakan Metode Lempel Ziv Oberhumer (LZO)" karya Ginta Enjelita Purba (2022).

## Technical Requirements
1. **Frontend**: React.js atau Next.js dengan Tailwind CSS untuk tampilan modern.
2. **Logic Engine**: JavaScript/TypeScript untuk implementasi algoritma LZO secara client-side (agar proses cepat).
3. **Core Algorithm**: 
   - Implementasikan pembacaan file AAC ke dalam bentuk nilai Hexadecimal.
   - Gunakan logika LZO sesuai jurnal: Membangun 'Dictionary' untuk menyimpan pasangan karakter yang muncul dan menggantinya dengan kode output yang lebih pendek.
   - Hitung parameter performa berdasarkan rumus di jurnal:
     - **Ratio of Compression (Rc)** = Jumlah Bit Sebelum / Jumlah Bit Sesudah.
     - **Compression Ratio (CR)** = (Jumlah Bit Sesudah / Jumlah Bit Sebelum) * 100%.
     - **Redundancy (Rd)** = 100% - CR.

## UI/UX Features
1. **Upload Zone**: Area drag-and-drop untuk file .aac.
2. **Comparison Dashboard**:
   - Panel "Before": Menampilkan nama file, ukuran asli (dalam MB dan Bytes), dan cuplikan nilai Hexadecimal awal.
   - Panel "After": Menampilkan ukuran file setelah kompresi dan nilai parameter Rc, CR, dan Rd.
3. **Compression Visualization**:
   - Buat visualisasi interaktif (bisa berupa tabel animasi atau flow) yang menunjukkan proses "Dictionary Building".
   - Tampilkan bagaimana deretan Hexadecimal diubah menjadi kode output (seperti Tabel 1 & 2 pada jurnal).
   - Gunakan chart (Chart.js atau Recharts) untuk membandingkan ukuran file sebelum dan sesudah secara visual.

## Detailed Logic Reference (From Journal)
- **Input Sampling**: Ambil nilai hexadecimal dari file (contoh: 2E, 35, 34, ...).
- **Proses Dictionary**: Setiap posisi karakter baru dicek terhadap dictionary. Jika ada gabungan posisi dan karakter yang berulang, simpan ke dictionary dan berikan kode output.
- **Konversi Bit**: Pastikan perhitungan konversi dari Byte ke Bit (1 Byte = 8 Bit) akurat sebelum menghitung rasio.

## Output yang Diharapkan
1. Struktur folder proyek.
2. File `LzoEngine.ts` yang berisi fungsi kompresi dan dekompresi.
3. File `App.tsx` atau komponen utama yang menangani UI, state upload, dan visualisasi data.
4. Penjelasan singkat bagaimana cara menjalankan aplikasi ini secara lokal.