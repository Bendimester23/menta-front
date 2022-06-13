<template>
  <div class="card w-96 bg-base-100 shadow-xl mr-2">
    <figure class="bg-blue-600 h-32 w-60"></figure>
    <div class="card-body bg-base-200">
      <h2 class="card-title">{{ exam.title }}</h2>
      <p>
        {{ exam.description }}
      </p>
      <div class="card-actions justify-end">
        <div class="tooltip tooltip-primary" data-tip="Törlés" v-if="isLeader" @click="promtDelete()">
          <button class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
        <div
          class="tooltip tooltip-primary"
          data-tip="Szerkesztés"
          v-if="isLeader"
        >
          <nuxt-link
            class="btn btn-ghost"
            :to="`/dashboard/group/${groupId}/exams/${exam.id}/edit`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </nuxt-link>
        </div>
        <div
          class="tooltip tooltip-primary"
          data-tip="Eredmények"
          v-if="!isLeader"
        >
          <button class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </button>
        </div>
        <div
          class="tooltip tooltip-primary"
          data-tip="Kitöltés"
          v-if="!isLeader"
        >
          <button class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `ExamCard`,
  props: {
    exam: Object,
    groupId: String,
    isLeader: Boolean,
  },
  methods: {
    async promtDelete() {
      //TODO show confirmation promt
      try {
        let { status } = await this.$axios.delete(`/api/group/${this.groupId}/exams/${this.exam.id}`)
        if (status == 200) {
          this.$toast.success(`Dolgozat sikeresen törölve.`)
        } else {
          this.$toast.error(`Hiba történt!`)
        }
      } catch(e) {
        this.$toast.error(`Hiba történt!`)
      }
    }
  }
});
</script>
