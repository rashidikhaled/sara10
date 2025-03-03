<template>
  <fit>

    <safa-splitter
      v-model="splitterValue"
      horizontal
      class="fit"
    >
      <template v-slot:before>
        <div class="fit q-pb-sm">
          <div class="row q-col-gutter-x-sm full-height">
            <div class="col-6">
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
            </div>
            <div class="col-6">
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
            </div>
          </div>
        </div>
      </template>
      <template v-slot:after>
        <fit className="q-pt-sm">
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
    return { splitterValue: 50 }
  }
}
</script>
