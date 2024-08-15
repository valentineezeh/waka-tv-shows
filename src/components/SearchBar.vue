<script setup>
import { onMounted, watch, computed } from "vue";
import { useShowStore } from "@/stores/showStore";
import SearchResultCard from "@/components/SearchResultCard.vue";

const useStore = useShowStore();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const updateValue = (value) => {
  useStore.setSearchQuery(value);
  useStore.debouncedFetchShows(value);
};
</script>

<template>
  <div class="search-input">
    <div class="input-container">
      <input
        type="text"
        placeholder="Search TV shows.."
        name="search"
        :value="modelValue"
        @input="updateValue($event.target.value)"
      />
      <div class="input-loader" v-if="useStore.isSearching" />
    </div>
    <SearchResultCard
      v-if="useStore.searchQuery.length > 0"
      :searchedShows="useStore.searchedShows"
    />
  </div>
</template>
