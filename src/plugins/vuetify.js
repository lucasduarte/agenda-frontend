import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import DatetimePicker from 'vuetify-datetime-picker'

import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify);
Vue.use(DatetimePicker);

export default new Vuetify({
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
