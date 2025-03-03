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
    <div class="q-mt-sm">
      <text-template
        class="col-12"
        label="توضیحات مجاز موافقت اصولی"
        identifier="88527ca1-05d9-482a-a35d-2a0c96193207"
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
        :formKey="formKey"
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
