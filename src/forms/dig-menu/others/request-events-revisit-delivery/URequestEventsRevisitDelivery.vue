<template>
  <safa-form
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
    :id="formKey"
    :caption="title"
  >
    <URevisitDelivery
      :requestType="2"
      :taskInfoHelp="taskInfo"
      :formKey="formKey"
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
      name: "URequestEventsRevisitDelivery",
      title: "بازدید تحویل موقت اتفاقات",
      formKey: "db5788cd-0e64-400c-971c-549bbfd74594",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
