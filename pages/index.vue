<template>
  <div class="flex flex-col m-0 p-0">
    <Hero />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Hero from '@/components/home/Hero.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: {
    Hero
  },
  auth: false
})
</script>
