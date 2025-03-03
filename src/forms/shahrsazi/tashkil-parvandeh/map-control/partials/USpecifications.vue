<template>
  <fit>
    <safa-group>
      <safa-combo
        ciName="CI_DocType"
        domainName="CI_SaraM1"
        label="نوع سند"
        v-model="results.Base_CommonEstate.CI_DocType"
        cdcName="CI_DocType"
        m="r"
        :label-width="labelWidth"
      />
      <safa-text
        label="شماره دستور نقشه"
        v-model="results.Sh_PlanOrder.PlanOrderNo"
        cdcName="PlanOrderNo"
        m="r"
        :label-width="labelWidth"
      />
      <safa-combo
        ciName="CI_BuildingPosition"
        domainName="CI_SaraM1"
        label="استقرار بنا"
        v-model="results.Base_BuildingInfo.CI_BuildingPosition"
        cdcName="CI_BuildingPosition"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت طبق سند"
        v-model="results.Base_HouseInfo.DocArea"
        cdcName="DocArea"
        m="r"
        :label-width="labelWidth"
      />
      <safa-combo
        ciName="CI_Criterion"
        domainName="CI_SaraM1"
        label="ضابطه"
        v-model="results.Sh_BaroKaf.CI_Criterion"
        cdcName="CI_Criterion"
        m="r"
        :label-width="labelWidth"
      />
      <safa-combo
        ciName="CI_CreateDesign"
        domainName="CI_SaraM1"
        label="الگوی ساخت"
        v-model="results.Base_BuildingInfo.CI_CreateDesign"
        cdcName="CI_CreateDesign"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت وضع موجود"
        v-model="results.Base_HouseInfo.CurrentArea"
        cdcName="CurrentArea"
        m="r"
        :label-width="labelWidth"
      />
      <safa-text
        label="تراکم"
        v-model="results.Base_BuildingInfo.AllowableDensityLicence"
        cdcName="AllowableDensityLicence"
        :m="m"
        type="number"
        :label-width="labelWidth"
      />
      <safa-text
        label="مجموع ارتفاع کل"
        v-model="results.Base_BuildingInfo.Height"
        cdcName="Height"
        :m="m"
        type="number"
        :label-width="labelWidth"
      />
      <safa-text
        label="مجموع کل زیربنا"
        v-model="results.Base_BuildingInfo.InfrastructureArea"
        cdcName="InfrastructureArea"
        m="r"
        type="number"
        :label-width="labelWidth"
      />
      <safa-combo
        ciName="CI_ViewCode"
        domainName="CI_SaraM1"
        label="نوع نما"
        v-model="results.Base_CommonEstate.CI_ViewCode"
        cdcName="CI_ViewCode"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت ایست رمپ"
        v-model="results.Base_BuildingInfo.RampArea"
        cdcName="RampArea"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت پس از رعایت بر اصلاحی"
        v-model="results.Base_HouseInfo.AreaAfterEdit"
        cdcName="AreaAfterEdit"
        m="r"
        :label-width="labelWidth"
      />
      <safa-combo
        ciName="CI_RoofType"
        domainName="CI_SaraM1"
        label="پوشش سقف"
        v-model="results.Base_BuildingInfo.CI_RoofType"
        cdcName="CI_RoofType"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-text
        label="ارتفاع جان پناه"
        v-model="results.Base_BuildingInfo.Defilade"
        cdcName="Defilade"
        :m="m"
        type="number"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت باقیمانده"
        v-model="results.Base_HouseInfo.RemainArea"
        cdcName="RemainArea"
        m="r"
        :label-width="labelWidth"
      />
      <safa-text
        label="عرض پلاک"
        v-model="results.Base_BuildingInfo.PlackWidth"
        cdcName="PlackWidth"
        :m="m"
        type="number"
        :label-width="labelWidth"
      />
      <safa-custom-text
        type="decimal"
        label="مساحت سهم العرصه چند ساختمانی"
        v-model="results.Base_BuildingInfo.MultiBuildingToftImpartArea"
        cdcName="MultiBuildingToftImpartArea"
        m="r"
        :label-width="labelWidth"
      />
      <safa-text
        label="تعهد نما"
        v-model="results.Base_CommonEstate.ViewCommitment"
        cdcName="ViewCommitment"
        :m="m"
        :label-width="labelWidth"
      />
      <safa-datepicker
        label="تاریخ تعهد نما"
        v-model="results.Base_CommonEstate.ViewCommitmentDate"
        cdcName="ViewCommitmentDate"
        :m="m"
        :label-width="labelWidth"
      />
    </safa-group>
    <safa-splitter
      v-model="splitterModel"
      cdcName="splitterModel"
      vertical
      margin="0"
      :padding="false"
      style="min-height: 400px"
    >
      <template v-slot:before>
        <fit>
          <safa-securityPanel
            id="fdf2f1db-61f2-4ed7-b80d-174135827d9c"
            caption="جهات اربعه-قابل ویرایش"
            tag="div"
            class="fit"
          >
            <safa-grid
              v-model="results.Base_Edge"
              cdcName="Base_Edge"
              ref="grid"
              name="grid"
              helper="extrajahateArbae"
              m="r"
              :loadingAnimation="false"
              title="جهات اربعه"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
            />
          </safa-securityPanel>
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-securityPanel
            id="7fce2b3a-057f-4f72-8ca0-ee8cbbf34858"
            caption="پلاک ثبتی-قابل ویرایش"
            tag="div"
            class="fit"
          >
            <safa-datatable
              v-model="results.Base_RegisterPlack"
              cdcName="Base_RegisterPlack"
              ref="grid"
              name="grid"
              helper="registerPelak"
              :m="m"
              :loadingAnimation="false"
              title="پلاک ثبتی"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
            />
          </safa-securityPanel>
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>
<script>
export default {
  data () {
    return {
      splitterModel: 70,
      labelWidth: "100px"
    }
  },
  props: {
    results: Object,
    m: String
  }
}
</script>
