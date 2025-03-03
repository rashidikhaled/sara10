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
      :eumLicenseStatus="1"
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
      name: "URequestServiceLicense",
      title: "محاسبه و صدور فیش  طرح های توسعه",
      formKey: "0cea3e3f-6194-4f5f-8004-a15031e55d16",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
