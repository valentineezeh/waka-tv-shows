<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from "vue-router";
import Button from "@/components/Button.vue";
import { stripTags, defaultImg } from "@/utils";
import NotFound from "./NotFound.vue";
import { useShowStore } from '@/stores/showStore'

const router = useRoute();
const useStore = useShowStore()

const props = defineProps({
  show: {
    type: Object,
    require: true,
  },
});

const openExternalSite = () => {
  const externalUrl = props.show.officialSite;
  window.open(externalUrl, "_blank");
};

onMounted(async () => {
  if (!useStore.selectedShow){
    const showId = router.query.id
    await useStore.getSelectedShow(showId)
  }
})

const formattedSelectedShow = computed(() => {
  return {
    ...props.show,
    image: {
      original: props.show ? props.show.image.original : defaultImg
    }
  }
})

</script>

<template>
  <section>
    <div class="show-detail-container">
      <div class="image-background-cover">
        <div class="image-container">
          <img :src="`${formattedSelectedShow.image.original}`" />
        </div>
      </div>
      <div class="show-detail" v-if="show">
        <div class="show-poster">
          <img :src="`${formattedSelectedShow.image.original}`" />
        </div>
        <div class="show-text">
          <h2 class="show-title">{{ show.name }}</h2>
          <div class="show-rating">
            <p>Rating: {{ show.rating.average }}</p>
            <p>Language: {{ show.language }}</p>
            <Button :disabled="!show.officialSite"
              text="Watch on the official site"
              @click="openExternalSite"
            />
          </div>
          <div class="show-summary">
            {{ stripTags(show.summary) }}
            <div class="show-origin">
              <p>Genre:</p>
              <p>{{ show.genres.join(", ") }}</p>
            </div>
            <div class="show-origin">
              <p>Premiered Date:</p>
              <p>{{ show.premiered }}</p>
            </div>
          </div>
        </div>
      </div>
      <NotFound v-else />
    </div>
  </section>
</template>
