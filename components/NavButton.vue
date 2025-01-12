<template>
  <div
    class="text-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 whitespace-nowrap font-semibold tracking-wide px-2 lg:px-3 py-1 hover:bg-slate-300 transition-all ease-in-out cursor-pointer rounded-full"
  >
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<style></style>
