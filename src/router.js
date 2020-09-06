import Vue from 'vue'
import vueRouter from 'vue-router'
import Bar from './components/bar'
Vue.use(vueRouter)
export default function(){
    return new vueRouter({
        mode:'history',
        routes:[
            {
                path:'/',
                component:Bar
            },
            {
                path:'/foo',
                component:()=>import('./components/foo')
            }
        ]
    })
}