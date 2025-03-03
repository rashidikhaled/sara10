<template>
  <fit>
    <safa-checkbox
      v-model="value.Base_HouseInfo.HasPenalty"
      cdcName="HasPenalty"
      label="پرونده خلاف دارد؟"
    />
    <safa-datatable
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      :m="m"
      class="q-my-sm"
      fit
      height="100%"
      helper="baseAttachment"
      max-height="100%"
      min-height="150px"
      title="ضمائم"
    />
    <text-template
      v-model="value.Base_CommonEstate.Comments"
      cdcName="Comments"
      :m="m"
      formKey="11675d88-d030-49b8-89fb-2d12cb3d97f6"
      label="توضیحات بازدید عرصه"
      type="textarea"
    />
  </fit>
</template>

<script>
export default {
  name: 'TabPlans',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
