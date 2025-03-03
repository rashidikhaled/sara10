<template>
    <fit>
      <FormRow class="q-ma-sm">
        <text-template
        label="توضیحات تمدید مجوز"
        label-width="120px"
        v-model="value.ClsRenewal_Request.Request_Info.ExportLicenseComments"
        :suppressRowClickSelection="false"
        :deleteRow="true"
        cdcName="ExportLicenseComments"
        type="textarea"
        :rows="20"
        m="r"
      />
      </FormRow>

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
