<template>
  <section>

    <safa-datatable
      title="تقسیمات شهری ادارات و سازمانها"
      helper="baseBlockOrganize"
      :m="m"
      v-model="value.Base_BlockOrganize"
    />
    <safa-datatable
      title="فضای سبز"
      helper="baseGreenSpace"
      :m="m"
      v-model="value.Base_GreenSpace"
      class="q-my-lg"
      :margin="null"
    />

    <text-template
      class="col-12"
      label="توضیحات پرونده بلوک"
      formKey="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
      :m="m"
      v-model="value.Base_BlockInfo.Comments"
    ></text-template>

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
