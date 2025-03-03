<template>
  <fit>
    <safa-datatable2
      title="کاربری ها"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper=shahrsazi.baseUsing
      :m="m"
      v-model="value.Base_Using"
      :bordered="false"
      class="q-mb-sm"
      :allowCopy="true"
      :copyWithCount="true"
    />  <!-- ولیدیشن قرار داده شد -->
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
