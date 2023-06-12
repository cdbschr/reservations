<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface SelectOption {
  value: string;
  text: string;
}

export default defineComponent({
  name: 'SelectContent',
  props: {
    name: {
      type: String as PropType<string>,
      required: true,
    },
    data: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
  },
  computed: {
    id(): string {
      return `${this.name}-select`;
    },
  },
});
</script>

<template>
  <select :id="id" :name="name" class="form-select block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
    <option disabled selected> Veuillez sélectionner une {{ name }} </option>
    <option v-for="item in data" :key="item.value" :value="item.value">{{ item.text }}</option>
  </select>
</template>
