<script lang="ts">
  import { defineComponent, PropType, computed, SetupContext } from "vue";

  export default defineComponent({
    name: "RecapDate",
    props: {
      reservation: {
        type: Object as PropType<{
          id: number;
          id_user: string;
          placeNumber: number;
          date_start: string;
          date_end: string;
          created_at: string;
          areaName: string;
        }>,
        required: true,
      },
      today: {
        type: String as PropType<string>,
        required: true,
      },
    },
    emits: ["open-modal", "selected"],
    setup(props, context: SetupContext) {
      const isToday = computed(
        () => props.reservation.date_start === props.today
      );
      const selectAndOpenModal = () => {
        if (props.reservation) {
          context.emit("selected", props.reservation);
          context.emit("open-modal");
        }
      };
      return { isToday, selectAndOpenModal };
    },
    computed: {
      displayDate(): string {
        const today = new Date();
        const reservationDate = new Date(this.reservation.date_start);

        if (
          reservationDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)
        ) {
          return "Aujourd'hui";
        } else if (
          reservationDate.setHours(0, 0, 0, 0) ===
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - 1
          ).setHours(0, 0, 0, 0)
        ) {
          return "Hier";
        } else if (
          reservationDate.setHours(0, 0, 0, 0) ===
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + 1
          ).setHours(0, 0, 0, 0)
        ) {
          return "Demain";
        } else {
          return `${("0" + reservationDate.getDate()).slice(-2)}/${(
            "0" +
            (reservationDate.getMonth() + 1)
          ).slice(-2)}/${reservationDate.getFullYear()}`;
        }
      },
    },
  });
</script>

<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="text-lg font-bold mt-2 px-4">{{ displayDate }}</h2>
    <div class="w-full sm:w-1/3 p-2">
      <div @click="selectAndOpenModal">
        <div
          class="bg-white rounded-lg p-4 shadow-md"
          :class="{ 'bg-gray-200': isToday }"
        >
          <div class="flex justify-around items-center text-gray-600">
            <p class="text-base">{{ reservation.areaName }}</p>
            <p class="font-black text-xl">{{ reservation.placeNumber }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
