<template>
  <div class="m-4 min-h-full">
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
    <h1 class="text-2xl font-bold mb-4">Dolgozatok:</h1>
    <div class="flex flex-row" v-if="group.exams != null && group.exams.length > 0">
      <ExamCard v-for="e in group.exams" :exam="e" v-bind:key="e.id" :isLeader="isLeader" :groupId="id"/>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full">
      <h1 class="my-32 text-4xl">Nincsenek dolgozatok. 🎉</h1>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ExamCard from "@/components/ExamCard.vue"
import { Group } from "~/store/group";

export default Vue.extend({
  components: {
    ExamCard
  },
  data: () => ({
    id: ``,
    group: {
      /*exams: []*/
    },
    isLeader: false
  }),
  async mounted() {
    this.id = this.$route.params.id;
    if (this.$store.state.group?.groups[this.id] == undefined)
      await this.$store.dispatch(`group/fetchGroup`, this.id);
    this.group = this.$store.state.group.groups[this.id] || {};

    this.isLeader = (this.group as Group).members.find(m => m.id == this.$auth?.user?.id)?.is_leader || false
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
