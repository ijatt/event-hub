<template>
  <div class="py-10">
    <TheCarousell />
    <div class="mt-10 flex w-5/6 lg:w-full space-x-4 max-w-screen-lg mx-auto justify-between items-center lg:px-28 overflow-x-auto">
      <BubbleTab icon="guidance:calendar" text="Events" />
      <BubbleTab icon="material-symbols-light:fastfood-outline-sharp" text="Food and Drinks" />
      <BubbleTab icon="ph:disco-ball-thin" text="Nightlife" />
      <BubbleTab icon="arcticons:games-2" text="Hobbies" />
      <BubbleTab icon="material-symbols-light:mic-outline" text="Music" />
    </div>
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg mt-10 border-t border-slate-300 py-4">
      <h1 class="text-2xl font-semibold tracking-wide text-slate-700">
        Events in Shah Alam
      </h1>
      <div class="mt-4 flex space-x-4 w-full overflow-x-auto snap-x">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'EventHub - Find events near you',
  meta: [
    {
      name: 'description',
      content: 'Find events near you'
    }
  ]
})
</script>