<template>
  <fit>
    <FormControl>
      <text-template
        v-model="value.ClsRevisit_Request.Request_Info.ExportLicenseComments"
        cdcName="Description"
        label="توضیحات مجوز"
        formKey="bc4c7116-e57c-4b7a-9cd0-644989b52186"
        label-width="120px"
        class="col-12"
        :rows="20"
        :m="m"
      />
    </FormControl>
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
      name: "DescriptionLicense"
    }
  },
  methods: {},
  mounted () {}
}
</script>
