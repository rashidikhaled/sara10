<template>
  <div :class="divClass" v-bind="$attrs">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FormRow',
  computed: {
    isFullWidth () {
      return this.$store.getters['ui/layoutMode'] === 'full'
    },
    divClass () {
      const result = []
      result.push('row q-col-gutter-x-md q-col-gutter-y-sm')

      return result.join(' ')
    }
  }
}
</script>

<style scoped>

</style>
