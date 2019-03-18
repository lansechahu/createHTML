const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const express = require('express')
const app = express();
var appData = require('./build/data/all.json');
var apiRoutes = express.Router();
app.use('/api', apiRoutes)


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
        before(app){
            app.get('/api/appData',function(req,res){
                res.json({
                    errno:0,
                    data:appData
                })
            })
        }
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
