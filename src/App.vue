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
      couples: [
        {id: 1, title: 'Have a cow', body: 'Очень рассердиться'},
        {id: 2, title: 'As sick as a dog', body: 'Очень больной'},
        {id: 3, title: 'Rain on my parade', body: 'Ломать мои планы'},
      ],
      dialogVisible: false,
      modificatorValue: '',
    };
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
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
          .then(response => response.json());
        console.log(response);
        this.couples = response;
        console.log(this.couples);
      } catch (e) {
        alert('Error');
      }
    }
  },
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
    <my-button @click="fetchCouples">
      Получить данные
    </my-button>
    <MyDialog v-model:show="dialogVisible">
      <DictionaryForm
        @add="addTranslate"
      />
    </MyDialog>
    <DictionaryList
      :couples="couples"
      @remove="removeTranslate"
    />
  </div>
</template>


<style scoped>

</style>
