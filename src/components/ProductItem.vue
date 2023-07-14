<template>
  <div
    class="grid grid-col grid-cols-1 content-between bg-gray-100 border-1 border-gray-200 rounded-xl overflow-hidden"
  >
    <router-link :to="{ name: 'product', params: { id: id } }">
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
      <div class="grid grid-col grid-gap-2 w-ful">
        <div class="flex flex-row">
          <button
            v-if="qtyItem > 0"
            @click="deleteItem"
          >
            ---
          </button>
          <button @click="addItem">
            Add <span v-if="qtyItem > 0"> ({{ qtyItem }}) </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store/productStore.js';

export default {
  name: 'ProductItem',
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
  },
  emits: ['update-card'],
  data() {
    return {
      qtyItem: 0,
    };
  },
  mounted() {
    let productData = useProductStore().IN_CARD.find((it) => it.id === this.id);
    if (productData) {
      this.qtyItem = productData.qty;
    }
  },
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