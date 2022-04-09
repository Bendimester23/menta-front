<template>
  <div>
    <div v-if="editing">
      <input type="text" class="input" placeholder="Kérdés" v-model="data.name">
      <button class="btn bg-green-600">Persze hogy igaz</button>
      <button class="btn bg-red-600">Buta vagy</button>
    </div>
    <div v-else>
      <h1>Igaz vagy hamis?</h1>
      <h4>Béla buta</h4>
      <button class="btn bg-green-600">Persze hogy igaz</button>
      <button class="btn bg-red-600">Buta vagy</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `TrueOrFalse`,
  props: {
    data: Object,
    editing: Boolean,
  }
});
</script>
