<template>
  <div class="bg-base-200 p-2 m-2 rounded-lg">
    Kérdés {{id+1}}:
    <div class="form-control w-full max-w-xs">
      <label class="label">
        <span class="label-text">Kérdés típusa</span>
      </label>
      <select class="select select-bordered" v-model="data.type">
        <option disabled :selected="data.type == ``">Válassz egyet</option>
        <option :selected="data.type == `TRUE_FALSE`" value="TRUE_FALSE">Igaz-Hamis</option>
        <option :selected="data.type == `TEXT_SUBMIT`" value="TEXT_SUBMIT">Saját válasz</option>
      </select>
    </div>
    <true-or-false
      v-if="data.type == `TRUE_FALSE`"
      v-bind:data="data"
      :editing="editing"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrueOrFalse from "./questions/TrueOrFalse.vue";
export default Vue.extend({
  components: { TrueOrFalse },
  name: `QuestionWrapper`,
  props: {
    data: Object,
    editing: Boolean,
    id: Number
  },
});
</script>