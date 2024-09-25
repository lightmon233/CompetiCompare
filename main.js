const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

// 窗口初始化和ipcMain监听渲染器
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');

  exec('cp backup/compare.cpp.bak compare.cpp', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  });
  exec('cp backup/input_generator.cpp.bak input_generator.cpp', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  });

  ipcMain.on('run-compare', (event, input) => {
    exec('make', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error compiling: ${error}`);
          event.reply('compare-result', `Error: Compilation failed. ${stderr}`);
          return;
        }
    });
    exec('.\\compare.exe', (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error}`);
        event.reply('compare-result', `Error: ${stderr}`);
      } else {
        event.reply('compare-result', stdout);
      }
    });
  });
});

app.on('window-all-closed', () => {
  exec('rm compare.cpp', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  });
  exec('rm input_generator.cpp', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  });
  app.quit();
});

ipcMain.on('get-root-path', (event) => {
  const rootPath = __dirname;
  event.reply('send-root-path', rootPath);
})