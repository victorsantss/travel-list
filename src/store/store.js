import { createStore } from "vuex";
// Create a new store instance.
export default createStore({
  // Define the state of the store.
  state: {
    myList: [],
  },
  // getters are used to compute dereived state based on store state, like a computed property.
  getters: {
    listCount: (state) => state.myList.length,
  },
  //mutations are used to update the state of the store, with syncronous code.
  mutations: {
    addCountryToList(state, payload) {
      if (!state.myList.includes(payload)) {
        state.myList = [...state.myList, payload];
      }
    },
    removeCountryFromList(state, payload) {
      state.myList = state.myList.filter((country) => country !== payload);
    },
  },
  //actions are used to call mutations with asyncronous code.
  actions: {
    actionAddCountryToList(context, payload) {
      context.commit("addCountryToList", payload);
    },
    actionRemoveCountryFromList(context, payload) {
      context.commit("removeCountryFromList", payload);
    },
  },
});
