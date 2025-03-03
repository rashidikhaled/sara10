<template>
    <fit>
      <text-template
        label-width="80px"
        v-model="value.RequestService_Info.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        type="textarea"
        :rows="3"
        :m="m"
      />
    </fit>
  </template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },

  data () {
    return {
    }
  }
}
</script>
