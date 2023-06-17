import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';

import router from '@/router';

import AppComposition from './App.vue';
import apolloClient from '@/apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(DefaultApolloClient, apolloClient)
  .use(router).mount('#app');
