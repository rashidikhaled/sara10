<template>
  <form-wrapper :title="title" vertical :padding="false">
    <template>
      <safa-status :result="getEngCompareInfoRes" />
      <safa-status :result="acceptEngineerInfoRes" />
      <safa-status :result="rejectEngineerInfoRes" />
    </template>
    <safa-tabs v-model="activeTab" height="100%" class="fit" :boardered="false">
      <template v-slot:tabs>
        <tab-menu name="PersonalInfo" label="مشخصات فردی" />
        <tab-menu name="EducationInfo" label="مشخصات تحصیلی و سایر" />
        <tab-menu name="ContactInfo" label="مشخصات تماس" />
        <tab-menu name="ScanPic" label="اسکن تصاویر" />
        <tab-menu name="Settings" label="تنظیمات نمایش اطلاعات در سایت" />
      </template>
      <tab-content name="PersonalInfo" title="مشخصات فردی">
        <PersonalInfo :m="mode" :model="getEngInfoTempResult" />
      </tab-content>
      <tab-content name="EducationInfo" title="مشخصات تحصیلی و سایر">
        <EducationInfo :m="mode" :model="getEngInfoTempResult" />
      </tab-content>
      <tab-content name="ContactInfo" title="مشخصات تماس">
        <ContactInfo :m="mode" :model="getEngInfoTempResult" />
      </tab-content>
      <tab-content name="ScanPic" title="اسکن تصاویر">
        <ScanPic :m="mode" :model="getEngInfoTempResult" />
      </tab-content>
      <tab-content name="Settings" title="تنظیمات نمایش اطلاعات در سایت">
        <Settings :m="mode" :model="getEngInfoTempResult" />
      </tab-content>
    </safa-tabs>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default label="تایید اطلاعات" @click="acceptEngineerInfo" />
        <btn-default label=" عدم تایید اطلاعات" @click="rejectEngineerInfo" />
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersonalInfo from "./PersonalInfo"
import EducationInfo from "./EducationInfo"
import ContactInfo from "./ContactInfo"
import ScanPic from "./ScanPic"
import Settings from "./Settings"

export default {
  components: { PersonalInfo, EducationInfo, ContactInfo, ScanPic, Settings },
  mixins: [baseFormMixin],

  props: {
    nidEng: { type: String, default: "" }
  },

  data () {
    return {
      title: "خود اظهاری",
      formKey: "E860DAFD-DD1E-4D17-9276-98B7DD8ACCCF",
      name: "KhodEzhari",
      main: true,
      sidebarCompatible: true,

      // #variables
      activeTab: "PersonalInfo",
      getEngInfoTempResult: {
        CI_RequestType: 0,
        CI_Years: 0,
        ClsEngineerTemp: {
          Eng_Info_Temp: {
            CI_EngineerType: 0,
            EngName: "",
            EngFamily: "",
            FatherName: "",
            BirthDate: "",
            BirthPlace: "",
            IdExportPlace: "",
            IdNo: "",
            NationalCode: "",
            IsMarried: false,
            IsMale: false,
            IsOk: false,
            ArchitectureCode: "",
            MunicipalityCode: "",
            EngComments: "",
            CreatedDate: "",
            CI_Degree: 0,
            CI_University: 0,
            LastDegreeDate: "",
            StudyFieldRel: 0,
            CI_MilitaryService: 0,
            PostalCode: "",
            MobileNo: "",
            Tel: "",
            CI_Region: 0,
            Email: "",
            Address: "",
            AddressWork: ""
          },
          Eng_Competence_Temp: [],
          Eng_JobAgreement_Temp: [],
          Eng_OtherData_Temp: [],
          Eng_ShowPublicSetting: {
            IsShowName: false,
            IsShowAbility: false,
            IsShowBase: false,
            IsShowStudyField: false,
            IsShowStudyFieldRel: false,
            IsShowQtaRemain: false,
            IsShowQta: false,
            IsJobAgreementExpireDate: false,
            IsShowPic: false,
            IsShowMobile: false,
            IsShowUniversity: false,
            IsShowAddressWork: false,
            IsShowEMail: false
          },
          Eng_Picture_Temp: {
            NIdEng: "00000000-0000-0000-0000-000000000000",
            NIdPicture: "00000000-0000-0000-0000-000000000000",
            NIdPicture_tmp: 0,
            PicJobAgreement: null,
            PicJobAgreementBack: null,
            PicMohr: [],
            PicMohr2: null,
            PicMohrWith: null,
            PicNationalCode: null,
            PicShenasname: null,
            PicSignature: [],
            PicVoucher: null,
            Picture: []
          }
        },
        ClsEngCompare: []
      },
      showKhodEzhariInfo: false,

      // #services
      getEngCompareInfoRes: null,
      acceptEngineerInfoRes: null,
      rejectEngineerInfoRes: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .GetEngCompareInfo({
          pRequest: { NidEngineer: this.nidEng }
        })
        .then(async ({ data }) => {
          this.getEngCompareInfoRes = this.getResponse(data)
          if (this.getEngCompareInfoRes.success) {
            this.getEngInfoTempResult =
              this.getEngCompareInfoRes.data.GetEngCompareInfoResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.nidEng,
              bizCodeTitle: "nidEng"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    acceptEngineerInfo () {
      this.showLoading()
      this.$services.engineers
        .AcceptEngineerInfo({
          pRequest: { NidEngineer: this.nidEng }
        })
        .then(async ({ data }) => {
          this.acceptEngineerInfoRes = this.getResponse(data)
          if (this.acceptEngineerInfoRes.success) {
            this.getEngInfoTempResult =
              this.acceptEngineerInfoRes.data.AcceptEngineerInfoResult
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.$emit("reload")
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.nidEng,
              bizCodeTitle: "nidEng"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    rejectEngineerInfo () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          NidEngineer: this.nidEng,
          Comments:
            this.getEngInfoTempResult.ClsEngineerTemp.RejectMessage ?? ""
        }
      }
      this.$services.engineers
        .RejectEngineerInfo(payLoad)
        .then(async ({ data }) => {
          this.rejectEngineerInfoRes = this.getResponse(data)
          if (this.rejectEngineerInfoRes.success) {
            this.getEngInfoTempResult =
              this.rejectEngineerInfoRes.data.RejectEngineerInfoResult
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.$emit("reload")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.nidEng,
              bizCodeTitle: "nidEng"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
