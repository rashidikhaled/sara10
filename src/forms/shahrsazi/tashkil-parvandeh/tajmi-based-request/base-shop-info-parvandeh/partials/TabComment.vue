<template>
  <fit>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :m="m"
      v-model="value.Base_Attachment"
      fit
      height="100%"
      max-height="100%"
    />

    <text-template
      label="توضیحات"
      formKey="96d76b80-75ac-48ba-9090-5f499d926dd6"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      class="fit q-mt-sm"
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
