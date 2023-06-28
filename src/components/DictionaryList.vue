<template>
  <div v-if="couples.length > 0">
    <h1
      class="mt-4"
    >
      <strong>Недавно добавлены</strong>
    </h1>
    <DictionaryItem
      v-for="couple in couples"
      :key="couple.id"
      :couple="couple"
      @remove="$emit('remove', couple)"
    />
  </div>
  <h2
    v-else
    class="text-3xl"
  >
    Добавь значения в словарь
  </h2>
</template>

<script>
import DictionaryItem from './DictionaryItem.vue';

export default {
  name: 'DictionaryList',
  components: {DictionaryItem},
  props: {
    couples: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style scoped>
</style>