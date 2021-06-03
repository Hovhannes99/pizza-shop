<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
    <v-btn
        class="mx-2"
        fab
        dark
        large
        color="white"
        @click="logout"
        v-bind="attrs"
        v-on="on"
    >
      <v-icon
          large
          color="black darken-2"
          style="transform: rotate(90deg)"
      >
        mdi-arrow-up-bold-box-outline
      </v-icon>
    </v-btn>
    </template>
    <span>Logout</span>
  </v-tooltip>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "Logout",
  methods:{
    ...mapMutations("auth", ["removeToken"]),
    logout(){
      localStorage.removeItem('Token')
      this.removeToken()
      this.$emit('onLogout');
    }
  },
}
</script>

<style scoped>

</style>