import Vue from 'vue'
import App from './app.vue'


export default function(){
    // 产生vue实例
    const app = new Vue({
  
        render:h=>h(App)
    })
    return {app}
}