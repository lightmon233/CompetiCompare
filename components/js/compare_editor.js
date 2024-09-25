import createNewEditorView from "../../dist/codemirror.bundle.js";

const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');
var rootPath;

const compare_editor = createNewEditorView('compare_editor', fs.readFileSync('backup/compare.cpp.bak', 'utf-8'));

document.getElementById('com').addEventListener('click', () => {
    var compareContent = compare_editor.state.doc.toString();
    const filePath = path.join(rootPath, 'compare.cpp');
    fs.writeFile(filePath, compareContent, (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('compare写入成功');
    });
});

ipcRenderer.on('send-root-path', (event, path) => {
    rootPath = path;
});

ipcRenderer.send('get-root-path');