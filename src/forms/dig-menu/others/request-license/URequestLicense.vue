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
      :requestType="0"
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
      name: "URequestLicense",
      title: "محاسبه و صدور فیش انشعابات شخصی",
      formKey: "a03992fb-13f1-45d5-93d8-30eff0d4d981",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
