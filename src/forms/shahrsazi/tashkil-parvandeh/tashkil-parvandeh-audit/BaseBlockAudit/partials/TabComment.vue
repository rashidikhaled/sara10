<template>
  <section>
    <div class="row q-col-gutter-lg">
      <safa-datatable
        title="تقسیمات شهری ادارات و سازمانها"
        helper="baseBlockOrganize"
        :m="m"
        v-model="value.Base_BlockOrganize"
        minHeight="150px"
        class="col-12 col-sm-6"
      />
      <safa-datatable
        title="فضای سبز"
        helper="baseGreenSpace"
        :m="m"
        v-model="value.Base_GreenSpace"
        minHeight="150px"
        class="col-12 col-sm-6"
      />
    </div>

    <div class="q-mt-lg">
      <text-template
        title="توضیحات پرونده بلوک "
        identifier="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
        :m="m"
        v-model="value.Base_BlockInfo.Comments"
        formKey="f081e1fe-b66b-4fca-86d5-25b23daef1db"
      />
    </div>

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
