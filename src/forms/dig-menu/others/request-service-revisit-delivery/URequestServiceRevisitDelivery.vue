<template>
  <safa-form
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <URevisitDelivery
      :requestType="1"
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
      name: "URequestServiceRevisitDelivery",
      title: "بازدید تحویل موقت طرح های توسعه",
      formKey: "c3c511f6-79ce-4e84-adca-f4f0cecf169f",
      main: true,
      taskInfoHelp: {},
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
