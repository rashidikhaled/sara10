<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      fit
      margin="0"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            cdcName="Base_SupplyParking"
            fit
            height="100%"
            max-height="100%"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-splitter
            v-model="horizontalSplitter"
            vertical
            fit
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  title="پارکینگ ها"
                  helper="baseParking"
                  :m="m"
                  v-model="value.Base_Parking"
                  cdcName="Base_Parking"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="دهانه"
                  helper="baseGap"
                  :m="m"
                  v-model="value.Base_Gap"
                  cdcName="Base_Gap"
                  fit
                  height="100%"
                  max-height="100%"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  name: 'TabParking',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      horizontalSplitter: 50,
      vertical: 50
    }
  }
}
</script>
