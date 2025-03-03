<template>
  <fit>
    <safa-datatable
      helper="applicantRequestAndTechnicalOpinion"
      :m="m"
      v-model="results.Sh_TechnicalStaff"
      fit
      height="100%"
      max-height="100%"
      class="q-mb-sm"
    />
    <text-template
      label="توضیحات کارشناس شهرسازی"
      type="textarea"
      label-width="100px"
      :m="m"
      v-model="results.Sh_TechnicalStaff[22]"
      :rows="3"
      formKey="6250ab3f-c960-4d61-bf0b-60fdc572b7e6"
    />
  </fit>
</template>

<script>
export default {
  name: 'applicantRequestAndTechnicalOpinion',
  data () {
    return {}
  },
  props: {
    m: String,
    results: Object,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
