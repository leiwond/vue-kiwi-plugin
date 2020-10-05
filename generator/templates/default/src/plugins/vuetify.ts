import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#8bc72a', // $color-green1
        secondary: '#535662', // $color-gray2
        accent: '#5e9f06', // $color-green2
        success: '#8bc72a', // $color-green1
        error: '#a6201e', // $color-red1
        info: '#e2f3fc', // $color-blue4
      },
    },
  },

});
