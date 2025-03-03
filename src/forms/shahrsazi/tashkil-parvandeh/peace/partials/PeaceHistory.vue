<template>
  <fit>
    <safa-datatable
      helper="peaceHistory"
      v-model="results.Sh_Peace_List_PreRevisit"
      @dbclick="dbclick"
      fit
      :bordered="false"
      max-height="100%"
      height="100%"
      min-height="100px"
      hide-header
      title="تاریخچه صلحنامه"
    />
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    results: Object
  },
  methods: {
    dbclick (event) {
      this.$emit('datatableDbclick', event.row)
    }
  }
}
</script>
