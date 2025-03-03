<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <UDeliveryExportFiche
      :formKey="formKey"
      :title="title"
      :name="name"
      :RequestType="2"
    />
  </safa-form>
</template>

<script>
import UDeliveryExportFiche from "src/forms/dig-menu/others/delivery-export-fiche/UDeliveryExportFiche"
export default {
  components: { UDeliveryExportFiche },

  data () {
    return {
      name: "UDeliveryEventsExportFiche",
      title: "محاسبه و صدور فیش  تحویل اتفاقات",
      formKey: "3649B14B-0B1A-47B8-B4C3-E3E2C842820A",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
