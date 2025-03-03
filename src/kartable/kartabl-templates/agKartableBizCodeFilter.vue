<template>
  <div class="q-py-xs q-px-xs">
    <nosazi-code-input
      :actions="false"
      m="e"
      enabled="1-1-1-1-1-1-1"
      :loading="false"
      v-model="bizCode"
      @enter="nosaziCodeEntered"
    />
  </div>
</template>
<script>
import {
  convertNosaziCodeObjectToString,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
const defualtBizCode = {
  District: 0,
  Region: 0,
  Block: 0,
  House: 0,
  Building: 0,
  Apartment: 0,
  Shop: 0
}
export default {
  data () {
    return {
      bizCode: { ...defualtBizCode }
    }
  },

  methods: {
    nosaziCodeEntered () {
      this.params.filterChangedCallback()
    },

    doesFilterPass () {
      return convertNosaziCodeObjectToString(this.bizCode)
    },

    isFilterActive () {
      return true
    },

    getModel () {
      if (!this.isFilterActive()) {
        return null
      }
      return convertNosaziCodeObjectToString(this.bizCode)
    },

    setModel (model) {
      this.bizCode =
        model == null
          ? { ...defualtBizCode }
          : convertStringToNosaziCodeObject(model.value)
    }
  }
}
</script>
