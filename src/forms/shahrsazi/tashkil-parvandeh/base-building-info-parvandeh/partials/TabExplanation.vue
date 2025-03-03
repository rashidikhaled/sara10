<template>
  <fit>
    <safa-datatable
      title="ضمائم"
      helper="baseAttachment"
      :m="m"
      v-model="value.Base_Attachment"
      cdcName="Base_Attachment"
      fit
    />
    <div class="row q-my-sm">
      <text-template
        formKey="2b2fda13-012d-46e6-96ea-54bc86ad4ab9"
        label="توضیحات پرونده ساختمان"
        :m="m"
        v-model="value.Base_CommonEstate.Comments"
        cdcName="Comments"
        :rows="5"
        class="col-12 q-mb-sm"
      />
    </div>
  </fit>
</template>

<script>
export default {
  name: "TabExplanation",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
