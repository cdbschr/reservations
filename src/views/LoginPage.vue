<script setup lang="ts">
  import { ref } from "vue";
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import TitlePage from "~/components/TitlePage.vue";
  import Button from "~/components/Button.vue";
  import FormLogin from "~/components/FormLogin.vue";

  const showLoginForm = ref(false);
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <TitlePage text="Login" />
      <div class="my-32 flex flex-col items-center justify-center">
        <div v-if="!showLoginForm" class="w-full md:w-1/3 flex justify-center">
          <Button width="3/4" @click="showLoginForm = true">Login</Button>
        </div>
        <div v-else>
          <FormLogin />
        </div>
      </div>
    </main>
    <Footer />
  </section>
</template>
