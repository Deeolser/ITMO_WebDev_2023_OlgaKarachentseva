<template>
  <div>
    {{ index }}) {{ text }}
    <button @click="$emit('delete')">
      x
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: '-'
    }
  },
  emits: ['delete'],
  unmounted() {
    console.log('> TodoItem -> unmounted');
  },

};
</script>

<style scoped>

</style>