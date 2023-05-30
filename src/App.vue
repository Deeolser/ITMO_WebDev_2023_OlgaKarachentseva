<script setup>
import {computed, inject, reactive, ref} from 'vue';
import AppHeader from './components/AppHeader.vue';
import PROVIDE from '@/constants/provides.js';
import ROUTES from '@/constants/routes.js';
import {useRoute} from 'vue-router';
import AppMenu from '@/components/AppMenu.vue';


const pb = inject(PROVIDE.PB);
const user = ref(pb.authStore.model);
pb.authStore.onChange(() => {
  user.value = pb.authStore.model;
});
const hasUser = computed(() => !!user.value);

const checkRouteIsNotCurrent = (routePath, l = console.log('> routePath', routePath)) => useRoute().path !== routePath;

const menuLinks = reactive([
  {name: 'Index', link: ROUTES.INDEX, canRender: computed(() => checkRouteIsNotCurrent(ROUTES.INDEX))},
  {name: 'Todos', link: ROUTES.TODOS, canRender: computed(() => hasUser.value && checkRouteIsNotCurrent(ROUTES.TODOS))},
  {
    name: 'Sign In',
    link: ROUTES.SIGNIN,
    canRender: computed(() => !hasUser.value && checkRouteIsNotCurrent(ROUTES.SIGNIN))
  },
  {
    name: 'Sign Out', link: ROUTES.INDEX, canRender: computed(() => hasUser.value), onClick: () => {
      console.log('SignOUT');
      pb.authStore.clear();
    }
  },
]);

</script>
<template>
  <AppHeader>
    Todo App
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.username }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <AppMenu
    :links="menuLinks"
    style="margin: 2rem 0"
  />
  <RouterView />
</template>
