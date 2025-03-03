<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      :m="m"
      class="q-mb-sm"
      fit
      height="100%"
      helper="baseAttachment"
      max-height="100%"
      title="ضمائم"
    />

    <text-template
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      :m="m"
      formKey="fe860706-1b42-471c-a39c-bd59d99bec31"
      label="توضیحات بازدید آپارتمان"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabBaseComment',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
