import Vue from 'vue'
import App from './App.vue'
import 'vuetify/dist/vuetify.min.css'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import store from './store'
import {routes} from "./routers";
import VueRouter from "vue-router";


Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  vuetify,
  store,
  router
}).$mount('#app')
