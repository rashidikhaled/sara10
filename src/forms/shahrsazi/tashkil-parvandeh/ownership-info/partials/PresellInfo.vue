<template>
  <fit>
    <safa-group
      label-width="150px"
      :m="m"
    >
      <safa-combo
        label="پوشش نهایی بام"
        ciName="CI_Final_Cover_Roof"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_Final_Cover_Roof"
      />
      <safa-combo
        label="سیستم دسترسی طبقات"
        ciName="CI_Access_Floors"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_Access_Floors"
      />
      <safa-combo
        label="پنجره ها"
        ciName="CI_Windows"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_Windows"
      />
      <safa-text
        label="تعدا پارکینگ کل ساختمان"
        v-model="results.Sh_ApartmentEarlySold.AllBuildingNoParking"
        type="number"
      />
      <safa-text
        label="محل پارکینگ"
        v-model="results.Sh_ApartmentEarlySold.ParkingLocation"
      />
      <safa-text
        label="تعداد پارکینگ مزاحم"
        v-model="results.Sh_ApartmentEarlySold.TroublesomeNoParking"
        type="number"
      />
      <safa-text
        label="شماره پارکینگ متعلق به این واحد"
        v-model="results.Sh_ApartmentEarlySold.NoParkingThisVahed"
        type="number"
      />
      <safa-text
        label="تعداد انباری"
        v-model="results.Sh_ApartmentEarlySold.WarehouseNumber"
        type="number"
      />
      <safa-text
        label="محل"
        v-model="results.Sh_ApartmentEarlySold.WarehouseLocation"
      />
      <safa-text
        label="شماره انباری متعلق به این واحد"
        v-model="results.Sh_ApartmentEarlySold.WarehouseNoThisVahed"
        type="number"
      />
      <safa-combo
        label="گروه ساختمانی از نظر اهمیت"
        ciName="CI_Building_Group_Importance"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_Building_Group_Importance"
      />
      <safa-combo
        label="نوع پی"
        ciName="CI_FundasionType"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_FundasionType"
      />
      <safa-combo
        label="سیستم دفع فاضلاب"
        ciName="CI_SewageDisposalSystem"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_SewageDisposalSystem"
      />
      <safa-combo
        label="سیستم اتصال زمین"
        ciName="CI_SystemGround"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_SystemGround"
      />
      <safa-combo
        label="سیستم گرمایش"
        ciName="CI_HeatingSystem"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_HeatingSystem"
      />
      <safa-combo
        label="سیستم سرمایش"
        ciName="CI_CoolingSystem"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_CoolingSystem"
      />
      <safa-combo
        label="سیستم اعلام حریق"
        ciName="CI_FireAlarmSystem"
        domainName="CI_SaraM1"
        v-model="results.Sh_ApartmentEarlySold.CI_FireAlarmSystem"
      />
      <safa-text
        label="آنتن مرکزی"
        v-model="results.Sh_ApartmentEarlySold.CentralAntena"
      />
      <safa-text
        label="نمای خارجی"
        v-model="results.Sh_ApartmentEarlySold.ExteriorView"
      />
      <safa-text
        label="سمت آپارتمان"
        v-model="results.Sh_ApartmentEarlySold.ApartmentSide"
      />
      <safa-text
        label="تعداد پارکینگ"
        v-model="results.Sh_ApartmentEarlySold.ParkingCount"
        type="number"
      />
    </safa-group>
  </fit>
</template>
<script>
export default {
  data: function () {
    return {}
  },
  props: { results: Object, m: String }
}
</script>
