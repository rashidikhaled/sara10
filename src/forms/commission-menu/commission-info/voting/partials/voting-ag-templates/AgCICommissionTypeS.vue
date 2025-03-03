<template>
  <safa-combo2
    v-model="params.data.CI_CommissionType_S"
    cdcName="CI_CommissionType_S"
    ciName="CI_CommissionType"
    domainName="Commission100"
    :m="mode"
    @input="onCellValueChanged"
    :useInput="false"
  />
</template>

<script>
export default {
  name: "AgCICommissionTypeS",

  computed: {
    mode () {
      return this.params.colDef.cellEditorParams.editable ? "e" : "r"
    }
  },

  methods: {
    getValue () {
      return this.params.data.CI_CommissionType_S
    },
    onCellValueChanged () {
      this.params.api.refreshCells()
    }
  }
}
</script>
