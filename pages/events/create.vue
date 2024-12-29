<template>
  <div class="py-10">
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg">
      <form class="w-full">
        <div class="flex w-full justify-between items-center">
          <InputText label="Event Title" v-model="eventTitle" />
          <InputDate v-model="eventDate" label="Event Date" class="ml-4" />
        </div>
        <div class="flex w-full justify-between items-center mt-4">
          <InputTime v-model="eventTime" label="Event Time" />
          <InputTime v-model="eventEnd" label="Event End Time" class="ml-4" />
        </div>
        
        <div class="flex flex-col space-y-1 w-full mt-4">
          <label for="description" class="text-base font-semibold tracking-wide text-gray-600">Event Description</label>
          <textarea id="description" class="w-full border border-gray-300 rounded-md py-2 px-4" v-model="eventDescription"></textarea>
        </div>
        <div class="flex w-full justify-between items-center mt-4">
          <InputText v-model="eventVenue" label="Event Venue"/>
          <InputText v-model="eventAddress" label="Event Address" class="ml-4" />
        </div>
        <div class="flex flex-col space-y-1 w-full mt-4">
          <div class="flex justify-between items-center">
            <p class="text-lg font-semibold tracking-wide text-gray-600">Agenda</p>
          </div>
          <div class="flex gap-x-4 flex-row items-center flex-wrap w-full" >
            <template v-for="(agenda, index) in agendaItems" :key="index">
              <div class="rounded-md mb-2 p-4 bg-yellow-100 w-1/2 flex items-center justify-between">
                <div class="border-l-4 border-yellow-500 pl-4">
                  <p class="text-sm font-semibold tracking-wide text-gray-600">
                    {{ agenda.time }}
                  </p>
                  <p class="text-sm text-gray-600">{{ agenda.title }}</p>
                </div>
                <button class="ml-4" type="button" @click="agendaItems.splice(index, 1)">
                  <Icon name="mdi:close" size="24" class="text-gray-600" />
                </button>
            </div>
            </template>
          </div>
          <div class="flex w-full justify-between items-center mb-2">
            <InputText v-model="agendaTitle" label="Agenda Title" class="mb-2" />
            <InputTime v-model="agendaTime" label="Agenda Time" class="mb-2 ml-4" />
          </div>
          <button @click="addAgenda" type="button" class="w-max ml-auto bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">+ Add</button>
        </div>
        <p class="text-base font-semibold tracking-wide text-gray-600">Tags</p>
        <p>nanti buat</p>
        
        <div class="flex w-full justify-end mt-4">
          <button type="button" class="w-max bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">Create Event</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const eventTitle = ref<string>('');
const eventDescription = ref<string>('');
const eventDate = ref<string>('');
const eventTime = ref<string>('');
const eventEnd = ref<string>('');
const eventVenue = ref<string>('');
const eventAddress = ref<string>('');

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

</script>