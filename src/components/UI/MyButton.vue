<template>
  <button class="rounded-md px-2 py-1 bg-green-300 max-w-fit hover:shadow-md bg-green-400">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MyButton'
};
</script>

<style scoped>

</style>