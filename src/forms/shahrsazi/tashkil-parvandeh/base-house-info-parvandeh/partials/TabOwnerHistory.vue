<template>
    <fit>
      <safa-datatable
        title="مالکین قبلی"
        helper="baseOwnerHistory"
        :m="m"
        v-model="value.Base_OwnerHistory"
        cdcName="Base_OwnerHistory"
        fit
        height="100%"
        max-height="100%"
        min-height="150px"
        :bordered="false"
        :show-selected-checkbox="false"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
           />
    </fit>
  </template>

<script>
export default {
  name: 'TabOwnerHistory',

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    m: String
  },
  data () {
    return {
    }
  }
}
</script>
