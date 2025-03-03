<template>
  <fit>
    <FotmRow class="q-my-sm">
      <text-template
        v-model="value.ExportLicenseComments"
        cdcName="ExportLicenseComments"
        label="توضیحات"
        label-width="80px"
        class="col-12"
        :rows="9"
        :m="m"
      />
    </FotmRow>
  </fit>
</template>

<script>
export default {
  props: {
    formKey: String,
    title: String,
    name: String,
    m: String,
    value: Object
  },
  data () {
    return {

    }
  },
  methods: {}
}
</script>
