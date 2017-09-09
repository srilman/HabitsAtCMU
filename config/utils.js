const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.loadImages = ({ include, exclude, options} = {}) => ({
    module: {
        rules: [{
            test: /\.(png|jpe?g|gif|ico)$/,
            include,
            exclude,
            use: {
                loader: 'url-loader',
                options,
            }},
        ],
    },
});

exports.extractHTML = ({minify, isDev, host, port }) => {
    const plugin = {
        inject: false,
        template: require('html-webpack-template'),
        appMountId: 'app',
        mobile: true,
        meta: [{
            name: 'description',
            content: 'A better default template for html-webpack-plugin.',
        }],
        title: 'Habits At CMU',
    };

    const devServer = isDev ? {devServer: `http://${host}:${port}`} : {};
    return {plugins: [new HtmlWebpackPlugin(merge([plugin, devServer, {minify}]))]};
};
