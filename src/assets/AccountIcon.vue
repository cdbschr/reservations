<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "AccountIcon",
  props: {
    color: {
      type: String as PropType<string>,
      required: true,
    },
    size: {
      type: String as PropType<string>,
      default: "35"
    },
  },
});
</script>

<template>
  <svg
    :style="{ stroke: color }"
    :width="size"
    :height="size"
    viewBox="0 0 37 37"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      :style="{ fill: color }"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.5 12C13.5 9.51472 15.5147 7.5 18 7.5C20.4853 7.5 22.5 9.51472 22.5 12C22.5 14.4853 20.4853 16.5 18 16.5C15.5147 16.5 13.5 14.4853 13.5 12Z"
    />
    <path
      :style="{ fill: color }"
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.75124 26.1053C9.82858 21.6156 13.492 18 18 18C22.5081 18 26.1716 21.6157 26.2488 26.1056C26.2539 26.4034 26.0823 26.676 25.8117 26.8002C23.4327 27.8918 20.7865 28.5 18.0003 28.5C15.2139 28.5 12.5674 27.8917 10.1883 26.7999C9.91765 26.6757 9.74611 26.4031 9.75124 26.1053Z"
    />
    <rect
      x="1"
      y="1"
      width="35"
      height="35"
      rx="4"
      stroke-width="2"
      stroke-linejoin="round"
    />
  </svg>
</template>

