import { createStore } from "vuex";
// Create a new store instance.
export default createStore({
  // Define the state of the store.
  state: {
    myList: [],
    listCount: 0,
  },
  //mutations are used to update the state of the store, with syncronous code.
  mutations: {
    addCountryToList(state, payload) {
      if (!state.myList.includes(payload)) {
        state.listCount++;
        state.myList = [...state.myList, payload];
      }
    },
  },
  //actions are used to call mutations with asyncronous code.
  actions: {
    actionAddCountryToList(context, payload) {
      context.commit("addCountryToList", payload);
    },
  },
});
