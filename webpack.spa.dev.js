const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const commonSpaConfig = require('./webpack.spa.common.js');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const sharedDependencies = require('./shared-dependencies');

module.exports = webpackConfigEnv => {
    const defaultConfig = singleSpaDefaults({
        orgName: 'bit2win',
        projectName: 'security-manager',
        webpackConfigEnv,
    });
    return merge(defaultConfig, commonSpaConfig, {
        mode: 'development',
        devtool: 'cheap-module-source-map',
        plugins: [new webpack.DefinePlugin(require(path.resolve(__dirname, 'config/dev.config.js')))],
        externals: [...sharedDependencies, ...defaultConfig.externals],
    });
};
