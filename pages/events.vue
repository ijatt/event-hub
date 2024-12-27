<template>
  <div class="py-10">
    <div class="w-full max-w-screen-lg mx-auto rounded-lg relative">
      <img class="rounded-lg h-80 w-full object-cover" src="https://myareanetwork-photos.s3.amazonaws.com/editorphotos/f/34957_1560182022.jpg" alt="">
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-transparent to-transparent rounded-lg p-10">
        <div class="space-y-2">
          <h1 class="text-4xl font-semibold text-white">Best event in</h1>
          <h2 class="text-5xl font-bold text-white">Shah Alam</h2>
          <p class="text-base hidden lg:block text-white w-1/2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div
          class="bg-yellow-500 flex items-center rounded-full text-black font-semibold tracking-wide py-2 px-4 cursor-pointer hover:bg-yellow-600 w-max mt-4"
        >
          <Icon name="mdi:map-marker" size="24" class="inline-block mr-2" />
          <span>Shah Alam</span>
          <Icon name="mdi:chevron-down" size="24" class="inline-block ml-2" />
        </div>
      </div>
    </div>
    <div class="mt-10 flex flex-row w-full justify-center px-10 lg:px-0 md:justify-between max-w-screen-lg mx-auto items-center flex-wrap">
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
      <EventCard />
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'EventHub - Events',
  meta: [
    {
      name: 'description',
      content: 'Find events near you'
    }
  ]
})
</script>