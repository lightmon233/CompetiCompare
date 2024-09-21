const { ipcRenderer, remote } = require('electron');
const path = require('path');
const fs = require('fs');

// 运行按钮
document.getElementById('run-compare').addEventListener('click', () => {
  // 获取code1和code2的内容
  var code1Content = editor1.getValue(); 
  var code2Content = editor2.getValue();

  // 获取项目根目录
  rootPath = __dirname;

  // 创建文件路径
  const filePath1 = path.join(rootPath, 'code1.cpp');
  const filePath2 = path.join(rootPath, 'code2.cpp');

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

// 替换结果渲染
ipcRenderer.on('compare-result', (event, result) => {
  document.getElementById('result').innerText = result;
});