<template>
  <fit>
    <internal-section>
      <safa-group>
        <safa-text
          label="نام مالک/وکیل"
          label-width="80px"
          m="r"
          domainName="CI_SaraM1"
          ciName="WorkflowTitel"
          v-model="results.NidLib.RRequest.RequesterName"
        />
        <safa-text
          label="کد نوسازی"
          label-width="80px"
          m="r"
          v-model="baseNosaziCode"
        />
        <safa-combo
          label="نوع درخواست"
          label-width="80px"
          m="r"
          domainName="CI_SaraM1"
          ciName="WorkflowTitel"
          v-model="results.NidLib.RRequest.WorkflowTitel"
        />
        <safa-text
          label="شماره درخواست"
          label-width="80px"
          m="r"
          v-model="results.NidLib.RRequest.NidWorkItem"
        />
        <safa-text
          label="نشانی"
          label-width="80px"
          m="r"
          v-model="results.NidLib.RRequest.RequesterAddress"
          class="col-12"
        />
        <safa-text
          label="بخش ثبتی"
          label-width="80px"
          :m="m"
          v-model="results.Base_CommonEstate.RegisterSection"
        />
        <safa-text
          label="پلاک ثبتی"
          label-width="80px"
          :m="m"
          v-model="results.Base_CommonEstate.RegisterPlack"
        />
        <safa-combo
          label="نوع سند"
          label-width="80px"
          :m="m"
          domainName="CI_SaraM1"
          ciName="CI_DocType"
          v-model="results.Base_CommonEstate.CI_DocType"
        />
        <safa-custom-text
          label="مساحت طبق سند"
          label-width="80px"
          type="decimal"
          :m="m"
          v-model="results.Base_HouseInfo.DocArea"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت وضع موجود"
          label-width="80px"
          :m="m"
          v-model="results.Base_HouseInfo.CurrentArea"
        />
        <safa-text
          label="میزان در مسیر"
          label-width="80px"
          :m="m"
          v-model="results.Base_HouseInfo.Mizan"
        />
        <safa-custom-text
          type="decimal"
          label="مساحت پس از بر اصلاحی"
          label-width="80px"
          :m="m"
          v-model="results.Base_HouseInfo.AreaAfterEdit"
        />
        <safa-combo
          label="کاربری مصوب"
          label-width="80px"
          :m="m"
          domainName="CI_SaraM1"
          ciName="CI_PlanUsingType"
          v-model="results.Base_PlanMosavab.CI_PlanUsingType"
        />
        <safa-text
          label="تراکم مصوب"
          label-width="80px"
          :m="m"
          v-model="results.Base_PlanMosavab.DensityPercent"
        />
        <safa-text
          label="سطح اشغال مصوب"
          label-width="80px"
          :m="m"
          v-model="results.Base_HouseInfo.BusyArea"
        />
        <safa-combo
          label="کاربری مجاز"
          label-width="80px"
          :m="m"
          domainName="CI_SaraM1"
          ciName="CI_PlanUsingMojaz"
          v-model="results.Base_PlanMojaz.CI_PlanUsingMojaz"
        />
        <safa-text
          label="تراکم مجاز"
          label-width="80px"
          :m="m"
          v-model="results.Base_PlanMojaz.MojazTarakom"
        />
        <safa-text
          label="سطح اشغال مجاز"
          label-width="80px"
          :m="m"
          v-model="results.Base_PlanMojaz.BusyAreab"
        />
      </safa-group>
    </internal-section>
    <safa-datatable
      helper="technicalStuffHouseInfo"
      v-model="results.Base_Edge"
      :m="m"
      fit
      height="100%"
      max-height="100%"
    />
  </fit>
</template>

<script>
export default {
  name: 'TechnicalStuffHouseInfo',
  data () {
    return {

    }
  },
  props: {
    m: String,
    results: Object,
    baseNosaziCode: String
  }
}
</script>
