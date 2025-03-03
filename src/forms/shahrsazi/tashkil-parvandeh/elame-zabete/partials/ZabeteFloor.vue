<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="تعداد واحد پارکینگ مورد نیاز"
          label-width="85px"
          m="r"
          v-model="results.Base_BuildingInfo.ParkingNeedCount"
          cdcName="ParkingNeedCount"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="ارتفاع نهایی"
          label-width="85px"
          m="r"
          v-model="results.Base_BuildingInfo.Height"
          cdcName="Height"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="استقرار بنا"
          label-width="85px"
          m="r"
          v-model="results.Base_BuildingInfo.CI_BuildingPosition"
          cdcName="CI_BuildingPosition"
          ciName="CI_BuildingPosition"
          domainName="CI_SaraM1"
        />
      </FormControl>
    </FormRow>

    <safa-splitter
      v-model="splitterModel"
      horizontal
      class="fit"
      margin="0"
      :min-height="$q.screen.lt.md ? '350px' : '150px'"
    >
      <template v-slot:before>
        <fit>
          <safa-datatable2
            :m="floorTabMode"
            title="کاربری ها"
            helper="zavabetUser"
            v-model="results.Base_Using"
            cdcName="Base_Using"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          /> <!-- تاریخ قابل ویرایش نیست -->
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-datatable2
            :m="floorTabMode"
            title="پیش آمدگی ها و سایر کاربری های خاص"
            helper="zavabetPishamadegi"
            v-model="results.Base_Front"
            cdcName="Base_Front"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
          /> <!-- تاریخ قابل ویرایش نیست -->
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      splitterModel: 50,
      title: "شهرسازی - چیدمان در طبقات"
    }
  },
  props: {
    results: Object,
    floorTabMode: String
  }
}
</script>
