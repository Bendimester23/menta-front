<template>
  <div class="form-control">
    <label class="label">
      <span v-if="small">{{ label }}</span>
      <span class="text-lg" v-else>{{ label }}</span>
    </label>
    <input
      :placeholder="placeholder"
      :class="`input ${small || `input-lg`} input-info input-bordered`"
      :type="password ? `password`: `text`"
      :value="content"
      @input="processInput"
    />
    <label class="label">
      <span class="label-text-alt text-red-500">{{ footer }}</span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: `TextInput`,
  props: {
    label: String,
    placeholder: String,
    footer: String,
    value: String,
    password: Boolean,
    small: Boolean
  },
  data() {
    return {
      content: this.value,
    };
  },
  methods: {
    processInput(e: any) {
      this.content = e.target.value;

      this.$emit(`input`, e.target.value);
    },
  },
});
</script>
