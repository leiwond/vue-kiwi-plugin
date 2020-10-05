import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import EditCompany from '@/components/app/EditCompany.vue';
import Login from '@/components/app/Login.vue';
import ListCompanies from '@/components/app/ListCompanies.vue';
import ListJobs from '@/components/app/ListJobs.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresNoAuth: true },
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: ListJobs,
  },
  {
    path: '/companies',
    name: 'Firmen',
    component: ListCompanies,
  },
  {
    path: '/companies/new',
    name: 'Firma anlegen',
    component: EditCompany,
  },
];

const router = new VueRouter({
  routes,
});

export default router;

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresNoAuth && !store.getters.loggedIn) {
    next('login');
  } else {
    next();
  }
});
