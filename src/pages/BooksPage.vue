<script lang="ts" setup>
import {inject, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import {DefaultApolloClient, useLazyQuery} from '@vue/apollo-composable';
import gql from 'graphql-tag';

const router = useRouter();

const isReady = ref(false);

const BOOKS_ITEMS_PER_PAGE = 10;

const apollo = inject(DefaultApolloClient);
console.log((apollo as any).link);

const books = ref([]);
const routerQueryPage: string =
    router.currentRoute.value.query.page?.toString() || '';
const pageIndex = ref(parseInt(routerQueryPage) || 1);
const pagesMax = ref(0);

const {
  load,
  onResult,
  loading: isBooksLoading,
} = useLazyQuery(gql`
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
`);

onResult((result) => {
  console.log(result);
  if (!result.loading) {
    const {data} = result;
    books.value = data.books.map((i: any) => i);
    pagesMax.value = data.books_aggregate.aggregate.count;
  }
});

const loadBooks = async () => {
  load(
    null,
    {
      limit: BOOKS_ITEMS_PER_PAGE,
      offset: (pageIndex.value - 1) * BOOKS_ITEMS_PER_PAGE,
    },
    {
      context: {
        headers: {
          'X-Hasura-Role': 'user',
        },
      },
    }
  );
};

const onChangePage = (delta: number) => {
  console.log('> BooksPage -> onChangePage', {delta});
  pageIndex.value += delta;
  loadBooks().then(() => {
    router.replace({
      query: {page: pageIndex.value},
    });
  });
};

onMounted(() => {
  Promise.all([loadBooks()]).then(() => {
    isReady.value = true;
  });
});
</script>
<template>
  <div v-if="!isReady">
    Books page Loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <v-btn-group
        block
        color="#7986CB"
        density="compact"
        elevation="8"
        rounded="lg"
      >
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
        <b>Books ( {{ pageIndex }} / {{ pagesMax }} ):</b>
        <div v-if="isBooksLoading">
          Books loading
        </div>
        <v-list
          v-else
        >
          <v-list-item
            v-for="book in books"
            :key="book.id"
            :to="`/books/${book.id}`"
            active-color="#303F9F"
            base-color="#9FA8DA"
            class="text-left"
            rounded="lg"
          >
            {{ book.title }}
          </v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<style scoped></style>