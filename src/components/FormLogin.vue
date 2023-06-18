<script setup lang="ts">
  import { ref } from "vue";
  import Button from "./Button.vue";
  import { signIn } from "~/repositories/userRepository";

  const email = ref("");
  const password = ref("");

  const login = async () => {
    try {
      await signIn(email.value, password.value);
    } catch (error: unknown) {
      console.log("Error in login:", error);
    }
  };
</script>

<template>
  <form
    class="flex flex-wrap justify-center items-center"
    @submit.prevent="login"
  >
    <input
      id="email"
      v-model="email"
      type="email"
      placeholder="Your email"
      class="w-3/4 border-2 border-gray-300 rounded-md mb-4 px-2 py-1"
      required
    />

    <input
      id="password"
      v-model="password"
      type="password"
      placeholder="Your password"
      class="w-3/4 border-2 border-gray-300 rounded-md mb-4 px-2 py-1"
      required
    />

    <Button type="submit" width="3/4 sm:w-1/2">Se connecter</Button>
  </form>
</template>
