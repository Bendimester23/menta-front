<template>
  <div class="flex flex-col p-2 mx-auto">
    <input type="text" class="input input-bordered" v-model="examData.name" />
    <textarea
      type="text"
      class="textarea textarea-bordered my-2"
      placeholder="Kérdés"
      v-model="examData.description"
    ></textarea>
    <button class="btn btn-primary" @click="addQuestion">+</button>
    <button class="btn btn-primary" @click="saveExam">Mentés</button>
    <div class="flex flex-col mx-auto">
      <question-wrapper
        class="mx-auto"
        v-model="q.data"
        :id="q.id"
        :editing="true"
        v-for="q in examData.questions"
        v-bind:key="q.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import QuestionWrapper from "~/components/QuestionWrapper.vue";
export default Vue.extend({
  components: { QuestionWrapper },
  data: () => ({
    examData: {
      name: `Teszt dolgozat 1`,
      description: `Egy nem annyira hosszú leírás arról, hogy miről szól ez a dolgozat`,
      questions: [] as any[],
    },
  }),
  async mounted() {
    try {
      let { data, status } = await this.$axios.get(
        `/api/group/${this.$route.params.id}/exams/${this.$route.params.eid}`
      );
      if (status == 200) {
        this.examData = data;
      } else {
        this.$toast.error(`Hiba a betöltés során!`);
        this.$router.push(`/dashboard/group/${this.$route.params.id}`)
      }
    } catch (e) {
      this.$toast.error(`Hiba a betöltés során!`);
      this.$router.push(`/dashboard/group/${this.$route.params.id}`)
    }
  },
  methods: {
    addQuestion() {
      this.examData.questions.push({
        id: this.examData.questions.length,
        data: {
          name: `Ez egy példa kérdés?`,
          type: `TRUE_FALSE`,
          answer: true,
          auto_grade: true,
        },
      });
    },
    async saveExam() {
      let res = await this.$axios.put(
        `/api/group/${this.$route.params.id}/exams`,
        this.examData
      );

      alert(JSON.stringify(res.data));
    },
  },
});
</script>
