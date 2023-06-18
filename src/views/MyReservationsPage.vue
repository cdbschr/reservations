<script setup lang="ts">
  import { ref, computed, onMounted } from "vue";
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import Title from "~/components/TitlePage.vue";
  import InputDate from "~/components/InputDate.vue";
  import RecapDate from "~/components/RecapDate.vue";
  import {
    expandAndSortReservations,
    generateDateRange,
  } from "~/helpers/displayMyReservations.ts";
  import Modale from "~/components/ModalePage.vue";
  import Button from "~/components/Button.vue";
  import { Reservation } from "~/types/reservation";
  import {
    deleteReservation,
    getReservationsByUser,
  } from "~/repositories/showReservations";

  const today = new Date().toISOString().split("T")[0];

  const reservationsRef = ref<Reservation[]>([]);
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

  const selectedReservation = ref<Reservation | null>(null);
  const showModal = ref(false);
  const handleModal = () => {
    showModal.value = true;
    console.log(selectedReservation);
  };

  const setSelectedReservation = (reservation: Reservation) => {
    selectedReservation.value = reservation;
  };

  onMounted(async () => {
    reservationsRef.value = await getReservationsByUser();
    reservationsRef.value.forEach((reservation: Reservation) => {
      reservation.date_range = generateDateRange(
        reservation.date_start,
        reservation.date_end
      );
    });
  });

  const handleDeleteReservation = async () => {
    if (!selectedReservation.value) {
      console.error("No reservation selected");
      return;
    }

    try {
      if (selectedReservation.value?.id) {
        const isDeleted = await deleteReservation(
          selectedReservation.value.id.toString()
        );
        if (isDeleted) {
          selectedReservation.value = null;
          reservationsRef.value = await getReservationsByUser();

          reservationsRef.value.forEach((reservation: Reservation) => {
            reservation.date_range = generateDateRange(
              reservation.date_start,
              reservation.date_end
            );
          });
          showModal.value = false;
        }
      } else {
        console.error("No reservation selected");
      }
    } catch (error) {
      console.error("Failed to delete reservation", error);
    }
  };

  const formatDate = (isStartDate = false): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    if (selectedReservation.value) {
      let dateObj;

      if (
        isStartDate &&
        selectedReservation.value.date_range &&
        selectedReservation.value.date_range.length > 0
      ) {
        dateObj = new Date(selectedReservation.value.date_range[0]);
      } else {
        dateObj = new Date(selectedReservation.value.date_end);
      }

      return dateObj.toLocaleDateString("fr-FR", options);
    }

    return "";
  };
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
            @selected="setSelectedReservation"
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
    <Modale v-model="showModal" :reservation="selectedReservation">
      <div class="flex flex-col space-y-2">
        <p class="font-bold">Référence réservation:</p>
        <p>{{ selectedReservation?.id }}</p>
        <p class="font-bold">Date de début:</p>
        <p>{{ formatDate(true) }}</p>
        <p class="font-bold">Date de fin:</p>
        <p>{{ formatDate() }}</p>
        <div class="flex pt-5">
          <Button width="3/4 sm:w-1/2" class="mx-2">Modifier</Button>
          <Button
            width="3/4 sm:w-1/2"
            border-class="border-2 border-red-400"
            class="mx-2"
            @click="handleDeleteReservation"
            >Supprimer</Button
          >
        </div>
      </div>
    </Modale>
  </section>
</template>
