<template>
  <safa-form
    appId="90BBA2FE-5569-45B3-9A7B-EB92B3B19CA1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <safa-tabs
        v-model="activeTab"
        height="100%"
        class="fit"
        :boardered="false"
      >
        <template v-slot:tabs>
          <tab-menu name="PersonalInfo" label="مشخصات فردی" />
          <tab-menu name="EducationInfo" label="مشخصات تحصیلی و سایر" />
          <tab-menu name="ContactInfo" label="مشخصات تماس" />
          <tab-menu name="ScanPic" label="اسکن تصاویر" />
          <tab-menu name="Settings" label="تنظیمات نمایش اطلاعات در سایت" />
        </template>
        <tab-content name="PersonalInfo" title="مشخصات فردی">
          <PersonalInfo :m="mode" v-model="model.ClsEngineerTemp" />
        </tab-content>
        <tab-content name="EducationInfo" title="مشخصات تحصیلی و سایر">
          <EducationInfo :m="mode" v-model="model" />
        </tab-content>
        <tab-content name="ContactInfo" title="مشخصات تماس">
          <ContactInfo
            :m="mode"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp"
          />
        </tab-content>
        <tab-content name="ScanPic" title="اسکن تصاویر">
          <ScanPic :m="mode" v-model="model.ClsEngineerTemp.Eng_Picture_Temp" />
        </tab-content>
        <tab-content name="Settings" title="تنظیمات نمایش اطلاعات در سایت">
          <Settings
            :m="mode"
            v-model="model.ClsEngineerTemp.Eng_ShowPublicSetting"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="checkNationalCode"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersonalInfo from "./partials/PersonalInfo"
import EducationInfo from "./partials/EducationInfo"
import ContactInfo from "./partials/ContactInfo"
import ScanPic from "./partials/ScanPic"
import Settings from "./partials/Settings"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  components: { PersonalInfo, EducationInfo, ContactInfo, ScanPic, Settings },
  mixins: [baseFormMixin, kartableReferencesMixin],
  props: {
    nidEng: String,
    canEdit: {
      type: Boolean,
      default: true
    }
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
      model: {
        CI_RequestType: 0,
        CI_Years: 0,
        ADP_StudyFieldRel: [],
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
            AddressWork: "",
            ADP_StudyFieldRel: 0
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
            PicMohr: null,
            PicMohr2: null,
            PicMohrWith: null,
            PicNationalCode: null,
            PicShenasname: null,
            PicSignature: null,
            PicVoucher: null,
            Picture: null
          }
        },
        ClsEngCompare: []
      },

      // #services
      loadObjRes: null,
      saveObjRes: null
    }
  },

  created () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .getEngInfoTemp({ pRequest: { NidEngineer: this.currentUser.NidUser } })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetEng_Info_TempResult
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.currentUser.NidUser,
                bizCodeTitle: "NidEngineer"
              })
            }
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
    async checkNationalCode () {
      debugger
      // CheckShahkar
      if (!this.isValidForm()) return
      try {
        const payload = {
          nationalCode: this.model.ClsEngineerTemp.Eng_Info_Temp.NationalCode,
          mobileNo: this.model.ClsEngineerTemp.Eng_Info_Temp.MobileNo
        }
        const { data } = await this.$services.security.checkNationalCode(
          payload
        )
        if (data.data.success) { //  && !data.data.msg
          this.civilAuthorityStatus()
        } else {
          this.showError(data.data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
        this.hideLoading()
      }
    },
    async civilAuthorityStatus () {
      debugger
      // چک کردن زنده یا مرده بودن
      if (!this.isValidForm()) return
      try {
        const payload = {
          nationalCode: this.model.ClsEngineerTemp.Eng_Info_Temp.NationalCode,
          birthDate: this.model.ClsEngineerTemp.Eng_Info_Temp.BirthDate
        }
        const { data } = await this.$services.security.civilAuthorityStatus(
          payload
        )
        if (data.data.success) { //  && !data.data.msg
          this.saveObj()
        } else {
          this.showError(data.data.msg)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
        this.hideLoading()
      }
    },
    saveObj () {
      this.showLoading()
      this.$services.engineers
        .saveEngInfoTemp({ pRequest: { ClsEngineerTemp: this.model.ClsEngineerTemp } })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.model = this.saveObjRes.data.SaveEng_Info_TempResult
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.currentUser.NidUser,
              bizCodeTitle: "NidEngineer"
            })
            this.isEditable = false
            this.loadObj()
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
