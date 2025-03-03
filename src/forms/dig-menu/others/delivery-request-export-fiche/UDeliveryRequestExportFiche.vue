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
      :RequestType="0"
    />
  </safa-form>
</template>

<script>
import UDeliveryExportFiche from "src/forms/dig-menu/others/delivery-export-fiche/UDeliveryExportFiche"
export default {
  components: { UDeliveryExportFiche },

  data () {
    return {
      name: "UDeliveryRequestExportFiche",
      title: "محاسبه و صدور فیش  تحویل انشعابات شخصی",
      formKey: "9ce9cf15-4011-4d5f-bb4c-57479aa9276a",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
