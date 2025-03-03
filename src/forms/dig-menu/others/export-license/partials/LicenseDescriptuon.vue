<template>
    <fit>
     <div class="q-mb-sm">
      <text-template
        v-model="value.ClsExportLicense.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        :formKey="'25d802b6-3d4d-48d7-8294-40825ac687e1'"
        label="توضیحات مجوز"
        label-width="100px"
        :rows="2"

      />
     </div>
<div>
  <text-template
        v-model="value.ClsExportLicense.ExportLicenseMayorComment"
        cdcName="ExportLicenseMayorComment"
        :formKey="'cd6c7145-6477-4075-ba19-979af1967bd7'"
        label="توضیحات عدم تایید"
        label-width="100px"
        :rows="2"

      />
</div>
    </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    formKey: String,
    title: String,
    name: String,
    m: String
  },

  data () {
    return {}
  }
}
</script>
