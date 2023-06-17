<script setup lang='ts'>
import {computed, onMounted} from 'vue';

const props = defineProps({
  index: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: '-'
  }
});
defineEmits(['delete']);
const pathToEdit = computed(() => `/todos/${props.index}`);
onMounted(() => {
  console.log('>TodoItem -> props.text =', props.text);
});
</script>
<template>
  <div>
    {{ index }})
    <router-link :to="pathToEdit">
      {{ text }}
    </router-link>
    <button @click="$emit('delete')">
      x
    </button>
  </div>
</template>
