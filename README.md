# 采坑记录
1.vue-style-loader不起作用
> css-loader版本太高,为4.2.2,将其降级到3.4.2；

2.生产模式下html文件自动压缩
> 此为html-webpack-plugin4.4.1版本的情况，若不要自动压缩，则添加minify:false；3.2.0版本不会压缩。

3.webpack-merge引入报错
> 新版5.1.3的merge引入时是个对象，可用解构；4.2.2版本的merge引入就直接是一个函数。

4.报错document is not defined
> loader引入错误，在解析vue的style模块时，在配置css时引入的是['style-loader','css-loader']，但其实不应该引入'style-loader',应该引入['vue-style-loader','css-loader']。解决报错后，同时还得注意样式是否起作用，此时参考第一条。

5.服务器渲染打包的文件，页面没有样式
> 此处有bug，需改写代码为：
```javascript
app.get('/',(req,res)={
  let value = new Promise((resolve,reject)=>{
    render.renderToString((err,html)=>{
      if(err) reject(err);
      resolve(html)
    })
  })
  res.end(value)
})
```
> 同时还得注意，此时仍有可能样式不起作用，判定是package.json中某个插件版本太高，但尚未弄清楚到底是哪个，于是自己全部降了个级，终于解决。





```javascript
// 这里为新版本，坑太多，气死
 "dependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "babel-loader": "^8.1.0",
    "css-loader": "^3.4.2",
    "express": "^4.17.1",
    "html-webpack-plugin": "^4.4.1",
    "style-loader": "^1.2.1",
    "vue": "^2.6.12",
    "vue-loader": "^15.9.3",
    "vue-server-renderer": "^2.6.12",
    "vue-style-loader": "^4.1.2",
    "vue-template-compiler": "^2.6.12",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.1.3"
  }
  ```

  # 功能记录