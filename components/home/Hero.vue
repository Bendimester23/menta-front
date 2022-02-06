<template>
  <div class="hero min-h-screen">
    <div class="flex-col justify-center hero-content lg:flex-row">
      <div class="text-center lg:text-left">
        <h1 class="mb-5 text-5xl font-bold">Bluementa</h1>
        <p class="mb-5">
          Egy redmenta klón btw. De ha minden igaz jobb. Quaerat fugiat ut assumenda
          excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a
          id nisi.
        </p>
      </div>
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-neutral">
        <div class="card-body">
          <TextInput v-model="code" placeholder="kód" label="Csatlakozás csoporthoz" :small="true" />
          <div class="form-control mt-6">
            <nuxt-link :class="`btn ${isCodeValid ? `btn-primary` : `btn-disabled`}`" :to="redirectUrl">Vágjunk bele</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TextInput from "../ui/TextInput.vue";
export default Vue.extend({
  components: { TextInput },
  name: `Hero`,
  data: () => ({
    code: ``
  }),
  computed: {
    redirectUrl() {
      if (this.$auth.loggedIn) {
        return `/dashboard/join-group?code=${this.code}`
      }
      return `/auth/register?group=${this.code}`
    },
    isCodeValid() {
      return this.code.match(/^([A-Z])\w{7}$/g)
    }
  }
});
</script>
