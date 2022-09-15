<template>
  <div class="flex flex-row h-full">
    <div class="m-4 min-h-full flex-grow">
      <h1 class="text-2xl font-bold mb-2">Csoport neve: {{ group.name }}</h1>
      <p v-if="group.codeLogin">Csoport kód: {{ group.loginCode }}</p>
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
      <button
        class="btn btn-error mt-2"
        @click="deleteGroup"
        v-if="!pendingDeletion"
      >
        Csoport törlése
      </button>
      <button class="btn btn-error btn-disabled mt-2" disabled v-else>
        <svg
          class="
            h-6
            w-6
            animate-rotateIn
            stroke-current
            animate-reverse animate-infinite
          "
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m 20,19.996802 v -5 h -0.582 m -15.356,-2 a 8.001,-8.001 0 0 0 15.356,2 m 0,0 H 15 M 4,3.9968019 v 5 h 0.581 m 0,0 A 8.003,-8.003 0 0 1 19.938,10.996802 M 4.581,8.9968019 H 9"
            id="path2"
          />
        </svg>
      </button>
      <h1 class="text-2xl font-bold mb-4">Dolgozatok:</h1>
      <div
        class="flex flex-row flex-grow"
        v-if="group.exams != null && group.exams.length > 0"
      >
        <ExamCard
          v-for="e in group.exams"
          :exam="e"
          v-bind:key="e.id"
          :isLeader="isLeader"
          :groupId="id"
        />
      </div>
      <div
        v-else
        class="flex flex-col items-center justify-center h-full flex-grow"
      >
        <h1 class="my-32 text-4xl">Nincsenek dolgozatok. 🎉</h1>
      </div>
    </div>
    <Chat :roomId="group.roomId" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ExamCard from "@/components/ExamCard.vue";
import { Group } from "~/store/group";

export default Vue.extend({
  components: {
    ExamCard,
  },
  data: () => ({
    id: ``,
    group: {
      /*exams: []*/
    },
    isLeader: false,
    pendingDeletion: false,
  }),
  async mounted() {
    this.id = this.$route.params.id;
    if (this.$store.state.group?.groups[this.id] == undefined)
      await this.$store.dispatch(`group/fetchGroup`, this.id);
    this.group = this.$store.state.group.groups[this.id] || {};

    this.isLeader =
      (this.group as Group).members.find((m) => m.id == this.$auth?.user?.id)
        ?.is_leader || false;
  },
  computed: {
    hasAdmin() {
      return (this.group as any)?.members?.find(
        (e: any) => e.id == this.$auth.user?.id
      )?.is_leader;
    },
  },
  methods: {
    async deleteGroup() {
      try {
        this.pendingDeletion = true;
        const res = await this.$axios.delete(
          `/api/group/${this.$route.params.id}/`
        );
        if (res.data != `success`) throw "hiba";
        this.$toasted.success(`Sikeres törlés!`);
        await this.$store.dispatch(`fetchUserGroups`, this.id);
        this.$router.push(`/dashboard`);
      } catch (e) {
        this.$toasted.error(`Hiba történt`);
        this.pendingDeletion = false;
      }
    },
  },
});
</script>
