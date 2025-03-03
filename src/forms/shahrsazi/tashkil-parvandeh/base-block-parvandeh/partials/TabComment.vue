<template>
  <fit>
    <safa-datatable
      title="تقسیمات شهری ادارات و سازمانها"
      helper="baseBlockOrganize"
      :m="m"
      v-model="value.Base_BlockOrganize"
      cdcName="Base_BlockOrganize"
      height="100%"
      min-height="100px"
      max-height="100%"
      fit
    />
    <safa-datatable
      title="فضای سبز"
      helper="baseGreenSpace"
      :m="m"
      v-model="value.Base_GreenSpace"
      cdcName="Base_GreenSpace"
      height="100%"
      min-height="100px"
      max-height="100%"
      class="q-my-sm"
      fit
    />
    <FormRow class="q-px-sm q-pb-sm">
      <text-template
        label="توضیحات پرونده بلوک"
        formKey="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
        :m="m"
        :rows="1"
        v-model="value.Base_BlockInfo.Comments"
        cdcName="Comments"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  name: "TabComment",

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
