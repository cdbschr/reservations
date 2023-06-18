<script lang="ts">
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    name: "ButtonProject",
    props: {
      width: {
        type: String as PropType<string>,
        default: "",
      },
      textColor: {
        type: String as PropType<string>,
        default: "text-primary",
      },
      borderClass: {
        type: String as PropType<string>,
        default: "border-2 border-primary",
      },
      type: {
        type: String as PropType<"button" | "submit" | "reset">,
        default: "button",
      },
    },
    computed: {
      widthClass(): string {
        if (this.width) {
          return `w-${this.width}`;
        }
        return "";
      },
    },
  });
</script>

<template>
  <button
    :type="type"
    :class="`${textColor} font-bold py-2 px-4 my-3 rounded ${widthClass} ${borderClass}`"
  >
    <slot />
  </button>
</template>
