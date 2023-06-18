<script setup lang="ts">
  import { ref } from "vue";
  import Header from "~/layouts/HeaderApp.vue";
  import Footer from "~/layouts/FooterApp.vue";
  import { updateUserTrigram } from "~/repositories/userRepository";
  import TitlePage from "~/components/TitlePage.vue";
  import Button from "~/components/Button.vue";
  import { supabase } from "~/repositories/supabaseClient";

  const trigram = ref("");

  const submitForm = async (event: Event) => {
    event.preventDefault();

    const userId = (await supabase.auth.getUser())?.data.user?.id;

    if (userId && trigram.value) {
      const { error } = await updateUserTrigram(
        userId as string,
        trigram.value.toUpperCase()
      );

      if (error) {
        console.error(
          "Erreur lors de la mise à jour du trigramme de l'utilisateur :",
          error.message
        );
      } else {
        window.location.href = "/";
      }
    } else {
      console.error("UserId ou trigramme non fournis");
    }
  };
</script>

<template>
  <section class="flex flex-col min-h-screen">
    <Header />
    <main>
      <TitlePage text="Trigram" />
      <p class="mx-5 text-center">
        Veuillez initialiser votre trigramme afin de pouvoir réserver avec votre
        compte.
      </p>
      <div class="mt-10 flex flex-wrap justify-center">
        <form @submit="submitForm">
          <input
            id="trigram"
            v-model="trigram"
            type="text"
            class="w-full border-2 border-gray-300 rounded-md mb-4 px-2 py-1"
            placeholder="Votre trigramme"
            required
          />
          <Button type="submit" width="full sm:w-1/2">Valider</Button>
        </form>
      </div>
    </main>
    <Footer />
  </section>
</template>
