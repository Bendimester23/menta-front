<template>
  <div class="flex flex-col m-0 p-0 h-screen">
    <Navbar />
    <div class="flex flex-col m-2 items-center h-full p-2">
      <div class="m-20 my-auto flex flex-col card bordered p-4 shadow-2xl">
        <!--Da icon-->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
        <h1 class="text-center text-2xl font-bold mb-8">
          E-mail cím megerősítése
        </h1>
        <p class="max-w-xs text-justify">
          A kódot elküldtük a(z) <b>{{ $route.query.email }}</b> címre. Ha nem
          érkezik meg 5-10 percenben belül, akkor baj van.
        </p>
        <TextInput label="Megerősítő kód" placeholder="kód" v-model="code" :footer="validCode ? `` : `Hibás kód!`" />
        <div class="form-control">
          <button
            :class="`btn mt-2 ${
              validCode ? `btn-primary` : `btn-disabled`
            }`"
            :disabled="code == ``"
            @click="verify()"
          >
            Megerősítés
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "~/components/ui/TextInput.vue";

export default Vue.extend({
  name: `register`,
  components: {
    TextInput,
  },
  data: () => ({
    code: ``,
  }),
  auth: false,
  methods: {
    async verify() {
      const status = await this.$store.dispatch(`auth/confirmEmail`, this.code)
      if (status != 200) {
        this.$store.commit(
          `notif/setBottomNotifText`,
          `Hibás kód!`
        );
        this.$store.commit(`notif/showBottomNotif`);
      } else {
        this.$nuxt.$router.push({path: `/auth/login`})
      }
    },
  },
  computed: {
    validCode: function () {
      return this.code.match(/^\d{6}$/g) != null;
    },
  },
});
</script>
