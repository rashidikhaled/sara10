<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9"
  >
  <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="getEngInfoRes" />
    </template>
    <div class="row items-center q-col-gutter-sm q-mb-sm">
      <EngineerInfoBox
        label="کد عضویت"
        label-width="60px"
        class="col-md-4 col-12"
        v-model="identityCode"
        @fetched="loadObj"
        :m="mode"
      />
      <engineer-actions
        v-model="model.engInfo.ClsEngineer.Eng_Info.IdentityCode"
        :disable="!model.engInfo.ClsEngineer.Eng_Info.IdentityCode"
        class="col-md-8 col-12"
      />
    </div>
    <safa-tabs v-model="currentTab" fit>
      <template v-slot:tabs>
        <tab-menu name="personalInfo_tab" label="مشخصات فردی" />
        <tab-menu name="parvanehInfo_tab" label="پروانه اشتغال / صلاحیت" />
        <tab-menu name="educateInfo_tab" label="مشخصات تحصیلی و سایر" />
        <tab-menu name="callInfo_tab" label="مشخصات تماس" />
        <tab-menu name="scanPic_tab" label="اسکن تصاویر" />
      </template>
      <tab-content name="personalInfo_tab">
        <PersonalInfo
          :model="model.engInfo"
          :title="title"
          :formKey="formKey"
          :name="name"
          :m="mode"
        />
      </tab-content>
      <tab-content name="parvanehInfo_tab">
        <ParvanehInfo
          :model="model.engInfo"
          :title="title"
          :formKey="formKey"
          :name="name"
          :m="mode"
        />
      </tab-content>
      <tab-content name="educateInfo_tab">
        <EducateInfo
          :model="model.engInfo"
          :title="title"
          :formKey="formKey"
          :name="name"
          :m="mode"
        />
      </tab-content>
      <tab-content name="callInfo_tab">
        <CallInfo :model="model.engInfo" :m="mode" />
      </tab-content>
      <tab-content name="scanPic_tab">
        <ScanPic :model="model.engInfo" :m="mode" />
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <btn-default label="چاپ اطلاعات" @click="print" />
    </template>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { controlValidation } from "ui-core"
import PersonalInfo from "../engineer-info/partials/PersonalInfo.vue"
import ParvanehInfo from "../engineer-info/partials/ParvanehInfo.vue"
import EducateInfo from "../engineer-info/partials/EducateInfo.vue"
import CallInfo from "../engineer-info/partials/CallInfo.vue"
import ScanPic from "../engineer-info/partials/ScanPic.vue"

const defaultModel = {
  ClsEngineer: {
    CI_City: 0,
    CityName: "",
    ClsEngineerCapacity: {
      CI_Year: 0,
      EngOrgan_OfficeInfo: null,
      Eng_CapacityReq: [],
      Eng_CapacityReqList: [],
      Eng_Card: null,
      Eng_Competence: [],
      Eng_Holidays: null,
      Eng_Info: {
        ADPstudyFieldRel: 0,
        AccCode: null,
        Address: "",
        AddressWork: "",
        ArchitectureCode: null,
        BirthDate: "",
        BirthPlace: "",
        CI_Ability: 0,
        CI_Degree: 0,
        CI_EngineerType: 0,
        CI_MilitaryService: 0,
        CI_Region: 0,
        CI_Score: 0,
        CI_University: 0,
        CI_Years_Payoff: null,
        CommitmentDate: null,
        CreatedDate: "",
        Email: "",
        EngComments: "",
        EngFamily: "",
        EngName: "",
        FatherName: "",
        IdExportPlace: "",
        IdNo: "",
        IdentityCode: "",

        IsCommitment: true,
        IsMale: false,
        IsMarried: false,
        IsOk: true,
        LastDegreeDate: "",
        MobileNo: "",
        MunicipalityCode: "",
        NIdEng: "00000000-0000-0000-0000-000000000000",
        NIdEng_tmp: 0,
        NationalCode: "",
        NidEngOrgOff: null,
        Password: "",
        PercentRestriction: 0,
        PostalCode: "",
        PostalCodeWork: null,
        SaveDate: "",
        Score: null,
        Tel: "",
        delegate: ""
      },
      Eng_JobAgreement: null,
      IsCancel: false,
      IsConfirm: false,
      IsRevoke: false,
      NidEngineer: "00000000-0000-0000-0000-000000000000"
    },
    EngList_InCondition: null,
    EngOrgan_OfficeInfo: {
      IdentityCodeCEO: null,
      NidEngCEO: null,
      NidEngOrgOff: "00000000-0000-0000-0000-000000000000",
      OfficeAddress: null,
      OfficeCode: null,
      OfficeFax: null,
      OfficeName: null,
      OfficePhone: null,
      RegisterDate: null
    },
    Eng_Card: [],
    Eng_Competence: [],
    Eng_Holidays: [],
    Eng_Info: {
      ADPstudyFieldRel: 0,
      AccCode: null,
      Address: "",
      AddressWork: "",
      ArchitectureCode: null,
      BirthDate: "",
      BirthPlace: "",
      CI_Ability: 0,
      CI_Degree: 0,
      CI_EngineerType: 0,
      CI_MilitaryService: 0,
      CI_Region: 0,
      CI_Score: 0,
      CI_University: 0,
      CI_Years_Payoff: null,
      CommitmentDate: null,
      CreatedDate: "",
      Email: "",
      EngComments: "",
      EngFamily: "",
      EngName: "",
      FatherName: "",
      IdExportPlace: "",
      IdNo: "",
      IsCommitment: true,
      IsMale: false,
      IsMarried: false,
      IsOk: true,
      LastDegreeDate: "",
      MobileNo: "",
      MunicipalityCode: "",
      NIdEng: "00000000-0000-0000-0000-000000000000",
      NIdEng_tmp: 0,
      NationalCode: "",
      NidEngOrgOff: null,
      Password: "",
      PercentRestriction: 0,
      PostalCode: "",
      PostalCodeWork: null,
      SaveDate: "",
      Score: null,
      Tel: "",
      delegate: ""
    },
    Eng_JobAgreement: [],
    Eng_OrganOffCity: [],
    Eng_OtherData: [],
    Eng_OtherData_Temp: [],
    Eng_Picture: {
      NIdEng: "00000000-0000-0000-0000-000000000000",
      NIdPicture: "00000000-0000-0000-0000-000000000000",
      NIdPicture_tmp: 0,
      PicJobAgreement: null,
      PicJobAgreementBack: null,
      PicMohr: null,
      PicMohr2: null,
      PicMohrWith: null,
      PicNationalCode: null,
      PicShenasname: null,
      PicSignature: null,
      PicVoucher: null,
      Picture: null
    },
    Eng_Picture_Change: [],
    IsChangePass: false,
    IsNezam: false,
    IsShowBuildingReportAllEng: false,
    IsShowCommitment: false,
    NidEngineer: "00000000-0000-0000-0000-000000000000",
    NidUser: "00000000-0000-0000-0000-000000000000",
    ProvinceName: "",
    SecurityPass: null,
    SecurityRequestID: null,
    SecurityUserName: null,
    SendByAfagh: false,
    UserName: null
  },
  AllStudyFields: [],
  EngineerLastOffice: {
    EngFamily: "",
    EngName: "",
    MultiplyValue: 0,
    NIdEng: "00000000-0000-0000-0000-000000000000",
    NIdMem: "00000000-0000-0000-0000-000000000000",
    NIdOff: "00000000-0000-0000-0000-000000000000",
    OfficeCode: 0,
    OfficeName: ""
  }
}

export default {
  mixins: [baseFormMixin, controlValidation],
  components: {
    PersonalInfo,
    ParvanehInfo,
    EducateInfo,
    CallInfo,
    ScanPic
  },
  props: {
    value: [String, Number]
  },
  data () {
    return {
      name: "EngineerInfoSystem",
      title: "اطلاعات مهندس - نظام مهندسی",
      formKey: "c46b2166-c853-4aae-a18f-20d92be5b420",
      main: true,
      sidebarCompatible: true,

      // #variables
      currentTab: "personalInfo_tab",
      identityCode: null,
      model: { engInfo: { ...defaultModel } },
      getEngInfoWithEngineerCodeResult: {},

      // #services
      getEngInfoRes: null
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadObj()
    }
  },
  methods: {
    async loadObj (val) {
      try {
        this.showLoading()
        const { data } =
          await this.$services.engineers.GetEngInfoWithEngineerCode({
            pRequest: {
              EngineerCode: val.IdentityCode || this.identityCode || val
            }
          })
        this.getEngInfoRes = this.getResponse(data)
        if (this.getEngInfoRes.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.identityCode,
            bizCodeTitle: "IdentityCode"
          })
          this.model.engInfo =
            this.getEngInfoRes.data.GetEng_InfoWithEngineerCodeResult
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async print () {
      let NIdEng = this.model.engInfo.ClsEngineer.Eng_Info.NIdEng
      if (!NIdEng || NIdEng === "00000000-0000-0000-0000-000000000000") return this.showError("متاسفانه اطلاعات مهندس یافت نشد.")
      const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptEngineerInfo`
      const queryParams = {
        NIdEng,
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.view,
        bizCode: NIdEng,
        bizCodeTitle: "NIdEng",
        saveDesc: `چاپ گزارش برای شماره ${NIdEng} در  فرم ${this.title} انجام گردید.`
      })
    }
  }
}
</script>
