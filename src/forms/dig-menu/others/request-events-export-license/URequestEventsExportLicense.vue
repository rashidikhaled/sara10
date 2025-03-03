<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <fit>
      <UExportLicense
        :formKey="formKey"
        :title="title"
        :name="name"
        ref="uLicenseRef"
        RequestType="1"
        :EumLicenseStatus="1"
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
      name: "URequestEventsExportLicense",
      title: "صدور مجوز حفاری اتفاقات",
      formKey: "a3a9bc59-150f-4a62-b6a3-a17342a963e9",
      main: true,
      workflowCompatible: true
    }
  }
}
</script>
