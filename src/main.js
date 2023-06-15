import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';

import router from './router.js';

import AppComposition from './App.vue';
import PROVIDE from '@/constants/provides.js';
import apolloClient from '@/apollo.js';
import { DefaultApolloClient } from '@vue/apollo-composable';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

let db = new PouchDB(`${import.meta.env.VITE_SERVER_DB_PATH}/books`);
db.get('book1').then((doc) => {
  console.log('doc', doc);
}).catch((e) => {
  console.log('get book1 error', e);
});
db.changes({
  since: 'now',
  live: true,
  include_docs: true,
}).on('change', function(change) {
  // handle change
  console.log('change', change);
}).on('complete', function(info) {
  // changes() was canceled
  console.log('complete', info);
}).on('error', function(err) {
  console.log(err);
});

createApp(AppComposition)
  .use(createPinia()
    .use(piniaPluginPersistedState))
  .provide(PROVIDE.PB, pb)
  .provide(PROVIDE.DB, db)
  .provide(DefaultApolloClient, apolloClient)
  .use(router).mount('#app');
