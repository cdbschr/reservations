<script lang="ts">
import { ref } from 'vue';
import AccountIcon from '../assets/AccountIcon.vue';

export default {
  components: {
    AccountIcon,
  },
  setup() {
    const isPopoverVisible = ref(false);

    const showPopover = () => {
      isPopoverVisible.value = true;
    };

    const hidePopover = () => {
      isPopoverVisible.value = false;
    };

    return {
      isPopoverVisible,
      showPopover,
      hidePopover,
    };
  },
};
</script>


<template>
  <div 
    class="relative" 
    @mouseenter="showPopover" 
    @mouseleave="hidePopover"
  >
    <AccountIcon color="#D1D1D1" size="100"/>
    <div 
      v-show="isPopoverVisible" 
      class="absolute bg-white text-black text-center py-2 px-4 rounded shadow-lg bottom-10"
    >
      Deconnexion
    </div>
  </div>
</template>
