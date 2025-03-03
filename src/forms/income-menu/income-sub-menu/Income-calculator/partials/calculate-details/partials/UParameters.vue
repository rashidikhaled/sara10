<template>
  <div class="fit">
    <safa-datatable
      ref="grid"
      name="grid"
      helper="parameters"
      v-model="incomeDetailsResults.IncomeParameters"
      m="e"
      :allowNewRow='false'
      :hideHeader="false"
      height="100%"
      max-height="100%"
      fit
      :bordered="false"
      title="پارامترها"
    ></safa-datatable>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    incomeDetailsResults: Object
  },
  mounted () {},
  methods: {}
}
</script>
