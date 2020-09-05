const Express = require('express');
// const Vue = require('vue');
// 将vue实例转化成字符串
const serverRender = require('vue-server-renderer')
const server = new Express();
const fs = require('fs');
// const vm = new Vue({
//     template:`<div>hello py</div>`
// })

// const template = fs.readFileSync('./template.html','utf-8')
// const render = serverRender.createRenderer({
//     template
// });
const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8');
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')

const render = serverRender.createBundleRenderer(serverBundle, {
    template
})
server.get('/', async (req, res) => {
    // 通过渲染器返回字符串然后返回
    // let value = await render.renderToString(vm);
    // let value = await render.renderToString();
    let value = await new Promise((resolve, reject) => {
        render.renderToString((err, html) => {
            if (err) reject(err);
            resolve(html)
        })
    })
    res.end(value)

})

server.listen(3000, res => console.log('server is running at 3000'))