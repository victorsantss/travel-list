import { createStore } from "vuex";
// Create a new store instance.
export default createStore({
  state: {
    myList: [],
    count: 0
  },
  //exemploe scrimba lesson getters
  //getters são funções que computam o estado da store, como uma computed property do vue
  // getters: {
  //   doneTodos: state => {
  //     return state.todos.filter(todo => todo.done);
  //   },
  //   doneTodosCount: (state, getters) => {
  //     return getters.doneTodos.length
  //   }
  // },
  //mutations são funções que alteram o estado da store
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
