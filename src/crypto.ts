/**
 * Loop Language — Source Crypto
 * loop-lang v1.4.0 | src/crypto.ts
 *
 * Hover docs untuk semua fungsi kriptografi dari Library/crypto.lp
 */

import * as vscode from 'vscode';

export const FUNGSI_CRYPTO: Record<string, {
  signature: string;
  deskripsi: string;
  contoh: string;
}> = {
  // Hashing
  sha256: {
    signature: 'sha256(teks_masukan: teks) → teks',
    deskripsi: 'Hash SHA-256 dari teks. Kembalikan hex lowercase.',
    contoh: 'milik h = sha256("pesan saya")',
  },
  sha1: {
    signature: 'sha1(teks_masukan: teks) → teks',
    deskripsi: 'Hash SHA-1 dari teks. Kembalikan hex lowercase.',
    contoh: 'milik h = sha1("data")',
  },
  hmacSha256: {
    signature: 'hmacSha256(kunci: teks, pesan: teks) → teks',
    deskripsi: 'HMAC-SHA256. Kembalikan hex.',
    contoh: 'milik mac = hmacSha256("rahasiaKu", "pesan")',
  },
  hmacSha1: {
    signature: 'hmacSha1(kunci: teks, pesan: teks) → teks',
    deskripsi: 'HMAC-SHA1.',
    contoh: 'milik mac = hmacSha1("kunci", "pesan")',
  },
  hashSama: {
    signature: 'hashSama(a: teks, b: teks) → bool',
    deskripsi: 'Bandingkan dua hash secara constant-time (tahan timing attack).',
    contoh: 'jika hashSama(h1, h2) { cetak("cocok") }',
  },
  hashSederhana: {
    signature: 'hashSederhana(s: teks) → teks',
    deskripsi: 'Hash sederhana (djb2 variant). Bukan untuk keamanan kritis.',
    contoh: 'milik h = hashSederhana("data")',
  },

  // Kunci Prima
  buatKunci: {
    signature: 'buatKunci(angka1: angka) → KunciPrima',
    deskripsi: 'Buat kunci kriptografi dari satu bilangan prima.',
    contoh: 'milik kunci = buatKunci(1021)',
  },
  buatKunciGanda: {
    signature: 'buatKunciGanda(angka1: angka, angka2: angka) → KunciPrima',
    deskripsi: 'Buat kunci kriptografi dari dua bilangan prima.',
    contoh: 'milik kunci = buatKunciGanda(1021, 1031)',
  },
  buatKunciLarik: {
    signature: 'buatKunciLarik(arr_angka: larik) → KunciPrima',
    deskripsi: 'Buat kunci kriptografi dari larik bilangan.',
    contoh: 'milik kunci = buatKunciLarik([1021, 1031, 1039])',
  },
  adalahPrima: {
    signature: 'adalahPrima(n: angka) → bool',
    deskripsi: 'Cek apakah n adalah bilangan prima.',
    contoh: 'jika adalahPrima(1021) { cetak("prima!") }',
  },
  primaSesudah: {
    signature: 'primaSesudah(n: angka) → angka',
    deskripsi: 'Cari bilangan prima pertama sesudah n.',
    contoh: 'milik p = primaSesudah(1000)  // 1009',
  },

  // Enkripsi / Dekripsi
  enkripsi: {
    signature: 'enkripsi(teks_masukan: teks, kunci: KunciPrima) → teks',
    deskripsi: 'Enkripsi teks dengan kunci prima (XOR + shuffle). Hasilkan hex.',
    contoh: 'milik cipher = enkripsi("rahasia", kunci)',
  },
  dekripsi: {
    signature: 'dekripsi(hex_terenkripsi: teks, kunci: KunciPrima) → teks',
    deskripsi: 'Dekripsi hasil enkripsi().',
    contoh: 'milik plain = dekripsi(cipher, kunci)',
  },
  xorKunci: {
    signature: 'xorKunci(data: teks, kunci: teks) → teks',
    deskripsi: 'XOR data dengan kunci (hex output).',
    contoh: 'milik hasil = xorKunci("data", kunci)',
  },
  xorTeks: {
    signature: 'xorTeks(a: teks, b: teks) → teks',
    deskripsi: 'XOR dua string secara karakter-per-karakter.',
    contoh: 'milik hasil = xorTeks("abc", "xyz")',
  },

  // Nilai Aman (Ganda)
  nilaiAman: {
    signature: 'nilaiAman(angka_masukan: angka) → Ganda',
    deskripsi: 'Bungkus angka dalam dual-state: plaintext + hex terenkripsi.',
    contoh: 'milik aman = nilaiAman(42)',
  },
  nilaiAmanTeks: {
    signature: 'nilaiAmanTeks(teks_masukan: teks) → Ganda',
    deskripsi: 'Bungkus teks dalam dual-state.',
    contoh: 'milik aman = nilaiAmanTeks("rahasia")',
  },
  hexNilaiAman: {
    signature: 'hexNilaiAman(nilai_ganda: Ganda) → teks',
    deskripsi: 'Ambil representasi hex dari nilai aman.',
    contoh: 'milik hex = hexNilaiAman(aman)',
  },
  keHex: {
    signature: 'keHex(s: teks) → teks',
    deskripsi: 'Konversi string ke representasi hex.',
    contoh: 'milik hex = keHex("ABC")  // "414243"',
  },

  // Base64
  base64Enkode: {
    signature: 'base64Enkode(s: teks) → teks',
    deskripsi: 'Encode teks ke Base64 standar.',
    contoh: 'milik b64 = base64Enkode("Halo Dunia!")',
  },
  base64Dekode: {
    signature: 'base64Dekode(s: teks) → teks',
    deskripsi: 'Decode Base64 ke teks asli.',
    contoh: 'milik asli = base64Dekode(b64)',
  },
  base64UrlEnkode: {
    signature: 'base64UrlEnkode(s: teks) → teks',
    deskripsi: 'Base64 URL-safe (ganti +/= dengan -_).',
    contoh: 'milik token = base64UrlEnkode(data)',
  },
  base64UrlDekode: {
    signature: 'base64UrlDekode(s: teks) → teks',
    deskripsi: 'Decode Base64 URL-safe.',
    contoh: 'milik data = base64UrlDekode(token)',
  },

  // Cipher Klasik
  caesarEnkode: {
    signature: 'caesarEnkode(s: teks, geser: angka) → teks',
    deskripsi: 'Caesar cipher — geser huruf sejumlah geser.',
    contoh: 'milik cipher = caesarEnkode("HELLO", 13)',
  },
  caesarDekode: {
    signature: 'caesarDekode(s: teks, geser: angka) → teks',
    deskripsi: 'Dekripsi Caesar cipher.',
    contoh: 'milik plain = caesarDekode(cipher, 13)',
  },
  vigenereEnkode: {
    signature: 'vigenereEnkode(teks_masukan: teks, kunci: teks) → teks',
    deskripsi: 'Vigenere cipher dengan kunci teks.',
    contoh: 'milik cipher = vigenereEnkode("HELLO", "kunci")',
  },
  vigenereDekode: {
    signature: 'vigenereDekode(teks_masukan: teks, kunci: teks) → teks',
    deskripsi: 'Dekripsi Vigenere cipher.',
    contoh: 'milik plain = vigenereDekode(cipher, "kunci")',
  },
  rot13: {
    signature: 'rot13(s: teks) → teks',
    deskripsi: 'ROT13 — Caesar shift 13.',
    contoh: 'milik r = rot13("HELLO")  // "URYYB"',
  },
  atbash: {
    signature: 'atbash(s: teks) → teks',
    deskripsi: 'Atbash cipher — balik alfabet (A↔Z, B↔Y, ...).',
    contoh: 'milik r = atbash("ABC")  // "ZYX"',
  },

  // KDF & MAC
  rentangkanKunci: {
    signature: 'rentangkanKunci(password: teks, salt: teks, iterasi: angka) → teks',
    deskripsi: 'Key stretching sederhana dengan iterasi hash.',
    contoh: 'milik kunci = rentangkanKunci(password, salt, 1000)',
  },
  turunkanKunci: {
    signature: 'turunkanKunci(password: teks, salt: teks, panjangKunci: angka) → teks',
    deskripsi: 'Key derivation — hasilkan kunci dengan panjang tertentu.',
    contoh: 'milik k = turunkanKunci(password, salt, 32)',
  },
  buatMAC: {
    signature: 'buatMAC(kunci: teks, pesan: teks) → teks',
    deskripsi: 'Buat Message Authentication Code.',
    contoh: 'milik mac = buatMAC(kunci, pesan)',
  },
  verifikasiMAC: {
    signature: 'verifikasiMAC(kunci: teks, pesan: teks, mac: teks) → bool',
    deskripsi: 'Verifikasi MAC.',
    contoh: 'jika verifikasiMAC(kunci, pesan, mac) { cetak("valid") }',
  },
  tandaTangan: {
    signature: 'tandaTangan(kunci_privat: teks, pesan: teks) → teks',
    deskripsi: 'Buat tanda tangan digital sederhana.',
    contoh: 'milik tanda = tandaTangan(kunci_privat, pesan)',
  },
  verifikasiTanda: {
    signature: 'verifikasiTanda(kunci_privat: teks, pesan: teks, tanda: teks) → bool',
    deskripsi: 'Verifikasi tanda tangan.',
    contoh: 'jika verifikasiTanda(kunci, pesan, tanda) { cetak("sah") }',
  },

  // Block Cipher & Padding
  enkripsiBlok: {
    signature: 'enkripsiBlok(s: teks, kunci: teks) → teks',
    deskripsi: 'Enkripsi blok XOR + PKCS#7 padding + Base64.',
    contoh: 'milik cipher = enkripsiBlok("data rahasia", kunci)',
  },
  dekripsiBlok: {
    signature: 'dekripsiBlok(s: teks, kunci: teks) → teks',
    deskripsi: 'Dekripsi hasil enkripsiBlok().',
    contoh: 'milik plain = dekripsiBlok(cipher, kunci)',
  },
  tambahPadding: {
    signature: 'tambahPadding(s: teks, ukuranBlok: angka) → teks',
    deskripsi: 'Tambah PKCS#7 padding.',
    contoh: 'milik padded = tambahPadding(teks, 8)',
  },
  hapusPadding: {
    signature: 'hapusPadding(s: teks) → teks',
    deskripsi: 'Hapus PKCS#7 padding.',
    contoh: 'milik asli = hapusPadding(padded)',
  },

  // Password
  buatSalt: {
    signature: 'buatSalt(seed: angka, panjangSalt: angka) → teks',
    deskripsi: 'Buat salt acak untuk password hashing.',
    contoh: 'milik salt = buatSalt(acakBulat(1, 99999), 16)',
  },
  hashPassword: {
    signature: 'hashPassword(password: teks, salt: teks) → teks',
    deskripsi: 'Hash password dengan salt (10.000 iterasi).',
    contoh: 'milik hash = hashPassword(password, salt)',
  },
  verifikasiPassword: {
    signature: 'verifikasiPassword(password: teks, salt: teks, hashTersimpan: teks) → bool',
    deskripsi: 'Verifikasi password vs hash tersimpan.',
    contoh: 'jika verifikasiPassword(input, salt, hashDB) { cetak("login ok") }',
  },
  samaCT: {
    signature: 'samaCT(a: teks, b: teks) → bool',
    deskripsi: 'Perbandingan string constant-time (tahan timing attack).',
    contoh: 'jika samaCT(token, tokenDB) { /* aman */ }',
  },

  // Token
  buatToken: {
    signature: 'buatToken(seed: angka, panjangToken: angka) → teks',
    deskripsi: 'Buat token alfanumerik dari seed LCG.',
    contoh: 'milik token = buatToken(12345, 32)',
  },
};

export class CryptoHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position, /[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!range) return;
    const word = document.getText(range);
    const meta = FUNGSI_CRYPTO[word];
    if (!meta) return;
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.appendCodeblock(meta.signature, 'loop');
    md.appendMarkdown(`\n\n${meta.deskripsi}\n\n`);
    md.appendMarkdown(`**Contoh:**\n`);
    md.appendCodeblock(meta.contoh, 'loop');
    return new vscode.Hover(md, range);
  }
}

export function registerCryptoProviders(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { language: 'loop', scheme: 'file' },
      new CryptoHoverProvider()
    )
  );
}
