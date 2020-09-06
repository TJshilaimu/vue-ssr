const Express = require('express');

// 将vue实例转化成字符串
const serverRender = require('vue-server-renderer')
const server = new Express();
const fs = require('fs');
const path=require('path')

server.use(Express.static(path.join(__dirname,'./dist')))
// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8');
const serverBundle = require('./dist/vue-ssr-server-bundle')
const clientManifest= require('./dist/vue-ssr-client-manifest')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const render = serverRender.createBundleRenderer(serverBundle, {
    template,
    clientManifest
})
server.get('*', async (req, res) => {
    // 通过渲染器返回字符串然后返回
   try{
    let value = await new Promise((resolve, reject) => {
        render.renderToString({url:req.url},(err, html) => {
            if (err) reject(err);
            resolve(html)
        })
       
    })
    res.end(value)
   }catch(error){
       console.log(error)
       res.end('404')
   }
})

server.listen(3000, res => console.log('server is running at 3000'))