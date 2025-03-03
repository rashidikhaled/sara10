<template>
  <safa-grid
    v-model="model.ClsOffice.Off_AbilityMultiply"
    title=""
    helper="officeAbilityMultiply"
    fit
    :m="m"
  />
</template>

<script>
import { object } from "joi"
export default {
  props: {
    model: object,
    m: String
  },
  data () {
    return {
      name: "OfficeFactor"
    }
  },

  methods: {}
}
</script>
