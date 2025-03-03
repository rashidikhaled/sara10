<template>
  <fit>
    <FormRow class="q-mb-sm">
      <text-template
        label="توضیحات"
        formKey="b72f39f4-c321-4c01-90df-fc99f61bb0bb"
        class="col-12"
        :row="3"
        v-model="value.ClsFil_Info.Fil_Info.FileComments"
        cdcName="FileComments"
        :labelShrink="true"
        :m="m === 'e' ? fileCommentsMode : 'r'"
      >
      </text-template>
    </FormRow>
    <safa-grid
      title="توضیحات"
      helper="Comments"
      v-model="value.ClsFil_Info.Fil_Text"
      cdcName="Fil_Text"
      fit
      min-height="200px"
      height="100%"
      max-height="100%"
      :m="m"
      paginate
    />
  </fit>
</template>
<script>
export default {
  props: {
    value: Object,
    m: String
  },

  data () {
    return {
      fileCommentsMode: "e"
    }
  }
}
</script>
