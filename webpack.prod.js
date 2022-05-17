const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function () {
    return merge(commonConfig, {
        mode: 'production',
        plugins: [new webpack.DefinePlugin(require(path.resolve(__dirname, 'config/prod.config.js')))],
        output: {
            publicPath: '/security-manager',
        },
        module: {
            rules: [
                {
                    test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[hash].[ext]',
                                publicPath: '/security-manager',
                            },
                        },
                    ],
                },
            ],
        },
    });
};
