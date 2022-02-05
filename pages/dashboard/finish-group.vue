<template>
  <div class="flex flex-col m-0 p-0">
    <Navbar />
    <div class="flex flex-col m-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-16 w-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
      <h1 class="text-center text-2xl font-bold">Csoport beállításai</h1>
      <div class="m-20 flex flex-col card bordered p-4">
        <checkbox v-model="needs_approval" name="Belépések korlátozása" />
        <checkbox v-model="join_with_code" name="Csatlakozás kóddal" />
        <checkbox v-model="connect_to_school" name="Csatlakoztatás iskolához" />
        <div class="form-control" v-if="connect_to_school">
          <label class="label">
            <span class="text-lg">Iskola kódja:</span>
          </label>
          <input
            placeholder="Iskola neve"
            class="input input-lg input-info input-bordered"
            type="text"
            v-model="group_name"
          />
          <label class="label">
            <span class="label-text-alt">{{ name_state }}</span>
          </label>
        </div>
        <div class="form-control">
          <input type="button" value="Kész" class="btn btn-primary mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Checkbox from "~/components/ui/Checkbox.vue";

export default Vue.extend({
  components: { Checkbox },
  name: `finish-group`,
  data: () => ({
    visible: true,
    name_state: `Kérlek add meg a csoport nevét.`,
    needs_approval: false,
    join_with_code: false,
    connect_to_school: false,
    group_name: ``,
  }),
  mounted() {
    if (this.$route.query[`name`] != null) {
      this.group_name = this.$route.query[`name`] as string;
    }
  },
});
</script>
