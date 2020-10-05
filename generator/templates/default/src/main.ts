import Vue from 'vue';
import axios from 'axios';
import { Model } from 'vue-api-query';
import filters from '@/components/util/filters';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import components from './components';

Model.$http = axios;

components.register();
filters.register();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
