<template>
  <div>app
    <bar />
    <foo />
  </div>
 
</template>

<script>
  import Bar from './components/bar';
  import Foo from './components/foo'
  export default {
    components: {
      Bar,
      Foo
    }
  }
</script>

<style>
div{
  width:400px;
  height:400px;
  border:1px solid red;
}
</style>