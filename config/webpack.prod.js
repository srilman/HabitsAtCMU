const commonConfig = require('./webpack.common');
const utils = require('./utils');
const config = require('./config');

const merge = require('webpack-merge');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge([commonConfig,
    {
        output: {
            publicPath: config.prod.publicPath,
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader',
                    }),
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                importLoaders: 1,
                            },
                        }, {
                            loader: 'sass-loader',
                        }],
                    }),
                },
            ],
        },
        performance: {
            hints: 'warning',
            maxAssetSize: 450000,
        },
        plugins: [
            new BabiliPlugin(),
            new ExtractTextPlugin({filename: '[name].[contenthash:8].css'}),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: cssnano,
                cssProcessorOptions: {
                    discardComments: {
                        removeAll: true,
                    },
                    safe: true,
                },
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'static',
                analyzerPort: 8888,
                openAnalyzer: true,
            }),
        ],
    },
    utils.loadImages(),
    utils.extractHTML({
        minify: {collapseWhitespace: true},
        isDev: false,
    }),
]);