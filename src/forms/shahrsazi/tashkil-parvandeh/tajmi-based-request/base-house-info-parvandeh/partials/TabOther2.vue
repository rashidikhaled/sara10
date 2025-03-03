<template>
  <fit>
    <safa-splitter
      v-model="verticalSplitter"
      vertical
      class="fit"
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            helper="baseOtherEquipment"
            :m="m"
            v-model="value.Base_OtherEquipment"
            cdcName="Base_OtherEquipment"
            title="سایر"
            fit
            height="100%"
            min-height="100px"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            minHeight="240px"
            helper="baseMultiBuilding"
            :m="m"
            v-model="value.Base_MultiBuilding"
            title="سهم العرصه ساختمان ها"
            fit
            height="100%"
            min-height="100px"
            max-height="100%"
          />
        </fit>
      </template>
    </safa-splitter>
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
      verticalSplitter: 50
    }
  }
}
</script>
