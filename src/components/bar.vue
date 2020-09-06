<template>
    <div>
        <p>bar</p>
        <h2>{{msg}}</h2>
        <h4>{{this.$store.state.name}}</h4>
    </div>
</template>

<script>
   export default {
    //    这个方法只在服务器端执行，并在页面级组件中展示（api规定）
   
       data(){
           return{
               msg:'hello'
           }
       }
 }
</script>

<style>
    div{
        background: red;
    }

</style>