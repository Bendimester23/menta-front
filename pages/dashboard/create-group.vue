<template>
  <div class="flex flex-col m-0 p-0">
    <Navbar />
    <div class="flex flex-col m-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
        />
      </svg>
      <h1 class="text-center text-2xl font-bold">Csoport létrehozása</h1>
      <div class="m-20 flex flex-col card bordered p-4">
        <div class="form-control">
          <label class="label">
            <span class="text-lg">Csoport neve</span>
          </label>
          <input
            placeholder="név"
            class="input input-lg input-info input-bordered"
            type="text"
            v-model="group_name"
          />
          <label class="label">
            <span class="label-text-alt">{{name_state}}</span>
          </label>
        </div>
        <div class="form-control">
            <a class="btn btn-primary mt-2" :href="`./finish-group?name=${group_name}`">Tovább</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: `create-group`,
  data: () => ({
    visible: true,
    group_name: ``,
    name_state: `Kérlek add meg a csoport nevét.`
  }),
  mounted() {
    if (this.$route.query[`name`] != null) {
      this.group_name = this.$route.query[`name`] as string;
    }
    /* if (process.client) {
          document.addEventListener(`visibilitychange`, (e) => {
              console.log(e)
              this.visible = document.hidden
              document.title = document.hidden ? `Ne csalolj!` : `Sok sikert!`
          })
      } */
  }
});
</script>
