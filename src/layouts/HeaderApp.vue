<script lang="ts">
  import { defineComponent } from "vue";
  import AccountAccess from "../components/AccountAccess.vue";

  export default defineComponent({
    name: "HeaderApp",
    components: {
      AccountAccess,
    },
  });
</script>

<template>
  <header class="flex items-center justify-between px-4 py-2">
    <a href="/">
      <h1 class="text-2xl font-bold text-gray-700">OSR</h1>
    </a>
    <AccountAccess />
  </header>
</template>
