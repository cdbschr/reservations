<script lang="ts">
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import AccountIcon from "~/assets/AccountIcon.vue";
  import { signOut, isUserAuthenticated } from "~/repositories/userRepository";

  export default {
    components: {
      AccountIcon,
    },
    setup() {
      const isPopoverVisible = ref(false);
      const menuLinksAuthenticated = ref<{ path: string; label: string }[]>([]);
      const menuLinksUnauthenticated = ref<{ path: string; label: string }[]>([
        { path: "/login", label: "Login" },
      ]);
      const displayedLinks = ref<{ path: string; label: string }[]>([]);
      const route = useRoute();

      const togglePopover = () => {
        isPopoverVisible.value = !isPopoverVisible.value;
      };

      onMounted(async () => {
        const authenticated = await isUserAuthenticated();
        const menuLinks = [
          { path: "/", label: "Accueil" },
          { path: "/reservation", label: "Réservation" },
          { path: "/my-reservations", label: "Mes réservations" },
          { path: "/free-places", label: "Places libres" },
        ];
        if (authenticated) {
          menuLinksAuthenticated.value = menuLinks;
          displayedLinks.value = menuLinksAuthenticated.value.filter(
            (link) => link.path !== route.path
          );
        } else {
          displayedLinks.value = menuLinksUnauthenticated.value;
        }
      });
      const logout = async () => {
        try {
          await signOut();
          window.location.href = "/";
        } catch (error) {
          console.log("Erreur lors de la déconnexion :", error);
        }
      };

      return {
        isPopoverVisible,
        togglePopover,
        displayedLinks,
        logout,
      };
    },
  };
</script>

<template>
  <div class="relative inline-block" @click="togglePopover">
    <AccountIcon color="#1E1E1E" size="50" />
    <div
      v-show="isPopoverVisible"
      class="absolute right-[5px] mt-2 bg-[#f9f9fa] text-primary text-right py-2 px-4 rounded shadow-lg min-w-max z-20 popover"
    >
      <div v-for="link in displayedLinks" :key="link.path" class="my-[0.1rem]">
        <router-link :to="link.path">
          {{ link.label }}
        </router-link>
      </div>
      <hr class="border-t border-primary my-1" />
      <div @click="logout">Deconnexion</div>
    </div>
  </div>
</template>

<style scoped>
  .popover::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f9f9fa;
    filter: drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.1));
  }
</style>
