import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Plugins from Bootstrap
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

import 'mdbvue/lib/css/mdb.min.css'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@fortawesome/fontawesome-free/css/all.min.css";

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = true

Vue.directive('add-class-hover', {
  bind(el, binding) {    
    const { value="" } = binding;
    el.addEventListener('mouseenter',()=> {
        el.classList.add(value)
    });
    el.addEventListener('mouseleave',()=> {
        el.classList.remove(value)
    });
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
