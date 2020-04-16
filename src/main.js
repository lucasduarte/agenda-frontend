import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import ApiService from "./common/api.service";
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false

ApiService.init();
Vue.use(require('vue-moment'));
const moment = require('moment')
require('moment/locale/pt-br')
moment.locale('pt-br')

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
