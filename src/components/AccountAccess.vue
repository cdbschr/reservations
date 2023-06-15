<script lang="ts">
  import { ref } from "vue";
  import AccountIcon from "../assets/AccountIcon.vue";

  export default {
    components: {
      AccountIcon,
    },
    setup() {
      const isPopoverVisible = ref(false);

      const togglePopover = () => {
        isPopoverVisible.value = !isPopoverVisible.value;
      };

      return {
        isPopoverVisible,
        togglePopover,
      };
    },
  };
</script>

<template>
  <div class="relative inline-block" @click="togglePopover">
    <AccountIcon color="#1E1E1E" size="50" />
    <div
      v-show="isPopoverVisible"
      class="absolute right-[5px] mt-2 bg-[#f9f9fa] text-primary text-center py-2 px-4 rounded shadow-lg popover"
    >
      Deconnexion
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
