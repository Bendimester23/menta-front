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
        <a class="btn btn-ghost btn-sm rounded-btn" href="/"> Főoldal </a>
        <a class="btn btn-ghost btn-sm rounded-btn" href="/#features">
          Funkciók
        </a>
        <a class="btn btn-ghost btn-sm rounded-btn" href="/about"> Rólunk </a>
        <a class="btn btn-ghost btn-sm rounded-btn" href="/contact">
          Kapcsolat
        </a>
      </div>
    </div>
    <div class="navbar-end">
      <div v-if="$auth.loggedIn">
        <button class="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
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
        <a class="btn btn-sm rounded-btn btn-ghost" href="/auth/login">
          Bejelentkezés
        </a>
        <a class="btn btn-sm rounded-btn btn-ghost" href="/auth/register">
          Regisztráció
        </a>
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
        this.$toast.success(`Sikeres kijelentkezés`)
      })
    }
  }
});
</script>
