import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('./pages/IndexPage.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('./pages/productPage.vue'),
    },

    {
      path: '/card',
      name: 'card',
      component: () => import('./pages/cardPage.vue'),
    },
  ],
});

export default router;
