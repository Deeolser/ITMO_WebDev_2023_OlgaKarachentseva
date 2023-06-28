<template>
  <input
    :value="modelValue"
    class="border-2 rounded-md placeholder:p-1"
    type="text"
    @input="updateInput"
  >
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>

<style scoped>

</style>