<template>
  <div class="grid-row grid-cols-2 p-2">
    <router-link :to="{ name: 'index' }">
      <button>Back</button>
    </router-link>
    <div class="grid grid-row sm:grid-cols-2">
      /
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPage',
};
</script>

<style scoped></style>
