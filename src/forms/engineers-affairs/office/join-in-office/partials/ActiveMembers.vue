<template>
  <safa-datatable
    v-model="value"
    helper="activeMembersColumns"
    @row-click="rowClick"
    fit
  />
</template>

<script>
export default {
  props: ["value"],
  data () {
    return {
      name: "ActiveMembers"
    }
  },
  methods: {
    rowClick (row) {
      this.$emit("selectedMember", row)
    }
  }
}
</script>
