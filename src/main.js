import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

//import vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

//import autocomplete and// Global registration
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// leaflet style
import 'leaflet/dist/leaflet.css';
Vue.config.productionTip = false;
// leaflet icon style
import { Icon } from 'leaflet';
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// import for router links 
import Map from "./components/Map";
import Home from "./components/Home";
import Methodology from "./components/Methodology";

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/Map', component: Map },
    { path: '/Methodology', component: Methodology },

  ],
  mode: 'history'
})

new Vue({
  vuetify,
  router,
  render: h => h(App),
}).$mount('#app')
