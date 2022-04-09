<template>
  <div class="m-4">
    <h1 class="text-2xl font-bold mb-2">Csoport neve: {{ group.name }}</h1>
    <p>Csoport kód: {{ group.loginCode }}</p>
    <nuxt-link
      class="btn mt-2"
      :to="`/dashboard/group/${$route.params.id}/members`"
      >Tagok</nuxt-link
    >
    <nuxt-link
      class="btn mt-2"
      :to="`/dashboard/group/${$route.params.id}/create-exam`"
      v-if="hasAdmin"
      >Feladatlap létrehozása</nuxt-link
    >
    <h1 class="text-2xl font-bold">Dolgozatok:</h1>
    <div class="flex flex-row">
      <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="bg-blue-600 h-32 w-60"></figure>
        <div class="card-body bg-base-200">
          <h2 class="card-title">Teszt dolgozat 2</h2>
          <p>
            Egy nem annyira hosszú leírás arról, hogy miről szól ez a dolgozat
          </p>
          <div class="card-actions justify-end">

            <div class="tooltip tooltip-primary" data-tip="Szerkesztés">
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
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
            </div>
            <div class="tooltip tooltip-primary" data-tip="Eredmények">
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
            <div class="tooltip tooltip-primary" data-tip="Kitöltés">
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
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    id: ``,
    group: {},
  }),
  async mounted() {
    this.id = this.$route.params.id;
    if (this.$store.state.group?.groups[this.id] == undefined)
      await this.$store.dispatch(`group/fetchGroup`, this.id);
    this.group = this.$store.state.group.groups[this.id] || {};
  },
  computed: {
    hasAdmin() {
      return (this.group as any)?.members?.find(
        (e: any) => e.id == this.$auth.user?.id
      )?.is_leader;
    },
  },
});
</script>
