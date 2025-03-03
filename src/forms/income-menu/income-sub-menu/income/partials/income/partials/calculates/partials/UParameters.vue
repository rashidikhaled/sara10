<template>
  <fit>
    <safa-datatable
      v-model="incomeDetailResults.IncomeParameters"
      cdcName="IncomeParameters"
      ref="grid"
      name="grid"
      helper="parameters"
      :paginate="false"
      fit
      height="100%"
      maxHeight="100%"
      :bordered="false"
      :hideHeader="true"
      :m="m"
    >
    </safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    value: Object,
    incomeDetailResults: Object,
    m: String
  }
}
</script>
