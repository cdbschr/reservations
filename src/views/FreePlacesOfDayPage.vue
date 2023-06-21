<script setup lang="ts">
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import Title from "~/components/TitlePage.vue";
  import RecapPlace from "~/components/RecapPlace.vue";
  import ModalePage from "~/components/ModalePage.vue";
  import { onMounted, ref } from "vue";
  import { getFreePlaces } from "~/repositories/freePlacesOfDay";
  import { createReservation } from "~/repositories/freePlacesOfDay";

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

  const placesData = ref<Record<string, PlaceData[]>>({});
  const selectedPlaceId = ref<number | null>(null);

  const createReservationHandler = async () => {
    if (selectedPlaceId.value) {
      await createReservation(selectedPlaceId.value.toString());
      showModal.value = false;
      selectedPlaceId.value = null;

      const places = await getFreePlaces();
      placesData.value = groupByRoomName(places);
    }
  };

  const showModal = ref(false);
  const handleModal = (placeId: number) => {
    showModal.value = true;
    selectedPlaceId.value = placeId;
  };

  function groupByRoomName(places: PlaceData[]): Record<string, PlaceData[]> {
    return places.reduce(
      (acc: Record<string, PlaceData[]>, place: PlaceData) => {
        if (!acc[place.Room.name]) {
          acc[place.Room.name] = [];
        }
        acc[place.Room.name].push(place);
        return acc;
      },
      {}
    );
  }

  onMounted(async () => {
    const places = await getFreePlaces();
    placesData.value = groupByRoomName(places);
  });
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <Title text="Places du jour" />
      <div v-for="(places, roomName) in placesData" :key="roomName">
        <h2 class="font-medium text-2xl mb-4">{{ roomName }}</h2>
        <div class="flex flex-wrap justify-left w-full">
          <RecapPlace
            v-for="placeData in Object.values(places)"
            :key="placeData.id"
            :place-data="placeData"
            @open-modal="handleModal(placeData.placeNumber)"
          />
        </div>
      </div>
      <ModalePage v-model="showModal">
        <button
          class="px-4 py-2 bg-lime-300 text-white rounded"
          @click="createReservationHandler"
        >
          Réserver
        </button>
      </ModalePage>
    </main>
    <Footer />
  </section>
</template>
