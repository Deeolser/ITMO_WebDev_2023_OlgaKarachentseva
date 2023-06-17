import {defineStore} from 'pinia';
import {IUser} from '@/interface';


interface IUserState{
  user?: IUser
}
export const useUserStore = defineStore('user', {
  state: (): IUserState => ({}),
  getters: {
    hasUser: (state):boolean => !!state.user?.name,
    // getTodosCount: (state) => state.todos.length,
  }, 
  actions: {
    // createTodo(todoText) {
    //     console.log('> useTodosStore -> createTodo: ', { todoText });
    //     this.todos.push(todoText);
    // },
    setupUser(user:Iser) {
      console.log('> useTodosStore -> createTodo: ', { todoText });
      this.todos.push(todoText);
    },
  },
  persist: true
});
