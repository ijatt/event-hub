<template>
  <div class="flex justify-center flex-col">
        <div class="rounded-full p-6 border border-slate-300 flex items-center w-max cursor-pointer hover:shadow-md">
          <Icon :name="icon" size="48" class="text-slate-500" />
        </div>
        <p class="text-sm text-slate-600 text-nowrap text-center mt-1">{{ text }}</p>
      </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string;
  text: string;
}>()
</script>

<style>

</style>