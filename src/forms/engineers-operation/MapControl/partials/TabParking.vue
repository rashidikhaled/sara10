<template>
  <fit>
    <safa-splitter style="min-height:500px" v-model="gridSplitter" horizontal>
      <template #before>
        <safa-datatable
          helper="baseParking"
          :m="m"
          :allowCopy="true"
          :copyWithCount="true"
          :selectable="true"
          :allowMultipleSelection="false"
          title="پارکینگ ها"
          fit
          height="100%"
          max-height="100%"
          :bordered="false"
          v-model="model.Base_Parking"
          paginate
        />
      </template>
      <template #after>
        <safa-datatable
          helper="parkingProductionMethod"
          :m="m"
          :allowCopy="true"
          :copyWithCount="true"
          :selectable="true"
          :allowMultipleSelection="false"
          title="نحوه تامین پارکینگ"
          fit
          height="100%"
          max-height="100%"
          :bordered="false"
          v-model="model.Base_SupplyParking"
          paginate
        />
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: "TabBaseUsing",
  data () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    m: String,
    model: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
