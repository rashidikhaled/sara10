<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <URegDelivery
      :issuancecostsRequestType="2"
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
      title: "ثبت درخواست تحویل موقت اتفاقات",
      formKey: "9862000c-fad7-47ad-bdc6-5cf7bc25a12e",
      name: "URequestEventsDelivery",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true
    }
  }
}
</script>
