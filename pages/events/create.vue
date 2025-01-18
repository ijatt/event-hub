<template>
  <div class="py-10">
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg">
      <h1 class="text-2xl font-bold text text-slate-600 mb-8 dark:text-slate-300">Create an event</h1>
      <form class="w-full" @submit.prevent="createEvent">
        <div class="flex w-full flex-col mb-8 relative">
          <input type="file" ref="file" @change="fileChange" class="hidden" />
          <img :src="imagePreview" alt=""
            class="w-3/4 mx-auto h-80 object-cover rounded-md"
          >
          <button @click="file.click()" type="button" class="absolute top-1/2 right-1/2 translate-x-1/2 z-10 bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">Upload Image</button>
        </div>
        <div class="flex w-full justify-between items-center">
          <InputText label="Event Title" v-model="eventTitle" />
          <InputDate v-model="eventDate" label="Event Date" class="ml-4" />
        </div>
        <div class="flex w-full justify-between items-center mt-4">
          <InputTime v-model="eventTime" label="Event Time" />
          <InputTime v-model="eventEnd" label="Event End Time" class="ml-4" />
        </div>
        
        <div class="flex flex-col space-y-1 w-full mt-4">
          <label for="description" class="text-base font-semibold tracking-wide text-gray-600 dark:text-slate-300">Event Description</label>
          <textarea id="description" class="w-full border border-gray-300 rounded-md py-2 px-4 focus:ring-yellow-500 focus:ring-2 focus:border-none dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:focus:ring-yellow-500 dark:focus:ring-2 dark:focus:border-none" v-model="eventDescription"></textarea>
        </div>
        <div class="flex w-full justify-between items-center mt-4">
          <InputText v-model="eventVenue" label="Event Venue"/>
          <InputText v-model="eventAddress" label="Event Address" class="ml-4" />
        </div>
        <div class="flex flex-col space-y-4 w-full mt-4">
  <!-- Agenda Header -->
  <div class="flex justify-between items-center">
    <p class="text-lg font-semibold tracking-wide text-gray-700 dark:text-slate-300">Agenda</p>
  </div>
  <div class="flex flex-wrap items-center gap-4">
    <InputText v-model="agendaTitle" label="Agenda Title" class="flex-1" />
    <InputTime v-model="agendaTime" label="Agenda Time" class="flex-1" />
    <button
      @click="addAgenda"
      type="button"
      class="bg-yellow-500 text-black font-semibold tracking-wide py-2 mt-6 px-6 rounded-md hover:bg-yellow-600 transition"
    >
      + Add
    </button>
  </div>
  <div class="flex flex-col space-y-2 w-full">
    <template v-for="(agenda, index) in agendaItems" :key="index">
      <div class="flex items-center justify-between bg-yellow-100 border border-yellow-200 py-2 px-2 rounded-md">
        <div class="flex flex-col border-l-4 border-yellow-500 pl-4">
          <p class="text-xs font-semibold text-gray-800">{{ agenda.time }}</p>
          <p class="text-xs text-gray-600">{{ agenda.title }}</p>
        </div>
        <button type="button" @click="agendaItems.splice(index, 1)" class="ml-4 p-1 text-gray-500 hover:text-gray-800">
          <Icon name="mdi:close" size="20" class="text-yellow-500" />
        </button>
      </div>
    </template>
  </div> 
</div>
        <p class="text-base font-semibold tracking-wide mt-2 text-gray-600 dark:text-slate-300">Tags</p>
        <div>
        <div class="flex flex-wrap gap-2 mt-2">
          <button
            v-for="tag in predefinedTags"
            :key="tag"
            type="button"
            :class="{
              'bg-yellow-500 text-white': selectedTags.includes(tag),
              'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200': !selectedTags.includes(tag),
            }"
            class="px-4 py-2 text-xs rounded-full cursor-pointer"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
        <div class="flex items-center gap-2 mt-4 w-2/5">
          <input type="text" v-model="customTag" class="w-full border border-gray-300 rounded-md py-2 px-2 text-xs focus:ring-yellow-500 focus:ring-2 focus:border-none dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:focus:ring-yellow-500 dark:focus:ring-2 dark:focus:border-none" placeholder="Custom Tag" />
        <button
          type="button"
          @click="addCustomTag"
          class="bg-yellow-500 text-xs text-black font-bold px-4 py-2 rounded-lg"
          :disabled="!customTag.trim()"
        >
          Add
        </button>
        </div>
        <div>
      <div class="flex flex-wrap gap-2 mt-2">
        <span
          v-for="tag in selectedTags"
          :key="tag"
          class="bg-yellow-500 text-white text-xs px-4 py-2 rounded-full"
        >
          {{ tag }}
          <button @click="removeTag(tag)" class="ml-2 text-xs text-white" type="button">×</button>
        </span>
      </div>
    </div>
      </div>
        
        <div class="flex w-full justify-end mt-4">
          <button type="submit" class="w-max bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">Create Event</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
type event = {
  title: string,
  description: string,
  venue: string,
  address: string
  date: string
  time: string
  end: string
  slug: string
  agenda: AgendaItem[]
  tags: string[]
  userId: number
  imagePath?: string
}

const currentUser = ref<User>({} as User);
onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
})

const predefinedTags = ['Music', 'Food', 'Tech', 'Business', 'Health', 'Sports', 'Fashion', 'Art', 'Science', 'Education'];
const selectedTags = ref<string[]>([]);
const customTag = ref<string>('');

const toggleTag = (tag: string) => {
  if (selectedTags.value.includes(tag)) {
    selectedTags.value = selectedTags.value.filter((t) => t !== tag);
  } else {
    selectedTags.value.push(tag);
  }
};

const addCustomTag = () => {
  const trimmedTag = customTag.value.trim();
  if (trimmedTag && !selectedTags.value.includes(trimmedTag)) {
    selectedTags.value.push(trimmedTag);
    customTag.value = '';
  }
}

const removeTag = (tag: string) => {
  selectedTags.value = selectedTags.value.filter((t) => t !== tag);
}

const eventTitle = ref<string>('');
const eventDescription = ref<string>('');
const eventDate = ref<string>('');
const eventTime = ref<string>('');
const eventEnd = ref<string>('');
const eventVenue = ref<string>('');
const eventAddress = ref<string>('');
const imageFile = ref<File | null>(null);
const imagePreview = ref<string>('https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg');
const imagePath = ref<string>('');
const file = ref<HTMLInputElement | null>(null);

type AgendaItem = {
  title: string;
  time: string;
};

const agendaItems = ref<AgendaItem[]>([]);

const agendaTitle = ref<string>('');
const agendaTime = ref<string>('');

const addAgenda = () => {
  if (agendaTime.value !== '' && agendaTitle.value !== '') {
    agendaItems.value.push({
    title: agendaTitle.value,
    time: agendaTime.value,
  }); 
  agendaTitle.value = '';
  agendaTime.value = '';
  }
};

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ +/g, '-');
}

const fileChange = (e: Event) => {
  const selectedFile = file.value?.files?.[0];
  if (selectedFile) {
    imageFile.value = selectedFile;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    }
    reader.readAsDataURL(selectedFile);
  }
}

const createEvent = async () => {
  if (imageFile.value) {
    const path = await uploadImage(imageFile.value);
    if (path) {
      toastSuccess('Image uploaded', 'Your image has been uploaded successfully');
      imagePath.value = path;
    }
  }

  const event: event = {
    title: eventTitle.value,
    description: eventDescription.value,
    venue: eventVenue.value,
    address: eventAddress.value,
    date: eventDate.value,
    time: eventTime.value,
    end: eventEnd.value,
    slug: createSlug(eventTitle.value),
    agenda: agendaItems.value,
    tags: selectedTags.value,
    userId: currentUser.value.id,
    imagePath: imagePath.value,
  }

  const events = localStorage.getItem('events');
  if (events) {
    const parsedEvents = JSON.parse(events);
    parsedEvents.push(event);
    localStorage.setItem('events', JSON.stringify(parsedEvents));
  } else {
    localStorage.setItem('events', JSON.stringify([event]));
  }
  toastSuccess('Event Created', 'Your event has been created successfully');
  eventTitle.value = '';
  eventDescription.value = '';
  eventVenue.value = '';
  eventAddress.value = '';
  eventDate.value = '';
  eventTime.value = '';
  eventEnd.value = '';
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
</script>