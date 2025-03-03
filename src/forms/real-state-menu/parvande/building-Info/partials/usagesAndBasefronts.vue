<template>
  <safa-form :id="formKey" caption="کاربریها و پیش آمدگیها">
    <fit>
      <safa-splitter v-model="horizontalSplitterModel" horizontal>
        <template v-slot:before>
          <fit>
            <safa-datatable
              title="کاربری ها"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="Usages"
              helper="usagesColumns"
              :m="m"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>

        <template v-slot:after>
          <fit>
            <safa-datatable
              title="پیش آمدگیها و سایر کاربریهای خاص"
              fit
              min-height="100px"
              height="100%"
              max-height="100%"
              v-model="basefrontsaAndUsages"
              helper="basefrontsaAndUsagesColumns"
              :m="m"
              :take="20"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :isEditable="true"
              class="q-mb-sm"
            />
          </fit>
        </template>
        <form-row>
          <form-control>
            <safa-text
              label="نام کاربر ایجاد کننده"
              v-model="Result.Base_BuildingInfo.UserName"
              label-width="100px"
              :m="m"
            ></safa-text>
          </form-control>

          <form-control>
            <safa-datepicker
              label="تاریخ ایجاد"
              v-model="Result.Base_BuildingInfo.CreateDate"
              label-width="80px"
              :m="m"
            ></safa-datepicker>
          </form-control>
        </form-row>
      </safa-splitter>
    </fit>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

const defaultModel = {
  Base_BuildingInfo: {
    AllowableDensityLicence: "",
    BusyArea: "",
    CI_BuildingPosition: "",
    CI_CreateDesign: "",
    CI_HistoricalStatus: "",
    CI_RoofType: "",
    CI_StableStatus: "",
    CI_ViewCode: "",
    CommercialGapDepth: "",
    CreateDate: "",
    CreateYearFrom: "",
    CreateYearTo: "",
    Defilade: "",
    DownerHeight: "",
    EconomicCode: "",
    EndDate: "",
    Height: "",
    HeightKorsi: "",
    InfrastructureArea: "",
    LightfastArea: "",
    Nid: 0,
    NidCopy: 0,
    NidUser: "",
    ParkingGet: "",
    ParkingNeedCount: "",
    ParkingSupplyCount: "",
    PostCode: "",
    PrivacyCourtyardArea: "",
    PrivacyCourtyardWidth: "",
    RampArea: "",
    StartDate: "",
    UpperHeight: "",
    UserName: "",
    ViewArea: ""
  }
}
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      name: "usagesAndBasefronts",
      Result: { Base_BuildingInfo: { ...defaultModel } },

      // spilliter
      horizontalSplitterModel: 50,

      // grids
      Usages: [],
      // usagesColumns: [
      //   {
      //     field: "CI_UsingGroup",
      //     title: " اصلی ",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_UsingType",
      //     title: "فرعی",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_BuildingKind",
      //     title: "نوع ساختمان",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "BuildingNo",
      //     title: "شماره ساختمان",
      //     editor: "numeric",
      //   },
      //   {
      //     field: "UsingArea",
      //     title: "مساحت کاربری",
      //     cell: "grid-area-format",
      //   },
      //   {
      //     field: "FloorNo",
      //     title: "شماره طبقه",
      //     editor: "numeric",
      //   },
      //   {
      //     field: "UnitNo",
      //     title: "شماره واحد",
      //     editor: "numeric",
      //     width: "80px",
      //   },
      // ],

      basefrontsaAndUsages: []
      // basefrontsaAndUsagesColumns: [
      //   {
      //     field: "CI_FrontBuildingCode",
      //     title: "نوع پیش آمدگی",
      //     domain: "Estate",
      //     editor: "combo",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_SideCode",
      //     title: "جهت معبر",
      //     domain: "Estate",
      //     editor: "combo",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_UsingGroup",
      //     title: " اصلی ",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "CI_UsingType",
      //     title: "فرعی",
      //     editor: "combo",
      //     domain: "Estate",
      //     cell: "grid-combo",
      //   },
      //   {
      //     field: "BuildingNo",
      //     title: "شماره ساختمان",
      //     editor: "numeric",
      //   },
      //   {
      //     field: "FrontArea",
      //     title: "مساحت پيش آمدگي",
      //     cell: "grid-area-format",
      //   },
      // ],
    }
  }
}
</script>
