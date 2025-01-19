<template>
  <div class="relative hidden md:block group">
    <input
      v-model="search"
      type="text"
      class="rounded-full w-[400px] px-4 py-2 border-slate-300 focus:ring-yellow-500 focus:ring-2 focus:border-none dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300
      dark:placeholder:text-slate-500 dark:focus:ring-yellow-700"
      :placeholder="search.length > 0 ? '' : 'Search events'"
    />
    <Icon
      name="mdi:magnify"
      size="24"
      class="absolute top-2 right-4 text-slate-400 hover:text-slate-600 group-focus:text-slate-700"
    />
    <div v-if="open" class="mt-1 origin-top-right absolute bg-white flex flex-col left-0 w-full rounded-md border border-slate-300">
      <a @click="navigateTo(`/events/${event.slug}`)" class="py-2 px-4 block hover:bg-slate-100 cursor-pointer" v-for="event in filteredEvents">{{ event.title }}</a>
      <a @click="navigateTo(`/events#${tag}`)" class="py-2 px-4 block hover:bg-slate-100 cursor-pointer" v-for="tag in filteredTags" :key="tag">{{ tag }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const search = ref<string>('');
const open = ref<boolean>(false);

watch(search, () => {
  if (search.value.length > 0) {
    open.value = true;
  } else {
    open.value = false;
  }
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

const tags = ref<string[]>(["Music", "Food", "Tech", "Business", "Health", "Sports", "Fashion", "Art", "Science", "Education"]);
const events = ref<event[]>([]);
onMounted(() => {
  const storedEvents = localStorage.getItem('events');
  if (storedEvents) {
    events.value = JSON.parse(storedEvents);
  }
  events.value.forEach(event => {
    event.tags.forEach(tag => {
      if (!tags.value.includes(tag)) {
        tags.value.push(tag);
      }
    })
  })
})

watch(events, () => {
  events.value.forEach(event => {
    event.tags.forEach(tag => {
      if (!tags.value.includes(tag)) {
        tags.value.push(tag);
      }
    })
  })
})



const filteredEvents = computed(() => {
  if (search.value.length > 0) {
    return events.value.filter(event => event.title.toLowerCase().includes(search.value.toLowerCase()));
  }
  return events.value
})

const filteredTags = computed(() => {
  if (search.value.length > 0) {
    return tags.value.filter(tag => tag.toLowerCase().includes(search.value.toLowerCase()));
  }
  return tags.value
})

const route = useRoute();

watch(route, () => {
  open.value = false;
})
</script>

<style></style>
