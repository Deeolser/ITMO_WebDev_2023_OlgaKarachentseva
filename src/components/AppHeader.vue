<template>
  <header
    class="grid grid-row grid-cols-2 sticky top-0 bg-gray-300/75 text-black-50 rounded-b-md px-4 py-3 z-100 items-center place-items-start mb-2"
  >
    <div class="text-xl text-[#382E2EAD]">
      <router-link :to="{ name: 'index' }">
        {{ header }}
      </router-link>
    </div>
    <nav class="justify-self-end w-full text-[#382E2EAD]">
      <div class="flex flex-row justify-between items-center">
        <div class="lg:text-xl font-bold">
          Total: ${{ useProductStore().total }}
        </div>
        <router-link :to="{ name: 'card' }">
          <button
            class="h-[30px] w-[5rem] items-center bg-green-500 text-white text-xs rounded-2xl"
          >
            Card ({{ useProductStore().qty }})
          </button>
        </router-link>
      </div>
    </nav>
  </header>
</template>
<script>
import { useProductStore } from '../store/productStore.js';

export default {
  name: 'AppHeader',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    qtyAll: {
      type: Number,
      default: 0,
    },
    header: {
      type: String,
      default: 'Product',
    },
  },
  methods: { useProductStore },
};
</script>