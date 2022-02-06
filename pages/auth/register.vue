<template>
  <div class="flex flex-col m-2 items-center min-h-screen p-2 overflow-x-hidden">
    <div class="m-20 my-auto flex flex-col card bordered p-4 shadow-2xl">
      <h1 class="text-center text-2xl font-bold mb-8">Regisztráció</h1>
      <TextInput
        label="Felhasználónév"
        placeholder="TesztElek69"
        v-model="form.username"
      />
      <TextInput
        label="E-mail cím"
        placeholder="labamkozott@gmail.com"
        v-model="form.email"
      />
      <TextInput
        label="Jelszó"
        placeholder="jelszó"
        v-model="form.password"
        password
      />
      <div class="form-control">
        <button class="btn btn-primary mt-2" @click="register()">Tovább</button>
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
    form: {
      username: ``,
      password: ``,
      email: ``,
    },
  }),
  methods: {
    async register() {
      try {
        const res = await this.$axios.put(`/api/auth/register`, this.form);

        this.$nuxt.$router.push({
          path: `/auth/confirm-email?email=${this.form.email}&id=${res.data.id}`,
        });
      } catch (e: any) {
        if (e.message.includes(`409`)) {
          this.$toast.error(`A felhasználónév vagy az email foglalt!`);
        } else {
          this.$toast.error(`Ismeretlen hiba történt!`);
        }
      }
    },
  },
  auth: false,
});
</script>
