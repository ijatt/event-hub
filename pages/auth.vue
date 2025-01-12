<template>
  <div class="py-10">
    <div class="mx-auto w-5/6 lg:w-full max-w-screen-lg">
      <h1 class="text-2xl font-bold text-center text-slate-600 mb-4">Create an account</h1>
      <form @submit.prevent="register" class="w-full flex justify-center">
        <div class="w-2/5 flex flex-col gap-4">
          <InputText v-model="username" label="Username"/>
          <InputText v-model="password" label="Password"/>
          <InputText v-model="name" label="Name"/>
          <InputText v-model="email" label="Email"/>
          <div class="flex w-full justify-end">
            <button type="submit" class="w-max bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600">
              <span v-if="!loading">Register</span>
              <Icon v-else="loading" name="line-md:loading-alt-loop"/>
            </button>  
          </div>
        </div>
      </form>
    </div>
    
  </div>
</template>

<script lang="ts" setup>
const username = ref<string>('');
const password = ref<string>('');
const name = ref<string>('');
const email = ref<string>('');
const loading = ref<boolean>(false);

type User = {
  username: string,
  password: string,
  name: string,
  email: string,
}
const register = () => {
  if (!username.value || !password.value || !name.value || !email.value) {
    toastError('Registration failed', 'Please fill all fields');
    return;
  }

  loading.value = true;
  const user: User = {
    username: username.value,
    password: password.value,
    name: name.value,
    email: email.value,
  }
  
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find((u: User) => u.username === user.username)) {
    toastError('Registration failed', 'Username already exists');
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } else {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    toastSuccess('Registration successful', 'User registered successfully');
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
  username.value = '';
  password.value = '';
  name.value = '';
  email.value = '';
}
</script>

<style>

</style>