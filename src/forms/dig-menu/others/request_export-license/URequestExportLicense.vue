<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <fit>
      <UExportLicense
        RequestType="0"
        :EumLicenseStatus="1"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
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
      name: "URequestExportLicense",
      title: "صدور مجوز حفاری انشعابات شخصی",
      formKey: "F7DFD706-390D-43A9-A553-B214ED1366C7",
      main: true,
      workflowCompatible: true
    }
  }
}
</script>
