import { createRouter, createWebHashHistory } from 'vue-router';
import MainPage from '../pages/MainPage.vue';
import CouplesPage from '../pages/CouplesPage.vue';
import AboutPage from '../pages/AboutPage.vue';

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/couples',
    component: CouplesPage,
  },
  {
    path: '/about',
    component: AboutPage,
  },
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
export default router;
