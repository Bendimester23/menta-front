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
          <button class="btn btn-primary mt-2" @click="login()">
            Bejelentkezés
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
    }
  }),
  methods: {
    login() {
      this.$auth.loginWith('local', { data: this.formData }).then((res) => {
        this.$nuxt.$router.push({path: `/dashboard`})
      });
    }
  },
});
</script>
