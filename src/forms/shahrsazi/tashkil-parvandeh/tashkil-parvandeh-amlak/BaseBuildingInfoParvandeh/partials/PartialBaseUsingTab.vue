<template>
  <fit>
    <safa-datatable2
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper=baseUsing
      :m="m"
      v-model="value.Base_Using"
      :bordered="false"
      :allowCopy="true"
      :CopyWithCount="true"
      title="کاربری ها"
    />  <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseUsingTab',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
