// webpack基本配置
const {resolve} =require('./util')
const vuePlugin=require('vue-loader/lib/plugin')
module.exports={
    output:{
        filename:'[name].bundle.js',
        path:resolve('../dist')
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
                test:/\.css$/,
                use:['vue-style-loader','css-loader']
            },
            {
                test:/\.vue$/,
                use:'vue-loader'
            }
        ]
    },
    plugins:[
        new vuePlugin()
    ]
}