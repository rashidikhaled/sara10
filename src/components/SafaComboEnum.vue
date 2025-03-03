<template>
  <safa-combo
    v-bind="$attrs"
    source-type="local"
    :options="options"
    @input="handleUpdate"
    :value="value"
    :m="m"
  />
</template>

<script>
import enumDefs from './json/enumDefs'

export default {
  name: 'SafaComboEnum',

  props: {
    value: [ Number, String ],
    enumName: String,
    m: {
      type: String,
      default: 'e'
    }
  },

  computed: {
    options () {
      return enumDefs[this.enumName] || []
    }
  },

  methods: {
    handleUpdate (value) {
      this.$emit('input', value)
    }
  }
}
</script>
