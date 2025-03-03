<template>
  <fit>
    <safa-datatable
      v-model="value.Base_Parking"
      cdcName="Base_Parking"
      :m="m"
      fit
      height="100%"
      helper="baseParking"
      max-height="100%"
      title="پارکینگ ها"
    />
  </fit>
</template>
<script>
export default {
  name: "TabBaseParkings",
  props: {
    m: String,
    value: Object
  },
  data () {
    return {
      horizontalSplitter: 50,
      verticalSplitter: 50
    }
  }
}
</script>
