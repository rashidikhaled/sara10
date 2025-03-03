<template>
  <safa-splitter
    v-model="gridSplitterHorizontal"
    class="fit"
    horizontal
    margin="0"
    style="min-height: 300px"
  >
    <template v-slot:before>
      <fit>
        <!-- <safa-securityPanel
            id="b40f16af-6cb2-4d6b-a2ac-205cc6835a8f"
            caption="پارکینگها - فقط خواندنی"
            tag="div"
            class="fit"
          >
            <safa-datatable
              v-model="results.Base_Parking"
              cdcName="Base_Parking"
              ref="grid"
              name="grid"
              helper="principalAgreementPark"
              m="r"
              title="پارکینگ ها"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
              :bordered="false"
            />
          </safa-securityPanel> -->

        <safa-securityPanel
          id="5b30e3f8-e9e1-4276-b255-331509edc74e"
          caption="پارکینگها - قابل ویرایش"
          tag="div"
          class="fit"
        >
          <safa-datatable
            v-model="results.Base_Parking"
            cdcName="Base_Parking"
            ref="grid"
            name="grid"
            helper="principalAgreementPark"
            :m="m"
            title="پارکینگ ها"
            fit
            height="100%"
            max-height="100%"
            :bordered="false"
          />
        </safa-securityPanel>
      </fit>
    </template>

    <template v-slot:after>
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
                v-model="results.Base_SupplyParking"
                cdcName="Base_SupplyParking"
                ref="grid"
                name="grid"
                helper="parkingProductionMethod"
                :m="m"
                title="نحوه تأمین پارکینگ"
                fit
                max-height="100%"
                height="100%"
                minHeight="100%"
                :bordered="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <div class="flex items-center justify-center">
                <safa-sketch
                  height="250px"
                  width="300px"
                  :readonly="true"
                  v-if="results.NidBase_Parvandeh_HouseOrDastgah"
                  :sketch-id="results.NidBase_Parvandeh_HouseOrDastgah"
                />
              </div>
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </template>
  </safa-splitter>
</template>

<script>
export default {
  data () {
    return {
      gridSplitterHorizontal: 30,
      gridSplitterVertical: 40,

      parkingItems: [],
      parkingPreparationItems: []
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    results: Object,
    m: String
  }
}
</script>
