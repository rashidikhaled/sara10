<template>

  <safa-form
    id="6fe9a3e5-9ed4-4b36-86dd-395ecf63ba29"
    caption="شهرسازی- بازدید دستگاه"
  >
    <fit>
      <internal-section>
        <safa-group
          :m="m"
          label-width="150px"
          margin="0"
        >
          <safa-text
            v-model="value.Base_BuildingInfo.InfrastructureArea"
            label="مجموع كل زير بنا"
            type="number"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_CreateDesign"
            ci-name="CI_CreateDesign"
            domain-name="CI_SaraM1"
            label="الگوی ساخت"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.AllowableDensityLicence"
            label="تراکم مجاز در پروانه ساختمانی"
            type="number"
          />

          <!-- row 2 -->
          <safa-custom-text
            v-model="value.Base_BuildingInfo.LightfastArea"
            :m="m"
            label="مساحت نورگير"
            label-width="150px"
            type="decimal"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_StableStatus"
            ci-name="CI_StableStatus"
            domain-name="CI_SaraM1"
            label="وضعیت استحکام بنا"
          />
          <safa-custom-text
            v-model="value.Base_CommonEstate.ViewArea"
            :m="m"
            label="مساحت نما"
            label-width="150px"
            type="decimal"
          />

          <safa-text
            v-model="value.Base_BuildingInfo.CreateYearFrom"
            label="قدمت ساخت از"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.CreateYearTo"
            label="قدمت ساخت تا"
            type="number"
          />
          <safa-combo
            v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
            ci-name="CI_HistoricalStatus"
            domain-name="CI_SaraM1"
            label="وضعیت استحکام بنا"
          />
          <safa-combo
            v-model="value.Base_CommonEstate.CI_ViewCode"
            ci-name="CI_ViewCode"
            domain-name="CI_SaraM1"
            label="نوع نما"
          />
          <safa-combo
            v-model="value.Base_CommonEstate.CI_BuildingPosition"
            ci-name="CI_BuildingPosition"
            domain-name="CI_SaraM1"
            label="استقرار بنا"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.UpperHeight"
            label="ارتفاع تا کف معبر بالا"
            type="number"
          />

          <safa-combo
            v-model="value.Base_BuildingInfo.CI_RoofType"
            ci-name="CI_RoofType"
            domain-name="CI_SaraM1"
            label="نوع سقف"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.BusyArea"
            label="سطح اشغال"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.DownerHeight"
            label="ارتفاع تا کف معبر پایین"
            type="number"
          />
          <safa-custom-text
            v-model="value.Base_BuildingInfo.RampArea"
            :m="m"
            label="مساحت ايست رمپ"
            label-width="150px"
            type="decimal"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.Height"
            label="مجموع ارتفاع کل"
            type="number"
          />
          <safa-text
            v-model="value.Base_CommonEstate.CommercialGapWidth"
            label="عرض دهنه تجاری"
            type="number"
          />

          <safa-text
            v-model="value.Base_BuildingInfo.Defilade"
            label="ارتفاع جان پناه"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.CommercialGapDepth"
            label="عمق حريم تجاری"
            type="number"
          />
          <safa-text
            v-model="value.Base_BuildingInfo.HeightKorsi"
            label="ارتفاع کرسی"
            type="number"
          />

          <safa-datepicker
            v-model="value.Base_BuildingInfo.ActDate"
            label="تاریخ اثر"
            type="number"
          />
          <safa-custom-text
            v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
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
