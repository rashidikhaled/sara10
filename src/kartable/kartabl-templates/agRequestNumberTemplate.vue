<template>
  <div
    style="text-align: center !important"
    :style="backgroundColor && `background: ${backgroundColor}`"
  >
    <input
      :value="params.value"
      readonly
      class="request-num text-center"
      onclick="this.select()"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "agRequestNumberTemplate",

  computed: {
    backgroundColor () {
      return this.params.data.BackgroundColor || ""
    }
  }
}
</script>

<style lang="scss" scoped>
.request-num2 {
  display: inline-block;
  font-size: 15px;
  letter-spacing: 1px;
  color: #2e629c;
  position: relative;
  max-width: 100%;
  border: none;
  border-top-width: initial;
  background: none;

  body.body--dark & {
    color: var(--dark-text-color);
  }
}
</style>
