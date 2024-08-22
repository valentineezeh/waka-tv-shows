<script setup>
import Navbar from "@/components/Navbar.vue";
import { RouterView } from "vue-router";
import Footer from "@/components/Footer.vue";
import Loader from "@/components/Loader.vue";


</script>

<template>
  <Navbar />
    <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
  <Footer />
</template>
