<template>
  <fit>
    <safa-datatable2
      helper=baseUsing
      :m="m"
      v-model="value.Base_Using"
      cdcName="Base_Using"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
    />   <!-- ولیدیشن قرار داده شد -->
  </fit>
</template>

<script>
export default {
  name: 'TabBaseUsing',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
