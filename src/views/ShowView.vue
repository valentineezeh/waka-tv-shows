<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from "vue-router";
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowStoreReactive } from '@/stores/reactiveShowStore'
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const router = useRoute();
const state = reactive({
  show: {},
})

const {
  showDetailsError,
  getSelectedShow,
  isLoading
} = useShowStoreReactive();

onMounted(async () => {
  const showId = router.query.id;
  if (showId && !isNaN(showId)) {
    const data = await getSelectedShow(showId);
    state.show = data
  }
});

</script>

<template>
  <section>
    <div>
      <Loader v-show="isLoading" />
      <Error v-show="showDetailsError" :message="showDetailsError" />
      <ShowDetails v-show="state.show" :show="state.show" />
    </div>
  </section>
</template>
