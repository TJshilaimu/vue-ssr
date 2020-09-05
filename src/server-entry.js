import createApp from './main'

// 产生不同的实例挂载到客户端上去
export default function(){
    let {app} =createApp();
    return app;
}

// (function(){
//     module.exports={
//         export default function(){
//             let {app} =createApp();
//             return app;
//         }
          
//     }
// })