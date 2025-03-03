<template>
  <!-- <section> -->
  <fit>
    <safa-splitter
      v-model="gridSplitter"
      class="fit"
      horizontal
      margin="0"
      style="min-height:200px"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="تقسیمات شهری ادارات و سازمانها"
            helper="baseBlockOrganize"
            :m="m"
            v-model="value.Base_BlockOrganize"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="فضای سبز"
            helper="baseGreenSpace"
            :m="m"
            v-model="value.Base_GreenSpace"
          />
        </fit>
      </template>
    </safa-splitter>

    <text-template
      label="توضیحات پرونده بلوک"
      formKey="9e7dc71a-4ed0-475e-b0f2-a3a8ecd4965f"
      :m="m"
      v-model="value.Base_BlockInfo.Comments"
      type="textarea"
      class="q-mt-sm"
    />
  </fit>
  <!-- </section> -->
</template>

<script>
export default {
  name: 'TabComment',
  data () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
