<template>
  <fit>
    <safa-datatable
      title="سایر"
      fit
      height="100%"
      max-height="100%"
      min-height="150px"
      helper="baseOtherEquipment"
      :m="m"
      v-model="value.Base_OtherEquipment"
      :bordered="false"

    />
    <q-separator class="q-mb-sm"/>
    <!-- <safa-datatable
        title="سهم العرصه ساختمان ها"
        class="col-sm-12 col-md-6"
        height= "15rem"
        helper="baseMultiBuilding"
        :m="m"
        v-model="value.Base_MultiBuilding"
      /> -->
  </fit>
</template>

<script>
export default {
  name: 'TabOther2',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
    }
  }
}
</script>
