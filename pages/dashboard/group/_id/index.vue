<template>
    <div class="m-2">
        <h1 class="text-2xl font-bold mb-2">Csoport neve: {{group.name}}</h1>
        <p>Csoport kód: {{group.loginCode}}</p>
        <nuxt-link class="btn mt-2" :to="`/dashboard/group/${$route.params.id}/members`">Tagok</nuxt-link>
        
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data: () => ({
        id: ``,
        group: {},
    }),
    async mounted() {
        this.id = this.$route.params.id;
        if (this.$store.state.group?.groups[this.id] == undefined) await this.$store.dispatch(`group/fetchGroup`, this.id)
        this.group = this.$store.state.group.groups[this.id] || {};
    }
})
</script>
