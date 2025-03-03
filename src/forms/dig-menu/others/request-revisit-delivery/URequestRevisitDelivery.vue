<template>
  <safa-form
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <URevisitDelivery
      :requestType="0"
      :formKey="formKey"
      :taskInfoHelp="taskInfo"
      :title="title"
      :name="name"
    />
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import URevisitDelivery from "src/forms/dig-menu/others/revisit-delivery/URevisitDelivery"
export default {
  mixins: [baseFormMixin],
  components: { URevisitDelivery },

  data () {
    return {
      name: "URequestRevisitDelivery",
      title: "بازدید تحویل موقت انشعابات",
      formKey: "d9386048-22b0-4110-89bf-0de94d892f1b",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
