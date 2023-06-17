<script setup lang="ts">
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import Title from "~/components/TitlePage.vue";
  import RecapPlace from "~/components/RecapPlace.vue";
  import ModalePage from "~/components/ModalePage.vue";
  import { ref } from "vue";

  const placesData = Array.from({ length: 10 }, (_, i) => ({
    roomName: `Salle ${i + 42} - Bâtiment`,
    areaName: `Area ${i + 20}`,
    placeNumber: i + 100,
  }));

  const showModal = ref(false);
  const handleModal = () => (showModal.value = true);
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <Title text="Places du jour" />
      <div v-for="roomData in placesData" :key="roomData.roomName">
        <h2 class="font-medium text-2xl mb-4">{{ roomData.roomName }}</h2>
        <div class="flex flex-wrap justify-center w-full">
          <RecapPlace
            v-for="n in 3"
            :key="n"
            :place-data="roomData"
            @open-modal="handleModal"
          />
        </div>
      </div>
      <ModalePage v-model="showModal">
        <button class="px-4 py-2 bg-lime-300 text-white rounded">
          Réserver
        </button>
      </ModalePage>
    </main>
    <Footer />
  </section>
</template>
