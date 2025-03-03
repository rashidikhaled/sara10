<template>
  <fit>
    <internal-section>
      <safa-group
        :m="m"
        margin="0"
        label-width="100px"
      >
        <safa-text
          label="مجموع كل زير بنا "
          v-model="value.Base_BuildingInfo.InfrastructureArea"
        />
        <safa-combo
          label="الگوی ساخت "
          ci-name="CI_CreateDesign"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_CreateDesign"
        />
        <safa-text
          label="تراکم مجاز در پروانه ساختمانی"
          v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        />

        <!-- row 2 -->
        <safa-custom-text
          type="decimal"
          label-width="100px"
          label="مساحت نورگير "
          v-model="value.Base_BuildingInfo.LightfastArea"
          :m="m"
        />
        <safa-combo
          label="وضعیت استحکام بنا"
          ci-name="CI_StableStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_StableStatus"
        />
        <safa-datepicker
          label="قدمت ساخت از"
          v-model="value.Base_BuildingInfo.CreateYearFrom"
        />

        <!-- row 3 -->
        <safa-custom-text
          type="decimal"
          label-width="100px"
          label="مساحت نما "
          v-model="value.Base_CommonEstate.ViewArea"
          :m="m"
        />
        <safa-combo
          label="وضعیت استحکام بنا"
          ci-name="CI_HistoricalStatus"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_HistoricalStatus"
        />
        <safa-datepicker
          label="قدمت ساخت تا"
          v-model="value.Base_BuildingInfo.CreateYearTo"
        />

        <!-- row 4 -->
        <safa-combo
          label="نوع نما "
          ci-name="CI_ViewCode"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_ViewCode"
        />
        <safa-combo
          label="استقرار بنا"
          ci-name="CI_BuildingPosition"
          domain-name="CI_SaraM1"
          v-model="value.Base_CommonEstate.CI_BuildingPosition"
        />
        <safa-text
          label="ارتفاع تا کف معبر بالا"
          v-model="value.Base_BuildingInfo.UpperHeight"
        />

        <!-- row 5 -->
        <safa-combo
          label="نوع سقف "
          ci-name="CI_RoofType"
          domain-name="CI_SaraM1"
          v-model="value.Base_BuildingInfo.CI_RoofType"
        />
        <safa-text
          label="سطح اشغال "
          v-model="value.Base_BuildingInfo.BusyArea"
        />
        <safa-text
          label="ارتفاع تا کف معبر پایین"
          v-model="value.Base_BuildingInfo.DownerHeight"
        />

        <!-- row 6 -->
        <safa-custom-text
          type="decimal"
          label-width="100px"
          label="مساحت ايست رمپ "
          v-model="value.Base_BuildingInfo.RampArea"
          :m="m"
        />
        <safa-text
          label="مجموع ارتفاع کل "
          v-model="value.Base_BuildingInfo.Height"
        />
        <safa-text
          label="عرض دهنه تجاری "
          v-model="value.Base_CommonEstate.CommercialGapWidth"
        />

        <!-- row 7 -->
        <safa-text
          label="ارتفاع جان پناه "
          v-model="value.Base_BuildingInfo.Defilade"
        />
        <safa-text
          label="عمق حريم تجاری "
          v-model="value.Base_BuildingInfo.CommercialGapDepth"
        />
        <safa-text
          label="ارتفاع کرسی "
          v-model="value.Base_BuildingInfo.HeightKorsi"
        />

        <safa-datepicker
          label="تاریخ اثر "
          v-model="value.Base_BuildingInfo.ActDate"
        />
      </safa-group>
    </internal-section>

    <div class="fit">
      <div class="row q-col-gutter-x-md full-height">
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              class="col-12 col-md-6"
              title="اشتراکات"
              helper="baseSubscription"
              :m="m"
              v-model="value.Base_SubScription"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
        <div class="col-12 col-md-6">
          <fit>
            <safa-datatable
              class="col-12 col-md-6"
              title="نحوه تامین پارکینگ"
              helper="baseSupplyParking"
              :m="m"
              v-model="value.Base_SupplyParking"
              fit
              height="100%"
              max-height="100%"
              min-height="150px"
            />
          </fit>
        </div>
      </div>
    </div>
  </fit>
</template>

<script>
export default {
  name: 'TabHouseSharingInfo',

  props: {
    m: String,
    value: {
      type: Object
    }
  }
}
</script>
