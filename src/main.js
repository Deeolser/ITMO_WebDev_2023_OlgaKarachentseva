import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import PocketBase from 'pocketbase';

import router from './router.js';

import AppComposition from './App.vue';
import PROVIDE from '@/constants/provides.js';

const pb = new PocketBase(import.meta.env.VITE_SERVER_PATH);
console.log('pb.authStore.isValid:', pb.authStore.isValid);

let db = new PouchDB('http://127.0.0.1:5984/books');
db.get('book1').then((doc) => {
  console.log('doc', doc);
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
  .use(router).mount('#app');
