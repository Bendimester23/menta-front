<template>
    <div>
        <h1>Csoport neve: {{group.name}}</h1>
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
