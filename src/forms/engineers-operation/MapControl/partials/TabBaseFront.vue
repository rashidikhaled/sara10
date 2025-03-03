<template>
  <fit>
    <safa-datatable
      helper="baseFrontMapControl"
      :m="m"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      title="پیش آمدگیها"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
      v-model="model.Base_Front"
      paginate
    />
  </fit>
</template>

<script>
export default {
  name: "TabBaseFront",
  data () {
    return {
    }
  },
  props: {
    m: String,
    model: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
