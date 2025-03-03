<template>
  <fit>
    <safa-datatable
      helper="baseUsingMojazPayankarSenfi"
      title="مشخصات طبقه و کاربری "
      v-model="value.Base_Using"
      height="100%"
      max-height="100%"
      :bordered="false"
      :allowCopy="true"
      :m="m"
    />
  </fit>
</template>

<script>
export default {
  name: 'PartialUsingTab',
  data: function () {
    return {
      splitterModel: 50
    }
  },
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
