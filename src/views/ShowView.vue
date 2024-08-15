<script setup>
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowStore } from "@/stores/showStore";

const { selectedShow } = useShowStore();
</script>

<template>
  <section>
    <div>
      <ShowDetails :show="selectedShow" />
    </div>
  </section>
</template>
