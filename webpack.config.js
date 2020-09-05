// webpack基本配置

const path =require('path');
const vuePlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = dir =>path.resolve(__dirname,dir);
console.log(resolve('./src/main.js'))

module.exports={
    entry:resolve('./src/client-entry.js'),
    output:{
        filename:'bundle.js',
        path:resolve('./dist')
    },
    resolve:{
        extensions:['.js','.vue']
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                },
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.css$/,
                use:['vue-style-loader','css-loader']
            }
          
        ]
    },
    plugins:[
        new vuePlugin(),
        new HtmlWebpackPlugin({
            template:resolve('./public/index.html'),
            filename:"index.html"
        })
    ]
}