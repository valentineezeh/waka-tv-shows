<script setup>
import { computed } from "vue";
import Button from "@/components/Button.vue";
import { stripTags, defaultImg } from "@/utils";
import NotFound from "./NotFound.vue";


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


const formattedSelectedShow = computed(() => {
  const { image, rating, genres, name, language, officialSite, summary, premiered } = props.show || {};

  return {
    ...props.show,
    name: name ?? "Not available",
    rating: {
      average: rating?.average ?? 0,
    },
    language: language ?? "Not available",
    officialSite: officialSite ?? "Not available",
    summary: summary ?? "Not available",
    genres: genres ?? [],
    premiered: premiered ?? "Not available",
    image: {
      original: image?.original ?? defaultImg,
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
