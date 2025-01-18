<template>
  <div class="dark:bg-slate-900">
    <div
      class="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto"
    >
      <nav
        class="z-50 px-4 md:px-20 fixed top-0 left-0 dark:bg-slate-900 dark:bg-opacity-80 py-4 w-full border-b border-slate-300 z-10 bg-white dark:text-white dark:border-slate-600"
      >
        <div class="flex w-full justify-between items-center">
          <TheLogo @click="navigateTo('/')" />
          <NavSearch />
          <div class="hidden items-center space-x-4 lg:flex">
            <NavButton @click="Object.keys(currentUser).length === 0 ? (isOpen = true, content = 'login') : navigateTo('/events/create')" text="Create Events" />
            <NavButton @click="navigateTo('/events')" text="Events" />
            <NavButton @click="navigateTo('/about')" text="About" />
            <NavButton v-if="Object.keys(currentUser).length === 0" @click="navigateTo('/auth')" text="Register" />
            <div
              v-if="Object.keys(currentUser).length === 0"
              @click="isOpen = true, content = 'login'"
              class="bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600"
            >
              Login
            </div>

            <div
              v-else
              @click="isOpen = true, content = 'logout'"
              class="bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600"
            >
              Logout
            </div>
            <div class="flex items-center space-x-2 cursor-pointer">
              <button
                class="p-2 rounded-full hover:bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
                @click="toggleDarkMode"
                aria-label="Toggle Dark Mode"
              >
                <Icon
                  :name="isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'"
                  size="24"
                  class="text-gray-600 dark:text-gray-300"
                />
              </button>
            </div>
          </div>
          <Icon
              name="mdi:menu"
              size="24"
              class="text-slate-600 hover:text-slate-800 lg:hidden"
            />
        </div>
      </nav>
      <main class="mt-20">
        <slot />
      </main>
      <footer class="border-t border-slate-300 py-4 dark:border-slate-700">
        <p class="text-center text-slate-600 font-semibold tracking-wide dark:text-slate-300">
          &copy; 2024 EventHub. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
  <UModal v-model="isOpen">
    <div class="px-4 py-8" v-if="content === 'login'">
      <h1 class="text-2xl font-bold text-center text-slate-600 mb-4 dark:text-slate-200">Login</h1>
      <form @submit.prevent="login" class="w-full flex justify-center">
        <div class="w-4/5 flex flex-col gap-4">
          <InputText v-model="username" label="Username"/>
          <InputText v-model="password" label="Password"/>
          <div class="flex w-full justify-end">
            <p class="text-slate-600 text-sm dark:text-slate-300">Doesn't have an account? <a @click="(navigateTo('/auth'), isOpen = false)" class="dark:text-slate-300 cursor-pointer dark:hover:text-yellow-500 hover:underline hover:text-yellow-500">Register</a></p>
          </div>
          <div class="flex w-full justify-end">
            <button type="submit" class="w-max bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">
              <span v-if="!loading">Login</span>
              <Icon v-else="loading" name="line-md:loading-alt-loop"/>
            </button>  
          </div>
        </div>
      </form>
    </div>
    <div class="px-8 py-8" v-if="content === 'logout'">
      <p class="text-slate-700 dark:text-slate-300">Are you sure want to logout?</p>
      <div class="flex w-full justify-end gap-2">
        <button @click="isOpen = false" class="bg-slate-300 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600 dark:bg-slate-600 dark:text-slate-200">No</button>
        <button @click="logout" class="bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">Yes</button>
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
const isOpen = ref<boolean>(false);
const username = ref<string>('');
const password = ref<string>('');
const loading = ref<boolean>(false);
const content = ref<string>('');
const isDarkMode = ref<boolean>(false);

type User = {
  username: string,
  password: string,
  name: string,
  email: string,
}

const login = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  loading.value = true;
  
  const user = users.find((u: User) => u.username === username.value && u.password === password.value);
  if (user) {
    toastSuccess('Login successful', 'Welcome back ' + user.name + '!');
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    currentUser.value = user;

    setTimeout(() => {
      loading.value = false;
      isOpen.value = false;
      username.value = '';
      password.value = '';
    }, 1000);
  } else {
    toastError('Login failed', 'Invalid username or password');
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
}

const logout = () => {
  localStorage.removeItem('loggedInUser');
  currentUser.value = {} as User;
  isOpen.value = false;
  navigateTo('/');
}

const currentUser = ref<User>({} as User);
onMounted(() => {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  if (loggedInUser) {
    currentUser.value = loggedInUser;
  }
  if (localStorage.getItem('darkMode') == 'true') {
    isDarkMode.value = true;
    document.documentElement.classList.add('dark');
  }
})

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', isDarkMode.value.toString());
}
</script>

<style>

</style>