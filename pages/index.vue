<template>
  <div class="py-10">
    <TheCarousell />
    <div class="mt-10 flex w-full justify-between items-center px-28">
      <BubbleTab icon="guidance:calendar" text="Events" />
      <BubbleTab icon="material-symbols-light:fastfood-outline-sharp" text="Food and Drinks" />
      <BubbleTab icon="ph:disco-ball-thin" text="Nightlife" />
      <BubbleTab icon="arcticons:games-2" text="Hobbies" />
      <BubbleTab icon="material-symbols-light:mic-outline" text="Music" />
    </div>
    <div class="mt-10 border-t border-slate-300 py-4">
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

<script lang="ts" setup></script>

<style></style>
