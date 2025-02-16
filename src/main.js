import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Paintings from './components/Paintings.vue';
import Statues from './components/Statues.vue';

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: Statues
  },
  {
    path: '/paintings',
    component: Paintings
  },
  
    
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
