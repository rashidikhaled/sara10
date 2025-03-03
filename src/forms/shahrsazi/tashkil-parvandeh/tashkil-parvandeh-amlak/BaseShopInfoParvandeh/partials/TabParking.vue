<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      horizontal
      class="fit"
      margin="0"
    >
      <template v-slot:before>
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
                  title="نحوه تامین پارکینگ"
                  helper="baseSupplyParking"
                  v-model="value.Base_SupplyParking"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-datatable
                  title="پارکینگ ها"
                  helper="baseParking"
                  v-model="value.Base_Parking"
                  fit
                  height="100%"
                  max-height="100%"
                  min-height="150px"
                  :m="m"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="دهانه"
            helper="baseGap"
            v-model="value.Base_Gap"
            fit
            height="100%"
            max-height="100%"
            min-height="150px"
            :m="m"
          />
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
      verticalSplitter: 50
    }
  }
}
</script>
