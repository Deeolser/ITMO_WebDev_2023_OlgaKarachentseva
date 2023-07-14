<template>
  <div
    class="grid sm:grid-cols-2 items-center gap-3 mb-2 bg-gray-50 p-2 border-1 border-gray-100 rounded-b-xl"
  >
    <div
      class="grid grid-col grid-cols-1 content-between bg-gray-100 border-1 border-gray-200 rounded-xl overflow-hidden"
    >
      <router-link
        :to="{ name: 'product', params: { id: id } }"
        class="grid-row grid-gap-3 p-1"
      >
        <div class="w-full h-48 max-h-48 bg-white p-8 rounded-md">
          <img
            :src="image"
            class="w-full h-full object-contain"
          >
        </div>
        <div class="px-3">
          <div class="font-bold">
            {{ title }}
          </div>
          <div class="text-md text-black">
            {{ price }}
          </div>
          <p class="text-sm my-2">
            {{ description }}
          </p>
        </div>
      </router-link>
      <div class="grid-row w-full px-3 pb-3">
        <div class="grid grid-col grid-gap-2 w-full" />
      </div>
    </div>
    <div class="w-full grid-col grid-gap-3">
      <div class="flex flex-row justify-between m-5">
        <div class="text-lg justify-self-end">
          Qty: {{ qty }}
        </div>
        <div class="text-lg justify-self-center">
          Result: ${{ qty * price }}
        </div>
        <button @click="addItem">
          Add<span>({{ qty }})</span>
        </button>
        <button
          v-if="qty > 0"
          @click="deleteItem"
        >
          ---
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { useProductStore } from '../store/productStore.js';

export default {
  name: 'CardItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
    qty: {
      type: Number,
      required: false,
    },
  },
  emits: ['update-card'],
  methods: {
    deleteItem() {
      useProductStore().deleteFromCard(this.id);
      useProductStore().sumTotal();
      this.$emit('update-card');
      this.qtyItem = this.qtyItem - 1;
    },
    addItem() {
      useProductStore().addToCard(this.id);
      useProductStore().sumTotal();
      this.$emit('update-card');
      this.qtyItem = this.qtyItem + 1;
    },
  },
};
</script>

<style scoped></style>