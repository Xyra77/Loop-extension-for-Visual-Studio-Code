/**
 * Loop Language - Build Internal Script
 * loop-lang v1.2.0 | build/internal.js
 *
 * Script internal untuk packaging dan release extension:
 *  - Validasi semua file required sebelum package
 *  - Bump versi otomatis di package.json + manifest
 *  - Generate .vsix menggunakan vsce
 *  - Clean up file temp build
 *
 * Penggunaan (dari root extension):
 *   node build/internal.js [--bump patch|minor|major] [--dry-run]
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

// File yang wajib ada sebelum package
const FILE_WAJIB = [
  'package.json',
  'readme.md',
  'LICENSE.txt',
  'icon.png',
  'language-configuration.json',
  'syntaxes/loop.tmLanguage.json',
  'snippets/loop.json',
  'out/extension.js',
  'out/extension.js.map',
];

function validasiFile() {
  console.log('Validasi file required...');
  const hilang = FILE_WAJIB.filter(f => !fs.existsSync(path.join(ROOT, f)));
  if (hilang.length > 0) {
    console.error('File berikut tidak ditemukan:');
    hilang.forEach(f => console.error(`   - ${f}`));
    process.exit(1);
  }
  console.log('Semua file required tersedia.');
}

function bumpVersi(tipe = 'patch') {
  const pkgPath = path.join(ROOT, 'package.json');
  const pkg     = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const parts   = pkg.version.split('.').map(Number);

  if (tipe === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
  else if (tipe === 'minor') { parts[1]++; parts[2] = 0; }
  else { parts[2]++; }

  pkg.version = parts.join('.');
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Versi -> ${pkg.version}`);
  return pkg.version;
}

function buildPackage(versi, dryRun = false) {
  const output = `loop-lang-${versi}.vsix`;
  if (dryRun) {
    console.log(`Dry-run: akan membuat ${output}`);
    return;
  }
  console.log(`Membuat ${output}...`);
  execSync(`npx vsce package --out ${output}`, { cwd: ROOT, stdio: 'inherit' });
  console.log(`Selesai: ${output}`);
}

// Main
const args    = process.argv.slice(2);
const bump    = args.includes('--bump') ? args[args.indexOf('--bump') + 1] : null;
const dryRun  = args.includes('--dry-run');

validasiFile();

let versi = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version;
if (bump) versi = bumpVersi(bump);

buildPackage(versi, dryRun);
