<template>
  <div class="w-[300px] dark:bg-slate-700 rounded-md shrink-0 hover:shadow-lg mb-2 cursor-pointer" @click="navigateTo('/events/slugss')">
    <img
      src="https://cdn.evbstatic.com/s3-build/fe/build/images/427ab8dca801f117ae14301b994842b2-nye_citybrowse_desktop.webp"
      class="h-40 aspect-video object-cover rounded-t-md"
      alt=""
    />
    <div class="py-2 px-4">
      <h2 class="text-lg font-semibold text-slate-700 dark:text-slate-200">{{ event.title }}</h2>
      <p class="text-slate-600 text-sm font-bold dark:text-slate-300">{{ event.date }}</p>
      <p class="mt-1 text-slate-600 text-sm dark:text-slate-300">{{ event.venue }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
type event = {
  title?: string,
  description?: string,
  venue?: string,
  address?: string
  date?: string
  time?: string
  end?: string
}

const props = defineProps<{
  event: event;
}>()
</script>

<style></style>
