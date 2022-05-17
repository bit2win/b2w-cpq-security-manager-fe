const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

module.exports = function () {
    return merge(commonConfig, {
        mode: 'development',
        output: {
            publicPath: '/',
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
                                publicPath: '/',
                            },
                        },
                    ],
                },
            ],
        },
        devtool: 'cheap-module-source-map',
        plugins: [new webpack.DefinePlugin(require(path.resolve(__dirname, 'config/dev.config.js')))],
        devServer: {
            host: '0.0.0.0', //your ip address
            port: 3000,
            disableHostCheck: true,
            // Proxy for your API server listening on localhost:8080/api
            proxy: [
                {
                    path: '/api',
                    target: 'http://localhost:8080',
                    secure: false,
                    changeOrigin: true,
                },
            ],

            stats: {
                children: false,
                chunks: false,
                chunkModules: false,
                modules: false,
                reasons: false,
                useExports: false,
            },
            // historyApiFallback: {
            //     rewrites: [{
            //         from: /\/auth.*/,
            //         to: '/auth.html'
            //     }, {
            //         from: /\/external.*/,
            //         to: '/external.html'
            //     }, {
            //         from: /(\/school)?.*/,
            //         to: '/school.html'
            //     }]
            // }
        },
    });
};
