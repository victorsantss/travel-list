import { createApp } from "vue";

import ApolloClient from "apollo-boost";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import "./styles/global.css";
import store from "./store/store";

const apolloClient = new ApolloClient({
  uri: `https://countries.trevorblades.com/`,
});

const app = createApp(App)
  .provide(DefaultApolloClient, apolloClient)
  .use(store);

app.mount("#app");
