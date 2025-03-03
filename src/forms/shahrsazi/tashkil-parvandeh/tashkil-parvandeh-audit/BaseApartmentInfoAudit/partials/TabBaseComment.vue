<template>
  <fit>

    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :m="m"
      fit
      height="100%"
      max-height="100%"
      minHeight="150px"
      v-model="value.Base_Attachment"
    />

    <div class="q-mt-sm q-mx-sm">
      <text-template
        label="توضیحات ممیزی آپارتمان"
        identifier="81f95907-c62c-4fff-8d8d-6003c1cdb09c"
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
        formKey="2d49ddb9-a8f7-4f5a-a05b-4a3a6ba90365"
      />
    </div>
    <div class="q-ma-sm">
      <safa-checkbox
        label="تفکیک اعیانی نشده است"
        :m="m"
        v-model="value.Base_ApartmentInfo.IsNotTafkikAyan"
      ></safa-checkbox>
    </div>

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
