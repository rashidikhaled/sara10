<template>
    <fit>
      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-combo
            label="محل وقوع ساختمان"
            label-width="110px"
            ciName="CI_BuildingPosition"
            domainName="Estate"
            v-model="Result.Base_BuildingInfo.CI_BuildingPosition"
            :m="m"
          ></safa-combo>
        </form-control>

        <form-control>
          <safa-text
            label="قدمت ساختمان بعد از"
            label-width="110px"
            v-model="Result.Base_BuildingInfo.CreateYearFrom"
            :m="m"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label="قدمت ساختمان قبل از"
            label-width="110px"
            v-model="Result.Base_BuildingInfo.CreateYearTo"
            :m="m"
          ></safa-text>
        </form-control>
      </div>

      <div class="row q-col-gutter-sm q-mb-sm">
        <form-control>
          <safa-text
            label="مساحت کل زیربنا "
            label-width="110px"
            v-model="Result.Base_BuildingInfo.InfrastructureArea"
            :m="m"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label=" کد پستی"
            label-width="110px"
            v-model="Result.Base_BuildingInfo.PostCode"
            :m="m"
          ></safa-text>
        </form-control>

        <form-control>
          <safa-text
            label=" کد اقتصادی"
            label-width="110px"
            v-model="Result.Base_BuildingInfo.EconomicCode"
            :m="m"
          ></safa-text>
        </form-control>
      </div>
      <div>
        <text-template
          label="توضیحات"
          v-model="Description"
          :rows="5"
          cdcName="Result.Base_CommonEstate.Comments"
          :m="m"
        />
      </div>

      <div>
        <btn-default label="..." />
      </div>
    </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

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
      name: "buildingSpecifications",
      Result: { Base_BuildingInfo: { ...defaultModel } }
    }
  }
}
</script>
