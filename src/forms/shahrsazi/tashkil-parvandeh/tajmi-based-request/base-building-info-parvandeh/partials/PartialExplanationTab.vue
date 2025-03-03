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
      formKey="063f213a-1a05-436e-acfa-bf979db3e7e4"
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
