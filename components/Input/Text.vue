<template>
  <div class="flex flex-col space-y-1 w-full">
    <label
      for="title"
      class="text-base font-semibold tracking-wide text-gray-600"
      >{{ label }}</label
    >
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      id="title"
      class="w-full border border-gray-300 rounded-md py-2 px-4"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: string;
  label?: string;
  
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<style></style>
