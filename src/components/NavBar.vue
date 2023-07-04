<template>
  <div class="flex h-[50px] flex-row items-center justify-between gap-2 bg-green-300 shadow-xl">
    <div @click="$router.push('/')">
      Vue 3
    </div>
    <div class="mr-3 flex flex-row items-center justify-start gap-2">
      <my-button @click="$router.push('/couples')">
        Словарь
      </my-button>
      <my-button @click="$router.push('/about')">
        О сайте
      </my-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style scoped></style>
