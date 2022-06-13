<template>
  <div class="overflow-x-auto m-12">
    <nuxt-link :to="`/dashboard/group/${$route.params.id}/`" class="btn mb-2">Vissza</nuxt-link>
    <h1 class="text-2xl font-bold mb-2">{{ name }} tagjai:</h1>
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Név</th>
          <th>Regisztrált</th>
          <th>Csatlakozott</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr v-for="(m, i) in members" v-bind:key="m.id" class="hover rounded-md">
          <th>{{i+1}}</th>
          <td>
            {{ m.username }}
            <p
              class="badge badge-lg py-2 badge-primary font-bold ml-1"
              v-if="m.is_leader"
            >
              ADMIN
            </p>
            <p
              class="badge badge-lg py-2 badge-accent font-bold ml-1"
              v-if="m.id == $auth.user.id"
            >
              TE
            </p>
            <p
              class="badge badge-lg py-2 badge-secondary font-bold ml-1"
              v-if="m.is_waiting"
            >
              Várakozik
            </p>
          </td>
          <td>{{ fancyDate(m.createdAt) }}</td>
          <td>{{ fancyDate(m.joinedAt) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data: () => ({
    members: [],
    id: ``,
    name: ``,
  }),
  async mounted() {
    this.id = this.$route.params.id;
    if (this.$store.state.group?.groups[this.id] == undefined)
      await this.$store.dispatch(`group/fetchGroup`, this.id);
    this.members = this.$store.state.group.groups[this.id].members || [];
    this.name = this.$store.state.group.groups[this.id].name || ``;
  },
  methods: {
    fancyDate(date: string) {
      return `${date.split(`T`)[0]} ${date.split(`T`)[1].split(`.`)[0]}`;
    },
  },
});
</script>
