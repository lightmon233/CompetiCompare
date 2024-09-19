const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');

document.getElementById('run-compare').addEventListener('click', () => {
  // 获取code1和code2元素
  const code1Element = document.getElementById('code1');
  const code2Element = document.getElementById('code2');

  // 获取code1和code2的内容
  const code1Content = code1Element.value; // 假设code1和code2是textarea元素
  const code2Content = code2Element.value;

  // 获取项目根目录
  const rootPath = require('electron').remote.app.getPath('userData'); // 使用electron的remote模块获取

  // 创建文件路径
  const filePath1 = path.join(rootPath, 'code1.txt');
  const filePath2 = path.join(rootPath, 'code2.txt');

  // 写入文件
  fs.writeFile(filePath1, code1Content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('code1写入成功');
  });

  fs.writeFile(filePath2, code2Content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('code2写入成功');
  });

  ipcRenderer.send('run-compare');
});

ipcRenderer.on('compare-result', (event, result) => {
  document.getElementById('result').innerText = result;
});