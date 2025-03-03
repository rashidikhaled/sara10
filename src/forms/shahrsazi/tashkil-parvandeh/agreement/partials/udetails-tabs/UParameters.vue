<template>
  <safa-datatable
    v-model="formModel.AgreementParameters"
    cdcName="AgreementParameters"
    helper="parametersinAgreement"
    :hideToolbar="true"
    fit
    max-height="100%"
    height="100%"
    minHeight="100%"
    title="پارامترها"
    m="e"
    :addRow="false"
    :deleteRow="false"
  />
</template>

<script>
export default {
  props: {
    formModel: Object,
    m: String
  },
  data () {
    return {
      items: []
    }
  }
}
</script>
