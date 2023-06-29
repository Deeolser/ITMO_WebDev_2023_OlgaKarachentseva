<template>
  <div class="flex flex-col m-4">
    <h1 class="text-2xl font-bold">
      Словарь выражений
    </h1>
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
      <DictionaryForm
        @add="addTranslate"
      />
    </MyDialog>
    <DictionaryList
      v-if="!isCouplesLoading"
      :couples="couples"
      @remove="removeTranslate"
    />
    <div v-else>
      Загружаю....
    </div>
  </div>
</template>
<script>
import DictionaryForm from './components/DictionaryForm.vue';
import DictionaryList from './components/DictionaryList.vue';


export default {
  components: {
    DictionaryList, DictionaryForm
  },
  data() {
    return {
      couples: [],
      dialogVisible: false,
      isCouplesLoading: false,
      selectedSort: '',
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'}
      ]
    };
  },
  watch: {
    selectedSort(newValue) {
      this.couples.sort((a, b) => {
        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
      });
    },
  },
  mounted() {
    this.fetchCouples();
  },
  methods: {
    addTranslate(couple) {
      this.couples.push(couple);
      this.dialogVisible = false;
    },
    removeTranslate(couple) {
      this.couples = this.couples.filter(c => c.id !== couple.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchCouples() {
      try {
        this.isCouplesLoading = true;
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
          .then(response => response.json());
        console.log(response);
        this.couples = response;

      } catch (e) {
        alert('Error');
      } finally {
        this.isCouplesLoading = false;
      }
    }
  }
};
</script>

<style scoped>

</style>
