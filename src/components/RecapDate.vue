<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'RecapDate',
  props: {
    reservation: {
      type: Object as PropType<{
        id: number,
        id_user: string,
        placeNumber: number,
        date_start: string,
        date_end: string,
        created_at: string,
        areaName: string
      }>,
      required: true
    }
  },
  computed: {
    displayDate(): string {
      const today = new Date();
      const reservationDate = new Date(this.reservation.date_start);

      if (reservationDate.setHours(0,0,0,0) === today.setHours(0,0,0,0)) {
        return 'Aujourd\'hui';
      } else if (reservationDate.setHours(0,0,0,0) === new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1).setHours(0,0,0,0)) {
        return 'Hier';
      } else if (reservationDate.setHours(0,0,0,0) === new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).setHours(0,0,0,0)) {
        return 'Demain';
      } else {
        return `${('0' + reservationDate.getDate()).slice(-2)}/${('0' + (reservationDate.getMonth() + 1)).slice(-2)}/${reservationDate.getFullYear()}`;
      }
    }
  }
});
</script>

<template>
  <h2 class="text-lg font-bold mt-2 px-4">{{ displayDate }}</h2>
  <div class="w-full sm:w-1/3 p-2">
    <div class="bg-white rounded-lg p-4 shadow-md">
      <div class="flex justify-around text-gray-600">
        <p class="text-base">{{ reservation.areaName }}</p>
        <p class="font-black text-xl">{{ reservation.placeNumber }}</p>
      </div>
    </div>
  </div>
</template>
