<template>
  <fit>
    <div class="fit">
      <safa-datatable
        :m="m"
        title="ضمائم"
        helper="baseAttachment"
        height="100%"
        max-height="100%"
        fit
        class="q-pa-sm"
        v-model="value.Base_Attachment"
      />
    </div>
    <text-template
      label="توضیحات مجاز پایانکار آپارتمان"
      identifier="c986d816-4e4e-46fb-a183-6303352c1341"
      formKey="a50c4e46-9f09-45ba-a613-a3f54f52a0b1"
      :m="m"
      :rows="5"
      type="textarea"
      class="q-px-sm"
      v-model="value.Base_CommonEstate.Comments"
    />
    <div class="q-mt-sm q-pl-sm">
      <safa-checkbox
        label="تفکیک اعیانی نشده است"
        v-model="value.Base_ApartmentInfo.IsNotTafkikAyan"
        :m="m"
      ></safa-checkbox>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'PartialExplanationTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
