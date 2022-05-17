const Autoprefixer = require('autoprefixer');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PATHS = {
    source: path.join(__dirname, './src/index-single-spa.tsx'),
    output: path.join(__dirname, './target_spa'),
};
// NO NEEDED let commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString();
module.exports = {
    entry: { source: PATHS.source },
    output: {
        path: PATHS.output,
        publicPath: './',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
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
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
        }),
        Autoprefixer,
    ],
    stats: {
        colors: true,
    },
};
