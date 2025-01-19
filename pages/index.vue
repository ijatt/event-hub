<template>
  <div class="py-10">
  <TheCarousell />
    <div class="mt-10 flex w-5/6 lg:w-full space-x-4 max-w-screen-lg mx-auto justify-between items-center lg:px-28 overflow-x-auto">
      <BubbleTab icon="guidance:calendar" text="Events" :isActive="false" @click="(activeTag = 'events', navigateTo('#events'))"/>
      <BubbleTab icon="material-symbols-light:fastfood-outline-sharp" text="Food and Drinks" :isActive="false" @click="(activeTag = 'food', navigateTo('#food'))"/>
      <BubbleTab icon="ph:disco-ball-thin" text="Nightlife" :isActive="false"  @click="(activeTag = 'nightlife', navigateTo('#nightlife'))"/>
      <BubbleTab icon="arcticons:games-2" text="Hobbies" :isActive="false"  @click="(activeTag = 'hobbies', navigateTo('#hobbies'))"/>
      <BubbleTab icon="material-symbols-light:mic-outline" text="Music" :isActive="false"  @click="(activeTag = 'music', navigateTo('#music'))"/>
    </div>
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg mt-10 border-t dark:border-slate-700 border-slate-300 py-4">
      <h1 class="text-2xl font-semibold tracking-wide text-slate-700 dark:text-slate-300">
        Events for you
      </h1>
      <div v-if="!events">
          <ClientOnly>
            <Vue3Lottie 
              :animation-data="eventGif"
              :speed="1"  
              :loop="true"
              :autoplay="true"
              style="width: 300px; height: 300px;"
            />
            <p class="text-slate-600 text-center italic">
              Loading...
            </p>
          </ClientOnly>
        </div>
      <div class="mt-4 flex space-x-4 w-full overflow-x-auto snap-x">
        <template v-if="filteredEvents.length > 0" v-for="event in filteredEvents">
          <EventCard :event="event"  @click="navigateTo(`/events/${event.slug}`)"/>
        </template>
        <p v-else class="italic font-semibold text-gray-600 dark:text-slate-300">No events found in tag <span class="italic">{{ activeTag }}</span>.</p>.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Vue3Lottie } from 'vue3-lottie'
import eventGif from '~/public/eventGif.json'
useHead({
  title: 'EventHub - Find events near you',
  meta: [
    {
      name: 'description',
      content: 'Find events near you'
    }
  ]
})

type event = {
  title: string,
  description: string,
  venue: string,
  address: string
  date: string
  time: string
  end: string
  slug: string
  tags: string[]
  imagePath?: string
}

const events = ref<event[]>([]);

onMounted(() => {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events.value = JSON.parse(storedEvents);
  }
})

const activeTag = ref<string>('');
const filteredEvents = computed(() => {
  if (!activeTag.value) {
    return events.value;
  }
  return events.value.filter(event => event.tags.some(tag => tag.toLowerCase().includes(activeTag.value.toLowerCase())));
})

onUnmounted(() => {
  activeTag.value = '';
})

const tags = ref(useRoute().hash.replace('#', ''));
watch(useRoute(), () => {
  const hash = useRoute().hash;
  if (hash) {
    activeTag.value = hash.replace('#', '');
  } else {
    activeTag.value = '';
  }
})
</script>