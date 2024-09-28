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
    ? `powershell -Command "cp backup/compare.cpp.bak compare.cpp"
&& powershell -Command "cp backup/input_generator.cpp.bak input_generator.cpp"`
    : `cp backup/compare.cpp.bak compare.cpp
&& cp backup/input_generator.cpp.bak input_generator.cpp`

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
  exec('powershell -Command "rm compare.cpp"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error}`);
      return;
    }
  });
  exec('powershell -Command "rm input_generator.cpp"', (error, stdout, stderr) => {
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
