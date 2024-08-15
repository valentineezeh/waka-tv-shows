<script setup>
defineProps({
  text: {
    type: String,
  },
  click: {
    type: Function,
  },
});
</script>

<template>
  <button @click="click">
    {{ text }}
  </button>
</template>
