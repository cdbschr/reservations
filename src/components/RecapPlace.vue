<script lang="ts">
  import { defineComponent, PropType } from "vue";

  interface PlaceData {
  id: number;
  name: string;
  placeNumber: number;
  areaName: string;
  roomName: string;
  buildingName: string;
  Room: {
    id: number;
    name: string;
    Building: {
      id: number;
      name: string;
    };
  };
}

  export default defineComponent({
    name: "RecapPlace",
    props: {
      placeData: {
        type: Object as PropType<PlaceData>,
        required: true,
      },
    },
    emits: ["open-modal"],
    computed: {
      areaName(): string {
        return this.placeData.areaName;
      },
      placeNumber(): number {
        return this.placeData.placeNumber;
      },
      roomName(): string {
        return this.placeData.Room.name;
      },
    },
  });
</script>

<template>
  <div @click="$emit('open-modal')">
    <div class="flex flex-wrap items-center justify-center border-2 rounded-lg mt-1 mb-3 mx-3 py-2 px-2 w-4/10 max-w-[85px] min-h-[130px]">
      <div class="font-medium text-xl text-center w-full">{{ areaName }}</div>
      <div class="font-black text-center text-3xl mt-2">{{ placeNumber }}</div>
    </div>
  </div>
</template>
