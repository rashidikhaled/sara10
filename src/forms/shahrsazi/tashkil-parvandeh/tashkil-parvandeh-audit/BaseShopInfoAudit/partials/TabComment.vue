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
      min-height="150px"
    />
    <div class="q-mt-sm">
      <text-template
        :formKey="formKey"
        label="توضیحات"
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
      />
    </div>
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
    },
    formKey: String
  }
}
</script>
