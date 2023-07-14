<template>
  <AppHeader
    :qty-all="qtyAll"
    :total="total"
  />
  <RouterView />
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: { AppHeader },
  data() {
    return {
      total: 0,
      qtyAll: 0,
    };
  },
};
</script>