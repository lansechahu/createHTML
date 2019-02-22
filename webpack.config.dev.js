const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    entry: './src/js/index.js',
    output: {
        path: __dirname + "/build",
        filename: 'js/main.min.js',
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: './build',
        disableHostCheck: true,
        /*proxy: {
            '/api': 'http://havi.msldigital.cn/index/index'
        }*/
    },

    plugins: [
        //new UglifyJSPlugin(),
        new CleanWebpackPlugin(['build/js', 'build/index.html']),
        new HtmlWebpackPlugin(
            {
                template: "./index.html",
                chunksSortMode: "none"
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // 正则匹配所有以.css结尾的文件
                test: /\.css$/,
                // 使用css-loader和style-loader依次对css文件进行处理
                // 按照数组中从后往前的顺序
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}