<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ButtonProject',
  props: {
    width: {
      type: String as PropType<string>,
      default: "",
    },
    color: {
      type: String as PropType<string>,
      default: "primary",
    },
  },
  computed: {
    widthClass(): string {
      if (this.width) {
        return `w-${this.width}`;
      }
      return "";
    },
    borderClass(): string {
      return `border-2 border-color-${this.color}`;
    },
  },
});
</script>

<template>
  <button :class="`hover:text-${color} font-bold py-2 px-4 rounded ${widthClass} ${borderClass}`">
    <slot/>
  </button>
</template>
