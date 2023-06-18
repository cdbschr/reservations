<script lang="ts">
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    name: "DateInput",
    props: {
      name: {
        type: String as PropType<string>,
        required: true,
      },
    },
    computed: {
      id(): string {
        return `${this.name}-input`;
      },
    },
  });
</script>

<template>
  <input
    :id="id"
    :name="name"
    type="date"
    class="form-input block w-full px-3 py-2 rounded-md shadow-sm sm:text-sm"
  />
</template>
