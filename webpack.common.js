const webpack = require('webpack');
const path = require('path');
//const fs = require('fs');
// const exec = require('child_process').exec;
//const jsonDiff = require('json-diff')
//const {json2ts} = require('json-ts');

// Plugins
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');

const PATHS = {
    source: path.join(__dirname, './src/index.tsx'),
    output: path.join(__dirname, './target'),
};

module.exports = {
    entry: { source: PATHS.source },
    // output: { path: PATHS.output, filename: 'bundle.js' },
    output: {
        path: PATHS.output,
        filename: '[name].[contenthash].js',
        // filename: 'bundle.js',
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by ts-loader'.
            {
                test: /\.(ts|tsx|js|jsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader, options: { sourceMap: true } },
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } },
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                ],
            },
        ],
    },
    plugins: [
        //      new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: [PATHS.output] }),
        new HtmlWebpackPlugin({ template: './html/index.html' }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
        }),
        new CopyWebpackPlugin({
            patterns: [
                // {from: 'html/.htaccess', to: '.'},
                { from: 'html/favicon.ico', to: '.' },
                { from: 'src/assets/svg', to: 'svg' },
                //{from: 'src/languages', to: 'lang'}
                //{from: 'src/images', to: 'img'}
            ],
        }),
        Autoprefixer,
    ],
    stats: {
        colors: true,
    },
};
