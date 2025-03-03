<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>

      <div class="row q-mb-sm">
        <OfficeInfoBox
          class="col-md-6"
          v-model="officeCode"
          label-width="60px"
          @fetched="loadObj"
        />
      </div>

      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="officeInfo" label="مشخصات" />
          <tab-menu name="officeFactor" label="ضریب دفتر" />
          <tab-menu name="samplePhoto" label="نمونه عکس" />
        </template>
        <tab-content name="officeInfo">
          <OfficeInfo
            v-model="model.office.ClsOffice"
            :isNewOffice="isNewOffice"
            :m="mode"
          />
        </tab-content>
        <tab-content name="officeFactor" :padding="false">
          <fit>
            <safa-grid
              title="ضریب دفتر"
              v-model="model.office.ClsOffice.Off_AbilityMultiply"
              cdcName="Off_AbilityMultiply"
              helper="officeAbilityMultiply"
              fit
              :m="mode"
            />
          </fit>
        </tab-content>
        <tab-content name="samplePhoto">
          <SamplePhoto
            v-model="model.office.ClsOffice.PresidentPicture"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          showEditButton
          showNewButton
          @edit="isEditable = true"
          @newInfo="newData"
          @cancel="cancelObj"
          @save="saveObj"
        >
          <btn-default
            spId="d5da93d2-bc48-49d0-8ffb-8e7c79c1fa77"
            spCaption="چاپ اطلاعات"
            label="چاپ اطلاعات"
            @click="print"
          />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import OfficeInfo from "./partials/OfficeInfo.vue"
import SamplePhoto from "./partials/SamplePhoto.vue"
const GuidEmpty = "00000000-0000-0000-0000-000000000000"

export default {
  components: { OfficeInfo, SamplePhoto },
  mixins: [baseFormMixin],
  props: ["value"],
  // بخش دیفالت مدل  روی تهران کار میکرد ولی با توجه به اینکه چندین بار تبریز تسک میزدکه فرم خالی نمیشود این مورد حذف گردید.
  data () {
    return {
      name: "UEngOffice",
      formKey: "C778F511-FE62-4060-806F-9C30311105D6",
      title: "دفتر مهندسی",
      main: true,

      officeCode: null,
      model: {
        office: {
          CI_RequestType: 0,
          CI_Years: 0,
          CI_ExecLevel: 0,
          CI_University: 0,
          ClsOffice: {
            CI_OfficeType: null,
            NidOffice: GuidEmpty,
            Off_AbilityMultiply: [],
            Off_Info: {
              Address: null,
              BreackupDate: null,
              CI_JobAgreementType: 0,
              CI_OfficeType: 0,
              CellPhone: null,
              Comments: null,
              Email: null,
              ExpireDate: "",
              FaxNo: null,
              IsConsultant: null,
              JobAgreementLastDate: null,
              JobAgreementNo: null,
              JobAgreementSubject: null,
              MemMaxCount: null,
              NIdOff: GuidEmpty,
              NIdOff_tmp: "0",
              OfficeCode: "",
              OfficeName: "",
              RegisterDate: "",
              RegisterNo: "",
              Tel: ""
            },
            Off_Picture: {
              NIdOff: GuidEmpty,
              NIdPicture: GuidEmpty,
              NIdPicture_tmp: 0,
              PicEngineerMohr: null,
              PicJobAgreement: null,
              PicJobAgreementBack: null,
              PicOffMohr: null,
              PicSignature: null,
              Picture: null
            },
            President: {
              IdentityCode: null,
              NidEng: GuidEmpty,
              PresidentName: []
            },
            PresidentPicture: {
              NIdEng: GuidEmpty,
              NIdPicture: GuidEmpty,
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
            Qta: "0",
            QtaRemain: "0"
          },
          NidCheckerGroup: GuidEmpty,
          NidEng: GuidEmpty,
          NidEngineer: null,
          NidFil: GuidEmpty
        }
      },
      activeTab: "officeInfo",
      isNewOffice: false,

      loadObjRes: null,
      saveObjRes: null
    }
  },

  methods: {
    async loadObj () {
      this.isEditable = false
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.findOfficeWithCode({
          pRequest: { OfficeCode: this.officeCode }
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model.office = this.loadObjRes.data.FindOfficeWithCodeResult ?? {
            CI_RequestType: 0,
            CI_Years: 0,
            CI_ExecLevel: 0,
            CI_University: 0,
            ClsOffice: {
              CI_OfficeType: null,
              NidOffice: GuidEmpty,
              Off_AbilityMultiply: [],
              Off_Info: {
                Address: null,
                BreackupDate: null,
                CI_JobAgreementType: 0,
                CI_OfficeType: 0,
                CellPhone: null,
                Comments: null,
                Email: null,
                ExpireDate: "",
                FaxNo: null,
                IsConsultant: null,
                JobAgreementLastDate: null,
                JobAgreementNo: null,
                JobAgreementSubject: null,
                MemMaxCount: null,
                NIdOff: GuidEmpty,
                NIdOff_tmp: "0",
                OfficeCode: "",
                OfficeName: "",
                RegisterDate: "",
                RegisterNo: "",
                Tel: ""
              },
              Off_Picture: {
                NIdOff: GuidEmpty,
                NIdPicture: GuidEmpty,
                NIdPicture_tmp: 0,
                PicEngineerMohr: null,
                PicJobAgreement: null,
                PicJobAgreementBack: null,
                PicOffMohr: null,
                PicSignature: null,
                Picture: null
              },
              President: {
                IdentityCode: null,
                NidEng: GuidEmpty,
                PresidentName: []
              },
              PresidentPicture: {
                NIdEng: GuidEmpty,
                NIdPicture: GuidEmpty,
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
              Qta: "0",
              QtaRemain: "0"
            },
            NidCheckerGroup: GuidEmpty,
            NidEng: GuidEmpty,
            NidEngineer: null,
            NidFil: GuidEmpty
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.officeCode,
            bizCodeTitle: "کد دفتر",
            saveDesc: `بارگذاری اطلاعات دفتر با کد ${this.officeCode} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        this.serverError()
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (!this.isValidForm()) return

      if (this.model.office.ClsOffice.Off_Info.CI_OfficeType === 0) {
        return this.showError("لطفا نوع دفتر را مشخص نمایید.")
      }

      this.model.office.CI_University = 0
      this.model.office.CI_ExecLevel = 0

      this.showLoading()
      try {
        const { data } = await this.$services.engineers.saveOfficeInfo({
          pRequest: this.model.office
        })
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("عملیات با موفقیت انجام گردید.")
          this.isEditable = false

          await this.log({
            action: this.logActions.save,
            bizCode: this.officeCode,
            bizCodeTitle: "کد دفتر",
            saveDesc: `ذخیره اطلاعات دفتر با کد ${this.officeCode} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async print () {
      const NidOffice = this.model?.office?.ClsOffice?.NidOffice
      const repPath = window.getConfigValue("engineersConfig.reportPath", "")

      if (NidOffice === GuidEmpty) {
        return this.showError("اطلاعات مهندس یافت نشد.")
      }
      if (repPath === "") {
        return this.showError("گزارش مورد نظر تعریف نشده است.")
      }

      const reportPath = `${repPath}/RptOffMemInfo`
      const queryParams = {
        NidOffice,
        UserName: this.getUserDisplayName()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.office.ClsOffice,
        bizCodeTitle: this.model.office.ClsOffice,
        saveDesc: `نمایش گزارش اطلاعات فرم ${this.title} انجام گردید.`
      })
    },

    newData () {
      this.resetObj()
      this.isEditable = true
      this.isNewOffice = true
    },

    resetObj () {
      this.resetValidation()
      this.officeCode = null
      this.model.office = {
        CI_RequestType: 0,
        CI_Years: 0,
        CI_ExecLevel: 0,
        CI_University: 0,
        ClsOffice: {
          CI_OfficeType: null,
          NidOffice: GuidEmpty,
          Off_AbilityMultiply: [],
          Off_Info: {
            Address: null,
            BreackupDate: null,
            CI_JobAgreementType: 0,
            CI_OfficeType: 0,
            CellPhone: null,
            Comments: null,
            Email: null,
            ExpireDate: "",
            FaxNo: null,
            IsConsultant: null,
            JobAgreementLastDate: null,
            JobAgreementNo: null,
            JobAgreementSubject: null,
            MemMaxCount: null,
            NIdOff: GuidEmpty,
            NIdOff_tmp: "0",
            OfficeCode: "",
            OfficeName: "",
            RegisterDate: "",
            RegisterNo: "",
            Tel: ""
          },
          Off_Picture: {
            NIdOff: GuidEmpty,
            NIdPicture: GuidEmpty,
            NIdPicture_tmp: 0,
            PicEngineerMohr: null,
            PicJobAgreement: null,
            PicJobAgreementBack: null,
            PicOffMohr: null,
            PicSignature: null,
            Picture: null
          },
          President: {
            IdentityCode: null,
            NidEng: GuidEmpty,
            PresidentName: []
          },
          PresidentPicture: {
            NIdEng: GuidEmpty,
            NIdPicture: GuidEmpty,
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
          Qta: "0",
          QtaRemain: "0"
        },
        NidCheckerGroup: GuidEmpty,
        NidEng: GuidEmpty,
        NidEngineer: null,
        NidFil: GuidEmpty
      }
      this.isNewOffice = false
    },

    cancelObj () {
      this.resetObj()
      this.isEditable = false
    }
  },

  mounted () {
    this.resetObj()
    if (this.value) {
      this.officeCode = this.value
      this.loadObj()
    }
  }
}
</script>
