<template>
  <div
    class="
      navbar
      m-2
      shadow-lg
      bg-neutral
      text-neutral-content
      rounded-box
      z-30
      sticky
    "
  >
    <div class="px-2 mx-2 navbar-start">
      <span class="text-lg font-bold"> Bluementa xd </span>
    </div>
    <div class="hidden px-2 mx-2 navbar-center lg:flex">
      <div class="flex items-stretch">
        <nuxt-link class="btn btn-ghost btn-sm rounded-btn" to="/"> Főoldal </nuxt-link>
        <nuxt-link class="btn btn-ghost btn-sm rounded-btn" to="/#features">
          Funkciók
        </nuxt-link>
        <nuxt-link class="btn btn-ghost btn-sm rounded-btn" to="/about"> Rólunk </nuxt-link>
        <nuxt-link class="btn btn-ghost btn-sm rounded-btn" to="/contact">
          Kapcsolat
        </nuxt-link>
      </div>
    </div>
    <div class="navbar-end">
      <div v-if="$auth.loggedIn">
        <div class="dropdown dropdown-end">
          <div tabindex="0" class="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {{ $auth.user.username }}
          </div>
          <ul
            tabindex="0"
            class="
              p-2
              shadow-2xl
              menu
              dropdown-content
              bg-base-300
              rounded-box
              w-52
            "
          >
            <li>
              <nuxt-link to="/profile"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  /></svg
                >Profil</nuxt-link
              >
            </li>
            <li>
              <!--TODO: find a better name-->
              <nuxt-link to="/dashboard">Dashboard</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/dashboard/groups">Csoportok</nuxt-link>
            </li>
          </ul>
        </div>
        <button class="btn btn-square btn-ghost" @click="logout()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block w-6 h-6 stroke-current text-red-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
      <div v-else>
        <nuxt-link class="btn btn-sm rounded-btn btn-ghost" to="/auth/login">
          Bejelentkezés
        </nuxt-link>
        <nuxt-link class="btn btn-sm rounded-btn btn-ghost" to="/auth/register">
          Regisztráció
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `Navbar`,
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$toast.success(`Sikeres kijelentkezés`);
      });
    },
  },
});
</script>
