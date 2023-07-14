<template>
  <main class="mb-12">
    <div class="grid-row grid-cols-2 p-2">
      <router-link :to="{ name: 'index' }">
        <button>Back</button>
      </router-link>
    </div>
    <div>
      <card-item
        v-for="item of useProductStore().IN_CARD"
        :id="item.id"
        :key="item.id"
        :description="item.description"
        :image="item.image"
        :price="item.price"
        :qty="item.qty"
        :title="item.title"
      />
    </div>
  </main>
</template>

<script>
import CardItem from '../components/CardItem.vue';
import { useProductStore } from '../store/productStore.js';

export default {
  name: 'CardPage',
  components: { CardItem },
  methods: { useProductStore },
};
</script>

<style scoped></style>