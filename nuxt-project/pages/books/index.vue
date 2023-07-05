<template>
  <div>
    <div>Books Page: {{ route.path }}</div>
    <img alt="Flower Image" src="/images/img.png" width="100" />
    <div v-if="books.length > 0">
      <v-btn-group color="primary">
        <v-btn
          :disabled="pageIndex === 1 || isBooksLoading"
          @click="onChangePage(-1)"
        >
          Prev
        </v-btn>
        <v-btn
          :disabled="pageIndex === pagesMax || isBooksLoading"
          @click="onChangePage(1)"
        >
          Next
        </v-btn>
      </v-btn-group>
      <div>
        <!--        <b>Books ( {{ pageIndex }} / {{ pagesMax }} ):</b>-->
        {{ isBooksLoading }}

        <div v-if="isBooksLoading">Books loading</div>
        <div v-else>
          {{ books }}
          <v-list class="pa-4">
            <v-list-item
              v-for="book in books"
              :key="book.id"
              :title="book.title"
              :to="`/books/${book.id}`"
              :value="book"
              class="text-left"
              rounded="xl"
            />
          </v-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const { books, isBooksLoading } = useBooks();
const routerQueryPage = route.query.page?.toString() || "";
const pageIndex = ref(parseInt(routerQueryPage) || 1);
const pagesMax = ref(0);
const onChangePage = (delta) => {
  console.log(delta);
};
</script>
