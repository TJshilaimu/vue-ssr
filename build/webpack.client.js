const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge=require('webpack-merge');
const base = require('./webpack.base')
const {resolve} = require('./util')
const clientBuildPlugin = require('vue-server-renderer/client-plugin')

module.exports=merge(base,{
    entry:{
        client:resolve('../src/client-entry.js')
    },
    plugins:[
        new clientBuildPlugin(),
        new HtmlWebpackPlugin({
            template:resolve('../public/index.html'),
            filename:"index1.html",
            
        })
    ]
})