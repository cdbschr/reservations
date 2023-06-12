<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'DateInput',
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
    class="form-input block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
  />
</template>