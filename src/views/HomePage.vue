<script setup lang="ts">
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import TitlePage from "~/components/TitlePage.vue";
  import Button from "~/components/Button.vue";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const goToReservation = () => {
    router.push("/reservation");
  };

  const goToMyReservations = () => {
    router.push("/my-reservations");
  };
  const goToFreePlaces = () => {
    router.push("/free-places");
  };
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <TitlePage text="Accueil" />

      <div class="my-16 flex flex-col items-center justify-center">
        <Button width="3/4 sm:w-1/2" @click="goToReservation">Réservation</Button>
        <Button width="3/4 sm:w-1/2" @click="goToMyReservations">Mes réservations</Button>
        <Button width="3/4 sm:w-1/2" @click="goToFreePlaces">Places libres du jour</Button>
      </div>
    </main>
    <Footer />
  </section>
</template>
