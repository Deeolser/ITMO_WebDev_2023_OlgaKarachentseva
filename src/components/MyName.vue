<template>
  <h1>Enter your name</h1>
  <div>
    {{ firstName }}
    <span style="color:red">
      {{ lastname }}</span>
  </div>
</template>

<script>
export default {
  name: 'MyName',
  data: () => ({
    firstName: 'Olga',
    lastname: 'Karachentseva',
  }),

};
</script>

<style scoped>

</style>