<template>
  <div class="flex flex-col m-0 p-0 h-screen">
    <div class="flex flex-col m-2 items-center h-full p-2">
      <div class="m-20 my-auto flex flex-col card bordered p-4 shadow-2xl">
        <h1 class="text-center text-2xl font-bold mb-8">Bejelentkezés</h1>
        <TextInput
          label="E-mail cím"
          placeholder="labamkozott@gmail.com"
          v-model="formData.email"
        />
        <TextInput
          label="Jelszó"
          placeholder="kicsicica1"
          v-model="formData.password"
          password
        />
        <div class="form-control">
          <button class="btn btn-primary mt-2" @click="login()" v-if="!loading">
            Bejelentkezés
          </button>
          <button class="btn btn-disabled mt-2" v-else disabled>
            <svg
              class="h-6 w-6 animate-rotateIn stroke-current animate-reverse animate-infinite"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "~/components/ui/TextInput.vue";

export default Vue.extend({
  name: `login`,
  auth: false,
  components: {
    TextInput,
  },
  data: () => ({
    formData: {
      password: ``,
      email: ``,
    },
    loading: false,
  }),
  methods: {
    login() {
      this.loading = true;
      this.$auth.loginWith("local", { data: this.formData }).then((res) => {
        this.$nuxt.$router.push({ path: `/dashboard` });
        this.loading = false;
      });
    },
  },
});
</script>
