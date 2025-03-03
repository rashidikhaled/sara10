<template>
  <fit>
    <safa-datatable
      title="کاربری ها"
      helper=shahrsazi.baseUsing
      :m="m"
      v-model="value.Base_Using"
      fit
      height="100%"
      max-height="100%"
      :bordered="false"
      class="q-mb-sm"
    />

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
