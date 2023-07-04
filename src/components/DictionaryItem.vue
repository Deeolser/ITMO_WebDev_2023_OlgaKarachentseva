<template>
  <div class="my-4 flex flex-row justify-between rounded-md bg-gray-100">
    <div class="p-1 pl-2 align-middle">
      {{ couple.title }} - {{ couple.body }}
    </div>
    <div>
      <MyButton @click="$emit('remove', couple)">
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
    },
  },
};
</script>

<style scoped></style>