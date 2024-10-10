import { editor1, editor2 } from './components/js/code_editor.js';

const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');
var rootPath;

// 运行按钮
document.getElementById('run-compare').addEventListener('click', () => {
  // 获取code1和code2的内容
  var code1Content = editor1.state.doc.toString(); 
  var code2Content = editor2.state.doc.toString();

  // 获取项目根目录
  rootPath = __dirname;

  // 创建文件路径
  const filePath1 = path.join(rootPath, 'code1.cpp');
  const filePath2 = path.join(rootPath, 'code2.cpp');

  // 发送消息给主进程
  ipcRenderer.send('compare-codes', { code1: code1Content, code2: code2Content });

  ipcRenderer.send('run-compare');
});

// 替换结果渲染
ipcRenderer.on('compare-result', (event, result) => {
  document.getElementById('result').innerText = result;
});

// 监听主进程发送的根目录路径
ipcRenderer.on('send-root-path', (event, path) => {
  rootPath = path;
})

ipcRenderer.send('get-root-path');
