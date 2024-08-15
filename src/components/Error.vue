<script setup>
defineProps({
  message: {
    type: String,
  },
});
</script>

<template>
  <div class="error-container">
    <div class="error">
      <strong>Error!</strong>
      {{ message }}
    </div>
  </div>
</template>
