<template>
  <div class="py-10">
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg">
      <img
        class="rounded-lg h-80 w-full object-cover"
        :src="`https://lxaioewcfoimwcbprcsh.supabase.co/storage/v1/object/public/images/${event?.imagePath}`"
        alt=""
      />
      <div class="flex justify-between items-center mt-10">
        <p class="text-base mb-2 font-semibold tracking-wide text-gray-600 dark:text-slate-300">
          {{ dateAndDay }}
        </p>
        <div class="flex items-center space-x-2">
          <button @click="addToCalendar" class="text-base font-semibold tracking-wide text-gray-600 dark:text-slate-300 px-2 py-1 rounded-md hover:bg-slate-200">
            Add to Calendar
          </button>
        </div>
      </div>
      <div class="w-full md:w-3/4">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white">{{ event?.title }}</h2>
        <p class="text-base my-6 text-gray-600 dark:text-slate-300">
          {{ event?.description }}
        </p>
        <div class="mt-8 bg-yellow-50 dark:bg-slate-800 rounded-md flex items-center py-4 px-6">
          <img
            src="https://cdn.evbstatic.com/s3-build/fe/build/images/427ab8dca801f117ae14301b994842b2-nye_citybrowse_desktop.webp"
            alt=""
            class="rounded-full h-14 w-14 object-cover"
          />
          <p class="ml-4 text-slate-600 dark:text-slate-300">
            By <span class="font-semibold">{{ organizer?.name }}</span>
          </p>
          <a :href="organizer?.link" target="_blank" class="cursor-pointer rounded-md dark:bg-blue-800 bg-blue-400 text-white px-4 py-2 ml-auto">
            Follow
          </a>
        </div>
        <p class="text-xl mt-8 mb-2 text-gray-600 font-bold tracking-wide dark:text-slate-300">
          Date and Time
        </p>
        <div class="flex space-x-4 items-center">
          <Icon name="mdi:calendar" size="24" class="text-gray-600 dark:text-slate-300" />
          <p class="text-sm font-semibold tracking-wide text-gray-600 dark:text-slate-300">
            {{ dateAndDay }} · {{ time }} GMT+8
          </p>
        </div>
        <p class="text-xl mt-8 mb-2 text-gray-600 font-bold tracking-wide dark:text-slate-300">
          Location
        </p>
        <div class="flex space-x-4 items-center">
          <Icon name="mdi:map-marker" size="24" class="text-gray-600 dark:text-slate-300" />
          <div class="flex flex-col">
            <p class="text-sm font-semibold tracking-wide text-gray-600 dark:text-slate-300">
              {{ event?.venue }}
            </p>
            <p class="text-sm text-gray-500 dark:text-slate-300">
              {{ event?.address }}
            </p>
          </div>
        </div>
        <p class="text-xl mt-8 mb-2 text-gray-600 font-bold tracking-wide dark:text-slate-300">
          Agenda
        </p>
        <template v-for="(agenda, index) in event?.agenda">
          <AgendaCard :time="agenda.time" :title="agenda.title" :color="iterateColors(index)" />
        </template>
        <p class="text-xl mt-8 mb-2 text-gray-600 font-bold tracking-wide dark:text-slate-300">
          About this event
        </p>
        <p class="text-base text-gray-600 text-justify dark:text-slate-300">
          New Year's Eve is a major social observance and many parties are held,
          particularly in the evening. The iconic ball drop in New York City is
          often seen as a symbol of the new year, and parties are held in many
          parts of the world, including the United States, Canada, the United
          Kingdom, and Europe.<br /><br />
          The event is held at the World Trade Centre Kuala Lumpur, a 1,000,000
          sq ft (93,000 m2) shopping mall located in the central business
          district of Kuala Lumpur, Malaysia. It is a major shopping destination
          in Malaysia with over 450 retail outlets and a variety of
          entertainment facilities such as a cinema, an ice rink, a bowling
          alley, a karaoke centre, a children's adventure land, a children's
          educational theme park, a concert hall, a signature gourmet store, a
          spa centre, and a fitness centre.
        </p>
        <p class="text-xl mt-8 mb-2 text-gray-600 font-bold tracking-wide dark:text-slate-300">Tags</p>
        <div class="flex space-x-4 flex-wrap" >
          <a href="#" v-for="tag in event?.tags" :key="tag" class="text-sm text-gray-600 hover:text-gray-800 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 dark:text-slate-300">{{ tag }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type AgendaItem = {
  title: string;
  time: string;
};

const path = useRoute().params.slug
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
  agenda: AgendaItem[]
  userId: number
  imagePath?: string
}

type User = {
  id: number,
  username: string,
  password: string,
  name: string,
  email: string,
  role: string,
  orgName: string | undefined,
  link: string | undefined,
  orgAddress: string | undefined,
}

const events = ref<event[]>([]);
const users = ref<User[]>([]);

onMounted(() => {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events.value = JSON.parse(storedEvents);
  }
  const user = JSON.parse(localStorage.getItem('users') || '[]');
  if (users) {
    users.value = user;
  }
})

const event = computed(() => {
  return events.value.find((event) => event.slug === path)
})

const organizer = computed(() => {
  return users.value.find((user: User) => user.id === event.value?.userId)
}) as unknown as User

const dateAndDay = computed(() => {
  if (!event.value) return '';
  const date = new Date(event.value.date);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
})

//return the value of the time like this "8:00 AM - 10:00 PM"
const time = computed(() => {
  if (!event.value) return '';
  return `${event.value.time} - ${event.value.end}`;
})

const iterateColors = (index: number) => {
  const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
  return colors[index % colors.length];
}

const addToCalendar = () => {
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${event.value?.title}&dates=${event.value?.date}/${event.value?.end}&details=${event.value?.description}&location=${event.value?.venue} ${event.value?.address}&sf=true&output=xml`, '_blank');
}
</script>