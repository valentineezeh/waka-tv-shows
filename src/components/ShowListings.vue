<script setup>
import Card from "@/components/Card.vue";

const props = defineProps({
  shows: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="scroll-container">
    <section class="card-container">
    <div v-for="show in shows" :key="show.id">
      <Card
        :imageUrl="show.image.medium"
        :title="show.name"
        :rating="show.rating.average"
        :alt="show.name"
        :show="show"
      />
    </div>
  </section>
  </div>
</template>
