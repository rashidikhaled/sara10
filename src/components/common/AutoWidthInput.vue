<template>
  <input
    v-bind="$attrs"
    v-on="getListeners"
    :value="value"
    :style="inputStyle"
    @input="handleInput"
    :maxlength="validLength"
    ref="input"
    :tabindex="0"
  />
</template>

<script>
export default {
  name: "AutoWidthInput",
  inheritAttrs: false,
  data () {
    return {
      validLength: 7,
      notifyTimer: null
    }
  },
  props: {
    value: [String, Number]
  },
  computed: {
    getListeners () {
      const { input, ...others } = this.$listeners
      return { ...others }
    },
    inputStyle () {
      let style = { textAlign: "center", minWidth: "30px" } // , borderRadius: '0'

      const length =
        (this.value && Math.max(this.value.toString().length, 2)) || 2
      style = { ...style, width: length * 10 + "px" }

      return style
    }
  },
  methods: {
    handleInput (event) {
      if (event.target.maxLength < event.target.value.length) {
        this.$emit("invalidRange", true)
        event.target.value = event.target.value.substring(
          0,
          event.target.value.length - 1
        )
        this.$emit("input", parseInt(event.target.value || "0"))
        if (!this.notifyTimer) {
          this.notifyTimer = this.$q.notify({
            type: "info",
            message: `حداکثر ${event.target.maxLength} کاراکتر مجاز میباشد.`,
            timeout: 3000
          })
        }
      } else {
        this.$emit("invalidRange", false)
        this.$emit("input", parseInt(event.target.value || "0"))
      }
    },
    setFocus () {
      this.$refs.input.focus()
      this.$refs.input.select()
    },
    isDisabledInput () {
      return this.$refs.input.disabled || this.$refs.input.readOnly
    }
  }
}
</script>
