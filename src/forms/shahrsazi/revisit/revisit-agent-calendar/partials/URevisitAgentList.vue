<template>
  <fit>
    <safa-grid
      :allow-multiple-selection="false"
      :suppressRowClickSelection="false"
      :selectable="true"
      :value="agentArray"
      fit
      height="100%"
      helper="shahrsazi.revisitAgentList"
      max-height="100%"
      min-height="150px"
      paginate
      :pageSize="20"
      title="لیست مامورین"
      @row:click="rowClick"
    />
    <div class="flex q-ma-sm justify-end">
      <btn-default
        label="انتخاب"
        @click="selectRow"
        :disabled="!selectedRow"
      />
    </div>
  </fit>

</template>

<script>
export default {
  name: 'URevisitAgentList',
  props: { agentArray: Array },

  data () {
    return {
      selectedRow: null
    }
  },
  methods: {
    selectRow () {
      this.$emit('selectRow', this.selectedRow)
    },
    rowClick ({ data }) {
      this.selectedRow = data
    }
  }
}
</script>
<style scoped>
</style>
