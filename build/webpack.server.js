const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge=require('webpack-merge');
const base = require('./webpack.base')
const {resolve} = require('./util');
const serverRenderPlugin = require('vue-server-renderer/server-plugin')


module.exports=merge(base,{
    entry:{
        server:resolve('../src/server-entry.js')
    },
    target:"node", // server-entry.js打包的时候用的，声明打包环境
    output:{
        libraryTarget:"commonjs2" //把打包后的文件挂载到module.exports上
    },
    plugins:[
        new serverRenderPlugin(),
        new HtmlWebpackPlugin({
            template:resolve('../public/index.ssr.html'),
            filename:"index.ssr.html",
            excludeChunks:['server'],
            minify:false
        })
    ]
})