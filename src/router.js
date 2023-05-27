import {createRouter, createWebHashHistory} from 'vue-router';
import ROUTES from './constants/routes.js';
import {inject} from 'vue';
import PROVIDE from '@/constants/provides.js';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: ROUTES.INDEX,
      component: () => import('./pages/IndexPage.vue'),
    },
    {
      path: ROUTES.TODOS,
      component: () => import('./pages/todos/TodosPage.vue')
    },
    {
      path: ROUTES.TODOS_ID,
      component: () => import('./pages/todos/TodoEditPage.vue')
    },
    {
      path: ROUTES.SIGNIN,
      component: () => import('./pages/SigninPage.vue')
    }
  ],
});

router.beforeEach((to, from, next) => {
  const pb = inject(PROVIDE.PB);
  const publicPages = [ROUTES.INDEX, ROUTES.SIGNIN];
  const notAllowedNavigation =
    publicPages.indexOf(to.path) < 0
    && !pb.authStore.isValid;

  console.log('> router -> beforeEach', to.path, {notAllowedNavigation});

  if (notAllowedNavigation) {
    next({path: ROUTES.SIGNIN});
  } else next();
});

export default router;