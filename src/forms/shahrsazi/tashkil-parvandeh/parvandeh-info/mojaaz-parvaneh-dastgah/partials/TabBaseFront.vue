<template>
  <fit>
    <safa-datatable
      title="پیشامدگی ها"
      helper="baseFrontApartmentMojazPayankar"
      :m="m"
      v-model="value.Base_Front"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :bordered="false"
      :allowCopy="true"
      :copyWithCount="true"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabBaseFront',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
