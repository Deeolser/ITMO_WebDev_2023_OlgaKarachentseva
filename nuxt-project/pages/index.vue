<template>
  <div>
    Application Index Page: {{ $route.path }} isDataLoading: {{ isDataLoading }}
    {{ isDataLoading ? "" : books }}
  </div>
</template>
<script setup>
const { data: books, pending: isDataLoading } = await useFetch("/api/books", {
  server: false,
});
</script>

<style scoped></style>
