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
        devtool: 'cheap-module-source-map',
        plugins: [
            new webpack.DefinePlugin(require(path.resolve(__dirname, 'config/oauth.config.js')))
        ],
        devServer: {
            host: '0.0.0.0', //your ip address
            port: 3000,
            disableHostCheck: true,
            // Proxy for your API server listening on localhost:8080/api
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
