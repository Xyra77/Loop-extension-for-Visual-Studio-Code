/**
 * Loop Language - Build Module Eksperimen
 * loop-lang v1.2.0 | build/eksperimen.js
 *
 * Module eksperimen untuk fitur-fitur yang masih dalam inkubasi:
 *  - LSP (Language Server Protocol) dasar
 *  - Inlay hints untuk tipe inferensi
 *  - Semantic token provider
 *  - Auto-import (impor file .lp)
 *
 * EKSPERIMENTAL - Belum aktif secara default.
 *    Enable via: loop.eksperimen.aktifkan = true di settings.json
 */

'use strict';

/**
 * Daftar fitur eksperimen dan status-nya.
 * @type {Record<string, { aktif: boolean; deskripsi: string }>}
 */
const FITUR_EKSPERIMEN = {
  inlayHints: {
    aktif: false,
    deskripsi: 'Tampilkan tipe inferensi sebagai inlay hints di editor',
  },
  semanticTokens: {
    aktif: false,
    deskripsi: 'Semantic token coloring yang lebih akurat dari tmLanguage',
  },
  autoImpor: {
    aktif: false,
    deskripsi: 'Saran auto-impor file .lp lain dalam workspace',
  },
  lspDasar: {
    aktif: false,
    deskripsi: 'Language Server Protocol — go-to-definition, find-references',
  },
  formatOtomatis: {
    aktif: false,
    deskripsi: 'Auto-format file .lp saat simpan (opinionated style)',
  },
};

/**
 * Cek apakah sebuah fitur eksperimen diaktifkan oleh user.
 * @param {string} namaFitur
 * @param {Record<string, unknown>} config - workspace config Loop
 * @returns {boolean}
 */
function isEksperimenAktif(namaFitur, config) {
  const globalSwitch = config['eksperimen.aktifkan'] ?? false;
  if (!globalSwitch) return false;
  const meta = FITUR_EKSPERIMEN[namaFitur];
  return meta ? meta.aktif : false;
}

/**
 * Cetak ringkasan status semua fitur eksperimen ke console.
 */
function statusEksperimen() {
  console.log('\nLoop Eksperimen Status');
  for (const [nama, meta] of Object.entries(FITUR_EKSPERIMEN)) {
    const status = meta.aktif ? '[aktif]' : '[nonaktif]';
    console.log(`  ${status} ${nama}: ${meta.deskripsi}`);
  }
  console.log('');
}

module.exports = { FITUR_EKSPERIMEN, isEksperimenAktif, statusEksperimen };
