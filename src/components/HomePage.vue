<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import gql from "graphql-tag";
export default {
  setup() {
    const { result } = useQuery(gql`
      query {
        countries {
          code
          name
        }
      }
    `);

    // takes the result of the query and puts it into a ref
    const countries = computed(() => result.value?.countries ?? []);
    // ref to search countries
    let search = ref("");

    // filter countries based on search
    let filteredCountries = computed(() => {
      if (search.value) {
        return countries.value.filter((country) =>
          country.name.toLowerCase().includes(search.value.toLowerCase())
        );
      } else {
        return countries.value;
      }
    });

    // get the store
    const store = useStore();
    // add country to the store
    function addCountryToList(payload) {
      store.dispatch("actionAddCountryToList", payload);
    }

    return {
      search,
      filteredCountries,
      addCountryToList,
      store,
    };
  },
};
</script>

<template>
  <header class="sm:container mx-auto flex justify-between m-12">
    <h1>Travel List</h1>
    <input
      class="text-black w-1/4"
      type="text"
      v-model="search"
      placeholder="Search"
    />
    <h3>Result(s): {{ filteredCountries.length }}</h3>
    <a class="hover:text-amber-400" href="#"
      >My List({{ store.state.listCount }})</a
    >
  </header>
  <aside>
    <h1>teste</h1>
  </aside>

  <main class="flex justify-center flex-wrap gap-10 mt-2">
    <div
      class="border-collapse rounded-full group relative"
      v-for="country in filteredCountries"
      :key="country.code"
    >
      <img
        class="h-64 w-auto"
        v-bind:src="`https://source.unsplash.com/1600x900/?${country.name}-nature`"
      />
      <div
        class="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-gray-700 opacity-0 group-hover:h-full group-hover:opacity-90 duration-500"
      >
        <h1 class="text-2xl text-white">
          {{ country.name }}
        </h1>
        <button
          class="mt-5 px-8 py-3 rounded-full bg-amber-400 hover:bg-amber-600 duration-300"
          href="#"
          v-on:click="addCountryToList(country)"
        >
          Add to List
        </button>
      </div>
    </div>
  </main>
</template>
