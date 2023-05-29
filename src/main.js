import './style.css';
import {createApp} from 'vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';

import router from './router.js';

import AppComposition from './App.vue';
import PROVIDE from '@/constants/provides.js';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

createApp(AppComposition)
  .use(createPinia()
    .use(piniaPluginPersistedState))
  .provide(PROVIDE.PB, pb)
  .use(router).mount('#app');
