<script>
import DictionaryForm from './components/DictionaryForm.vue';
import DictionaryList from './components/DictionaryList.vue';
import MyDialog from './components/UI/MyDialog.vue';
import MyButton from './components/UI/MyButton.vue';

export default {
  components: {
    MyButton,
    MyDialog,
    DictionaryList, DictionaryForm
  },
  data() {
    return {
      couples: [],
      dialogVisible: false,
      isCouplesLoading: false,
    };
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
        this.isCouplesLoading = false;
      } catch (e) {
        alert('Error');
      } finally {

      }
    }
  }
};
</script>
<template>
  <div class="flex flex-col m-4">
    <h1 class="text-2xl font-bold">
      Словарь выражений
    </h1>
    <my-button
      class="mt-4"
      @click="showDialog"
    >
      Добавить выражение
    </my-button>

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


<style scoped>

</style>
