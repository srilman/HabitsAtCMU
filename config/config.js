const path = require('path');

module.exports = {
    common: {
        target: 'web',
        sourceRoot: '../src',
        assetRoot: path.resolve(__dirname, '../static'),
        distRoot: path.resolve(__dirname, '../dist'),
    },
    prod: {
        env: 'production',
        index: path.resolve(__dirname, '../dist/index.html'),
        publicPath: './',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts already do so for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report,
    },
    dev: {
        env: 'development',
        host: 'localhost',
        port: 5000,
        open: true,
    },
};