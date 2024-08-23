<script setup>
import Loader from "@/components/Loader.vue";


</script>

<template>
    <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>
