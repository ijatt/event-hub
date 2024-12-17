<template>
  <div class="relative w-5/6 lg:w-full max-w-screen-lg mx-auto overflow-hidden">
    <div
      class="flex transition-transform duration-500 ease-in-out"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full flex-shrink-0"
      >
        <img
          :src="slide"
          alt="Carousel Slide"
          class="mx-auto w-full lg:w-full h-40 lg:h-80 object-cover rounded-lg"
        />
      </div>
    </div>

    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    >
      ❮
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
    >
      ❯
    </button>
    <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-3 h-3 rounded-full cursor-pointer',
          index === currentIndex ? 'bg-yellow-500' : 'bg-gray-400',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
const slides = [
  'https://cdn.evbstatic.com/s3-build/fe/build/images/427ab8dca801f117ae14301b994842b2-nye_citybrowse_desktop.webp',
  'https://cdn.evbstatic.com/s3-build/fe/build/images/38704ac58762310b375e6fed15bef2f5-nye_category_desktop.webp',
  'https://cdn.evbstatic.com/s3-build/fe/build/images/f55095eaf945235b290443c5c0827da1-nye_nightlife_desktop.webp',
  'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/landscape-event-flyer-template-4cca730db0c244cb05611c3d52a3134f_screen.jpg?ts=1561392110'
]

const currentIndex = ref(0)
const autoplayInterval = ref(null)

function prevSlide() {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : slides.length - 1
}

function nextSlide() {
  currentIndex.value =
    currentIndex.value < slides.length - 1 ? currentIndex.value + 1 : 0
}

function goToSlide(index) {
  currentIndex.value = index
}

function startAutoplay() {
  autoplayInterval.value = setInterval(() => {
    nextSlide()
  }, 4000) 
}

function stopAutoplay() {
  clearInterval(autoplayInterval)
}

onMounted(() => {
  startAutoplay()
})
</script>

