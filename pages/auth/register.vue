<template>
  <div class="flex flex-col m-0 p-0 h-screen">
    <Navbar />
    <Overlay />
    <div class="flex flex-col m-2 items-center h-full p-2">
      <div class="m-20 my-auto flex flex-col card bordered p-4 shadow-2xl">
        <h1 class="text-center text-2xl font-bold mb-8">Regisztráció</h1>
        <TextInput
          label="Felhasználónév"
          placeholder="TesztElek69"
          v-model="username"
        />
        <TextInput
          label="E-mail cím"
          placeholder="labamkozott@gmail.com"
          v-model="email"
        />
        <TextInput
          label="Jelszó"
          placeholder="jelszó"
          v-model="password"
          password
        />
        <div class="form-control">
          <button class="btn btn-primary mt-2" @click="register()">
            Tovább
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
    username: ``,
    password: ``,
    email: ``,
  }),
  methods: {
    async register() {
      const status = await this.$store.dispatch(`auth/register`, {
        username: this.username,
        password: this.password,
        email: this.email,
      });

      if (status != 200) {
        this.$store.commit(
          `notif/setBottomNotifText`,
          `Regisztrációs hiba történt!`
        );
        this.$store.commit(`notif/showBottomNotif`);
      } else {
        this.$nuxt.$router.push({path: `/auth/confirm-email?email=${this.email}&id=${this.$store.state.auth.user.id}`})
      }
    },
  },
  auth: false
});
</script>
