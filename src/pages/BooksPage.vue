<script setup>
import { inject, ref } from 'vue';
import PROVIDE from '@/constants/provides.js';

const domInputFile = ref(null);
const domBtnUpload = ref(null);
const isUploading = ref(false);
const isPreparing = ref(true);
const books = ref([]);

const pb = inject(PROVIDE.PB);
const booksCollection = pb.collection('books');

booksCollection.getList(1, 50).then((result) => {
  console.log('result = ', result);
  books.value = result.items;
  isPreparing.value = false;
});

const insertBooks = async (booksList) => {
  const result = [];
  for await (const booksListElement of booksList) {
    await booksCollection.create(booksListElement).then((record) => {
      console.log('> \t record created:', record);
      result.push(record);
    }).catch((e) => console.log(e));
  }
  return result;
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
        const booksInserted = await insertBooks(booksRaw.slice(0, 2));
        console.log('booksInserted:', booksInserted);
        books.value = booksInserted;
      } catch (e) {
        console.log(e);
      }
      setActiveUploadUI(true);
      reader.onload = null;
      input.oninput = null;
    };
    reader.readAsText(selectedFile);

  };
  domInputFile.value.click();
};

</script>
<template>
  <div v-if="isPreparing">
    Page Loading
  </div>
  <div v-else>
    <div v-if="books.length > 0">
      BOOKS
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
