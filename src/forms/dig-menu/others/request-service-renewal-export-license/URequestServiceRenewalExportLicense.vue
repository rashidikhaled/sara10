<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <fit>
      <UExportLicense
        RequestType="1"
        :EumLicenseStatus="2"
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
      name: "URequestServiceRenewalExportLicense",
      title: "تمدید مجوز حفاری طرح های توسعه",
      formKey: "3DB42A6D-333F-48D9-B5DA-F27FD2000527",
      main: true,
      workflowCompatible: true
    }
  }
}
</script>
