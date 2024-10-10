const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const { exec, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const isWindows = process.platform === 'win32';

let mainWindow;

// 窗口初始化和ipcMain监听渲染器
app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true, // 设置为false以去除标题栏
    autoHideMenuBar: false, // 隐藏菜单栏
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 完全删除菜单栏
  Menu.setApplicationMenu(null);

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
    // exec('make', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error compiling: ${error}`);
    //       event.reply('compare-result', `Error: Compilation failed. ${stderr}`);
    //       return;
    //     }
    // });
    // exec('make run', (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`Execution error: ${error}`);
    //     event.reply('compare-result', `Error: ${stderr}`);
    //   } else {
    //     event.reply('compare-result', stdout);
    //   }
    // });
    try {
      execSync('make');
      event.reply('compare-result', 'Compilation succeeded.');
    } catch (error) {
      console.error(`Error compiling: ${error}`);
      event.reply('compare-result', `Error: Compilation failed. ${error.stderr}`);
    }
    try {
      const stdout = execSync('make run', {stdio: 'pipe'}).toString();
      event.reply('compare-result', `${stdout}`);
    } catch (error) {
      console.error(`Error executing: ${error}`);
      const errorMessage = error.stderr ? error.stderr.toString() : 'No error output available.';
      event.reply('compare-result', `Error: Execution failed. ${errorMessage}`);
    }
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
});

ipcMain.on('compare-codes', (event, data) => {
  const { code1, code2 } = data;
  fs.writeFileSync('code1.cpp', code1);
  fs.writeFileSync('code2.cpp', code2);
});

ipcMain.on('write_ig', (event, data) => {
  const { ig } = data;
  fs.writeFileSync('input_generator.cpp', ig);
});

ipcMain.on('write_c', (event, data) => {
  const { c } = data;
  fs.writeFileSync('compare.cpp', c);
})
