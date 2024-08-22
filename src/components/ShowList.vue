<script setup>
import ShowListings from "./ShowListings.vue";
import NotFound from "./NotFound.vue";

defineProps({
  sortedAndGroupedShows: {
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
  <div>
    <div v-show="hasResults">
      <div
        v-for="(shows, genre) in sortedAndGroupedShows"
        :key="genre"
        class="segment"
      >
        <h3>{{ genre }}</h3>
        <ShowListings :shows="shows" />
      </div>
    </div>
    <NotFound v-show="!hasResults" />
  </div>
</template>
