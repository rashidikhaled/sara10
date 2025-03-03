<template>
  <fit>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      v-model="value.Base_Attachment"
      :m="m"
      height="200px"
      class="q-mb-sm"
    />
    <text-template
      label="توضیحات ممیزی ساختمان"
      identifier="b7944250-2a91-4b53-b7d2-5f173bed7f9a"
      :m="m"
      v-model="value.Base_CommonEstate.Comments"
      formKey="f0bdcfbf-2baf-4968-b608-ea13c03200f0"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabExplanation',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
