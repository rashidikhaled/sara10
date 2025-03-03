<template>
  <fit>
    <template>
      <text-template
        v-model="model2.Delivery.Request_Info.ExportLicenseComments"
        class="q-mt-sm"
        cdcName="ExportLicenseComments"
        m="r"
      />
    </template>
  </fit>
</template>

<script>
export default {
  props: {
    m: String,
    model2: Object,
    value: Object
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
