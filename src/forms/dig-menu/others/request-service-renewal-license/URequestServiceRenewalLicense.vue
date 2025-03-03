<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <ULicense
      :formKey="formKey"
      :title="title"
      :name="name"
      :requestType="1"
      :eumLicenseStatus="2"
      :taskInfo="taskInfo"
    />
  </safa-form>
</template>

<script>
import ULicense from "src/forms/dig-menu/others/license/ULicense"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  components: { ULicense },

  mixins: [baseFormMixin],
  data () {
    return {
      name: "URequestServiceRenewalLicense",
      title: "صدور فیش تمدید طرح های توسعه",
      formKey: "04821744-ADB0-4274-8306-6D82B9B8D70B",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
