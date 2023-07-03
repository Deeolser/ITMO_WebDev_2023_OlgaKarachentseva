<template>
  <div>
    <div>
      Books Page: {{ $route.path }}
    </div>
    <img
        alt="Flower Image"
        src="/images/img.png"
        width="100"
    >
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
        <div v-if="isBooksLoading">
          Books loading
        </div>
        <div v-else>
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
import gql from 'graphql-tag';

const route = useRoute();
const isBooksLoading = ref(false);
const books = useState('books', () => []);
const routerQueryPage = route.query.page?.toString() || '';
const pageIndex = ref(parseInt(routerQueryPage) || 1);
const pagesMax = ref(0);

const query = gql`
query GetBooks($limit: Int!, $offset: Int!) {
  books(limit: $limit, offset: $offset) {
    id
    title
    imageLink
  }
  books_aggregate {
    aggregate {
      count
    }
  }
}
`;
if (books.value.length === 0) {
  isBooksLoading.value = true;
  const {data} = await useAsyncQuery(query, {limit: 10, offset: 0});
  if (data.value?.books) {
    // log response
    console.log(data.value?.books);
    books.value = data.value?.books;
    isBooksLoading.value = false;
  }
}
</script>