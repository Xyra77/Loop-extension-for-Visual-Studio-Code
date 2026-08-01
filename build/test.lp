// Loop Language — Build Testing File
// loop-lang v1.2.0 | build/test.lp
//
// File pengujian fitur bahasa Loop yang terintegrasi dalam build:
//  - Dijalankan otomatis oleh CI saat build
//  - Mencakup semua fitur inti bahasa
//  - Jika ada output ERROR → build gagal

// ── 1. Tipe data dasar ───────────────────────────────────────
angka umur     = 20
teks  nama     = "Loop"
bool  aktif    = benar
larik angka    = [1, 2, 3, 4, 5]

cetak "=== Test Tipe Data ==="
cetak "umur  : #{umur}"
cetak "nama  : #{nama}"
cetak "aktif : #{aktif}"
cetak "angka : #{angka}"

// ── 2. Kondisi ───────────────────────────────────────────────
cetak "\n=== Test Kondisi ==="
jika umur >= 17 maka
    cetak "Lulus syarat umur ✓"
selain
    cetak "ERROR: kondisi gagal"
akhir

// ── 3. Fungsi + kembali ──────────────────────────────────────
cetak "\n=== Test Fungsi ==="
fungsi faktorial(n) {
    jika n <= 1 maka
        kembali 1
    akhir
    kembali n * faktorial(n - 1)
}
cetak "5! = #{faktorial(5)}"

// ── 4. Perulangan ────────────────────────────────────────────
cetak "\n=== Test Perulangan ==="
ulang 3 {
    cetak "ulang ✓"
}

angka i = 0
selama i < 3 {
    cetak "selama #{i}"
    i += 1
}

// ── 5. Pipe operator ─────────────────────────────────────────
cetak "\n=== Test Pipe ==="
larik data = [10, 3, 7, 1, 9]
angka total = data |> jumlah()
angka mxval = data |> maks()
cetak "jumlah: #{total}"
cetak "maks  : #{mxval}"

// ── 6. String interpolasi ─────────────────────────────────────
cetak "\n=== Test Interpolasi ==="
teks salam = "Halo, #{nama}! Kamu berumur #{umur} tahun."
cetak salam

// ── 7. Coba/tangkap ──────────────────────────────────────────
cetak "\n=== Test Error Handling ==="
coba {
    angka hasil = 10 / 0
} tangkap {
    cetak "Error ditangkap: pembagian nol ✓"
}

// ── 8. Pilih/kasus ───────────────────────────────────────────
cetak "\n=== Test Switch ==="
angka nilai = 2
pilih nilai {
    kasus 1 -> cetak "satu"
    kasus 2 -> cetak "dua ✓"
    kasus 3 -> cetak "tiga"
    selain  -> cetak "lain"
}

cetak "\n=== Semua test selesai ✅ ==="
