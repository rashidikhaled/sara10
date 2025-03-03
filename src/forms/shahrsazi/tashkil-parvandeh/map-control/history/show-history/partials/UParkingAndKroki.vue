<template>
  <fit>
    <safa-splitter v-model="gridSplitter">
      <template #before>
        <fit>
          <safa-datatable
            v-model="parkingItems"
            ref="grid"
            name="grid"
            helper="principalAgreementPark"
            m="r"
            title="پارکینگ ها"
            @rowUpdated="parkingsRowUpdated"
            height="100%"
            ma-height="100%"
          ></safa-datatable>
        </fit>
      </template>
      <!-- <div class="col-6">
        <internal-section title="کروکی">
          <safa-text type="textarea" />
        </internal-section>
      </div> -->
      <template #after>
        <fit>
          <safa-datatable
            v-model="parkingPreparationItems"
            ref="grid"
            name="grid"
            helper="parkingProductionMethod"
            :m="m"
            title="نحوه تأمین پارکینگ"
            @rowUpdated="supplyParkingRowUpdated"
            height="100%"
            ma-height="100%"
          ></safa-datatable>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      parkingItems: [],
      parkingPreparationItems: [],
      gridSplitter: 50
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.parkingItems = this.value.Base_Parking

    this.parkingPreparationItems = this.value.Base_SupplyParking
  },
  watch: {
    value: function () {
      this.parkingItems = this.value.Base_Parking

      this.parkingPreparationItems = this.value.Base_SupplyParking
    }
  },
  methods: {
    parkingsRowUpdated (e) {
      this.value.Base_Parking = e.gridItems
    },
    supplyParkingRowUpdated (e) {
      this.value.Base_SupplyParking = e.gridItems
    }
  }
}
</script>
