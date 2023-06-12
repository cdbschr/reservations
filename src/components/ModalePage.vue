<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ModalePage",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:modelValue'],
  setup(_props, { emit }) {
    const close = () => {
      emit('update:modelValue', false);
    };

    return { close };
  }
});
</script>

<template>
  <div
v-if="modelValue"
    class="fixed z-10 inset-0 overflow-y-auto" 
    aria-labelledby="modal-title" 
    role="dialog" 
    aria-modal="true"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div 
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity cursor-pointer" 
        aria-hidden="true"
        @click="close"
      ></div>

      <div 
        class="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-3/4 h-3/4"
      >
        <div class="flex flex-col h-full justify-between bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <button 
            class="self-end"
            @click="close"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              class="h-6 w-6 text-gray-600 hover:text-gray-800"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-grow flex items-center justify-center">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
