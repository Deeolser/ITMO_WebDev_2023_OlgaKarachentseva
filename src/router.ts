import {createRouter, createWebHashHistory} from 'vue-router';
import ROUTES, {PUBLIC_PAGES} from '@/constants/routes.js';
import {useUserStore} from '@/store/userStore';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: ROUTES.INDEX,
      component: () => import('./pages/IndexPage.vue'),
    },
    {
      path: ROUTES.SIGNIN,
      component: () => import('./pages/SignInPage.vue')
    },
    {
      path: ROUTES.SIGNUP,
      component: () => import('./pages/SignUpPage.vue')
    },
    {
      path: ROUTES.BOOKS,
      component: () => import('./pages/BooksPage.vue')
    }
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (userStore.hasUser) {
    checkNavigation([ROUTES.SIGNUP], to.path, from, next, true);
  } else {
    checkNavigation(PUBLIC_PAGES, to.path, {path: ROUTES.SIGNIN}, next);
  }
});

function checkNavigation(routes: string[], path: string, gotoRoute: any, next: any, isPathIncluded = false) {
  const pathIndex = routes.indexOf(path);
  const notAllowedNavigation = isPathIncluded ? pathIndex > -1 : pathIndex < 0;
  console.log('> router -> beforeEach', path, {notAllowedNavigation});
  if (notAllowedNavigation) {
    next(gotoRoute);
  } else next();
}

export default router;