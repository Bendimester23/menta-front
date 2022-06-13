<template>
  <div>
    <div v-if="editing">
      <div class="form-control my-2 w-full">
        <label class="input-group">
          <span class="min-w-[10rem]">Kérdés</span>
          <input
            type="text"
            v-model="name"
            placeholder="Ide írd a kérdést..."
            class="input input-bordered w-full"
            :class="{'border-red-500': !isNameValid}"
            @input="update()"
          />
        </label>
      </div>

      <div class="form-control mb-2 w-full">
        <label class="input-group">
          <span class="min-w-[10rem]">Minimum hossz</span>
          <input
            type="number"
            v-model="min"
            :max="max - 1"
            min="2"
            placeholder="5"
            class="input input-bordered w-full"
            @input="update()"
          />
        </label>
      </div>
      <div class="form-control mb-2 w-full">
        <label class="input-group">
          <span class="min-w-[10rem]">Maximum hossz</span>
          <input
            type="number"
            placeholder="20"
            v-model="max"
            max="200"
            :min="min + 1"
            class="input input-bordered w-full"
            @input="update()"
          />
        </label>
      </div>

      <div class="form-control">
        <label class="label cursor-pointer">
          <span class="label-text">Automatikus javítás</span>
          <input type="checkbox" v-model="auto_grade" class="checkbox" @input="update()" />
        </label>
      </div>
      <div v-if="auto_grade">
        <div class="form-control">
          <label class="label cursor-pointer">
            <span class="label-text"
              >Kis- és nagybetűk megkülönböztetése(nagyon durván
              diszkriminatív)</span
            >
            <input
              type="checkbox"
              v-model="case_sensitive"
              class="checkbox"
              @input="update()"
            />
          </label>
        </div>
        <h2 class="ml-1">Elfogadott válaszok:</h2>
        <div class="rounded m-2 p-2 bg-base-300">
          <div
            class="flex flex-row w-full mb-2"
            v-for="(ans, i) in answers"
            v-bind:key="i"
          >
            <input
              type="text"
              placeholder="Ide írj"
              :minlength="min"
              :maxlength="max"
              class="input input-bordered w-full mr-2"
              :class="{'border-red-600': answers[i].length < min || answers[i].lenght > max}"
              v-model="answers[i]"
              @input="update()"
            />
            <button
              class="btn btn-error font-bold"
              @click="removeAnswer(i)"
            >
              X
            </button>
          </div>
          <button class="btn btn-primary bg-purple-600 w-full font-bold text-4xl" @click="addNewAnswer()">+</button>
        </div>
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
  name: `TextInput`,
  props: {
    value: Object,
    editing: Boolean,
  },
  data() {
    return {
      answers: this.value?.answers || [],
      min: this.value?.min || 5,
      max: this.value?.max || 20,
      name: this.value?.name || ``,
      case_sensitive: this.value?.case_sensisive || false,
      auto_grade: this.value?.auto_grade || true,
    }
  },
  mounted() {
  },
  computed: {
    isNameValid() {
      return /^.{5,50}$/gm.test((this as any).name as string);
    },
  },
  methods: {
    addNewAnswer() {
      this.answers.push(``);
      this.update();
    },
    removeAnswer(i: number) {
      this.answers.splice(i, 1);
      this.update();
    },
    update() {
      this.$emit(`input`, {
        answers: this.answers,
        type: `TEXT_SUBMIT`,
        name: this.name,
        min: this.min,
        max: this.max,
        case_sensitive: this.case_sensitive,
        auto_grade: this.auto_grade,
      })
    }
  },
});
</script>

