<template>
  <h1>Enter your name</h1>
  <div>
    {{ firstName }}
    <span style="color:red">
      {{ lastname }}</span>
  </div>
  <small>
    <span
      :class="{
        'selected': !!status,
        'unselected': !status
      }"
      style="display: inline-block;"
    >
      Status:
    </span>
    <span>{{ status }}</span>
    <div>
      <button
        :disabled="!status"
        :style="{
          visibility: status ? 'visible' : 'hidden'
        }"
        @click="onResetClick"
      >Reset
      </button>
    </div>
  </small>
</template>

<script>
export default {
  name: 'MyName',
  props: {
    status: {
      type: String,
      default: 'empty',
    },
  },
  emits: ['reset'],
  data: () => ({
    firstName: 'Olga',
    lastname: 'Karachentseva',
  }),
  methods: {
    onResetClick() {
      console.log('> MyName -> onResetClick');
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>
.selected {
  color: green;
}

.unselected {
  color: red;
}
</style>