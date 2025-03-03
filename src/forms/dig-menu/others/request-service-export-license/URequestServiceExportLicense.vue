<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
  <fit>
    <UExportLicense RequestType="1" :EumLicenseStatus="1" :formKey="formKey" :title="title" :name="name" />
  </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UExportLicense from "src/forms/dig-menu/others/export-license/UExportLicense"
export default {
  mixins: [baseFormMixin],
  components: { UExportLicense },

  data () {
    return {
      name: "URequestServiceExportLicense",
      title: "صدور مجوز حفاری طرح های توسعه",
      formKey: "B5AC06BC-6E06-4C63-BB1A-DB35EB46D85E",
      main: true,
      workflowCompatible: true
    }
  }
}
</script>
