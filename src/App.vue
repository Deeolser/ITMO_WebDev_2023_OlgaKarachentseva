<script>
export default {
  data() {
    return {
      couples: [
        { id: 1, phrase: 'Have a cow', translate: 'Очень рассердиться' },
        { id: 2, phrase: 'As sick as a dog', translate: 'Очень больной' },
        { id: 3, phrase: 'Rain on my parade', translate: 'Ломать мои планы' },
      ],
      phrase: '',
      translate: '',
    };
  },
  methods: {
    addTranslate() {
      console.log();
      const newCouple = {
        id: Date.now(),
        phrase: this.phrase,
        translate: this.translate,
      };
      this.couples.push(newCouple)
      this.phrase = '';
      this.translate ='';
    },
  },
};
</script>

<template>
  <h1 class='text-2xl font-bold'>Добавление перевода</h1>
  <form @submit.prevent
    class='flex flex-row justify-start content-normal mt-2 gap-4 py-4'>
    <input v-bind:value="phrase"
           @input='phrase = $event.target.value'
           type='text'
           placeholder='Введите фразу'
           class='w-2/5 border-2 rounded-md'>
    <input v-bind:value='translate'
           @input='translate  = $event.target.value'
           type='text'
           placeholder='Введите перевод'
           class='w-2/5 border-2 rounded-md'>
    <button @click='addTranslate'
            class='w-1/5 rounded-md'>Добавить
    </button>
  </form>
  <div v-for='couple in couples'
       :key='couple.id'
       class='flex flex-col justify-start border-2  border-gray-100 content-normal mt-2'>
    <div> {{ couple.phrase }} - {{ couple.translate }}</div>
  </div>
</template>

<style scoped>

</style>
