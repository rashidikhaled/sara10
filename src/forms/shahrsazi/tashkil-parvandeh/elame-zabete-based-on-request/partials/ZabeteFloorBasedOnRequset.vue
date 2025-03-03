<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          v-model="results.Base_BuildingInfo.Height"
          cdcName="Height"
          label="ارتفاع نهایی"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="results.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
          label="تعداد واحد پارکینگ مورد نیاز"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="results.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          ciName="CI_BuildingPosition"
          domainName="CI_SaraM1"
          label="استقرار بنا"
          label-width="90px"
          m="r"
        />
      </FormControl>
    </FormRow>

    <safa-splitter v-model="gridSplitter" class="fit" horizontal margin="0">
      <template v-slot:before>
        <fit>
        <!-- helper="zavabetUser" -->
          <safa-grid
            v-model="results.Base_Using"
            cdcName="Base_Using"
            helper="agZavabetUser"
            m="r"
            title="کاربری ها"
            fit
            paginate
            margin="0"
            height="100%"
            min-height="100px"
          />
        </fit>
      </template>

      <template v-slot:after>
        <fit>
          <safa-datatable2
            v-model="results.Base_Front"
            cdcName="Base_Front"
            helper="zavabetPishamadegi"
            m="r"
            title="پیش آمدگی ها و سایر کاربری های خاص"
            fit
            margin="0"
            height="100%"
            min-height="100px"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {
      gridSplitter: 50
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
