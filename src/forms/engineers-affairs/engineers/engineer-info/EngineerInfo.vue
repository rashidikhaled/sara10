<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getEngInfoRes" />
        <safa-status :result="saveEngInfoRes" />
      </template>
      <div class="row items-center q-col-gutter-sm q-mb-sm">
        <EngineerInfoBox
          label="کد عضویت"
          label-width="60px"
          class="col-md-4 col-12"
          v-model="identityCode"
          @fetched="loadObj"
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
          <tab-menu name="changeScanPic_tab" label="تغییرات اسکن تصاویر" />
        </template>
        <tab-content name="personalInfo_tab">
          <personal-info
            :model="model.engInfo"
            :title="title"
            :formKey="formKey"
            :name="name"
            :m="mode"
          />
        </tab-content>
        <tab-content name="parvanehInfo_tab">
          <parvaneh-info
            :model="model.engInfo"
            :title="title"
            :formKey="formKey"
            :name="name"
            :m="mode"
          />
        </tab-content>
        <tab-content name="educateInfo_tab">
          <educate-info
            :model="model.engInfo"
            :title="title"
            :formKey="formKey"
            :name="name"
            :m="mode"
          />
        </tab-content>
        <tab-content name="callInfo_tab">
          <call-info :model="model.engInfo" :m="mode" />
        </tab-content>
        <tab-content name="scanPic_tab">
          <scan-pic :model="model.engInfo" :m="mode" />
        </tab-content>
        <tab-content name="changeScanPic_tab" :padding="false">
          <change-scan-pic :model="model.engInfo" />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          :showEditButton="true"
          :showNewButton="true"
          @save="saveObj"
          @edit="isEditable = true"
          @newInfo="newData"
          @cancel="isEditable = false"
        >
          <btn-default label="چاپ اطلاعات" @click="print" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import PersonalInfo from "./partials/PersonalInfo.vue"
import ParvanehInfo from "./partials/ParvanehInfo.vue"
import EducateInfo from "./partials/EducateInfo.vue"
import CallInfo from "./partials/CallInfo.vue"
import ScanPic from "./partials/ScanPic.vue"
import ChangeScanPic from "./partials/ChangeScanPic.vue"
import { controlValidation } from "ui-core"

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
        IsOk: false,
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
      IdentityCode: "",
      IsCommitment: true,
      IsMale: false,
      IsMarried: false,
      IsOk: false,
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
    ScanPic,
    ChangeScanPic
  },
  props: {
    value: [String, Number]
  },
  data () {
    return {
      name: "EngineerInfo",
      title: "اطلاعات مهندس",
      formKey: "a38337ac-8e07-436e-846a-0eab6f8f0e40",
      main: true,
      sidebarCompatible: true,

      // #variables
      currentTab: "personalInfo_tab",
      isView: false,
      identityCode: null,
      model: { engInfo: { ...defaultModel } },
      getEngInfoWithEngineerCodeResult: {},

      // #services
      getEngInfoRes: null,
      saveEngInfoRes: null
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadObj(this.identityCode)
    }
  },
  methods: {
    newData () {
      // this.model.engInfo.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode = null
      this.model.engInfo = {
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
              IsOk: false,
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
            IdentityCode: "",
            IsCommitment: true,
            IsMale: false,
            IsMarried: false,
            IsOk: false,
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
      this.isEditable = true
    },
    async getChangeScan () {
      try {
        const payload = {
          pRequest: {
            EngineerCode: this.identityCode,
            EngPictureTables: ""
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.engineers.GetEngInfoWithEngineerCode(payload)
        const requestResult = this.getResponse(data)
        if (requestResult.success) {
          this.model.engInfo =
            requestResult.data.GetEng_InfoWithEngineerCodeResult
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async loadObj (val) {
      try {
        let identityCode = val?.IdentityCode || this.identityCode || val
        if (!identityCode) return
        this.showLoading()
        const { data } =
          await this.$services.engineers.GetEngInfoWithEngineerCode({
            pRequest: {
              EngineerCode: identityCode
            }
          })
        this.getEngInfoRes = this.getResponse(data)
        if (this.getEngInfoRes.success) {
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "IdentityCode",
              saveDesc: `اطلاعات مهندس با کد عضویت ${this.identityCode} بارگذاری گردید.`
            })
          }
          this.isView = true
          this.model.engInfo =
            this.getEngInfoRes.data.GetEng_InfoWithEngineerCodeResult
          if (this.model?.engInfo?.BlackListStatus !== null) {
            this.showError('مهندس در لیست کنترلی می باشد')
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeEngCompetence () {
      return this.model.engInfo.ClsEngineer.Eng_Competence.map((m) => {
        return {
          ...m,
          IsArchitecture: m.IsArchitecture || null
        }
      })
    },
    async saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const results = await Promise.allSettled([
        this.checkNationalCode(), // CheckShahkar
        this.civilAuthorityStatus() // چک کردن زنده یا مرده بودن
      ])
      // دریافت نتیجه فراخوانی سرویس های بالا
      if (results[0].status === "rejected") {
        this.showError(results[0].reason.msg)
      }
      if (results[1].status === "rejected") {
        this.showError(results[1].reason.msg)
      }
      if (
        results[0].status === "fulfilled" &&
        results[1].status === "fulfilled"
      ) {
        await this.processSaveData()
      }
      this.hideLoading()
    },
    async checkNationalCode () {
      return new Promise(async (resolve, reject) => {
        const res = await this.$services.security.checkNationalCode({
          nationalCode: this.model.engInfo.ClsEngineer.Eng_Info.NationalCode,
          mobileNo: this.model.engInfo.ClsEngineer.Eng_Info.MobileNo
        })
        if (res.data.success) {
          if (res.data.data.success) {
            return resolve(res.data.data)
          } else {
            return reject(res.data.data)
          }
        } else {
          return reject(res.data)
        }
      })
    },
    async civilAuthorityStatus () {
      return new Promise(async (resolve, reject) => {
        const res = await this.$services.security.civilAuthorityStatus({
          nationalCode: this.model.engInfo.ClsEngineer.Eng_Info.NationalCode,
          birthDate: this.model.engInfo.ClsEngineer.Eng_Info.BirthDate
        })
        if (res.data.success) {
          if (res.data.data.success) {
            return resolve(res.data.data)
          } else {
            return reject(res.data.data)
          }
        } else {
          return reject(res.data)
        }
      })
    },
    async processSaveData () {
      try {
        this.model.engInfo.ClsEngineer.Eng_Competence = this.normalizeEngCompetence()
        this.model.engInfo.ClsEngineer.Eng_Info.IdentityCode = this.identityCode
        if (!this.identityCode) {
          this.model.engInfo.ClsEngineer.Eng_Info.IdentityCode = null
        }
        const { data } = await this.$services.engineers.saveEngInfo({
          pRequest: {
            CI_RequestType: 0,
            CI_Years: 0,
            ClsEngineer: this.model.engInfo.ClsEngineer
          }
        })
        this.saveEngInfoRes = this.getResponse(data)
        if (this.saveEngInfoRes.success) {
          // this.showSuccess("عملیات با موفقیت انجام شد");
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.identityCode,
            bizCodeTitle: "IdentityCode",
            saveDesc: `اطلاعات مهندس با کد عضویت ${this.identityCode} ذخیره گردید.`
          })
          this.loadObj(this.identityCode)
        }
      } catch (e) {
        console.error(e)
      }
    },
    async print () {
      let NIdEng = this.model.engInfo.ClsEngineer.Eng_Info.NIdEng
      if (!NIdEng || NIdEng === "00000000-0000-0000-0000-000000000000") return this.showError("متاسفانه اطلاعات مهندس یافت نشد.")
      // const reportPath = `?ReportPath=/Engineers/RptEngineerInfo&ReportParameter=`
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
