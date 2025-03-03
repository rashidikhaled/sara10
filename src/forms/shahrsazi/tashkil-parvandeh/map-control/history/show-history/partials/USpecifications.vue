<template>
  <fit>
    <safa-group>
      <safa-combo
        ciName="CI_DocType"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="نوع سند"
        v-model="value.Base_CommonEstate.CI_DocType"
        cdcName="CI_DocType"
        m="r"
        label-width="100px"
      ></safa-combo>

      <safa-text
        label="شماره دستور نقشه"
        v-model="value.Sh_PlanOrder.PlanOrderNo"
        cdcName="PlanOrderNo"
        m="r"
        label-width="100px"
      />
      <!-- <safa-securityPanel
            id="5cf23ff2-9292-4cc1-8de0-f82789985a5c"
            tag="div"
          > -->
      <safa-combo
        ciName="CI_BuildingPosition"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="استقرار بنا"
        v-model="value.Base_BuildingInfo.CI_BuildingPosition"
        cdcName="CI_BuildingPosition"
        :m="m"
        label-width="100px"
      ></safa-combo>
      <!-- </safa-securityPanel> -->

      <safa-custom-text
        label="مساحت طبق سند"
        v-model="value.Base_HouseInfo.DocArea"
        cdcName="DocArea"
        m="r"
        type="decimal"
        label-width="100px"
      />

      <safa-combo
        ciName="CI_Criterion"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="ضابطه"
        v-model="value.Sh_BaroKaf.CI_Criterion"
        cdcName="CI_Criterion"
        m="r"
        label-width="100px"
      ></safa-combo>

      <!-- <safa-securityPanel
            id="5a55af1c-7221-4397-a067-f0ef369ac7b8"
            tag="div"
          > -->
      <safa-combo
        ciName="CI_CreateDesign"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="الگوی ساخت"
        v-model="value.Base_BuildingInfo.CI_CreateDesign"
        cdcName="CI_CreateDesign"
        :m="m"
        label-width="100px"
      ></safa-combo>
      <!-- </safa-securityPanel> -->

      <safa-custom-text
        label="مساحت وضع موجود"
        v-model="value.Base_HouseInfo.CurrentArea"
        cdcName="CurrentArea"
        m="r"
        type="decimal"
        label-width="100px"
      />

      <!-- <safa-securityPanel
            id="4996c8f5-2eb2-4965-9f80-a6ffd2d80cfc"
            tag="div"
          > -->
      <safa-text
        label="تراکم"
        v-model="value.Base_BuildingInfo.AllowableDensityLicence"
        cdcName="AllowableDensityLicence"
        :m="m"
        label-width="100px"
      />
      <!-- </safa-securityPanel> -->

      <!-- <safa-securityPanel
            id="3af2eb1b-a43a-4ddc-b328-cd1993106f2d"
            tag="div"
          > -->
      <safa-text
        label="مجموع ارتفاع کل"
        v-model="value.Base_BuildingInfo.Height"
        cdcName="Height"
        :m="m"
        label-width="100px"
      />
      <!-- </safa-securityPanel> -->

      <safa-text
        label="مجموع کل زیربنا"
        v-model="value.Base_BuildingInfo.InfrastructureArea"
        cdcName="InfrastructureArea"
        m="r"
        label-width="100px"
      />

      <!-- <safa-securityPanel
            id="3636ae06-d0db-468e-bd66-51c23e49c0bf"
            tag="div"
          > -->
      <safa-combo
        ciName="CI_ViewCode"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="نوع نما"
        v-model="value.Base_CommonEstate.CI_ViewCode"
        cdcName="CI_ViewCode"
        :m="m"
        label-width="100px"
      ></safa-combo>
      <!-- </safa-securityPanel> -->

      <!-- <safa-securityPanel
            id="3d0f1839-8426-4531-b0ac-e94ec4e33e22"
            tag="div"
          > -->
      <safa-custom-text
        label="مساحت ایست رمپ"
        v-model="value.Base_BuildingInfo.RampArea"
        cdcName="RampArea"
        :m="m"
        type="decimal"
        label-width="100px"
      />
      <!-- </safa-securityPanel> -->

      <safa-custom-text
        label="مساحت پس از رعایت بر اصلاحی"
        v-model="value.Base_HouseInfo.AreaAfterEdit"
        cdcName="AreaAfterEdit"
        m="r"
        type="decimal"
        label-width="100px"
      />

      <!-- <safa-securityPanel
            id="b4d6422e-8e5f-4bc6-8b22-1ee0a8173ac3"
            tag="div"
          > -->
      <safa-combo
        ciName="CI_RoofType"
        domainName="CI_SaraM1"
        input-debounce="0"
        label="پوشش سقف"
        v-model="value.Base_BuildingInfo.CI_RoofType"
        cdcName="CI_RoofType"
        :m="m"
        label-width="100px"
      ></safa-combo>
      <!-- </safa-securityPanel> -->

      <!-- <safa-securityPanel
            id="23766844-a04a-4a5c-a1d2-7bdb7201066b"
            tag="div"
          > -->
      <safa-text
        label="ارتفاع جان پناه"
        v-model="value.Base_BuildingInfo.Defilade"
        cdcName="Defilade"
        :m="m"
        label-width="100px"
      />
      <!-- </safa-securityPanel> -->

      <safa-custom-text
        label="مساحت باقیمانده"
        v-model="value.Base_HouseInfo.RemainArea"
        cdcName="RemainArea"
        m="r"
        type="decimal"
        label-width="100px"
      />

      <safa-text
        label="عرض پلاک"
        v-model="value.Base_BuildingInfo.PlackWidth"
        cdcName="PlackWidth"
        :m="m"
        label-width="100px"
      />

      <!-- <safa-securityPanel
            id="86ba2ac6-99b9-4d52-a578-1ac42062f1df"
          > -->
      <safa-custom-text
        type="decimal"
        label="مساحت سهم العرصه چند ساختمانی"
        v-model="value.Base_BuildingInfo.MultiBuildingToftImpartArea"
        cdcName="MultiBuildingToftImpartArea"
        m="r"
        label-width="100px"
      />
      <!-- </safa-securityPanel> -->

      <safa-text
        label="تعهد نما"
        v-model="value.Base_CommonEstate.ViewCommitment"
        cdcName="ViewCommitment"
        :m="m"
        label-width="100px"
      />

      <safa-datepicker
        locale="fa"
        placeholder="تاریخ تعهد نما"
        format="jYYYY/jMM/jDD"
        display-format="dddd jDD jMMMM jYYYY"
        label="تاریخ تعهد نما"
        v-model="value.Base_CommonEstate.ViewCommitmentDate"
        cdcName="ViewCommitmentDate"
        :m="m"
        label-width="100px"
      ></safa-datepicker>
    </safa-group>
    <safa-splitter v-model="gridSplitter">
      cdcName="""
      <template #before>
        <safa-grid
          v-model="value.Base_Edge"
          cdcName="Base_Edge"
          ref="grid"
          name="grid"
          helper="shahrsazi.jahateArbae"
          m="r"
          :loadingAnimation="false"
          title="جهات اربعه"
          fit
        />
      </template>
      <template #after>
        <safa-datatable
          v-model="value.Base_RegisterPlack"
          cdcName="Base_RegisterPlack"
          ref="grid"
          name="grid"
          helper="shahrsazi.registerPelak"
          m="r"
          :loadingAnimation="false"
          :paginate="false"
          title="پلاک ثبتی"
        ></safa-datatable>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      jahateArbaeItems: [],
      registeredPelakItems: [],
      gridSplitter: 50
    }
  },
  props: {
    value: Object,
    m: String
  },
  mounted () {
    this.jahateArbaeItems = this.value.Base_Edge

    this.registeredPelakItems = this.value.Base_RegisterPlack
  },
  methods: {
    baseEdgeRowUpdated (e) {
      this.value.Base_Edge = e.gridItems
    },
    registeredPelakRowUpdated (e) {
      this.value.Base_RegisterPlack = e.gridItems
    }
  }
}
</script>
