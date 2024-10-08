const path = require('path');

module.exports = {
    entry: {
        codemirror: './components/js/codemirror.js', // 要打包的文件
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'module'
    },
    target: 'electron-renderer', // 设置目标为渲染进程
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // 解析的文件扩展名
    },
    mode: 'development', // 或 'production'
    devtool: 'source-map', // 源映射，有助于调试
    experiments: {
        outputModule: true
    }
};