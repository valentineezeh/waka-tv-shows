<script setup>
import { watch, ref } from "vue";
import Card from "@/components/Card.vue";

const props = defineProps({
  shows: {
    type: Array,
    required: true,
  },
});

const sortedShows = ref([]);

watch(
  () => props.shows,
  (newShows) => {
    sortedShows.value = [...newShows].sort((a, b) => {
      const ratingA = a.rating.average || 0;
      const ratingB = b.rating.average || 0;
      return ratingB - ratingA;
    });
  },
  { immediate: true },
);
</script>

<template>
  <section class="card-container">
    <div v-for="show in sortedShows" :key="show.id">
      <Card
        :imageUrl="show.image.medium"
        :title="show.name"
        :rating="show.rating.average"
        :alt="show.name"
        :show="show"
      />
    </div>
  </section>
</template>
