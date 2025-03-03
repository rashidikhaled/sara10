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
        label="توضیحات ممیزی دستگاه"
        formKey="default"
        :m="m"
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
    }
  }
}
</script>
