<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface PlaceData {
  areaName: string;
  placeNumber: number;
}

export default defineComponent({
  name: "RecapPlace",
  props: {
    placeData: {
      type: Object as PropType<PlaceData>,
      required: true,
    },
  },
  computed: {
    areaName(): string {
      return this.placeData.areaName;
    },
    placeNumber(): number {
      return this.placeData.placeNumber;
    },
  },
});
</script>

<template>
  <div class="border-2 rounded-lg m-3 p-4 w-1/3">
    <div class="font-bold text-xl text-center">{{ areaName }}</div>
    <div class="text-center text-3xl mt-2">{{ placeNumber }}</div>
  </div>
</template>
