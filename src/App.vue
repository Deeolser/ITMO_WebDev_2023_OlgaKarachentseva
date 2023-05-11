<script setup>
import MyName from './components/MyName.vue';
</script>

<template>
  <h3>Todo List</h3>
  <input
    v-model="inputText"
    @keyup.enter="canAddItemToTheList && onInputEnterKeyUp()"
  >
  <div>
    List:
    <div
      v-for="(item, index) in todos"
      :key="item"
    >
      {{ index + 1 }}) {{ item }}
      <button>X</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    inputText: null,
    todos: []
  }),
  computed: {
    canAddItemToTheList() {
      return this.todoText?.length > 0;
    },
    todoText() {
      return this.inputText?.trim();
    },
  },
  methods: {
    onInputEnterKeyUp(e) {
      console.log('> App -> onInputEnterKeyUp', this.todoText);
      this.todos.push(this.todoText.trim());
      this.inputText = '';
    },
  }
};
</script>

<style scoped>

</style>
