/**
 * Loop Language — Source Networking
 * loop-lang v1.4.0 | src/networking.ts
 *
 * Hover docs untuk semua fungsi networking dari Library/net.lp
 */

import * as vscode from 'vscode';

export const FUNGSI_NET: Record<string, {
  signature: string;
  deskripsi: string;
  contoh: string;
  aman: boolean;
}> = {
  // HTTP Core
  httpGet: {
    signature: 'httpGet(url: teks) → teks',
    deskripsi: 'HTTP GET ke URL. Kembalikan body response sebagai teks.',
    contoh: 'milik isi = httpGet("https://api.example.com/data")',
    aman: true,
  },
  httpPost: {
    signature: 'httpPost(url: teks, body: teks, contentType: teks) → teks',
    deskripsi: 'HTTP POST ke URL dengan body dan Content-Type.',
    contoh: 'milik resp = httpPost(url, "name=Budi", "application/x-www-form-urlencoded")',
    aman: true,
  },
  httpPostJSON: {
    signature: 'httpPostJSON(url: teks, jsonBody: teks) → teks',
    deskripsi: 'HTTP POST dengan Content-Type: application/json.',
    contoh: 'milik resp = httpPostJSON(url, jsonStringify({nama: "Budi"}))',
    aman: true,
  },
  httpPostForm: {
    signature: 'httpPostForm(url: teks, formBody: teks) → teks',
    deskripsi: 'HTTP POST dengan Content-Type: application/x-www-form-urlencoded.',
    contoh: 'milik resp = httpPostForm(url, "user=budi&pass=rahasia")',
    aman: true,
  },
  httpStatus: {
    signature: 'httpStatus(url: teks) → angka',
    deskripsi: 'Dapatkan HTTP status code dari URL.',
    contoh: 'milik kode = httpStatus("https://example.com")  // 200',
    aman: true,
  },
  httpOK: {
    signature: 'httpOK(url: teks) → bool',
    deskripsi: 'Cek apakah status 200.',
    contoh: 'jika httpOK(url) { cetak("server up") }',
    aman: true,
  },
  httpGetFull: {
    signature: 'httpGetFull(url: teks) → larik',
    deskripsi: 'HTTP GET dengan response object lengkap. Gunakan resBody(), resStatus(), dst.',
    contoh: 'milik resp = httpGetFull(url)\njika resOK(resp) { cetak(resBody(resp)) }',
    aman: true,
  },
  httpPostFull: {
    signature: 'httpPostFull(url: teks, body: teks, contentType: teks) → larik',
    deskripsi: 'HTTP POST dengan response object lengkap.',
    contoh: 'milik resp = httpPostFull(url, body, "application/json")',
    aman: true,
  },
  httpPut: {
    signature: 'httpPut(url: teks, body: teks, contentType: teks) → teks',
    deskripsi: 'HTTP PUT request.',
    contoh: 'milik resp = httpPut(url, jsonStringify(data), "application/json")',
    aman: true,
  },
  httpDelete: {
    signature: 'httpDelete(url: teks) → teks',
    deskripsi: 'HTTP DELETE request.',
    contoh: 'milik resp = httpDelete("https://api.example.com/item/1")',
    aman: true,
  },
  httpPatch: {
    signature: 'httpPatch(url: teks, body: teks, contentType: teks) → teks',
    deskripsi: 'HTTP PATCH request.',
    contoh: 'milik resp = httpPatch(url, jsonStringify({nama: "Baru"}), "application/json")',
    aman: true,
  },
  httpUnduh: {
    signature: 'httpUnduh(url: teks, pathTujuan: teks) → bool',
    deskripsi: 'Download file dari URL dan simpan ke disk.',
    contoh: 'httpUnduh("https://example.com/data.csv", "/tmp/data.csv")',
    aman: true,
  },
  httpUpload: {
    signature: 'httpUpload(url: teks, fieldName: teks, fileName: teks, isiFile: teks) → teks',
    deskripsi: 'Upload file via POST multipart/form-data.',
    contoh: 'milik resp = httpUpload(url, "file", "foto.jpg", isiFile)',
    aman: true,
  },
  httpGetRetry: {
    signature: 'httpGetRetry(url: teks, percobaan: angka, tundaMs: angka) → teks',
    deskripsi: 'GET dengan retry otomatis jika gagal.',
    contoh: 'milik isi = httpGetRetry(url, 3, 1000)',
    aman: true,
  },
  httpGetSafe: {
    signature: 'httpGetSafe(url: teks) → teks',
    deskripsi: 'GET dengan rate limiting (cek setRateLimit()).',
    contoh: 'milik isi = httpGetSafe(url)',
    aman: true,
  },

  // Response Object
  resBody: {
    signature: 'resBody(resp: larik) → teks',
    deskripsi: 'Ambil body dari response object httpGetFull().',
    contoh: 'milik body = resBody(resp)',
    aman: true,
  },
  resStatus: {
    signature: 'resStatus(resp: larik) → angka',
    deskripsi: 'Ambil status code dari response.',
    contoh: 'milik status = resStatus(resp)  // 200, 404, ...',
    aman: true,
  },
  resOK: {
    signature: 'resOK(resp: larik) → bool',
    deskripsi: 'Cek apakah status 2xx.',
    contoh: 'jika resOK(resp) { cetak(resBody(resp)) }',
    aman: true,
  },
  resError: {
    signature: 'resError(resp: larik) → bool',
    deskripsi: 'Cek apakah status 4xx/5xx.',
    contoh: 'jika resError(resp) { cetak("gagal") }',
    aman: true,
  },

  // DNS & TCP
  dnsResolve: {
    signature: 'dnsResolve(hostname: teks) → teks',
    deskripsi: 'Resolve hostname ke IP address.',
    contoh: 'milik ip = dnsResolve("example.com")',
    aman: true,
  },
  tcpKonek: {
    signature: 'tcpKonek(host: teks, port: angka) → angka',
    deskripsi: 'Buka koneksi TCP. Kembalikan file descriptor (fd).',
    contoh: 'milik fd = tcpKonek("localhost", 8080)',
    aman: true,
  },
  tcpKirim: {
    signature: 'tcpKirim(fd: angka, data: teks) → angka',
    deskripsi: 'Kirim data via TCP socket.',
    contoh: 'tcpKirim(fd, "GET / HTTP/1.1\\r\\n")',
    aman: true,
  },
  tcpTerima: {
    signature: 'tcpTerima(fd: angka, n: angka) → teks',
    deskripsi: 'Terima n bytes dari socket.',
    contoh: 'milik data = tcpTerima(fd, 4096)',
    aman: true,
  },
  tcpTerimaSemuanya: {
    signature: 'tcpTerimaSemuanya(fd: angka) → teks',
    deskripsi: 'Terima semua data sampai socket ditutup.',
    contoh: 'milik resp = tcpTerimaSemuanya(fd)',
    aman: true,
  },
  tcpTutup: {
    signature: 'tcpTutup(fd: angka)',
    deskripsi: 'Tutup koneksi TCP socket.',
    contoh: 'tcpTutup(fd)',
    aman: true,
  },
  portTerbuka: {
    signature: 'portTerbuka(host: teks, port: angka) → bool',
    deskripsi: 'Cek apakah port terbuka di host (TCP probe).',
    contoh: 'jika portTerbuka("example.com", 443) { cetak("HTTPS tersedia") }',
    aman: true,
  },
  scanPort: {
    signature: 'scanPort(host: teks, larikPort: larik) → larik',
    deskripsi: 'Scan beberapa port — kembalikan port yang terbuka.',
    contoh: 'milik terbuka = scanPort("example.com", [80, 443, 8080])',
    aman: false,
  },
  pingHost: {
    signature: 'pingHost(host: teks) → bool',
    deskripsi: 'Ping host via HTTP/HTTPS.',
    contoh: 'jika pingHost("example.com") { cetak("online") }',
    aman: true,
  },

  // HTML Scraping
  scrapTag: {
    signature: 'scrapTag(html: teks, tag: teks, atribut: teks) → larik',
    deskripsi: 'Scrape semua nilai atribut dari tag HTML tertentu.',
    contoh: 'milik links = scrapTag(html, "a", "href")',
    aman: true,
  },
  scrapLink: {
    signature: 'scrapLink(html: teks, baseURL: teks) → larik',
    deskripsi: 'Ambil semua link dari HTML (resolve relatif ke baseURL).',
    contoh: 'milik links = scrapLink(html, "https://example.com")',
    aman: true,
  },
  scrapJudul: {
    signature: 'scrapJudul(html: teks) → teks',
    deskripsi: 'Ambil teks dari tag <title>.',
    contoh: 'milik judul = scrapJudul(html)',
    aman: true,
  },
  scrapParagraf: {
    signature: 'scrapParagraf(html: teks) → larik',
    deskripsi: 'Ambil semua teks dari tag <p>.',
    contoh: 'milik par = scrapParagraf(html)',
    aman: true,
  },
  hapusTag: {
    signature: 'hapusTag(html: teks) → teks',
    deskripsi: 'Hapus semua tag HTML, sisakan teks bersih.',
    contoh: 'milik teks_bersih = hapusTag(html)',
    aman: true,
  },
  ambilJudul: {
    signature: 'ambilJudul(url: teks) → teks',
    deskripsi: 'GET URL lalu ambil <title>.',
    contoh: 'milik judul = ambilJudul("https://example.com")',
    aman: true,
  },
  crawlURL: {
    signature: 'crawlURL(urlMulai: teks, maksHalaman: angka) → larik',
    deskripsi: 'Web crawler BFS — kunjungi URL dan ikuti link sampai maksHalaman.',
    contoh: 'milik hasil = crawlURL("https://example.com", 50)',
    aman: false,
  },

  // URL Utils
  parseURL: {
    signature: 'parseURL(url: teks) → larik',
    deskripsi: 'Parse URL menjadi [skema, host, port, path, query].',
    contoh: 'milik bagian = parseURL("https://api.example.com:8443/v1/data?q=loop")',
    aman: true,
  },
  urlEnkode: {
    signature: 'urlEnkode(s: teks) → teks',
    deskripsi: 'URL encode teks (percent encoding).',
    contoh: 'milik encoded = urlEnkode("hello world")  // "hello%20world"',
    aman: true,
  },
  urlDekode: {
    signature: 'urlDekode(s: teks) → teks',
    deskripsi: 'Decode URL percent encoding.',
    contoh: 'milik asli = urlDekode("hello%20world")  // "hello world"',
    aman: true,
  },
  buatQueryString: {
    signature: 'buatQueryString(pasangan: larik) → teks',
    deskripsi: 'Buat query string dari larik [key, val, key, val, ...].',
    contoh: 'milik q = buatQueryString(["q", "loop lang", "page", "1"])',
    aman: true,
  },
  urlDenganQuery: {
    signature: 'urlDenganQuery(url: teks, pasangan: larik) → teks',
    deskripsi: 'Gabung URL dengan query string.',
    contoh: 'milik url = urlDenganQuery("https://example.com", ["q", "loop"])',
    aman: true,
  },

  // Auth Headers
  headerBearer: {
    signature: 'headerBearer(token: teks) → teks',
    deskripsi: 'Buat header Authorization: Bearer <token>.',
    contoh: 'milik h = headerBearer(jwtToken)',
    aman: true,
  },
  headerBasic: {
    signature: 'headerBasic(user: teks, pass: teks) → teks',
    deskripsi: 'Buat header Authorization: Basic (Base64 encoded).',
    contoh: 'milik h = headerBasic("admin", "pass123")',
    aman: true,
  },

  // Rate Limiter
  setRateLimit: {
    signature: 'setRateLimit(maks: angka)',
    deskripsi: 'Set batas maksimum request HTTP per sesi.',
    contoh: 'setRateLimit(50)  // maks 50 request',
    aman: true,
  },

  // Socket lama (alias)
  sambung: {
    signature: 'sambung(host: teks, port: angka) → Soket',
    deskripsi: 'Alias untuk tcpKonek(). Buka koneksi TCP.',
    contoh: 'milik sok = sambung("localhost", 8080)',
    aman: true,
  },
  ambil: {
    signature: 'ambil(url: teks [, header: gabung]) → teks',
    deskripsi: 'HTTP GET sederhana. Kembalikan body.',
    contoh: 'milik isi = ambil("https://api.example.com/data")',
    aman: true,
  },
  telusuri: {
    signature: 'telusuri(url: teks, kedalaman: angka) → larik',
    deskripsi: 'Web crawler — jelajah URL hingga kedalaman tertentu.',
    contoh: 'milik tautan = telusuri("https://example.com", 2)',
    aman: false,
  },
  tlsSambung: {
    signature: 'tlsSambung(host: teks, port: angka, sertifikat?: teks) → SoketTLS',
    deskripsi: 'Buka koneksi TLS/SSL.',
    contoh: 'milik sok = tlsSambung("example.com", 443)',
    aman: true,
  },
};

export class NetworkHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.Hover> {
    const range = document.getWordRangeAtPosition(position, /[a-zA-Z_][a-zA-Z0-9_]*/);
    if (!range) return;
    const word = document.getText(range);
    const meta = FUNGSI_NET[word];
    if (!meta) return;
    const md = new vscode.MarkdownString();
    md.isTrusted = true;
    md.appendCodeblock(meta.signature, 'loop');
    md.appendMarkdown(`\n\n${meta.deskripsi}\n\n`);
    md.appendMarkdown(`**Contoh:**\n`);
    md.appendCodeblock(meta.contoh, 'loop');
    if (!meta.aman) {
      md.appendMarkdown('\n\n*Perhatikan keamanan saat menggunakan fungsi ini.*');
    }
    return new vscode.Hover(md, range);
  }
}

export function registerNetworkProviders(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { language: 'loop', scheme: 'file' },
      new NetworkHoverProvider()
    )
  );
}

export const NET_BUILTINS_REGEX =
  '\\\\b(httpGet|httpPost|httpPostJSON|httpPostForm|httpGetFull|httpPostFull|httpPut|httpDelete|httpPatch|httpUnduh|httpUpload|httpGetRetry|httpGetSafe|httpStatus|httpOK|resBody|resStatus|resOK|resError|resJSON|dnsResolve|tcpKonek|tcpKirim|tcpTerima|tcpTerimaSemuanya|tcpTutup|portTerbuka|scanPort|pingHost|scrapTag|scrapLink|scrapJudul|scrapParagraf|hapusTag|crawlURL|parseURL|urlEnkode|urlDekode|urlDenganQuery|headerBearer|headerBasic|setRateLimit|sambung|kirim|terima|tutup|ambil|telusuri|tlsSambung)\\\\b';
