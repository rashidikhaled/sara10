<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="جهت صدور"
          label-width="90px"
          v-model="
            value.BuildingExecRep_FormOperation_Main
              .CI_BuildingExecRep_FormOperation_Cause
          "
          domainName="engineer"
          ciName="CI_BuildingExecRep_FormOperation_Cause"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="وضعیت ارسال"
          label-width="90px"
          v-model="value.BuildingExecRep_FormOperation_Main.CI_ExecStatus"
          domainName="engineer"
          ciName="CI_ExecStatus"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      title="لیست گزارشات جدولی"
      fit
      helper="buildingExecRepFormOperationFloorsMainColumns"
      v-model="value.BuildingExecRep_FormOperation_Floors_Main"
      :m="m"
      paginate
    />
    <FormRow class="q-my-sm">
      <FormControl>
        <safa-text
          label="تعداد واحد پارکینگ مورد نیاز"
          label-width="130px"
          v-model="
            value.BuildingExecRep_FormOperation_Main.RequiredParkingCount
          "
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تعداد واحد پارکینگ مورد تامین شده"
          label-width="130px"
          v-model="
            value.BuildingExecRep_FormOperation_Main.SuppliedParkingCount
          "
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل تامین پارکینگ"
          label-width="130px"
          v-model="
            value.BuildingExecRep_FormOperation_Main.SuppliedParkingLocation
          "
        />
      </FormControl>
    </FormRow>
    <FormRow class="q-mb-sm">
      <safa-label style="min-width: 200px" class="flex items-center"
        >آیا نماهای جانبی انجام شده است؟</safa-label
      >
      <div class="q-gutter-x-lg">
        <safa-radio
          label=" بلی"
          :val="true"
          v-model="
            value.BuildingExecRep_FormOperation_Main.IsObservedNeighbourView
          "
        />
        <safa-radio
          label="خیر"
          :val="false"
          v-model="
            value.BuildingExecRep_FormOperation_Main.IsObservedNeighbourView
          "
        />
      </div>
    </FormRow>
    <FormRow class="q-mb-sm">
      <safa-label style="min-width: 200px" class="flex items-center"
        >آیا درصد طول مجاز رعایت شده است؟</safa-label
      >
      <div class="q-gutter-x-lg">
        <safa-radio
          label=" بلی"
          :val="true"
          v-model="
            value.BuildingExecRep_FormOperation_Main.IsObservedAllowedLength
          "
        />
        <safa-radio
          label="خیر"
          :val="false"
          v-model="
            value.BuildingExecRep_FormOperation_Main.IsObservedAllowedLength
          "
        />
      </div>
    </FormRow>
    <FormRow>
      <safa-label style="min-width: 200px" class="flex items-center">
        آئین نامه 2800 زلزه و مقررات ملی ساختمان در حیطه وظایف اینجانب در احداث
        این بنا رعایت
      </safa-label>
      <div class="q-gutter-x-lg">
        <safa-radio
          label="گردیده است."
          :val="true"
          v-model="value.BuildingExecRep_FormOperation_Main.IsObservedRule"
        />
        <safa-radio
          label="نگردیده است."
          :val="false"
          v-model="value.BuildingExecRep_FormOperation_Main.IsObservedRule"
        />
      </div>
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
    }
  }
}
</script>
