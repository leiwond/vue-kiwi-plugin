import Vue from 'vue';

import date from './date';
import time from './time';
import datetime from './datetime';
import pluralize from './pluralize';
import currency from './currency';
import number from './number';
import numberFormat from './numberFormat';
import mailto from './mailto';
import initials from './initials';
import httpLink from './httpLink';

export default {
  register: () => {
    Vue.filter('date', date);
    Vue.filter('time', time);
    Vue.filter('datetime', datetime);
    Vue.filter('pluralize', pluralize);
    Vue.filter('currency', currency);
    Vue.filter('number', number);
    Vue.filter('numberFormat', numberFormat);
    Vue.filter('mailto', mailto);
    Vue.filter('initials', initials);
    Vue.filter('httpLink', httpLink);
  },
};
