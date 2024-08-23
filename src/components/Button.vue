<script setup>
defineProps({
  text: {
    type: String,
  },
  click: {
    type: Function,
  },
  disabled: {
    type: Boolean,
  },
});
</script>

<template>
  <button @click="click" :disabled="disabled">
    {{ text }}
  </button>
</template>
