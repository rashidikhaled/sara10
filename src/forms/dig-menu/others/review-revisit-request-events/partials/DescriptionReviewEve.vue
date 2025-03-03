<template>
  <fit>
    <FormControl class="q-my-sm">
      <text-template
        v-model="value.ClsRevisit_RequestService.RequestService_Info.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        label="توضیحات"
        label-width="80px"
        class="col-12"
        :rows="20"
        m="r"
      />
    </FormControl>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object
  },
  data () {
    return {
      name: "DescriptionReviewEve"
    }
  }
}
</script>
