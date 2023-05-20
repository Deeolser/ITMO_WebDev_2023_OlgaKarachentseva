<script setup>
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {useTodosStore} from '../store/todosStore.js';

const todoStore = useTodosStore();

const router = useRouter();
const route = useRoute();

const status = ref(route.query.status);

const todoIndex = parseInt((route.params.id) - 1);
const todo = ref(todoStore.getTodoByIndex(todoIndex));

const onSelectChange = ({target}) => {
  console.log('> TodoEditPage -> onSelectChange: ', target.value);
  status.value = target.value;
  router.replace({...route, query: {status: status.value}});
};

const onEditConfirm = () => {
  console.log('> TodoEditPage -> onEditConfirm: ', todo.value);
  todoStore.editTodoTextByIndex(todoIndex, todo.value);
};

onMounted(() => {
  console.log('> TodoEditPage -> onMounted: route.params.id -> ', route.params.id);
  console.log('> TodoEditPage -> onMounted: todo -> ', todo);
});
</script>
<template>
  <div>
    <div>
      Todo Edit Page: {{ route.params.id }})
    </div>
    <div>
      <label for="inpTodoEdit">Todo text</label>
      <input
        id="inpTodoEdit"
        v-model="todo"
      >
      <button @click="onEditConfirm">
        Confirm
      </button>
    </div>
    <select
      name="status"
      @change="onSelectChange"
    >
      <option
        v-if="!status"
        selected
        value="unselected"
      >
        Unselected
      </option>
      <option
        v-for="item in ['Ready', 'Start', 'Stop']"
        :key="item"
        :selected="item === status"
        :value="item"
      >
        {{ item }}
      </option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'TodoEditPage',
};
</script>