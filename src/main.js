import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@progress/kendo-theme-default/dist/all.css'

import { Grid } from '@progress/kendo-vue-grid'

Vue.component('Grid', Grid);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
