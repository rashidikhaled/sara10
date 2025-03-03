<template>
  <fit>
    <safa-datatable2
      title="کاربری ها"
      helper=shahrsazi.baseUsing
      :m="m"
      v-model="value.Base_Using"
      cdcName="Base_Using"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      :addRow="true"
      :deleteRow="true"
      :allowCopy="true"
      :copyWithCount="true"
      :bordered="false"
    />   <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'PartialBaseUsingTab',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
