<script lang="ts" setup>
import {storeToRefs} from 'pinia';
import {useBooksStore} from '@/store/booksStore';

const {selectedBook} = storeToRefs(useBooksStore());
</script>

<template>
  <h3>
    <slot>Header</slot>
  </h3>
  <div v-if="selectedBook">
    {{ selectedBook.title }}
  </div>
  <div>
    <small>
      <slot name="sub-header" />
    </small>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AppHeader',
});
</script>