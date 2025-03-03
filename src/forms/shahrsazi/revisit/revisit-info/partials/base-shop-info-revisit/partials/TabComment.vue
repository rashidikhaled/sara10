<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      :m="m"
      class="q-mb-sm"
      height="200px"
      helper="baseAttachment"
      title="ضمائم"
    />
    <text-template
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      :m="m"
      formKey="ef3615eb-03e5-4ca3-a490-2ef15623bdb3"
      identifier="6660747c-0fac-4705-a631-518622371a40"
      label="توضیحات"
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
