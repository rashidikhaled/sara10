<template>
  <safa-datatable
    v-model="value"
    helper="exitEngineerColumns"
    @row-click="rowClick"
    fit
  />
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      name: "ExitEngineer"
    }
  },
  methods: {
    rowClick (row) {
      this.$emit("selectedExitedEngineer", row)
    }
  }
}
</script>
