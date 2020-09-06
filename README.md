
  ### 初次接触，还有些地方没缕清，所以笔记有些简陋 ###
  ``` 用到的webpack插件: webpack webpack-cli webpack-dev-server babel-loader @babel/core @babel/preset-env css-loader vue-style-loader vue-loader vue-template-compiler html-webpack-plugin webpack-merge```

  # 功能记录
  1. 利用express开启服务器，vue-server-renderer插件实现简单服务端渲染 .createRenderer().renderToString()方法。
  2. 构建vue脚手架,src下的vue文件中，main.js导出的是一个方法，这个方法产生了vue实例对象并返回{app,store,router}，再在client-entry.js和server-entry.js中分别引入，并对其进行修饰。client需要进行挂载，server中则需要进行promise一系列操作，根据需要添加。利用webpack进行配置打包，注意的点有，css-loader部分，分别配置webpack.base.js | webpack.client.js | webpack.server.js三个配置文件，
  ### webpack注意事项：
  > base中出口加上name，vue-loader得用上插件，导入有简写时的配置 extensions，server中得配置环境target，输出要配置成module.exports输出，需要libraryTarget:"commonjs2"，用于生成的vue-ssr插件得配置在插件最前方。server中的html插件需要过滤server.js，只需要一个html模板就行（当做渲染模板），不用插入js。
  3. 项目启动后，完善如下：
  > 1. 导入打包后的代码页面无样式时，采用async、await、promise方式调用renderToString(),
  >2. 由于字符串无vue特性，需要客户端激活，即在app.vue中添加id='#app',
  > 3. 自动注入client.bundle.js文件，调用vue-server-renderer插件中的分别对应客户端即服务器端的插件，生成两个ssr.json的文件后，在server.js中引入，修改为的createRender(serverBundle,{template,clientManifest})，不用先前的字符串导入。
  4. 导入vue-router:创建router文件，引入到main.js中，在server-entry中配置，此时需要在server.js中传递一个上下文参数{url：req.url}，并且将其路由由'/'改为'*'，便于所有路由都经过函数。在server-entry中由于可能存在异步操作，所以使用promise方式包裹，实现router.push(ctx.url)跳转。再利用router.onReady()判断跳转的路由是否拥有，用router.getMatchedComponents()判断。
  5.导入vuex:创建store文件并导入main.js中。在VUE页面组件中调用asyncData(){}函数，在server-entry中进行配置，经过路由检查后，在resolve之前，利用promise.all包裹判断match.map(item=>{if(item.asyncData){return item.asyncData(store)}})，再在then中进行ctx.stat=store.state和resolve操作。这样是为了判断页面请求数据时是否有调用vuex中的函数，但这样还不够，还得在store.js中返回store之前判断，代码为if(typeof (window) !== 'undefined' && window.__INITIAL_STATE__){ store.replaceState(window.__INITIAL_STATE__) } ，这样才能够实现VUEX的值与页面中的值一致。若是页面直接调用vuex中的函数，则可以直接在mounted(){}中进行设置，上面的一系列操作是在刷新那种调用浏览器渲染资源产生作用的。
  ### 注意事项：
  > 将asyncData()函数放在不用的页面级组件时情况不一样（这个方法只在服务器端执行，并在页面级组件中展示（api规定）），若不放在首先进入的那个页面，那么后续操作如果不进行刷新处理，那么它只是在使用客户端资源，将不会调用服务器的这个函数。这个函数时为了处理在某个路由下刷新时，我们请求的服务器资源而使用的，所以得根据情况书写。

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
