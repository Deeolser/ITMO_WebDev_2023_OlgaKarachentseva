<template>
  <div v-if="couples.length > 0">
    <h1
        class="mt-4"
    >
      <strong>Недавно добавлены</strong>
    </h1>
    <transition-group name="couple-list">
      <DictionaryItem
          v-for="couple in couples"
          :key="couple.id"
          :couple="couple"
          @remove="$emit('remove', couple)"
      />
    </transition-group>

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
.couple-list-item {
  display: inline-block;
  margin-right: 10px;
}

.couple-list-enter-active,
.couple-list-leave-active {
  transition: all 0.4s ease;
}

.couple-list-enter-from,
.couple-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.couple-list-move {
  transition: transform 0.4s ease;
}
</style>