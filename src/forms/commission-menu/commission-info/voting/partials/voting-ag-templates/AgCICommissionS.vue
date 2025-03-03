<template>
  <safa-combo2
    v-model="params.data.CI_Commission_S"
    cdcName="CI_Commission_S"
    ciName="CI_Commission"
    domainName="Commission100"
    :m="mode"
    @input="onCellValueChanged"
    :useInput="false"
  />
</template>

<script>
export default {
  name: "AgCICommissionS",

  computed: {
    mode () {
      return this.params.colDef.cellEditorParams.editable ? "e" : "r"
    }
  },

  methods: {
    getValue () {
      return this.params.data.CI_Commission_S
    },
    onCellValueChanged () {
      this.params.api.refreshCells()
    }
  }
}
</script>
