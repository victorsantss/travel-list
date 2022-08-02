<script setup>
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";

const { result } = useQuery(gql`
  query {
    countries {
      code
      name
    }
  }
`);
</script>

<template>
  <header class="sm:container mx-auto flex justify-between m-12">
    <h1>Travel List</h1>
    <a class="hover:text-amber-400" href="#">My List</a>
  </header>

  <main class="flex justify-center flex-wrap gap-10 mt-2">
    <div
      class="border-collapse rounded-full group relative"
      v-for="country in result?.countries"
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
        >
          Add to List
        </button>
      </div>
    </div>
  </main>
</template>
