import Vue from 'vue';
import Vuex from 'vuex';
import ActiveDirectoryUser from '@/models/ActiveDirectoryUser';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    loggedInUser: null,
  },

  mutations: {
    loginSucceeded(state, user) {
      state.loggedInUser = user;
      if (user.attributes.token !== null) {
        localStorage.setItem('auth-token', user.attributes.token);
      }
    },
    logout(state) {
      state.loggedInUser = null;
      localStorage.removeItem('auth-token');
    },
  },

  actions: {
    loginSucceeded({ commit }, user: ActiveDirectoryUser) {
      commit('loginSucceeded', user);
    },
    logout({ commit }) {
      commit('logout');
    },
  },

  getters: {
    loggedIn: (state) => state.loggedInUser !== null,
  },

  modules: {
  },

});
