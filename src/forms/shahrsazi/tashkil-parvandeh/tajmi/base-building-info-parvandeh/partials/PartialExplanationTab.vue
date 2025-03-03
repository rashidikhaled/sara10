<template>
  <section>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :data-items="value.Base_Attachment"
      class="q-mb-lg"
      :margin="null"
    />

    <text-template
      label="توضیحات پرونده ساختمان"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="7bad1695-6444-4868-b75d-955bb2f8d508"
    />

  </section>
</template>

<script>
export default {
  name: 'PartialBaseParkingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
