<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <URegDelivery
      :issuancecostsRequestType="1"
      :formKey="formKey"
      :title="title"
      :name="name"
    />
  </safa-form>
</template>

<script>
import URegDelivery from "src/forms/dig-menu/others/reg-delivery/URegDelivery.vue"
export default {
  components: { URegDelivery },
  data () {
    return {
      title: "ثبت درخواست تحویل موقت طرح های توسعه",
      formKey: "38b783eb-6cdb-4814-a5d7-4e8ecb7029f1",
      name: "URequestServiceDelivery",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
