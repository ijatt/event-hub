<template>
  <div class="flex flex-col space-y-1 w-full">
    <label
      for="title"
      class="text-base font-semibold tracking-wide text-gray-600 dark:text-slate-300"
      >{{ label }}</label
    >
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="date"
      id="title"
      class="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-yellow-500 focus:ring-2 focus:border-none dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:focus:ring-yellow-500 dark:focus:ring-2 dark:focus:border-none"
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
