<script setup>
import { computed } from "vue";
import { useShowStore } from "@/stores/showStore";
import { useRouter } from "vue-router";
import { defaultImg } from "@/utils";

const router = useRouter();
const useStore = useShowStore();
const props = defineProps({
  searchedShows: {
    type: Array,
  },
  showSearchBar: {
    type: Boolean,
  },
});

const handleCLick = (show) => {
  useStore.setSelectedShow(show);
  router.push({ path: "/show", query: { id: show.id } });
  useStore.setSearchQuery("");
};

const formattedShows = computed(() => {
  return props.searchedShows.map((show) => ({
    ...show,
    formattedRuntime: `${show.runtime || 0} mins`,
  }));
});
</script>

<template>
  <div
    class="searchCardContainer"
    v-show="formattedShows.length !== 0 && showSearchBar"
  >
    <ul
      v-for="show in formattedShows"
      :key="`show-${show.id}`"
      class="searchCard"
    >
      <li class="list-item" role="button" @click="handleCLick(show)">
        <img
          :src="show.image ? show.image.medium : defaultImg"
          alt="Show Image"
          class="showImage"
        />
        <div>
          <p class="searchCardTitle">
            {{ show.name }}
          </p>
          <p>{{ show.formattedRuntime }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
