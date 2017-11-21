/**
 * 页面打包配置
 */
'use strict';
const path = require('path');
const fs = require("fs");

const PATH = {
    ROOT: path.join(__dirname, './'),
    MODULE: process.cwd(),
};

const webpack = require('webpack'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),

    baseConfig = require(`./webpack.common.config.js`),
    prodConfig = Object.create(baseConfig),
    devConfig = Object.create(baseConfig),

    customConfig = JSON.parse(fs.readFileSync(path.join(PATH.MODULE, './page.conf'),'utf-8')),
    rm = require('rimraf');
const MODULE_NAME = `${customConfig.dist || ('/dist/'+PATH.MODULE.match(/views(\/|\\)(.+$)/)[2].replace(/\\/g,'/')+'/')}`;
const PATH_DIST = path.join(PATH.ROOT, MODULE_NAME);
console.log(MODULE_NAME)
console.log(PATH_DIST)
const IS_DEV = process.env.NODE_ENV !== 'production';

const entry = {};
const plugins = [
    new webpack.DefinePlugin({
        '__DEV__': IS_DEV
    })
];
process.env.NODE_ENV !== undefined && plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
            warnings: false
        },
        output: {
            comments: false
        },
        sourceMap: true
    })
);
const entryConf = customConfig.entry;

for(let i = 0; i < entryConf.length; i++){
    entry[entryConf[i].entryName]=path.join(PATH.MODULE, entryConf[i].entryName);
    plugins.push(
        new HtmlWebpackPlugin({
            title: entryConf[i].title,
            inject: true,
            filename: entryConf[i].entryName+'.html',
            template: path.join(__dirname, `.\/template\/${entryConf[i].htmlTemplate}.html`),
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunks: [entryConf[i].entryName]
        })
    );
}

//config for develop env.
devConfig.entry=entry;

devConfig.output = {
    path: PATH_DIST,
    publicPath: MODULE_NAME,
    filename: `js/[name]_[hash:5].js`,
    chunkFilename: `[name].bundle.js`
};
devConfig.devServer= {
    contentBase: PATH.ROOT,
    port: 80,
    inline: true,
    host: '0.0.0.0'
};
devConfig.plugins = devConfig.plugins.concat(
    plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
        debug: true
    }),
    new ExtractTextPlugin({
        filename: `style/[name].css`,
        allChunks: true
    })
);


//config for product env.

prodConfig.output = {
    path: PATH_DIST,
    publicPath: `https://img.bolo.me/shopping/app${MODULE_NAME}`,
    filename: 'js/[name]_[chunkhash:5].js',
    chunkFilename: `[name]_[chunkhash:5].js`
};

prodConfig.entry = entry;

prodConfig.plugins = prodConfig.plugins.concat(
    plugins,
    new ExtractTextPlugin(`style/[name]_[chunkhash:5].css`)
);

module.exports = IS_DEV ? devConfig : prodConfig;