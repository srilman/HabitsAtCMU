const webpack = require('webpack');
const path = require('path');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = {
    entry: {
        'vendor': ['react', 'react-dom', 'react-redux', 'redux'],
    },

    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../lib'),
        library: '[name]',
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(__dirname, '../lib/[name]-manifest.json'),
            name: '[name]',
        }),
        new ParallelUglifyPlugin({
            cacheDir: path.resolve(__dirname, '../cache'),
        }),
    ],
};