const path = require('path');
const fs = require('fs');
const merge = require('webpack-merge');
const webpack = require('webpack');

const utils = require('./utils');
const commonConfig = require('./webpack.common');
const config = require('./config');

const host = process.env.HOST || config.dev.host;
const port = process.env.PORT || config.dev.port;
const lib = path.resolve(__dirname, 'lib');

module.exports = () => merge.smart([commonConfig,
    {
        entry: {
            app: ['react-hot-loader/patch'],
        },
        devtool: 'cheap-module-eval-source-map',
        devServer: {
            historyApiFallback: {
                verbose: true,
                disableDotRule: false,
            },
            compress: true,
            contentBase: config.common.sourceRoot,
            headers: { 'Access-Control-Allow-Origin': '*' },
            //stats: 'errors-only',
            open: process.env.OPEN_START || false,
            hotOnly: true,
            host,
            port,
            overlay: {
                errors: true,
                warnings: true,
            },
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader'],
                },
                {
                    test: /\.scss$/,
                    include: path.resolve(__dirname, config.common.sourceRoot),
                    use: [ 'style-loader', {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            sourceMap: true,
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    } ],
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
    },
    utils.loadImages({
        options: {
            limit: 15000,
            name: 'images/[name].[hash:8].[ext]',
        },
    }),
    utils.extractHTML({
        minify: {},
        isDev: true,
        host,
        port,
    }),
]);
