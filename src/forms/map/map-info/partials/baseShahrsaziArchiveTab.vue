<template>
  <fit>
    <safa-datatable
      title="سوابق شهرسازی"
      fit
      min-height="100px"
      height="100%"
      max-height="100%"
      helper="BaseShahrsaziArchiveMap"
      m="r"
      v-model="model.Base_ShahrsaziArchive"
      :bordered="false"
      :allowMultipleSelection="false"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    model: Object
  }
}
</script>
