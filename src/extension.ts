/**
 * Loop Language — Extension Entry Point (TypeScript source)
 * loop-lang v1.2.0 | src/extension.ts
 *
 * Entry point TypeScript untuk extension Loop.
 * Compile dengan: npm run compile  →  out/extension.js
 *
 * Fitur yang diaktifkan:
 *  - Command: loop.runFile, loop.compileFile, loop.debugFile
 *  - HoverProvider: crypto + networking docs
 *  - DiagnosticCollection: error markers di editor
 *  - Status bar item
 */

import * as vscode from 'vscode';
import * as path from 'path';
import { registerCryptoProviders } from './crypto';
import { registerNetworkProviders } from './networking';

export function activate(context: vscode.ExtensionContext): void {
  // Diagnostics
  const diagCollection = vscode.languages.createDiagnosticCollection('loop');
  context.subscriptions.push(diagCollection);

  // Helpers
  let _terminal: vscode.Terminal | undefined;

  function getOrCreateTerminal(): vscode.Terminal {
    if (_terminal) {
      const exists = vscode.window.terminals.find(t => t === _terminal);
      if (exists) return _terminal;
    }
    _terminal = vscode.window.createTerminal({
      name: 'Loop',
      iconPath: new vscode.ThemeIcon('play-circle'),
    });
    return _terminal;
  }

  function jalankanFile(mode: 'interpret' | 'compile' | 'debug' = 'interpret'): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage('Tidak ada file yang terbuka.');
      return;
    }
    const doc = editor.document;
    if (doc.languageId !== 'loop') {
      vscode.window.showErrorMessage('File ini bukan file Loop (.lp).');
      return;
    }
    if (doc.isDirty) doc.save();

    const config          = vscode.workspace.getConfiguration('loop');
    const interpreterPath = config.get<string>('interpreterPath', 'loop');
    const dir             = path.dirname(doc.fileName);
    const fileName        = path.basename(doc.fileName);
    const terminal        = getOrCreateTerminal();
    terminal.show(true);

    const modeArgs: Record<string, string> = {
      compile: `--target nasm`,
      debug:   `--debug`,
      interpret: ``,
    };
    terminal.sendText(`cd "${dir}" && ${interpreterPath} "${fileName}" ${modeArgs[mode]}`.trimEnd());
  }

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand('loop.runFile',     () => jalankanFile('interpret')),
    vscode.commands.registerCommand('loop.compileFile', () => jalankanFile('compile')),
    vscode.commands.registerCommand('loop.debugFile',   () => jalankanFile('debug')),
  );

  // Hover providers
  registerCryptoProviders(context);
  registerNetworkProviders(context);

  // Status bar
  const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  statusBar.text    = '$(play) Loop';
  statusBar.tooltip = 'Jalankan file Loop (Ctrl+F5)';
  statusBar.command = 'loop.runFile';
  context.subscriptions.push(statusBar);

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor?.document.languageId === 'loop') statusBar.show();
      else statusBar.hide();
    })
  );

  // Aktifkan status bar jika sudah buka file .lp
  if (vscode.window.activeTextEditor?.document.languageId === 'loop') {
    statusBar.show();
  }
}

export function deactivate(): void { /* cleanup handled via subscriptions */ }
