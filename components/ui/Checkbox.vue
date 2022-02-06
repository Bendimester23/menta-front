<template>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="text-lg m-2">{{name}}</span>
      <input
        type="checkbox"
        :checked="content ? `checked` : ``"
        :value="content"
        class="toggle toggle-lg ml-2"
        @input="processInput"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: `Checkbox`,
    props: {
        name: String,
        value: Boolean
    },
    data() {
        return {
            content: this.value
        }
    },
    methods: {
        processInput(e: any) {
            this.content = e.target.checked
            console.log(e.target.checked);
            
            this.$emit(`input`, e.target.checked)
        }
    }
})
</script>
