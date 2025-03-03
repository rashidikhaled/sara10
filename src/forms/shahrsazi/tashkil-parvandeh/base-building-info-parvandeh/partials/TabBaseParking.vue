<template>
  <fit>
    <safa-splitter
      class="q-mb-sm"
      v-model="splitterModel"
      horizontal
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
            min-height="100px"
            paginate
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable
            title="نحوه تامین پارکینگ"
            helper="baseSupplyParking"
            :m="m"
            v-model="value.Base_SupplyParking"
            cdcName="Base_SupplyParking"
            fit
            height="100%"
            min-height="100px"
            paginate
          />
        </fit>
      </template>
    </safa-splitter>
    <FormRow class="q-pb-sm q-px-sm">
      <form-control>
        <safa-text
          type="number"
          label="تعداد واحد پارکینگ مورد نیاز"
          label-width="150px"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
        />
      </form-control>
      <form-control>
        <safa-text
          type="number"
          label="تعداد واحد پارکينگ تامين شده "
          label-width="150px"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingSupplyCount"
          cdcName="ParkingSupplyCount"
        />
      </form-control>
      <form-control>
        <safa-text
          type="number"
          label="کسری وصول شده پارکينگ "
          label-width="150px"
          :m="m"
          v-model="value.Base_BuildingInfo.ParkingGet"
          cdcName="ParkingGet"
        />
      </form-control>
    </FormRow>
  </fit>
</template>

<script>
export default {
  name: "TabBaseParking",
  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      splitterModel: 50
    }
  }
}
</script>
