<template>
  <safa-combo2
    v-model="params.data.VoteType_S"
    cdcName="VoteType_S"
    ciName="CI_VoteType"
    domainName="Commission100"
    :m="mode"
    @input="onCellValueChanged"
    :useInput="false"
  />
</template>

<script>
export default {
  name: "AgVoteTypeS",

  computed: {
    mode () {
      return this.params.colDef.cellEditorParams.editable ? "e" : "r"
    }
  },

  methods: {
    getValue () {
      return this.params.data.VoteType_S
    },
    onCellValueChanged () {
      this.params.api.refreshCells()
    }
  }
}
</script>
