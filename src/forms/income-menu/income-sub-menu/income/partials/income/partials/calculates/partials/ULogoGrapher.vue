<template>
  <fit>
    <safa-datatable
      margin="0"
      :paginate="false"
      ref="grid"
      name="grid"
      helper="logoGrapher"
      fit
      height="100%"
      maxHeight="100%"
      :bordered="false"
      :hideHeader="true"
      title="وقایع نگار"
      v-model="logDetail"
      cdcName="logDetail"
    />
  </fit>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  props: {
    value: Object,
    logDetail: Array
  }
}
</script>
