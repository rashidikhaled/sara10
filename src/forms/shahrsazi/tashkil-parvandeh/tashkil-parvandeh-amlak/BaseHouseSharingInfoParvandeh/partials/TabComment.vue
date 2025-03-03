<template>
  <fit>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :m="m"
      v-model="value.Base_Attachment"
      height="250px"
      class="q-mb-sm"
      :bordered="false"
    />
    <text-template
      label="توضیحات پرونده دستگاه"
      identifier="30dca8da-c7cd-47cc-97f6-28120f24fa4e"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="f9918d47-aa75-4ac3-881e-0373cddfcad8"
    />
  </fit>
</template>
<script>
export default {
  name: 'TabComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
