<template>
  <section>
    <safa-datatable
      title="تقسیمات شهری ادارات و سازمانها"
      helper="baseBlockOrganize"
      :m="m"
      v-model="value.Base_BlockOrganize"
      cdcName="Base_BlockOrganize"
      minHeight="150px"
    />

    <safa-datatable
      title="فضای سبز"
      helper="baseGreenSpace"
      :m="m"
      v-model="value.Base_GreenSpace"
      cdcName="Base_GreenSpace"
      class="q-my-lg"
      :margin="null"
      minHeight="150px"
    />

    <text-template
      label="توضیحات پرونده بلوک "
      identifier="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
      :m="m"
      v-model="value.Base_BlockInfo.Comments"
      cdcName="Comments"
      formKey="63dcb9a2-023e-4222-9568-4a173c0e5191"
    />

  </section>
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
