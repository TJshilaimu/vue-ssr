const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge=require('webpack-merge');
const base = require('./webpack.base')
const {resolve} = require('./util')

module.exports=merge(base,{
    entry:{
        client:resolve('../src/client-entry.js')
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html'),
            filename:"index.html",
            
        })
    ]
})