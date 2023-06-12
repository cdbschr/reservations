<script setup lang="ts">
  const link = "/";
  const nameApp = "OSR";
  const year = new Date().getFullYear();
  const footer = `© ${year} ${nameApp} - All rights reserved`;
</script>

<template>
  <footer class="w-100 py-2 mt-auto flex justify-center bg-primary">
    <a :href="link" class="text-secondary hover:text-blue">{{ footer }}</a>
  </footer>
</template>