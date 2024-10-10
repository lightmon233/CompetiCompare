const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');
const path = require('path');
const fs = require('fs');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true }); // 创建目标目录

  // 递归遍历源目录
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);

    // 判断是文件还是目录
    const stat = fs.statSync(srcPath);
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath); // 递归复制子目录
    } else {
      fs.copyFileSync(srcPath, destPath); // 复制文件
    }
  });
}

module.exports = {
  packagerConfig: {
    asar: true,
    // extraResource: [
    //   "Makefile"
    // ]
    afterExtract: [
      (extractPath, electronVersion, platform, arch, done) => {
        // Copy the Makefile to the build directory
        var makefile = path.join(__dirname, 'Makefile');
        var backup = path.join(__dirname, 'backup');
        var dest = extractPath;
        fs.copyFileSync(makefile, path.join(dest, 'Makefile'));
        // 把backup目录递归地复制到dest目录下面
        copyDir(backup, path.join(dest, 'backup'));
        done();
      }
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
