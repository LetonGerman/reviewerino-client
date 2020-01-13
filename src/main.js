import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(Vuelidate);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
