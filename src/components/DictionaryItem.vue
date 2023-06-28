<template>
  <div class="flex flex-row justify-between bg-gray-100 my-4 rounded-md ">
    <div class="align-middle pl-2 p-1">
      {{ couple.title }} - {{ couple.body }}
    </div>
    <div>
      <MyButton
        @click="$emit('remove', couple)"
      >
        Удалить
      </MyButton>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DictionaryItem',
  props: {
    couple: {
      type: Object,
      required: true,
    }
  }
};
</script>

<style scoped>

</style>