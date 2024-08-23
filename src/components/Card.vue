<script setup>
import { truncate } from "@/utils";
import { RouterLink } from "vue-router";
import Button from "@/components/Button.vue";
import { useShowStoreReactive } from '@/stores/reactiveShowStore'

const props = defineProps({
  imageUrl: {
    type: String,
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
  },
  alt: {
    type: String,
  },
  show: {
    type: Object,
    required: true,
  },
});

const { setSelectedShow } = useShowStoreReactive();

const handleViewDetails = () => {
  setSelectedShow(props.show);
};
</script>

<template>
  <div class="card">
    <img :src="`${imageUrl}`" :alt="`${alt}`" />
    <div class="card-content">
      <p class="title">{{ truncate(title, 20) }}</p>
      <div class="view-button">
        <p>Rating: {{ rating }}</p>
        <RouterLink :to="{ path: '/show', query: { id: show.id } }">
          <Button text="View Details" :click="handleViewDetails" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>
