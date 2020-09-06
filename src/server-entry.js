import createApp from './main'


// 产生不同的实例挂载到客户端上去
export default function(ctx){
//     let {app,router} =createApp();
//     router.push(ctx.url)
//     return app;
// 由于可能存在异步组件，所以采用promise方式
    return new Promise((resolve,reject)=>{
		let {app,router,store} = createApp();
		router.push(ctx.url);
		// 跳转完后要判断一下
		router.onReady(()=>{
			// 判断请求的路由有没有
			const match = router.getMatchedComponents();
			if(match.length == 0 ){
				reject({code:404})
			}
			// 为了防止多个组件调用，都成功之后，所以采用promise.all
			Promise.all(match.map(component=>{
				if(component.asyncData){
					// 注意这里检测到值后，修改后会直接返回，造成的结果就是，不进入到满足条件的这个路由的话，值不会改变，一旦进入后，调用函数后，值全都改变了。
					return component.asyncData(store)
				}
			})).then(()=>{
				console.log(store.state)
				// 改变后害的返回改变上下文里的数据
				ctx.state = store.state;
				resolve(app)
			})
		},reject)
	})



}

// (function(){
//     module.exports={
//         export default function(){
//             let {app} =createApp();
//             return app;
//         }
          
//     }
// })