import './style.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import router from '@/router';

import AppComposition from './App.vue';
import apolloClient from '@/apollo';
import { DefaultApolloClient } from '@vue/apollo-composable';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md3 } from 'vuetify/blueprints';

const vuetify = createVuetify({
  components,
  directives,
  blueprint: md3,
});

createApp(AppComposition)
  .use(createPinia().use(piniaPluginPersistedState))
  .provide(DefaultApolloClient, apolloClient)
  .use(router)
  .use(vuetify)
  .mount('#app');
