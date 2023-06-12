<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TitlePage",
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
  },
  computed: {
    underlinedText(): string {
      return this.text.slice(0, -2);
    },
    remainingText(): string {
      return this.text.slice(-2);
    },
  },
});
</script>

<template>
  <div class="flex my-5">
    <h1 class="text-2xl font-semibold">
      <span class="border-b border-black">{{ underlinedText }}</span>
      <span>{{ remainingText }}</span>
    </h1>
  </div>
</template>
