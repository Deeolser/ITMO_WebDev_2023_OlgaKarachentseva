import './style.css';
import { createApp } from 'vue';
import router from './router.js';
import App from './App.vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

createApp(App)
  .use(createPinia().use(piniaPluginPersistedState))
  .use(router)
  .mount('#app');
