<template>
  <div class="flex justify-center flex-col ">
        <div class="rounded-full p-4 border border-slate-300 flex items-center w-max cursor-pointer hover:shadow-md dark:shadow-slate-700">
          <Icon :name="icon" size="32" class="text-slate-500 dark:text-slate-300" />
        </div>
        <p class="text-sm text-slate-600 text-nowrap text-center mt-1 dark:text-slate-300">{{ text }}</p>
      </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  text: string;
  isActive: boolean;
}>()
</script>

<style>

</style>