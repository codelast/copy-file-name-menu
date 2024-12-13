const vscode = require('vscode');
const path = require('path');

function activate(context) {
    let disposable = vscode.commands.registerCommand('copy-file-name-menu.copyFileName', (uri) => {
        // Get the active editor
        const activeEditor = vscode.window.activeTextEditor;
        
        // Get the URI either from the command argument or active editor
        const fileUri = uri || (activeEditor ? activeEditor.document.uri : null);
        
        if (fileUri) {
            // Get the file name from the URI
            const fileName = path.basename(fileUri.fsPath);
            
            // Copy to clipboard
            vscode.env.clipboard.writeText(fileName).then(() => {
                // Show notification
                vscode.window.showInformationMessage(`Copied: ${fileName}`);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
