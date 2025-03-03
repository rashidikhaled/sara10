<template>
  <fit>

    <safa-datatable
      title="سوابق شهرسازی"
      helper="baseShahrsaziArchive"
      :m="m"
      v-model="value.Base_ShahrsaziArchive"
      fit
      height="100%"
      max-height="100%"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
