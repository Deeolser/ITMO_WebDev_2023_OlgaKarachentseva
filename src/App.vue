<script setup>
import AppHeader from './components/AppHeader.vue';
import {computed, inject, onMounted} from 'vue';
import {useUserStore} from './store/userStore.js';
import {storeToRefs} from 'pinia';
import PROVIDE from '@/constants/provides.js';

const pb = inject(PROVIDE.PB);
const hasUser = computed(() => pb.authStore.isValid);
const {user} = storeToRefs(useUserStore());

onMounted(() => {
  console.log('> App -> onMounted');
});
</script>
<template>
  <AppHeader>
    Todo App
    <template #sub-header>
      <span v-if="hasUser">created by {{ user.name }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <div style="margin: 2rem 0;" />
  <div>
    <router-link to="/">
      Index
    </router-link>
    <router-link
      v-if="hasUser"
      to="/todos"
    >
      Todos
    </router-link>
  </div>
  <RouterView />
</template>



