<template>
  <safa-checkbox
    v-model="params.data.IsSelected"
    :m="params.data.IsHaveVote == true ? 'r' : 'e'"
    @input="onCellValueChanged"
  />
</template>

<script>
export default {
  name: "AgIsSelected",

  methods: {
    getValue () {
      return this.params.data.IsSelected
    },
    onCellValueChanged () {
      this.params.api.refreshCells()
    }
  }
}
</script>
