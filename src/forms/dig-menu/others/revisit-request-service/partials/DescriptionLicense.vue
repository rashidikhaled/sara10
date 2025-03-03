<template>
    <fit>
      <text-template
        label-width="80px"
        v-model="value.ClsRevisit_RequestService.RequestService_Info.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        formKey="f162b4fe-3224-45ee-8d01-af0bc5cb6575"
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
