<template>
  <div class="flex flex-col m-2 items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-16 w-16 mt-8"
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
      <checkbox v-model="data.needs_approval" name="Belépések korlátozása" />
      <checkbox v-model="data.join_with_code" name="Csatlakozás kóddal" />
      <text-input
        label="Kód előtag"
        v-if="data.join_with_code"
        v-model="data.code_prefix"
        :footer="isCodePrefixValid ? `` : `Minimum 2 maximum 5 karakter!`"
      />
      <checkbox
        v-model="data.connect_to_school"
        name="Csatlakoztatás iskolához"
      />
      <text-input
        label="Iskola kódja"
        v-if="data.connect_to_school"
        v-model="data.school_code"
      />
      <div class="form-control">
        <input type="button" value="Kész" :class="`btn ${isCodePrefixValid ? `btn-primary` : `btn-disabled`} mt-2`" @click="create()" :disabled="!isCodePrefixValid" />
      </div>
      <div class="form-control">
        <nuxt-link
          type="button"
          class="btn btn-outline mt-2"
          :to="`/dashboard/create-group?name=${data.name}`"
          >Vissza</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Checkbox from "~/components/ui/Checkbox.vue";
import TextInput from "~/components/ui/TextInput.vue";

export default Vue.extend({
  components: { Checkbox, TextInput },
  name: `finish-group`,
  data: () => ({
    visible: true,
    data: {
      school_code: ``,
      join_with_code: false,
      needs_approval: false,
      connect_to_school: false,
      name: ``,
      code_prefix: ``
    },
  }),
  mounted() {
    if (this.$route.query[`name`] != null) {
      this.data.name = this.$route.query[`name`] as string;
    }
  },
  computed: {
    isCodePrefixValid() {
      return !this.data.join_with_code || this.data.code_prefix.match(/^\w{2,5}$/g) != undefined
    }
  },
  methods: {
    async create() {
      try {
        const res = await this.$axios.put(`/api/group/create`, this.data);
        console.log(res);
        this.$store.commit(`invalidateGroupsCache`)
        this.$router.push({
          path: `/dashboard/group/${res.data.id}`
        })
      } catch (e: any) {
        const msg = e.message;
        if (msg.includes(`400`)) {
          this.$toast.error(`Hibásan kitöltött mező(k)!`)
        } else if (msg.includes(`500`)) {
          this.$toast.error(`Ismeretlen szerverhiba!`)
        }
      }
    },
  },
});
</script>
