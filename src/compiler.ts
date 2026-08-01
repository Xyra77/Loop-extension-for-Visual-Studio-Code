/**
 * Loop Language — Source Compiler
 * loop-lang v1.2.0 | src/compiler.ts
 *
 * Bridge antara VS Code dan compiler Loop (loopc.py / loopc binary):
 *  - Kompilasi ke NASM x86-64
 *  - Output binary native
 *  - Progress notification di VS Code
 *  - Integrasi dengan diagnostics runtime
 */

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { runLoopFile, parseLoopErrors, publishDiagnostics } from './runtime';

export interface CompileOptions {
  target: 'nasm' | 'binary';
  outputDir?: string;
  optimasi?: boolean;
}

export interface CompileResult {
  sukses: boolean;
  outputFile?: string;
  errors: string[];
  durationMs: number;
}

/** Kompilasi file .lp ke target yang dipilih */
export async function kompilasi(
  filePath: string,
  collection: vscode.DiagnosticCollection,
  opts: CompileOptions = { target: 'nasm' }
): Promise<CompileResult> {
  const config          = vscode.workspace.getConfiguration('loop');
  const interpreterPath = config.get<string>('interpreterPath', 'loop');
  const outputDir       = opts.outputDir ?? path.dirname(filePath);
  const baseName        = path.basename(filePath, '.lp');

  collection.clear();

  return vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `Loop: Mengkompilasi ${baseName}.lp …`,
      cancellable: false,
    },
    async () => {
      try {
        const result = await runLoopFile(filePath, interpreterPath, 'compile');
        const errors = parseLoopErrors(result.stderr);

        if (errors.length > 0) {
          publishDiagnostics(collection, vscode.Uri.file(filePath), errors);
        }

        if (result.exitCode !== 0) {
          return {
            sukses: false,
            errors: [result.stderr],
            durationMs: result.durationMs,
          };
        }

        // Tentukan path output
        const ext        = opts.target === 'nasm' ? '.nasm' : '';
        const outputFile = path.join(outputDir, baseName + ext);

        vscode.window.showInformationMessage(
          `✅ Kompilasi selesai: ${path.basename(outputFile)} (${result.durationMs}ms)`
        );

        return { sukses: true, outputFile, errors: [], durationMs: result.durationMs };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        vscode.window.showErrorMessage(`Loop compiler error: ${msg}`);
        return { sukses: false, errors: [msg], durationMs: 0 };
      }
    }
  );
}

/** Cek apakah loopc tersedia di PATH */
export function cekKompilerTersedia(interpreterPath: string): boolean {
  try {
    const { execSync } = require('child_process');
    execSync(`${interpreterPath} --version`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/** Dapatkan path output default berdasarkan konfigurasi */
export function getOutputDir(filePath: string): string {
  const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
  if (workspaceFolder) {
    const buildDir = path.join(workspaceFolder.uri.fsPath, 'build');
    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir, { recursive: true });
    }
    return buildDir;
  }
  return path.dirname(filePath);
}
