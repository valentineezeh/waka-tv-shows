<script setup>
import { ref } from "vue";
import { useShowStore } from "@/stores/showStore";
import SearchResultCard from "@/components/SearchResultCard.vue";

const useStore = useShowStore();
const showSearchBar = ref(true);

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

const handleFocusOut = () => {
  if (useStore.searchQuery.length > 0) {
    showSearchBar.value = false;
  }
};

const handleFocus = () => {
  showSearchBar.value = true;
};
</script>

<template>
  <div class="search-input" tabindex="0">
    <div class="input-container">
      <input
        type="text"
        placeholder="Search TV shows.."
        name="search"
        :value="modelValue"
        @input="updateValue($event.target.value)"
        @focus="handleFocus"
        @focusout="handleFocusOut"
      />
      <div class="input-loader" v-show="useStore.isSearching" />
    </div>
    <SearchResultCard
      v-show="useStore.searchQuery.trim().length !== 0"
      :searchedShows="useStore.searchedShows"
      :showSearchBar="showSearchBar"
      @pointerdown.prevent
    />
  </div>
</template>
