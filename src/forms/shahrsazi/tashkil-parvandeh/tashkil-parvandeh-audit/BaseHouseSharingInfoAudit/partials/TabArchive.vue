<template>
  <fit>
    <safa-datatable
      title="سوابق شهرسازی"
      helper="baseShahrsaziArchive"
      :m="m"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      v-model="value.Base_ShahrsaziArchive"
    />

  </fit>
</template>

<script>
export default {
  name: 'TabArchive',

  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
