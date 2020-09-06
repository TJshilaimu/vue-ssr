import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default function(){
    // 数据预取
    const store = new Vuex.Store({
        state:{
            name:'py',
            age:18
        },
        mutations:{
            setName(state){
                state.name = 'al'
            }
        },
        actions:{
            setName({commit}){
                return new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        commit('setName');
                        resolve()
                    },1000)
                })
            }
        }
    })

    if(typeof (window) !== 'undefined' && window.__INITIAL_STATE__){
        store.replaceState(window.__INITIAL_STATE__)
    }

    return store;
}