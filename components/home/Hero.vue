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
          <div class="form-control">
            <label class="label">
              <span class="label-text">Csoport neve</span>
            </label>
            <input
              type="text"
              placeholder="név"
              class="input input-bordered"
              v-model="group_name"
            />
          </div>
          <div class="form-control mt-6">
            <a :class="`btn ${group_name == `` ? `btn-disabled` : `btn-primary`}`" :href="$store.state.auth.isLoggedIn ? `./dashboard/create-group?name=${group_name}` : `./auth/register?thencreategroup=${group_name}`">Vágjunk bele{{group_name.lenght}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `Hero`,
  data: () => ({
    group_name: ``
  })
});
</script>
