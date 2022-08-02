import { createApp } from "vue";

import ApolloClient from "apollo-boost";
import { DefaultApolloClient } from "@vue/apollo-composable";
import App from "./App.vue";
import "./styles/global.css";

const apolloClient = new ApolloClient({
  uri: `https://countries.trevorblades.com/`,
});

createApp(App).provide(DefaultApolloClient, apolloClient).mount("#app");

// app.use(store);
