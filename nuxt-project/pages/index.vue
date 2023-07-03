<template>
  <div>
    <ClientOnly> App Index Page: {{ $route.path }}
      isDataLoading: {{ isDataLoading }}
      {{ isDataLoading ? '' : books }}
    </ClientOnly>
  </div>
</template>

<script setup>
const {data: books, pending: isDataLoading} = await useFetch('/api/books');
</script>

<style scoped>

</style>