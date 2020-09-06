<template>
    <div>
        <p>foo</p>
        <button @click="clickMe">点击</button>
        <h4>{{this.$store.state.age}}</h4>
        <h4>{{this.$store.state.name}}</h4>
    </div>
</template>

<script>
    export default {
        mounted(){
            this.$store.dispatch('setName')
        },
        asyncData(store){
           return store.dispatch('setName')
       },
        methods: {
            clickMe() {
                alert('hello')
            }
        }
    }
</script>

<style scoped>
p{
    color:blueviolet;
    font-size:44px;
}
</style>