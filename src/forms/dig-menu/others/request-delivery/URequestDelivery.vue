<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <URegDelivery
      :issuancecostsRequestType="0"
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
      title: "ثبت درخواست تحویل موقت انشعابات",
      formKey: "0b678216-4665-4db5-a87d-6a7d77647dba",
      name: "URequestDelivery",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
