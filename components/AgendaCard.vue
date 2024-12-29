<template>
  <div class="rounded-md mb-2 p-4" :class="colors.bg">
    <div class="border-l-4 pl-4" :class="colors.border">
      <p class="text-sm font-semibold tracking-wide text-gray-600">{{ time }}</p>
      <p class="text-sm text-gray-600">{{ title }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  time: string
  title: string
  color: string
}>()

const colors = computed(() => {
  if (props.color === 'red') {
    return {
      border: 'border-red-500',
      bg: 'bg-red-100'
    }
  } else if (props.color === 'blue') {
    return {
      border: 'border-blue-500',
      bg: 'bg-blue-100'
    }
  } else if (props.color === 'green') {
    return {
      border: 'border-green-500',
      bg: 'bg-green-100'  
    }
  } else if (props.color === 'yellow') {
    return {
      border: 'border-yellow-500',
      bg: 'bg-yellow-100'
    }
  } else {
    return {
      border: 'border-gray-500',
      bg: 'bg-gray-100'
    }
  }
})
</script>

<style></style>
