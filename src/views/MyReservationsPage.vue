<script setup lang="ts">
  import { ref, computed } from "vue";
  import Header from "../layouts/HeaderApp.vue";
  import Footer from "../layouts/FooterApp.vue";
  import Title from "../components/TitlePage.vue";
  import InputDate from "../components/InputDate.vue";
  import RecapDate from "../components/RecapDate.vue";
  import {
    expandAndSortReservations,
    generateDateRange,
  } from "../helpers/displayMyReservations.ts";
  import Modale from "../components/ModalePage.vue";
  import Button from "../components/Button.vue";

  type Reservation = {
    id: number;
    id_user: string;
    placeNumber: number;
    date_start: string;
    date_end: string;
    created_at: string;
    areaName: string;
    date_range?: string[];
  };

  const today = new Date().toISOString().split("T")[0];
  const reservationsData: Reservation[] = [
    {
      id: 1,
      id_user: "user1",
      placeNumber: 1,
      date_start: "2023-06-04",
      date_end: "2023-06-05",
      created_at: "2023-06-01",
      areaName: "Area 1",
    },
    {
      id: 2,
      id_user: "user2",
      placeNumber: 2,
      date_start: "2023-06-05",
      date_end: "2023-06-06",
      created_at: "2023-06-01",
      areaName: "Area 2",
    },
    {
      id: 3,
      id_user: "user3",
      placeNumber: 2,
      date_start: "2023-06-02",
      date_end: "2023-06-03",
      created_at: "2023-05-29",
      areaName: "Area 3",
    },
    {
      id: 4,
      id_user: "user4",
      placeNumber: 1,
      date_start: "2023-06-06",
      date_end: "2023-06-07",
      created_at: "2023-06-02",
      areaName: "Area 4",
    },
    {
      id: 5,
      id_user: "user5",
      placeNumber: 3,
      date_start: "2023-05-29",
      date_end: "2023-05-30",
      created_at: "2023-05-24",
      areaName: "Area 5",
    },
    {
      id: 6,
      id_user: "user6",
      placeNumber: 2,
      date_start: "2023-06-07",
      date_end: "2023-06-08",
      created_at: "2023-06-03",
      areaName: "Area 6",
    },
    {
      id: 7,
      id_user: "user7",
      placeNumber: 1,
      date_start: "2023-05-30",
      date_end: "2023-05-31",
      created_at: "2023-05-25",
      areaName: "Area 7",
    },
    {
      id: 8,
      id_user: "user8",
      placeNumber: 3,
      date_start: "2023-06-08",
      date_end: "2023-06-09",
      created_at: "2023-06-04",
      areaName: "Area 8",
    },
    {
      id: 9,
      id_user: "user9",
      placeNumber: 1,
      date_start: "2023-07-01",
      date_end: "2023-07-02",
      created_at: "2023-05-26",
      areaName: "Area 9",
    },
    {
      id: 10,
      id_user: "user10",
      placeNumber: 2,
      date_start: "2023-06-14",
      date_end: "2023-06-14",
      created_at: "2023-06-05",
      areaName: "Area 10",
    },
    {
      id: 11,
      id_user: "user11",
      placeNumber: 1,
      date_start: "2023-06-01",
      date_end: "2023-06-02",
      created_at: "2023-05-27",
      areaName: "Area 11",
    },
    {
      id: 12,
      id_user: "user12",
      placeNumber: 2,
      date_start: "2023-06-10",
      date_end: "2023-06-11",
      created_at: "2023-06-06",
      areaName: "Area 12",
    },
    {
      id: 13,
      id_user: "user13",
      placeNumber: 3,
      date_start: "2023-06-30",
      date_end: "2023-06-04",
      created_at: "2023-05-29",
      areaName: "Area 13",
    },
    {
      id: 14,
      id_user: "user14",
      placeNumber: 1,
      date_start: "2023-06-14",
      date_end: "2023-06-14",
      created_at: "2023-06-07",
      areaName: "Area 14",
    },
    {
      id: 15,
      id_user: "user15",
      placeNumber: 2,
      date_start: "2023-06-12",
      date_end: "2023-06-13",
      created_at: "2023-06-08",
      areaName: "Area 15",
    },
    {
      id: 16,
      id_user: "user16",
      placeNumber: 3,
      date_start: "2023-06-13",
      date_end: "2023-06-15",
      created_at: "2023-06-09",
      areaName: "Area 16",
    },
    {
      id: 17,
      id_user: "user17",
      placeNumber: 1,
      date_start: "2023-06-16",
      date_end: "2023-06-17",
      created_at: "2023-06-10",
      areaName: "Area 17",
    },
  ];

  const reservationsRef = ref(reservationsData);
  reservationsRef.value.forEach((reservation: Reservation) => {
    reservation.date_range = generateDateRange(
      reservation.date_start,
      reservation.date_end
    );
  });

  const selectedDate = ref<string | null>(null);

  const displayedReservations = computed(() =>
    expandAndSortReservations(
      [...reservationsRef.value],
      selectedDate.value ? new Date(selectedDate.value) : new Date(),
      true,
      !!selectedDate.value
    )
  );

  const updateSelectedDate = (event: InputEvent) => {
    selectedDate.value = (event.target as HTMLInputElement).value;
  };

  const showModal = ref(false);
  const handleModal = () => (showModal.value = true);
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <Title text="Mes Réservations" />
      <div class="sticky top-0 bg-white z-10 p-4">
        <div class="flex items-center justify-around">
          <label for="" class="w-[45%]">Choisir une date</label>
          <InputDate name="date" class="w-[45%]" @input="updateSelectedDate" />
        </div>
      </div>
      <section class="flex flex-wrap">
        <template v-if="displayedReservations.length">
          <RecapDate
            v-for="reservation in displayedReservations"
            :key="reservation.id + reservation.date_start"
            :reservation="reservation"
            :today="today"
            @open-modal="handleModal"
          />
        </template>
        <template v-else>
          <p class="mx-auto my-4">
            Aucune réservation n'a été trouvée pour la date sélectionnée.
          </p>
        </template>
      </section>
    </main>
    <Footer />
    <Modale v-model="showModal">
      <div class="flex">
        <Button width="3/4 sm:w-1/2" class="mx-2">Modifier</Button>
        <Button width="3/4 sm:w-1/2" border-class="border-2 border-red-400" class="mx-2">Supprimer</Button>
      </div>
    </Modale>
  </section>
</template>
