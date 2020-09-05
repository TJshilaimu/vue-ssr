<template>
    <div>
        <p>foo</p>
        <button @click="clickMe">点击</button>

    </div>
</template>

<script>
    export default {
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