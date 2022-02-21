<template>
  <div class="flex flex-col m-0 p-0 h-screen w-screen">
    <div class="h-full w-full p-2 flex flex-col">
      <h1 class="text-4xl font-bold text-center mt-4">Dashboard</h1>
      <div></div>
      <h1 class="text-2xl font-bold flex flex-row ml-4">
        Csoportok:
        <nuxt-link to="/dashboard/create-group" class="my-auto ml-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 my-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
        ></nuxt-link>
        <nuxt-link to="/dashboard/join-group" class="ml-2 my-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </nuxt-link>
      </h1>
      <div class="m-4 flex flex-row flex-wrap">
        <div
          class="
            p-4
            bg-base-200
            rounded-lg
            cursor-pointer
            max-w-xs
            hover:shadow-lg
            transition-all
            mr-2
          "
          v-for="g in $store.state.groups"
          v-bind:key="g.id"
          @click="to(g.id)"
        >
          <p class="text-lg font-bold mb-2">{{ g.name }}</p>
          <p>Vezető: {{ g.leader.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: `index`,
  data: () => ({}),
  mounted() {
    if (!this.$store.state.groupsFetched) {
      this.$store.dispatch(`fetchUserGroups`);
    }
  },
  methods: {
    to(id: string) {
      this.$router.push({ path: `/dashboard/group/${id}/` });
    },
  },
});
</script>
