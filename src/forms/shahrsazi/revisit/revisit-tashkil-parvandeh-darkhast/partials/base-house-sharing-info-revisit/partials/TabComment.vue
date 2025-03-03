<template>
  <fit>
    <div class="q-mb-sm">
      <safa-datatable
        v-model="value.Base_Attachment"
        :m="m"
        height="200px"
        helper="baseAttachment"
        title="ضمائم"
      />
    </div>
    <text-template
      v-model="value.Base_CommonEstate.Comments"
      :m="m"
      formKey="3b2b16ca-4be7-4756-8737-699ba46d0629"
      label="توضیحات بازدید دستگاه"
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
