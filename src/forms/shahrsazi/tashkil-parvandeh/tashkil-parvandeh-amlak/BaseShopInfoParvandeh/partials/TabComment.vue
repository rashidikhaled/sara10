<template>
  <fit>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :m="m"
      v-model="value.Base_Attachment"
      height="200px"
      class="q-mb-sm"
    />

    <text-template
      label="توضیحات"
      identifier="96d76b80-75ac-48ba-9090-5f499d926dd6"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="174310b1-3796-462f-91c2-f9516cd32cad"
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
