<script lang="ts">
  import { defineComponent, PropType } from "vue";

  export default defineComponent({
    name: "SelectContent",
    props: {
      name: {
        type: String as PropType<string>,
        required: true,
      },
      data: {
        type: Array as PropType<any[] | null>,
        required: true,
      },
      modelValue: {
        type: String as PropType<string>,
        default: "",
        required: false,
      },
    },
    emits: ["update:modelValue"],
    data() {
      return {
        selected: this.modelValue,
      };
    },
    computed: {
      id(): string {
        return `${this.name}-select`;
      },
    },
    watch: {
      modelValue(newVal) {
        this.selected = newVal;
      },
    },
    methods: {
      emitChange() {
        this.$emit("update:modelValue", this.selected);
      },
    },
  });
</script>

<template>
  <select
    :id="id"
    v-model="selected"
    :name="name"
    class="form-select block w-full py-2 px-3 border border-gray-500 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
    @change="emitChange"
  >
    <option disabled value="">Veuillez sélectionner une {{ name }}</option>
    <option v-for="item in data" :key="item.value" :value="item.value">
      {{ item.text }}
    </option>
  </select>
</template>
