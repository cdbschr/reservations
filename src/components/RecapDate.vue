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
  <div>
    <h2>{{ displayDate }}</h2>
    <div class="card">
      <div>Area: {{ reservation.areaName }}</div>
      <div>Places: {{ reservation.placeNumber }}</div>
    </div>
  </div>
</template>
