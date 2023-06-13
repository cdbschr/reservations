<script setup lang="ts">
  import { ref } from "vue";
  import Button from "./components/Button.vue";
  import Title from "./components/TitlePage.vue";
  import InputDate from "./components/InputDate.vue";
  import Account from "./components/AccountAccess.vue";
  import ModalePage from "./components/ModalePage.vue";
  import Header from "./layouts/HeaderApp.vue";
  import Footer from "./layouts/FooterApp.vue";

  const showModal = ref(false);
  const toggleModal = () => showModal.value = !showModal.value;
</script>

<template>
  <Header />
  <Button width="1/2" text-color="text-primary" border-class="border-2 border-primary" @click="toggleModal">Test</Button>
  <Account />
  <Title text="Coucou" />
  <Title text="Bonjour je m'appelle" />
  <Title text="ça marche bien" />

  <form>
    <input type="text" class="bg-form-back"/>
    <InputDate name="date"/>
    <label for="pet-select">Choose a pet:</label>
    <select id="pet-select" name="pets">
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
      <option value="hamster">Hamster</option>
      <option value="parrot">Parrot</option>
      <option value="spider">Spider</option>
      <option value="goldfish">Goldfish</option>
    </select>
  </form>
  <Footer />
  <ModalePage v-model="showModal"><p>Test</p></ModalePage>
</template>
