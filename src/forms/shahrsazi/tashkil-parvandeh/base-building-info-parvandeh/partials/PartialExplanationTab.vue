<template>
  <section>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :data-items="value.Base_Attachment"
      cdcName="Base_Attachment"
      class="q-mb-lg"
      :margin="null"
    />

    <text-template
      label="توضیحات پرونده ساختمان"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      formKey="2279ee16-6eca-4b8c-86d9-5775ea9dba27"
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
