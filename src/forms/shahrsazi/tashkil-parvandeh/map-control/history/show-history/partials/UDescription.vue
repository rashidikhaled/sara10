<template>
  <fit>
    <text-template
      label="توضیحات کارشناس بازدید"
      label-width="130px"
      v-model="value.Base_CommonEstate.Comments"
      formKey="11B82007-5214-4087-BAEE-4D7A1B72D944"
      m="r"
      fit
      class="q-mb-sm"
    />
    <text-template
      label="توضیحات کنترل نقشه"
      label-width="130px"
      v-model="value.Sh_MapControl.Comments"
      m="r"
      fit
      formKey="11B82007-5214-4087-BAEE-4D7A1B72D944"
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
    value: Object,
    m: String
  }
}
</script>
