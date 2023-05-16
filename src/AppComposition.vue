<script setup>
import AppHeader from './components/AppHeader.vue';
import {onMounted, ref} from 'vue';

const user = ref({name: 'Olga'});

onMounted(() => {
  console.log('> App -> onMounted');
});
</script>
<template>
  <AppHeader>
    Todo App
    <template #sub-header>
      <span v-if="user">created by {{ user.name }}</span>
      <span v-else>noname</span>
    </template>
  </AppHeader>
  <div>
    <router-link to="/">
      Index
    </router-link>
    <router-link to="/todos">
      Todos
    </router-link>
  </div>
  <RouterView />
</template>


