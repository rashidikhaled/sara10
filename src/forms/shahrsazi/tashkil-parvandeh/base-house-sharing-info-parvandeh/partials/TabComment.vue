<template>
  <fit>
    <safa-datatable
      helper="baseAttachment"
      :m="m"
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      title="ضمائم"
      :selectable="false"
      class="q-mb-sm"
      :margin="null"
      height="200px"
    />

    <text-template
      label="توضیحات پرونده دستگاه"
      formKey="30dca8da-c7cd-47cc-97f6-28120f24fa4e"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Base_CommonEstate"
      ::emptyRowLimit="1"
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
