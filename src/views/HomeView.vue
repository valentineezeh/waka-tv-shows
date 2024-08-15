<script setup>
import SearchBar from "@/components/SearchBar.vue";
import ShowList from "@/components/ShowList.vue";
import { useShowStore } from "@/stores/showStore";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const useStore = useShowStore();
</script>

<template>
  <div class="container">
    <div class="hero">
      <h3>Popular Shows</h3>
      <SearchBar v-model="useStore.searchQuery" />
    </div>
    <Loader v-if="useStore.isLoading" />
    <Error v-else-if="useStore.error" :message="useStore.error" />
    <ShowList
      v-else
      :filteredAndGroupedShows="useStore.filteredAndGroupedShows"
      :hasResults="useStore.hasResults"
    />
  </div>
</template>
