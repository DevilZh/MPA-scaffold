/**
 * 通用打包配置
 */
'use strict';
const path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require("extract-text-webpack-plugin");

const plugins = [];
module.exports = {
    context: path.join(__dirname),
    resolve: {
        alias: {
            'utils': path.join(__dirname, '../utils/'),
            'assets': path.join(__dirname, '../assets/'),
            'views': path.join(__dirname, '../views/'),
        },
        extensions: ['.js', '.vue'],
    },
    externals: {
        vue: 'Vue'
    },
    resolveLoader: {
        moduleExtensions: ["-loader"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract("css")
                use: ExtractTextPlugin.extract({fallback:'style', use:'css?minimize!postcss'}),
            },
            {
                test: /\.s[a|c]ss$/,
                // loader: ExtractTextPlugin.extract("css!sass")
                use: ExtractTextPlugin.extract({fallback:'style', use:'css?minimize!postcss!sass'}),
            },
            {
                test: /\.vue$/,
                loader: "vue",
                options: {
                    postcss: require('./postcss.config.js'),
                    loaders: {
                        css: ExtractTextPlugin.extract({fallback:'vue-style', use:'css?minimize'}),
                        sass: ExtractTextPlugin.extract({fallback:'vue-style', use: 'css?minimize!sass'}),
                        scss: ExtractTextPlugin.extract({fallback:'vue-style', use: 'css?minimize!sass'}),
                        less: ExtractTextPlugin.extract({fallback:'vue-style', use: 'css?minimize!less'}),
                        jade: 'jade'
                    },
                }
            },
            {
                test: /\.jade/,
                loader: "jade"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                // query: {
                //     presets: ['es2015', 'stage-0'],
                //     plugins: ['transform-runtime']
                // }
            },
            {
                test: /\.(eot|woff|ico|ttf|svg)$/,
                loader: "url?limit=8192&name=iconfont/[name].[ext]"
            },
            {
                test: /\.(png|gif|ico|jpg)$/,
                exclude: /\.dp\.(png|gif|ico|jpg)/,
                loader: 'url?limit=8192&name=img/[hash:8].[ext]'
            },
            {
                test: /\.dp\.(png|gif|ico|jpg)$/,
                loader: "file?name=img/[hash:8].[ext]"
            }
        ]
    },
    // babel: {
    //     presets: ['es2015', 'stage-0'],
    //     plugins: ['transform-runtime']
    // },
    stats: {
        colors: true,
        modules: true,
        reasons: true
    },
    devtool: "source-map",
    plugins: plugins,
};
