<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
import { stripTags, defaultImg } from "@/utils";
import NotFound from "./NotFound.vue";
import { useShowStore } from "@/stores/showStore";

const router = useRoute();
const useStore = useShowStore();

const props = defineProps({
  show: {
    type: Object,
    require: true,
  },
});

const openExternalSite = () => {
  if (typeof window !== "undefined") {
    const externalUrl = props.show.officialSite;
    window.open(externalUrl, "_blank");
  }
};

onMounted(async () => {
  if (!useStore.selectedShow) {
    const showId = router.query.id;
    await useStore.getSelectedShow(showId);
  }
});

const formattedSelectedShow = computed(() => {
  return {
    ...props.show,
    name: props.show ? props.show.name : "Not available",
    rating: props.show ? props.show.rating : 0,
    language: props.show ? props.show.language : "Not available",
    officialSite: props.show ? props.show.officialSite : "Not available",
    summary: props.show ? props.show.summary : "Not available",
    genres: props.show ? props.show.genres : ["Not available"],
    premiered: props.show ? props.show.premiered : "Not available",
    image: {
      original: props.show ? props.show.image.original : defaultImg,
    },
  };
});
</script>

<template>
  <section>
    <div class="show-detail-container" v-show="show">
      <div class="image-background-cover">
        <div class="image-container">
          <img :src="`${formattedSelectedShow.image.original}`" />
        </div>
      </div>
      <div class="show-detail">
        <div class="show-poster">
          <img :src="`${formattedSelectedShow.image.original}`" />
        </div>
        <div class="show-text">
          <h2 class="show-title">{{ formattedSelectedShow.name }}</h2>
          <div class="show-rating">
            <p>Rating: {{ formattedSelectedShow.rating.average }}</p>
            <p>Language: {{ formattedSelectedShow.language }}</p>
            <Button
              :disabled="!formattedSelectedShow.officialSite"
              text="Watch on the official site"
              @click="openExternalSite"
            />
          </div>
          <div class="show-summary">
            {{ stripTags(formattedSelectedShow.summary) }}
            <div class="show-origin">
              <p>Genre:</p>
              <p>{{ formattedSelectedShow.genres.join(", ") }}</p>
            </div>
            <div class="show-origin">
              <p>Premiered Date:</p>
              <p>{{ formattedSelectedShow.premiered }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <NotFound v-show="!show" />
  </section>
</template>
