<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      :m="m"
      class="q-mb-sm"
      height="180px"
      helper="baseAttachment"
      title="ضمائم"
    />

    <text-template
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      :m="m"
      formKey="006d9d9c-2779-4ce9-b206-d01dbb2a479f"
      label="توضیحات بازدید ساختمان"
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
