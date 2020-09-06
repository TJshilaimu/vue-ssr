import Vue from 'vue'
import App from './app.vue'
import createRouter from './router'
import createStore from './store'
export default function(){

    const router = createRouter()
    const store = createStore()
    // 产生vue实例
    const app = new Vue({
  
        render:h=>h(App),
        router,
        store
    })
    return {app,router,store}
}