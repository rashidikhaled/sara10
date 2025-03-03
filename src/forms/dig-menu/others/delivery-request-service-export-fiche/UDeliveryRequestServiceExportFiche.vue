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
      :RequestType="1"
    />
  </safa-form>
</template>

<script>
import UDeliveryExportFiche from "src/forms/dig-menu/others/delivery-export-fiche/UDeliveryExportFiche"
export default {
  components: { UDeliveryExportFiche },

  data () {
    return {
      name: "UDeliveryRequestServiceExportFiche",
      title: "محاسبه و صدور فیش تحویل طرح های توسعه",
      formKey: "1365A303-2A05-43C0-9C42-1713C1FE694D",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
