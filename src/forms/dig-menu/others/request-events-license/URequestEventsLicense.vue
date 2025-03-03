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
      name: "URequestEventsLicense",
      title: "محاسبه و صدور فیش اتفاقات",
      formKey: "11d6a744-6433-4132-8e33-6ca5b92a6fb3",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
