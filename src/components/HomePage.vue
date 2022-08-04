<script>
import { useQuery } from "@vue/apollo-composable";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import gql from "graphql-tag";
import ListStatusIcon from "vue-material-design-icons/ListStatus.vue";
import EarthIcon from "vue-material-design-icons/Earth.vue";
import PlusCircleIcon from "vue-material-design-icons/PlusCircle.vue";
import CloseThickIcon from "vue-material-design-icons/CloseThick.vue";

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

    function removeCountryFromList(payload) {
      store.dispatch("actionRemoveCountryFromList", payload);
    }

    return {
      search,
      filteredCountries,
      addCountryToList,
      removeCountryFromList,
      store,
    };
  },
  // icons components
  components: {
    ListStatusIcon,
    EarthIcon,
    PlusCircleIcon,
    CloseThickIcon,
  },
};
</script>

<template>
  <div class="flex">
    <div class="flex-1 ml-5">
      <header
        class="font-bold sm:container mx-auto flex items-center justify-between my-12"
      >
        <div class="flex gap-2">
          <EarthIcon />
          <h1>Travel List</h1>
        </div>
        <input
          class="text-black w-1/4 rounded-md border border-gray-300 px-4 py-1"
          type="text"
          v-model="search"
          placeholder="Search Country..."
        />
        <h3>Country Result(s): {{ filteredCountries.length }}</h3>
      </header>
      <main class="flex justify-center flex-wrap gap-10 mt-2">
        <div
          class="group relative"
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
              <div class="flex gap-2">
                <PlusCircleIcon />
                Add country to My List
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
    <div
      class="flex min-h-screen ml-5 pl-10 w-[400px] bg-gray-800 border-l-4 border-gray-400"
    >
      <div class="font-bold py-14 px-6">
        <div class="flex gap-4">
          <ListStatusIcon />
          My List ( {{ store.getters.listCount }} )
        </div>

        <ul
          v-for="item in store.state.myList"
          v-bind:key="item.code"
          class="mt-10"
        >
          <li class="flex gap-1 items-center">
            {{ item.name }}
            <button v-on:click="removeCountryFromList(item)">
              <CloseThickIcon />
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
