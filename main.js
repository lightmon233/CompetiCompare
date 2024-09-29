const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const isWindows = process.platform === 'win32';

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

  const restore_command = isWindows
    ? `powershell -Command "cp backup/compare.cpp.bak compare.cpp; cp backup/input_generator.cpp.bak input_generator.cpp"`
    : `cp backup/compare.cpp.bak compare.cpp && cp backup/input_generator.cpp.bak input_generator.cpp`

  exec(restore_command, (error, stdout, stderr) => {
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
    exec('make run', (error, stdout, stderr) => {
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

  store_command = isWindows
    ? `powershell -Command "mv -Force compare.cpp backup/compare.cpp.bak; mv -Force input_generator.cpp backup/input_generator.cpp.bak"`
    : `mv -f compare.cpp backup/compare.cpp.bak && mv -f input_generator.cpp backup/input_generator.cpp.bak`

  exec(store_command, (error, stdout, stderr) => {
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
