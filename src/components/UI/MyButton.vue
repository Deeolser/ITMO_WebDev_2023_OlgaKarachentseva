<template>
  <button class="max-w-fit rounded-md bg-green-300 px-2 py-1 hover:bg-green-400 hover:shadow-md">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'MyButton',
};
</script>

<style scoped></style>