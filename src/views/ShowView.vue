<script setup>
import { onMounted, reactive } from 'vue'
import { useRoute } from "vue-router";
import ShowDetails from "@/components/ShowDetails.vue";
import { useShowStore } from "@/stores/showStore";
import Loader from "@/components/Loader.vue";
import Error from "@/components/Error.vue";

const router = useRoute();
const state = reactive({
  show: {},
  isLoading: false
})

const {
  showDetailsError,
  getSelectedShow
} = useShowStore();
const showId = router.query.id;

onMounted(async () => {
  if (!isNaN(showId)) {
    state.isLoading = true;
    const res = await getSelectedShow(showId);
    state.show = res
    state.isLoading = false;
  }
});

</script>

<template>
  <section>
    <div>
      <Loader v-show="state.isLoading" />
      <Error v-show="showDetailsError" :message="showDetailsError" />
      <ShowDetails v-show="state.show" :show="state.show" />
    </div>
  </section>
</template>
