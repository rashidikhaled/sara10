<template>
  <fit>
    <safa-splitter
      v-model="horizontalSplitter"
      class="fit"
      horizontal
      margin="0"
    >
      <template v-slot:before>
        <div class="fit">
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-12 col-md-6 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_SupplyParking"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseSupplyParking"
                  max-height="100%"
                  title="نحوه تامین پارکینگ"
                />
              </fit>
            </div>
            <div class="col-12 col-md-6 q-mb-sm q-mb-md-none">
              <fit>
                <safa-datatable
                  v-model="value.Base_Gap"
                  :m="m"
                  fit
                  height="100%"
                  helper="baseGap"
                  max-height="100%"
                  title="پارکینگ ها"
                />
              </fit>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            v-model="value.Base_Parking"
            :m="m"
            fit
            height="100%"
            helper="baseParking"
            max-height="100%"
            title="پارکینگ ها"
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
      horizontalSplitter: 50
    }
  }
}
</script>
