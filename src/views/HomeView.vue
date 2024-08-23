<script setup>
import SearchBar from "@/components/SearchBar.vue";
import ShowList from "@/components/ShowList.vue";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";
import { useShowStoreReactive } from '@/stores/reactiveShowStore'

const useStore = useShowStoreReactive()
</script>

<template>
  <div class="container">
    <div class="hero">
      <h3>Popular Shows</h3>
      <SearchBar v-model="useStore.searchQuery" />
    </div>
    <Loader v-show="useStore.isLoading" />
    <ShowList
      v-if="useStore.sortedAndGroupedShows"
      :sortedAndGroupedShows="useStore.sortedAndGroupedShows"
      :hasResults="useStore.hasResults"
    />
    <Error v-show="useStore.error" :message="useStore.error" />
  </div>
</template>
