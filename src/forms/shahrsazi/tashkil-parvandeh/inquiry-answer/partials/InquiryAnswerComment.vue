<template>
  <fit>
    <div class="q-mb-sm">
    <text-template
      label="توضیحات"
      :m="m"
      v-model="results.Sh_InquiryResponse.Comments"
      height="40px"
      formKey="79393232-bf65-42f4-ba19-fb9a2e7d5264"

    />
    </div>

      <safa-datatable
        height="100%"
        max-height="100%"
        min-height="350px"
        fit
        title=" نامه ها"
        v-model="results.Base_Letter"
        ref="grid2"
        helper="letters"
      ></safa-datatable>

  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
