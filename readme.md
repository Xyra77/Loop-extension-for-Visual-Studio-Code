# Loop Language Support for VS Code

Official extension for Loop programming language (`.lp`) in Visual Studio Code.

## Features

Syntax Highlighting
- Keywords: jika, maka, selain, selama, ulang, kembali
- Data types: angka, teks, bool, larik
- Built-in functions: I/O, string, array, math, crypto, networking
- String interpolation with full expression support
- Integer, float, hex, and scientific notation
- Single line and block comments
- Compound assignment operators

Run / Compile File Loop
- Press Ctrl+F5 (Mac: Cmd+F5) to run .lp file
- Press Ctrl+Shift+B to compile to NASM x86-64
- Run buttons in editor toolbar
- Right-click context menu for run/compile/debug
- Auto-save before execution
- Shared terminal output
- Status indicator in editor

Hover Documentation
- Hover over crypto functions for documentation
- Hover over networking functions for signatures and examples

Snippets
Available for: fungsi, jika, selama, ulang, pilih, coba, cetak, prima, acak, sha, sambung, ambil, tls, telusuri

Editor Configuration
- Auto-closing brackets and quotes
- Auto-indent after braces and keywords
- Proper word patterns for Loop identifiers

## Settings

loop.interpreterPath: Path to Loop interpreter (default: "loop")
loop.eksperimen.aktifkan: Enable experimental features (default: false)
loop.build.outputDir: Compilation output directory (default: "build")

Example in settings.json:
```json
{
  "loop.interpreterPath": "/usr/local/bin/loop",
  "loop.build.outputDir": "build"
}
```

## Version History

1.2.0
- Added compile to NASM command
- Added debug command
- Added hover documentation for crypto and networking functions
- Added networking syntax highlighting
- Added new snippets
- Added status bar indicator
- Added experimental features setting
- Added output directory setting

1.1.0
- Added run file feature (Ctrl+F5)
- Added block comments
- Added hex and scientific notation support
- Added compound assignment operators
- Improved keyword type highlighting
- Improved function categorization
- Improved escape sequence handling
- Improved string interpolation

1.0.0
- Initial release with syntax highlighting, snippets, language configuration
