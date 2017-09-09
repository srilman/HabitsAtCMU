const webpack = require('webpack');
const path = require('path');
const config = require('./config');

module.exports = {
    entry: {
        app: [
            path.resolve(__dirname, config.common.sourceRoot, 'index.js'),
        ],
    },
    output: {
        path: config.common.distRoot,
        filename: '[name].[hash:8].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, config.common.sourceRoot),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    failOnWarning: false,
                    failOnError: true,
                },
            },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, config.common.sourceRoot),
                loader: 'babel-loader',
                options: {cacheDirectory: true},
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: 'fonts/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream',
                        name: 'fonts/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[hash:8].[ext]',
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname),
            manifest: require('../lib/vendor-manifest.json'),
            name: '../lib/vendor.dll.js',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
    ],
};
