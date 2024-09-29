import createNewEditorView from "../../dist/codemirror.bundle.js";

const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');
var rootPath;

const input_generator_editor = createNewEditorView('input_generator_editor', fs.readFileSync('backup/input_generator.cpp.bak', 'utf-8'));

document.getElementById('gen').addEventListener('click', () => {
    var inputGeneratorContent = input_generator_editor.state.doc.toString();
    const filePath = path.join(rootPath, 'input_generator.cpp');
    fs.writeFile(filePath, inputGeneratorContent, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('input_generator写入成功');
    });
});

ipcRenderer.on('send-root-path', (event, path) => {
    rootPath = path;
});

ipcRenderer.send('get-root-path');

window.onload = () => {
    if (sessionStorage.getItem('inputGeneratorContent')) {
        input_generator_editor.dispatch({
            changes: {
                from: 0,
                to: input_generator_editor.state.doc.length,
                insert: sessionStorage.getItem('inputGeneratorContent')
            }
        });
    }
    sessionStorage.removeItem('inputGeneratorContent');
}

window.onbeforeunload = () => {
    sessionStorage.setItem('inputGeneratorContent', input_generator_editor.state.doc.toString());
}