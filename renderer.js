const { ipcRenderer } = require('electron');

document.getElementById('run-compare').addEventListener('click', () => {
  ipcRenderer.send('run-compare');
});

ipcRenderer.on('compare-result', (event, result) => {
  document.getElementById('result').innerText = result;
});