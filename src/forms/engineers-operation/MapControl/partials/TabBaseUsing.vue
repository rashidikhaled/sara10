<template>
  <fit>
    <safa-datatable2
      helper="baseUsingMapControl"
      :m="m"
      :allowCopy="true"
      :copyWithCount="true"
      :selectable="true"
      :allowMultipleSelection="false"
      title="کاربری های نقشه"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
      v-model="model.Base_Using"
      paginate
    />  <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: "TabBaseUsing",
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
