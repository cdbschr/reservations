<script setup lang="ts">
  import Header from "../layouts/HeaderApp.vue";
  import Footer from "../layouts/FooterApp.vue";
  import TitlePage from "../components/TitlePage.vue";
  import Button from "../components/Button.vue";
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <TitlePage text="Login" />
      <div class="my-32 flex flex-col items-center justify-center">
        <Button width="3/4 sm:w-1/2">Login</Button>
      </div>
    </main>
    <Footer />
  </section>
</template>
