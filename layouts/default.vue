<template>
  <div>
    <div
      class="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto "
    >
      <nav
        class="px-4 md:px-20 fixed top-0 left-0 dark:bg-slate-900 dark:bg-opacity-80 py-4 w-full border-b border-slate-300 z-10 bg-white"
      >
        <div class="flex w-full justify-between items-center">
          <TheLogo @click="navigateTo('/')" />
          <NavSearch />
          <div class="hidden items-center space-x-4 lg:flex">
            <NavButton text="Create Events" />
            <NavButton @click="navigateTo('/events')" text="Events" />
            <NavButton text="About" />
            <NavButton text="Contact" />
            <NavButton text="Register" />
            <div
              class="bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md cursor-pointer hover:bg-yellow-600"
            >
              Login
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
      <footer class="border-t border-slate-300 py-4">
        <p class="text-center text-slate-600 font-semibold tracking-wide">
          &copy; 2024 EventHub. All rights reserved.
        </p>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavButton from '~/components/NavButton.vue';


</script>

<style>

</style>