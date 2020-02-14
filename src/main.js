import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins from Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

// import 'bootstrap/dist/js/bootstrap.js'
import 'mdbvue/lib/css/mdb.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
