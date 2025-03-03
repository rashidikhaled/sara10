<template>
    <fit>
      <text-template
        label-width="80px"
        v-model="value.RevisitRenewal_RequestService.RequestService_Info.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        type="textarea"
        :rows="3"
      />
    </fit>
  </template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
    }
  }
}
</script>
