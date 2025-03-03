<template>
  <safa-form
    id="6fe9a3e5-9ed4-4b36-86dd-395ecf63ba29"
    caption="شهرسازی- بازدید دستگاه"
  >
    <fit>
      <internal-section>
        <safa-group :m="m" label-width="150px" margin="0">
          <safa-text
            v-model="value.Base_BuildingInfo.InfrastructureArea"
            cdcName="InfrastructureArea"
            label="مجموع كل زير بنا"
            type="number"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_CreateDesign"
            cdcName="CI_CreateDesign"
            :m="m"
            ci-name="CI_CreateDesign"
            domain-name="CI_SaraM1"
            label="الگوی ساخت"
            label-width="150px"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.AllowableDensityLicence"
            cdcName="AllowableDensityLicence"
            label="تراکم مجاز در پروانه ساختمانی"
            type="number"
          />

          <!-- row 2 -->
          <safa-custom-text
            v-model="value.Base_BuildingInfo.LightfastArea"
            cdcName="LightfastArea"
            :m="m"
            label="مساحت نورگير"
            label-width="150px"
            type="decimal"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_StableStatus"
            cdcName="CI_StableStatus"
            :m="m"
            ci-name="CI_StableStatus"
            domain-name="CI_SaraM1"
            label="وضعیت استحکام بنا"
            label-width="150px"
          />
          <safa-custom-text
            v-model="value.Base_CommonEstate.ViewArea"
            cdcName="ViewArea"
            :m="m"
            label="مساحت نما"
            label-width="150px"
            type="decimal"
          />

          <safa-text
            v-model="value.Base_BuildingInfo.CreateYearFrom"
            cdcName="CreateYearFrom"
            label="قدمت ساخت از"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.CreateYearTo"
            cdcName="CreateYearTo"
            label="قدمت ساخت تا"
            type="number"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
            cdcName="CI_HistoricalStatus"
            :m="m"
            ci-name="CI_HistoricalStatus"
            domain-name="CI_SaraM1"
            label="وضعیت استحکام بنا"
            label-width="150px"
          />
          <safa-combo
            v-model="value.Base_CommonEstate.CI_ViewCode"
            cdcName="CI_ViewCode"
            :m="m"
            ci-name="CI_ViewCode"
            domain-name="CI_SaraM1"
            label="نوع نما"
            label-width="150px"
          />
          <safa-combo
            v-model="value.Base_CommonEstate.CI_BuildingPosition"
            cdcName="CI_BuildingPosition"
            :m="m"
            ci-name="CI_BuildingPosition"
            domain-name="CI_SaraM1"
            label="استقرار بنا"
            label-width="150px"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.UpperHeight"
            cdcName="UpperHeight"
            label="ارتفاع تا کف معبر بالا"
            type="number"
          />

          <safa-combo
            v-model="value.Base_BuildingInfo.CI_RoofType"
            cdcName="CI_RoofType"
            :m="m"
            ci-name="CI_RoofType"
            domain-name="CI_SaraM1"
            label="نوع سقف"
            label-width="150px"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.BusyArea"
            cdcName="BusyArea"
            label="سطح اشغال"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.DownerHeight"
            cdcName="DownerHeight"
            label="ارتفاع تا کف معبر پایین"
            type="number"
          />
          <safa-custom-text
            v-model="value.Base_BuildingInfo.RampArea"
            cdcName="RampArea"
            :m="m"
            label="مساحت ايست رمپ"
            label-width="150px"
            type="decimal"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.Height"
            cdcName="Height"
            label="مجموع ارتفاع کل"
            type="number"
          />
          <safa-text
            v-model="value.Base_CommonEstate.CommercialGapWidth"
            cdcName="CommercialGapWidth"
            label="عرض دهنه تجاری"
            type="number"
          />

          <safa-text
            v-model="value.Base_BuildingInfo.Defilade"
            cdcName="Defilade"
            label="ارتفاع جان پناه"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.CommercialGapDepth"
            cdcName="CommercialGapDepth"
            label="عمق حريم تجاری"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.HeightKorsi"
            cdcName="HeightKorsi"
            label="ارتفاع کرسی"
            type="number"
          />

          <safa-datepicker
            v-model="value.Base_BuildingInfo.ActDate"
            cdcName="ActDate"
            label="تاریخ اثر"
            type="number"
          />
          <safa-custom-text
            v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
            cdcName="MultiBuildingToftImpartArea"
            :m="m"
            label="مساحت سهم العرصه چندساختمانی"
            label-width="150px"
            type="decimal"
          />
        </safa-group>
      </internal-section>
      <safa-securityPanel
        id="d780fe9f-0712-4efc-9a01-fa0c39f44f7f"
        caption="اشتراکات"
        class="fit"
        tag="div"
      >
        <fit>
          <safa-datatable
            v-model="value.Base_SubScription"
            cdcName="Base_SubScription"
            :m="m"
            fit
            height="100%"
            helper="baseSubscription"
            max-height="100%"
            min-height="200px"
            title="اشتراکات"
          />
        </fit>
      </safa-securityPanel>

      <safa-securityPanel
        id="f54bad37-3f54-4951-aba3-e8db88553886"
        caption="اشتراکات-ویرایش محدود"
        class="fit"
        tag="div"
      >
        <fit>
          <safa-datatable
            v-model="value.Base_SubScription"
            cdcName="Base_SubScription"
            :m="m"
            fit
            height="100%"
            helper="extra_baseSubscription"
            max-height="100%"
            min-height="200px"
            title="اشتراکات"
          />
        </fit>
      </safa-securityPanel>
    </fit>
  </safa-form>
</template>

<script>
export default {
  name: 'TabHouseSharingInfo',

  props: {
    m: String,
    value: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
