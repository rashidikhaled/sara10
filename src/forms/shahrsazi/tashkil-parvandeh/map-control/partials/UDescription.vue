<template>
  <fit>
    <text-template
      v-model="results.Base_CommonEstate.Comments"
      cdcName="BaseCommonEstateComments"
      formKey="60ded07e-9f50-42d4-9201-e0e9d638e839"
      label="توضیحات کارشناس بازدید"
      m="r"
      class="q-mb-sm"
      labelWidth="130px"
      :label-shrink="false"
    />
    <text-template
      v-model="results.Sh_MapControl.Comments"
      cdcName="ShMapControlComments"
      :m="m"
      formKey="60ded07e-9f50-42d4-9201-e0e9d638e839"
      label="توضیحات کنترل نقشه"
      label-width="130px"
      :label-shrink="false"
    />
  </fit>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    results: Object,
    m: String

  }
}
</script>
