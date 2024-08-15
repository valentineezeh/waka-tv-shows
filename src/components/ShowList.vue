<script setup>
import ShowListings from "./ShowListings.vue";
import NotFound from "./NotFound.vue";

defineProps({
  filteredAndGroupedShows: {
    type: Object,
    required: true,
  },
  hasResults: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div v-if="hasResults">
    <div
      v-for="(shows, genre) in filteredAndGroupedShows"
      :key="genre"
      class="segment"
    >
      <h3>{{ genre }}</h3>
      <ShowListings :shows="shows" />
    </div>
  </div>
  <NotFound v-else />
</template>
