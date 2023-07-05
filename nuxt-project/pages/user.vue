<template>
  <div>User Page</div>
  <div>{{ users }}</div>
</template>
<script lang="ts" setup>
const users = ref<Array<any>>([]);
useFetch("/api/users").then((response) => (users.value = response.data.value));
</script>
<style scoped></style>