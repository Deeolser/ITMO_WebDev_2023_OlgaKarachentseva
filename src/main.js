import './style.css';
import {createApp} from 'vue';
import router from './router.js';
import AppComposition from './AppComposition.vue';
import {createPinia} from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';


createApp(AppComposition).use(createPinia().use(piniaPluginPersistedState)).use(router).mount('#app');
