<template>
  <fit>
    <safa-datatable
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      title="ضمائم"
      helper="baseAttachment"
      v-model="value.Base_Attachment"
      class="q-mb-sm"
      :m="m"
    />
    <text-template
      label="توضیحات پرونده ساختمان"
      identifier="2b2fda13-012d-46e6-96ea-54bc86ad4ab9"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="f2a0b472-046f-4f40-a6f3-2d7ce66edd52"
    />
  </fit>
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
