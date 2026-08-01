/**
 * Loop Language — Source Runtime
 * loop-lang v1.2.0 | src/runtime.ts
 *
 * Runtime layer untuk eksekusi program Loop di dalam VS Code:
 *  - Mengelola proses interpreter/compiler Loop
 *  - Menangani output stream (stdout/stderr)
 *  - Menyediakan diagnostics (error marker di editor)
 *  - Mendukung run mode: interpret | compile | debug
 */

import * as vscode from 'vscode';
import * as cp from 'child_process';
import * as path from 'path';

export type RunMode = 'interpret' | 'compile' | 'debug';

export interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

export interface LoopError {
  baris: number;
  kolom?: number;
  pesan: string;
  tipe: 'sintaks' | 'runtime' | 'kompilasi';
}

/** Parse baris error dari output loopc.py / loopc binary */
export function parseLoopErrors(stderr: string): LoopError[] {
  const errors: LoopError[] = [];
  // Format: [Baris N] <pesan>  atau  RuntimeError baris N: <pesan>
  const pola = /\[Baris\s+(\d+)\]\s*(.+)|RuntimeError\s+baris\s+(\d+):\s*(.+)/gi;
  let m: RegExpExecArray | null;
  while ((m = pola.exec(stderr)) !== null) {
    errors.push({
      baris:  parseInt(m[1] ?? m[3], 10) - 1,  // 0-based untuk VS Code
      pesan:  m[2] ?? m[4],
      tipe:   m[1] ? 'sintaks' : 'runtime',
    });
  }
  return errors;
}

/** Kirim diagnostics ke Problems panel */
export function publishDiagnostics(
  collection: vscode.DiagnosticCollection,
  uri: vscode.Uri,
  errors: LoopError[]
): void {
  const diags = errors.map(e => {
    const range = new vscode.Range(e.baris, 0, e.baris, 999);
    const sev   = e.tipe === 'sintaks'
      ? vscode.DiagnosticSeverity.Error
      : vscode.DiagnosticSeverity.Warning;
    return new vscode.Diagnostic(range, `[Loop] ${e.pesan}`, sev);
  });
  collection.set(uri, diags);
}

/** Jalankan file Loop — returns promise of RunResult */
export function runLoopFile(
  filePath: string,
  interpreterPath: string,
  mode: RunMode = 'interpret',
  timeout = 30_000
): Promise<RunResult> {
  return new Promise((resolve, reject) => {
    const dir   = path.dirname(filePath);
    const file  = path.basename(filePath);
    const args  = mode === 'compile'
      ? [file, '--target', 'nasm']
      : [file];

    const start = Date.now();
    const proc  = cp.spawn(interpreterPath, args, { cwd: dir });

    let stdout = '';
    let stderr = '';

    proc.stdout.on('data', (d: Buffer) => (stdout += d.toString()));
    proc.stderr.on('data', (d: Buffer) => (stderr += d.toString()));

    const timer = setTimeout(() => {
      proc.kill();
      reject(new Error(`Loop: timeout ${timeout}ms terlampaui`));
    }, timeout);

    proc.on('close', (code: number) => {
      clearTimeout(timer);
      resolve({ exitCode: code ?? -1, stdout, stderr, durationMs: Date.now() - start });
    });

    proc.on('error', (err: Error) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}
