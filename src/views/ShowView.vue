<script setup>
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowStore } from "@/stores/showStore";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const { selectedShow, isFetchingShowDetails, showDetailsError } = useShowStore();
</script>

<template>
  <section>
    <div>
      <Loader v-show="isFetchingShowDetails" />
      <Error v-show="showDetailsError" :message="showDetailsError" />
      <ShowDetails v-show="selectedShow" :show="selectedShow" />
    </div>
  </section>
</template>
