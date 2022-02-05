<template>
  <div class="m-2 p-2">
    <h1 class="my-auto text-xl">Counter: {{ num }}</h1>
    <button @click="num++" class="bg-green-500">
      Increment
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: `Counter`,
    data: () => ({
        num: 0
    })
})
</script>