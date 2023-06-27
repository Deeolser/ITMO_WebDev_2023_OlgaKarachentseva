<script setup lang="ts">

import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import { storeToRefs } from 'pinia';
import { useBooksStore } from '@/store/booksStore';

const route = useRoute();
const userStore = useUserStore();
const booksStore = useBooksStore();
const { userId } = storeToRefs(userStore);

const domInputComment = ref<HTMLInputElement | null>(null);

// const { result, loading: isBookLoading } = useQuery(gql`
// query GetBooks($id: Int!) {
//   books_by_pk(id: $id) {
//     id
//     pages
//     year
//     author
//     country
//     imageLink
//     language
//     link
//     title
//     created_at
//     updated_at
//     comments {
//       comment
//       id
//       user {
//         name
//       }
//     }
//   }
// }
// `, { id: route.params.id });
// const book = computed(() => result.value.books_by_pk);

const { selectedBook, isSelectedBookLoading } = storeToRefs(booksStore);
const bookTitle = computed(() => selectedBook.value.title);
const bookYear = computed(() => selectedBook.value.year);
const bookComments = computed(() => selectedBook.value.comments);
const onButtonAddCommentClick = () => {
  const domInputCommentText: string = domInputComment.value!.value;
  console.log('> onButtonAddCommentClick:', domInputCommentText);
  if (domInputCommentText!.length > 0) {
    booksStore.insertCommentToBookFromUser(
      selectedBook.value!.id,
      userId.value,
      domInputCommentText
    );
  }
};
onMounted(() => {
  booksStore.loadBookDetailsWithCommentsById(route.params.id as string);
});
</script>

<template>
  <div>
    <small>
      Selected Book page: id = {{ $route.params.id }} | {{ userId }}
    </small>
    <div v-if="isSelectedBookLoading">
      Loading
    </div>
    <div v-else>
      <h3>Title: {{ bookTitle }}</h3>
      <div>Year: {{ bookYear }}</div>
      <div>
        Comments:
        <div
          v-for="item in bookComments"
          :key="item.id"
        >
          {{ item.user.name }}: {{ item.comment }}
        </div>
      </div>
      <div>
        <input ref="domInputComment">
        <button @click="onButtonAddCommentClick">
          Add Comment
        </button>
      </div>
    </div>
  </div>
</template>
