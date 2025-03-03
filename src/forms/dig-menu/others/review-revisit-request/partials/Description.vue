<template>
  <fit>
    <FormRow>
      <text-template
        v-model="value.ClsRevisit_Request.Request_Info.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        label="توضیحات مجوز"
        label-width="90px"
        class="col-12"
        :rows="20"
        :m="m"
        />
    </FormRow>

  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String,
    name: String,
    title: String,
    formKey: String
  },

  data () {
    return {
    }
  }
}
</script>
