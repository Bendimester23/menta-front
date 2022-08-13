<template>
  <div class="flex flex-col m-2 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16 mt-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
    <h1 class="text-center text-2xl font-bold">Dolgozat létrehozása</h1>
    <div class="m-20 flex flex-col card bordered p-4">
      <TextInput
        placeholder="név"
        v-model="exam_name"
        label="Dolgozat neve"
        :footer="
          isNameValid ? `` : `Legalább 6 és legfejjebb 22 karakter lehet.`
        "
      />
      <TextInput
        placeholder="leírás"
        v-model="exam_description"
        label="Dolgozat leírása"
        :footer="
          isDescValid ? `` : `Legalább 2 és legfejjebb 300 karakter lehet.`
        "
      />
      <div class="form-control">
        <button
          :class="`btn ${isNameValid && isDescValid ? `btn-primary` : `btn-disabled`} mt-2`"
          :disabled="!isNameValid"
          @click="create"
          >Létrehozás</button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "~/components/ui/TextInput.vue";

export default Vue.extend({
  name: `create-exam`,
  data: () => ({
    visible: true,
    exam_name: ``,
    exam_description: ``,
  }),
  computed: {
    isNameValid() {
      return (this.exam_name || ``).replace(/(^\s*)|(\s*$)/gm, ``).match(/^.{6,22}$/g) != null;
    },
    isDescValid() {
      return (this.exam_description || ``).replace(/(^\s*)|(\s*$)/gm, ``).match(/^.{2,300}$/g) != null;
    }
  },
  components: {
    TextInput,
  },
  methods: {
    async create() {
        try {
            const res = await this.$axios.put(`/api/group/${this.$route.params.id}/exams`, {
                name: this.exam_name,
                description: this.exam_description,
                questions: []
            })

            if (res.status != 200) {
                throw "error"
            }

            alert(res.data)
            this.$store.dispatch(`group/fetchGroup`, this.$route.params.id)
        } catch (e) {
            this.$toasted.error(`Hiba történt!`)
        }
    }
  }
});
</script>
