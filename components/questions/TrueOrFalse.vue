<template>
  <div>
    <div v-if="editing">
      <div class="form-control my-2 w-full">
        <label class="input-group">
          <span class="min-w-[10rem]">Kérdés</span>
          <input
            type="text"
            v-model="data.name"
            placeholder="Ide írd a kérdést..."
            class="input input-bordered w-full"
            :class="{'border-red-500': !isNameValid}"
            @input="update()"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Automatikus javítás</span>
          <input type="checkbox" v-model="data.auto_grade" class="checkbox" />
        </label>
      </div>
      <div class="form-control">
        <label class="btn-group">
          <span class="min-w-[10rem] rounded-tl-lg px-4 rounded-bl-lg bg-base-300 flex flex-row items-center text-center">Helyes válasz</span>
          <input
            type="radio"
            name="radio-6"
            class="btn bg-base-300 -ml-1 checked:font-extrabold"
            @click="data.answer = true"
            checked
            :disabled="!data.auto_grade"
            data-title="Igaz"
          />
          <input
            type="radio"
            name="radio-6"
            class="btn bg-base-300 checked:border-red-500"
            @click="data.answer = false"
            checked
            :disabled="!data.auto_grade"
            data-title="Hamis"
          />
        </label>
      </div>
    </div>
    <div v-else>
      <h1>{{ data.name }}</h1>
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
  },
  computed: {
    isNameValid() {
      return /^.{5,50}$/gm.test((this.data as any).name as string);
    },
  },
});
</script>
