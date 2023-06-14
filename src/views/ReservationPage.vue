<script setup lang="ts">
  import { ref, computed } from "vue";
  import Header from "../layouts/HeaderApp.vue";
  import Footer from "../layouts/FooterApp.vue";
  import TitlePage from "../components/TitlePage.vue";
  import Button from "../components/Button.vue";
  import InputDate from "../components/InputDate.vue";
  import Select from "../components/SelectContent.vue";

  let showExtraOptions = ref(false);

  const toggleExtraOptions = () => {
    showExtraOptions.value = !showExtraOptions.value;
  };

  const showSecondDate = ref(false);

  const addDate = () => {
    showSecondDate.value = true;
  };

  const isDatesDifferent = computed(() => {
    return (
      reservation.value.date2 !== "" &&
      reservation.value.date1 !== reservation.value.date2
    );
  });

  //TODO: Ensuite enlever les valeurs par les références de supabase par la suite
  let rooms = ref([
    { value: "1", text: "Salle 1" },
    { value: "2", text: "Salle 2" },
    // Ajoutez ici vos autres salles
  ]);

  let locations = ref([
    { value: "1", text: "Place 1" },
    { value: "2", text: "Place 2" },
    // Ajoutez ici vos autres places
  ]);

  let updateDate1 = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      reservation.value.date1 = event.target.value;
    }
  };

  let updateDate2 = (event: Event) => {
    if (event.target instanceof HTMLInputElement) {
      reservation.value.date2 = event.target.value;
    }
  };

  let setDuration = (duration: string) => {
    reservation.value.duration = duration;
  };

  let reservation = ref({
    date1: "",
    date2: "",
    duration: "",
    room: "",
    location: "",
  });

  const resetObject = () => {
    reservation.value = {
      date1: "",
      date2: "",
      duration: "",
      room: "",
      location: "",
    };
  };

  const reset = () => {
    resetObject();
    location.reload();
  };
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <TitlePage text="Reservation" />
      <form ref="form" action="">
        <label for="date" class="mb-2">Date(s)</label>
        <div class="flex items-center mb-5">
          <InputDate
            id="date"
            v-model="reservation.date1"
            name="date"
            class="w-5/10"
            @input="updateDate1($event)"
          />
          <InputDate
            v-if="showSecondDate"
            id="date2"
            v-model="reservation.date2"
            name="date2"
            class="w-5/10"
            @input="updateDate2($event)"
          />
          <Button v-if="!showSecondDate" class="w-1/10" @click.prevent="addDate"
            >+</Button
          >
        </div>

        <div class="mb-5">
          <label for="duration" class="mb-2">Durée</label>
          <div class="flex justify-around">
            <Button
              v-if="!isDatesDifferent"
              class="w-2/5"
              :class="{ 'bg-lime-300': reservation.duration === 'journee' }"
              @click.prevent="setDuration('journee')"
              >Journée</Button
            >
            <Button
              v-else
              class="w-full"
              :class="{ 'bg-lime-300': reservation.duration === 'journee' }"
              @click.prevent="setDuration('journee')"
              >Journée</Button
            >
            <Button
              v-if="!isDatesDifferent"
              class="w-2/5"
              @click.prevent="toggleExtraOptions"
              >{{ showExtraOptions ? "↓" : "Préciser" }}</Button
            >
          </div>

          <div v-if="showExtraOptions" class="flex justify-around mt-[-15px]">
            <Button
              class="w-2/5"
              :class="{ 'bg-lime-300': reservation.duration === 'matin' }"
              @click.prevent="setDuration('matin')"
              >Matinée</Button
            >
            <Button
              class="w-2/5"
              :class="{ 'bg-lime-300': reservation.duration === 'am' }"
              @click.prevent="setDuration('am')"
              >Après-Midi</Button
            >
          </div>
        </div>

        <div class="mb-5">
          <div>
            <label for="room" class="mb-2">Salle</label>
          </div>
          <Select
            v-model="reservation.room"
            name="salle"
            :data="rooms"
          />
        </div>

        <div class="mb-5">
          <div class="flex relative items-center">
            <label for="location" class="mb-2"> Place </label>
            <div
              class="absolute left-9 top-[-3px] p-2 ml-2 rounded-full bg-secondary text-black w-3 h-3 text-xs flex items-center justify-center cursor-pointer"
            >
              ?
            </div>
          </div>
          <Select
            v-model="reservation.location"
            name="place"
            :data="locations"
          />
        </div>

        <div class="flex justify-around mb-3">
          <Button type="submit" class="w-4/10">Réserver</Button>
          <Button
            type="button"
            text-color="text-red-400"
            border-class=""
            class="w-4/10"
            @click="reset"
            >Annuler</Button
          >
        </div>
      </form>
    </main>
    <Footer />
  </section>
</template>
