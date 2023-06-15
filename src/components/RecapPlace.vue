<script lang="ts">
  import { defineComponent, PropType } from "vue";

  interface PlaceData {
    areaName: string;
    placeNumber: number;
    roomName: string;
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
      roomName(): string {
        return this.placeData.roomName;
      },
    },
  });
</script>

<template>
  <div @click="$emit('open-modal')">
    <div class="border-2 rounded-lg mt-1 mb-3 mx-3 py-2 px-2 w-4/10">
      <div class="font-medium text-xl text-center">{{ areaName }}</div>
      <div class="font-black text-center text-3xl mt-2">{{ placeNumber }}</div>
    </div>
  </div>
</template>
