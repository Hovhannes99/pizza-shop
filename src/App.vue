<template>
  <v-app>
    <Header/>
    <router-view></router-view>
</v-app>
</template>

<script>
import Header from "../src/components/Header"

export default {
  name: 'App',
  components:{
    Header,
  },
}
</script>
<style>

</style>
