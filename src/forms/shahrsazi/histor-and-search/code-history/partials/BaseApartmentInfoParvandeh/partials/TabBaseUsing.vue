<template>
  <fit>
    <safa-datatable2
      v-model="value.Base_Using"
      :allowCopy="true"
      :bordered="false"
      :copyWithCount="true"
      :m="m"
      class="q-mb-sm"
      fit
      height="100%"
      helper=shahrsazi.baseUsing
      max-height="100%"
      min-height="150px"
      title="کاربری ها"
    />   <!-- ولیدیشن قرار داده شد -->
    <!-- <template #footer> -->
    <!-- </template> -->
  </fit>
</template>
<script>
export default {
  name: 'TabBaseUsing',
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
