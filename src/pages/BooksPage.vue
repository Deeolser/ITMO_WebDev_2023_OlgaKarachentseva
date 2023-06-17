<script setup lang='ts'>
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import PROVIDE from '@/constants/provides.js';


const router = useRouter();
const domInputFile = ref(null);
const domBtnUpload = ref(null);
const isUploading = ref(false);
const isReady = ref(false);

const isBooksLoading = ref(true);
const BOOKS_ITEMS_PER_PAGE = 10;
const books = ref([]);

const pageIndex = ref(parseInt(router.currentRoute.value.query.page || 1));
const pagesMax = ref(0);

const pb = inject(PROVIDE.PB);
const db = inject(PROVIDE.DB);
const booksCollection = pb.collection('books');

const loadBooks = async () => {
  isBooksLoading.value = true;
  return db.allDocs({
    include_docs: true,
    limit: BOOKS_ITEMS_PER_PAGE,
    skip: (pageIndex.value - 1) * BOOKS_ITEMS_PER_PAGE,
  }).then((result) => {
    console.log('> BooksPage -> loadBooks: result =', result);
    pagesMax.value = Math.ceil(result.total_rows / BOOKS_ITEMS_PER_PAGE);
    books.value = result.rows.map(item => item.doc);
    isBooksLoading.value = false;
  }).catch((e) => {
    console.log('> BooksPage -> loadBooks: error =', e);
  });
};

const insertBooks = async (booksList) => {
  return db.bulkDocs(booksList, { include_docs: true }).then((results) => {
    console.log('insertBooks -> results:', results);
  }).catch(e => {
    console.log('insertBooks -> e:', e);
  });
};

const onUploadClick = () => {
  console.log('> BooksPage - > onUploadClick', domInputFile.value);
  domInputFile.value.oninput = () => {
    console.log('> files - > onUploadClick', domInputFile.value.files);
    const setActiveUploadUI = (value) => {
      domInputFile.value.disabled = !value;
      domBtnUpload.value.disabled = !value;
      isUploading.value = !value;
    };

    const input = domInputFile.value;
    const fileList = input.files;
    const selectedFile = fileList[0];
    const reader = new FileReader();

    setActiveUploadUI(false);


    reader.onload = async () => {
      const booksRaw = JSON.parse(reader.result.toString());
      console.log('selectedFile:', booksRaw);
      try {
        await insertBooks(booksRaw);
      } catch (e) {
        console.log(e);
      }
      setActiveUploadUI(true);
      reader.onload = null;
      domInputFile.value.oninput = null;
      await loadBooks();
    };
    reader.readAsText(selectedFile);
  };
  domInputFile.value.click();
};

const onChangePage = (delta) => {
  console.log('> BooksPage -> onChangePage ', { delta });
  pageIndex.value += delta;
  loadBooks().then(() => {
    router.replace({
      query: { page: pageIndex.value },
    });
  });
};

onMounted(() => {
  Promise.all([
    loadBooks(),
  ]).then(() => {
    isReady.value = true;
  });
});

</script>
<template>
  <div v-if="!isReady">
    Page Loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      <div>
        <button
          :disabled="pageIndex === 1"
          @click="onChangePage(-1)"
        >
          <b>
            Prev</b>
        </button>
        <button
          :disabled="pageIndex === pagesMax "
          @click="onChangePage(1)"
        >
          <b>Next</b>
        </button>
      </div>
      <b>Books ({{ pageIndex }}/{{ pagesMax }}):</b>
      <div
        v-for="book in books"
        :key="book.id"
      >
        {{ book.title }}
      </div>
    </div>
    <div v-else>
      <input
        ref="domInputFile"
        accept=".json"
        hidden
        type="file"
      >
      <button
        ref="domBtnUpload"
        @click="onUploadClick"
      >
        Upload
      </button>
      <div v-if="isUploading">
        In progress, wait please ...
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BooksPage',
};
</script>

<style scoped>
</style>
