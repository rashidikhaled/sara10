<template>
  <fit>
    <safa-splitter
      v-model="gridSplitterHorizontal"
      class="fit"
      horizontal
      margin="0"
      style="min-height: 300px"
    >
      <template #before>
        <fit>
          <safa-datatable
            title="نحوه ی تأمین پارکینگ"
            v-model="value.Base_SupplyParking"
            ref="grid2"
            helper="principalAgreementSupplyPark"
            :m="m"
            fit
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-splitter
            v-model="gridSplitterVertical"
            class="fit"
            vertical
            margin="0"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  v-model="value.Base_Parking"
                  ref="grid2"
                  title=" پارکینگ ها"
                  helper="principalAgreementPark"
                  :m="m"
                  fit
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <safa-sketch
                  class="fit"
                  margin="0"
                  height="100%"
                  min-height="100px"
                  :readonly="true"
                  :sketch-id="calcSketchId"
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
  data: function () {
    return {
      disableBtn: null,
      gridSplitterVertical: 40,
      gridSplitterHorizontal: 30
    }
  },
  props: {
    value: Object,
    m: String
  },
  methods: {},
  computed: {
    calcSketchId () {
      if (
        this.value.NidLib &&
        this.value.NidLib.RMovafeghatOsooli &&
        this.value.NidLib.RMovafeghatOsooli.NidBase
      ) {
        return this.value.NidLib.RMovafeghatOsooli.NidBase
      } else {
        return "00000000-0000-0000-0000-000000000000"
      }
    }
  }
}
</script>
