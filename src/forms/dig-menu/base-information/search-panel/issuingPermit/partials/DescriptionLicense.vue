<template>
  <fit>
    <FormControl class="q-my-sm">
      <text-template
        v-model="Comments"
        cdcName="Comments"
        label="توضیحات"
        label-width="120px"
        class="col-12"
        :rows="10"
        m="e"
      />
    </FormControl>
    <div class="row q-gutter-sm">
      <btn-default label="ذخیره توضیحات" @click="saveExportLicenseComments(Comments)" />
    </div>
    <FormControl class="q-my-sm">
      <text-template
        v-model="MayorCommen"
        cdcName="Comments"
        label="توضیحات عدم تأیید"
        label-width="120px"
        class="col-12"
        :rows="10"
        m="e"
      />
    </FormControl>
    <div class="row q-gutter-sm">
      <btn-default
        label="ذخیره توضیحات عدم تأیید"
        @click="saveExportLicenseMayorCommen(MayorCommen)"
      />
    </div>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    rowSelectData: Object
  },
  data () {
    return {
      Comments: "",
      MayorCommen: ""
    }
  },
  methods: {
    saveExportLicenseComments (Comments) {
      this.$emit('saveExportLicenseComments', Comments)
    },
    saveExportLicenseMayorCommen (MayorCommen) {
      this.$emit('saveExportLicenseMayorCommen', MayorCommen)
    }
  }
}
</script>
