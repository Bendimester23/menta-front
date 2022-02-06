<template>
  <div class="flex flex-col m-2 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16 mt-8"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
      />
    </svg>
    <h1 class="text-center text-2xl font-bold">Csoport létrehozása</h1>
    <div class="m-20 flex flex-col card bordered p-4">
      <TextInput placeholder="név" v-model="group_name" label="Csoport neve" :footer="isNameValid ? `` : `Legalább 6 és legfejjebb 22 karakter lehet.`" />
      <div class="form-control">
        <nuxt-link
          :class="`btn ${isNameValid ? `btn-primary` : `btn-disabled`} mt-2`"
          :disabled="!isNameValid"
          :to="`./finish-group?name=${group_name}`"
          >Tovább</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "~/components/ui/TextInput.vue";

export default Vue.extend({
  name: `create-group`,
  data: () => ({
      visible: true,
      group_name: ``,
      name_state: `Kérlek add meg a csoport nevét.`,
  }),
  computed: {
    isNameValid() {
      return this.group_name?.match(/^.{6,22}$/g) != null;
    },
  },
  components: {
    TextInput,
  },
  methods: {
    trySetName() {
      this.group_name = this.$route.query.name != undefined ? this.$route.query.name as string : ``;
    }
  },
  mounted() {
    this.trySetName();
  },
});
</script>
