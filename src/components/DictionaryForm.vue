<template>
  <div>
    <h1 class="text-2xl font-bold">
      Добавление перевода
    </h1>
    <form
      class="flex flex-row justify-start content-normal mt-2 gap-4 py-4"
      @submit.prevent
    >
      <my-input
        v-model="couple.title"
        class="w-2/5"
        placeholder="Введите фразу"
        type="text"
      />
      <my-input
        v-model="couple.body"
        class="w-2/5"
        placeholder="Введите перевод"
        type="text"
      />
      <MyButton
        class="w-1/5"
        @click="addTranslate"
      >
        Добавить
      </MyButton>
    </form>
  </div>
</template>

<script>


import MyInput from './UI/MyInput.vue';

export default {
  name: 'DictionaryForm',
  components: {MyInput},
  data() {
    return {
      couple: {
        title: '',
        body: '',
      }
    };
  },
  // watch: {
  //   couple: {
  //     handler(newValue) {
  //       console.log(newValue);
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    addTranslate() {
      this.couple.id = String(Date.now());
      this.$emit('add', this.couple);
      this.couple = {
        id: '',
        title: '',
        body: '',
      };
    }
  }
};
</script>

<style scoped>

</style>