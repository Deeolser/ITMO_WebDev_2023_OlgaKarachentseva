<template>
  <div class="m-4 flex flex-col">
    <h1 class="text-2xl font-bold">
      Словарь выражений
    </h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="flex flex-row justify-between">
      <my-button
        class="mt-4"
        @click="showDialog"
      >
        Добавить выражение
      </my-button>
      <MySelect
        v-model="selectedSort"
        :options="sortOptions"
      />
    </div>

    <MyDialog v-model:show="dialogVisible">
      <DictionaryForm @add="addTranslate" />
    </MyDialog>
    <DictionaryList
      v-if="!isCouplesLoading"
      :couples="sortedAndSearchedCouples"
      @remove="removeTranslate"
    />
    <div v-else>
      Загружаю....
    </div>
    <my-button
      v-if="page < totalPages"
      class="flex flex-row place-self-center"
      @click="loadMoreCouples"
    >
      Еще...
    </my-button>
    <!--    <div class="flex flex-row mt-[15px]">-->
    <!--      <div-->
    <!--          v-for="pageNum in totalPages"-->
    <!--          :key="pageNum"-->
    <!--          :class="{-->
    <!--            'border-green-300 bg-green-300': page === pageNum-->
    <!--          }"-->
    <!--          class="border border-solid border-green-300 p-2.5"-->
    <!--          @click="changePage(pageNum)"-->
    <!--      >-->
    <!--        {{ pageNum }}-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
import DictionaryForm from '../components/DictionaryForm.vue';
import DictionaryList from '../components/DictionaryList.vue';

export default {
  components: {
    DictionaryList,
    DictionaryForm,
  },
  data() {
    return {
      couples: [],
      dialogVisible: false,
      isCouplesLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      url: 'http://localhost:8081/v1/phrases',
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  computed: {
    sortedCouples() {
      return [...this.couples].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort]),
      );
    },
    sortedAndSearchedCouples() {
      return this.sortedCouples.filter((couple) =>
        couple.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  watch: {
    // Сортировка
    // selectedSort(newValue) {
    //   this.couples.sort((a, b) => {
    //     return a[newValue]?.localeCompare(b[newValue]);
    //   });
    // },
    // Пагинация
    // page() {
    //   this.fetchCouples()
    // }
  },
  mounted() {
    this.fetchCouples();

    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting) {
    //     this.loadMoreCouples()
    //   }
    // };
    // const observer = new (callback, options);
    // observer.observe(this.$refs.observer);
  },
  methods: {
    addTranslate(couple) {
      this.couples.push(couple);
      this.dialogVisible = false;
    },
    removeTranslate(couple) {
      this.couples = this.couples.filter((c) => c.id !== couple.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchCouples() {
      try {
        this.isCouplesLoading = true;
        const query = this.url + '?_limit=' + this.limit + '&_page=' + this.page;
        const data = await fetch(query).then((data) => data.json());
        this.couples = data;
        const response = await fetch(query);
        this.totalPages = Math.ceil(response.headers.get('X-Total-Count') / this.limit);
      } catch (e) {
        alert('Error');
      } finally {
        this.isCouplesLoading = false;
      }
    },
    async loadMoreCouples() {
      try {
        this.page += 1;
        const query = 'http://127.0.0.1:8081/v1/phrases';
        const data = await fetch(query).then((data) => data.json());
        this.couples = [...this.couples, ...data];
        const response = await fetch(query);
        this.totalPages = Math.ceil(response.headers.get('X-Total-Count') / this.limit);
      } catch (e) {
        alert('Error');
      }
    },
    // changePage(pageNum) {
    //   this.page = pageNum;
    // },
  },
};
</script>

<style scoped></style>