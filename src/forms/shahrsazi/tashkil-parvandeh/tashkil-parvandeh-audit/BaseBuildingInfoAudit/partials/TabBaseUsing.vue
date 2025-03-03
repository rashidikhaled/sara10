<template>
  <fit>
    <safa-datatable2
      helper="shahrsazi.baseUsing"
      :m="m"
      v-model="value.Base_Using"
      height="100%"
      max-height="100%"
      margin="0"
      class="fit"
      title="کاربری ها"
      :bordered="false"
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
