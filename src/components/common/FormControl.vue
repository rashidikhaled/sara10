<template>
    <div :class="divClass" v-bind="$attrs">
      <slot />
    </div>
</template>

<script>
export default {
  name: 'FormControl',
  props: {
    className: {
      type: String,
      default: ''
    },
    lg: {
      type: Number,
      default: 4
    },
    md: {
      type: Number,
      default: 3
    },
    sm: {
      type: Number,
      default: 2
    },
    xs: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      islayoutSplitterFullWidth: false

    }
  },
  watch: {
    layoutSplitterWidth () {
      if (this.layoutSplitterWidth < 90) {
        this.islayoutSplitterFullWidth = true
      } else if (this.layoutSplitterWidth === 100) {
        this.islayoutSplitterFullWidth = false
      }
    }
  },
  computed: {
    layoutSplitterWidth () {
      return this.$store.getters['ui/layoutSplitterWidth']
    },
    // isFullWidth () {
    //   return this.$store.getters['ui/layoutMode'] === 'full'
    // },
    divClass () {
      const result = []
      if (this.islayoutSplitterFullWidth) { result.push(`col-lg-${Math.round(12 / 2)}`) } else { result.push(`col-lg-${Math.round(12 / this.lg)}`) }
      if (this.islayoutSplitterFullWidth) { result.push(`col-md-${Math.round(12 / 2)}`) } else { result.push(`col-md-${Math.round(12 / this.md)}`) }
      result.push(`col-sm-${Math.round(12 / this.sm)}`)
      result.push(`col-${Math.round(12 / this.xs)}`)
      return result.join(' ')
    }
  }
}
</script>

<style scoped>

</style>
