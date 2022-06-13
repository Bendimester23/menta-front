<template>
  <div class="bg-base-200 p-2 m-2 rounded-lg min-w-[40rem]">
    Kérdés {{ id + 1 }}:
    <div class="form-control w-full my-2">
      <label class="input-group">
        <span class="min-w-[10rem]">Kérdés típusa</span>
        <select class="select select-bordered min-w-[29rem]" v-model="data.type">
          <option disabled :selected="data.type == ``">Válassz egyet</option>
          <option :selected="data.type == `TRUE_FALSE`" value="TRUE_FALSE">
            Igaz-Hamis
          </option>
          <option :selected="data.type == `TEXT_SUBMIT`" value="TEXT_SUBMIT">
            Szöveges válasz
          </option>
        </select>
      </label>
    </div>

    <div class="form-control w-full">
      <label class="input-group">
        <span class="min-w-[10rem]">Pontok</span>
        <input
          type="number"
          placeholder="1"
          value="1"
          min="1"
          max="1000"
          class="input input-bordered w-full"
        />
      </label>
    </div>

    <true-or-false
      v-if="data.type == `TRUE_FALSE`"
      v-bind:data="data"
      :editing="editing"
    />
    <TextInput
      v-if="data.type == `TEXT_SUBMIT`"
      :value="data"
      :editing="editing"
      v-model="data"
      @input="update()"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TrueOrFalse from "./questions/TrueOrFalse.vue";
import TextInput from "./questions/TextInput.vue";

export default Vue.extend({
  components: { TrueOrFalse, TextInput },
  name: `QuestionWrapper`,
  props: {
    editing: Boolean,
    id: Number,
    value: Object,
  },
  data() {
    return {
      data: this.value,
    };
  },
  methods: {
    update() {
      this.$emit(`input`, this.data);
    },
  },
});
</script>