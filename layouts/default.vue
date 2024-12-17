<template>
  <div>
    <div
      class="max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto "
    >
      <nav
        class="px-10 md:px-20 fixed top-0 left-0 dark:bg-slate-900 dark:bg-opacity-80 py-4 w-full border-b border-slate-300 z-10"
      >
        <div class="flex w-full justify-between">
          <TheLogo />
          <NavSearch />
          <div class="hidden items-center space-x-4 lg:flex">
            <NavButton text="Home" />
            <NavButton text="Events" />
            <NavButton text="About" />
            <NavButton text="Contact" />
            <div
              class="bg-yellow-500 text-black font-semibold tracking-wide py-1 px-4 rounded-md"
            >
              Register
            </div>

          </div>
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

</script>

<style>

</style>