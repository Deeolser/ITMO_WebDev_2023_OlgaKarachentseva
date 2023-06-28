<template>
  <div
    v-if="show"
    class="flex flex-row w-screen h-screen bg-black/50 fixed"
    @click.stop="hideDialog"
  >
    <div
      class="m-auto bg-white rounded-xl p-5"
      @click.stop
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'MyDialog',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style scoped>

</style>