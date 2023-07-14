<template>
  <main
    class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-gap-3 pt-4 mb-12"
  >
    <product-item
      v-for="item in products"
      :id="item.id"
      :key="item.id"
      :description="item.description"
      :image="item.image"
      :price="item.price"
      :title="item.title"
    />
  </main>
</template>

<script>
import ProductItem from '../components/ProductItem.vue';
import { useProductStore } from '../store/productStore.js';

export default {
  name: 'IndexPage',
  components: { ProductItem },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchingProducts();
  },
  methods: {
    async fetchingProducts() {
      const response = await fetch('https://fakestoreapi.com/products');
      useProductStore().PRODUCT_DATA = await response.json();
      this.products = useProductStore().PRODUCT_DATA;
    },
  },
};
</script>