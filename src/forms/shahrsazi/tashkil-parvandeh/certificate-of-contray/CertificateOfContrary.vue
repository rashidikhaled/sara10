<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      :padding="false"
      title="گواهی عدم خلاف"
      vertical
      @load="$emit('load')"
    >
      <formHeader :task-info="taskInfo" />
      <safa-status :result="result" />
      <safa-status :result="OtherResult" />
      <safa-status :result="saveResult" />
      <safa-status :result="confirmOutputResult" />
      <safa-status :result="revokeResult" />
      <safa-status :result="reqSecRes" />
      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        v-if="hasSodor"
      />
      <safa-tabs v-model="activeTab" v-else>
        <template v-slot:tabs>
          <tab-menu name="showjahatTab" label="جهات اربعه و مجوزها" />
          <tab-menu name="showUserTab" label="کاربری ها و پیش آمدگی ها" />
          <tab-menu name="showSpecificTab" label="سایر مشخصات" />
          <tab-menu name="showTarhTab" label="توضیحات و کروکی" />
        </template>
        <tab-content name="showjahatTab" title="جهات اربعه و مجوزها">
          <!-- @selectedSecChange="selectedSecChange" -->
          <CertificateOfContraryJahat
            ref="agrSpeRef"
            :results="results"
            :cboSecOptions="requestSecList"
            :m="mode"
          />
        </tab-content>
        <tab-content
          name="showUserTab"
          title="کاربری ها و پیش آمدگی ها"
          :padding="false"
        >
          <CertificateOfContraryUser :results="results" />
        </tab-content>

        <tab-content name="showSpecificTab" title="سایر مشخصات">
          <CertificateOfContraryOtherSpec
           :baseNosaziCode="baseNosaziCode"
            :results="results"
            :edit="isEditable"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="showTarhTab" title="توضیحات و کروکی">
          <CertificateOfContraryKoroki :results="results" :m="mode" />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :showEditButton="!hasSodor"
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="isEditable = false"
        >
          <template #after>
            <btn-default
              @click="secregistration"
              label="ثبت دبیرخانه"
              v-show="!hasSodor"
            />
            <btn-default label="tag درخواست" @click="tagrequest" />
            <btn-default
              @click="certificatIssuance"
              label="صدور گواهی"
              v-show="!hasSodor & (isEditable == false)"
            />
            <btn-default
              @click="print"
              label="چاپ پیش نویس"
              v-show="!hasSodor & (isEditable == false)"
            />

            <btn-default
              label="ابطال گواهی"
              @click="revokeCertificat"
              v-show="hasSodor"
            />
            <btn-default label="چاپ" @click="print" v-show="hasSodor" />
          </template>
        </form-actions>
      </template>
      <safa-popup
        v-model="showRevokeReason"
        width="500px"
        height="280px"
        title="توضیحات ابطال"
      >
        <fit>
          <text-template
            class="fit q-pa-sm"
            label="دلیل ابطال"
            cdcName="canceledComment"
            v-model="canceledComment"
            :formKey="formKey"
          />
          <div class="q-gutter-sm q-pa-sm">
            <btn-default label="ابطال" @click="confirmRevoke" />

            <btn-default label="انصراف" @click="showRevokeReason = false" />
          </div>
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import CertificateOfContraryJahat from "./partials/CertificateOfContraryJahat.vue"
import CertificateOfContraryKoroki from "./partials/CertificateOfContraryKoroki.vue"
import CertificateOfContraryOtherSpec from "./partials/CertificateOfContraryOtherSpec.vue"
import CertificateOfContraryUser from "./partials/CertificateOfContraryUser.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: "/certificate-contrary",
  mixins: [baseFormMixin],

  components: {
    CertificateOfContraryJahat,
    CertificateOfContraryKoroki,
    CertificateOfContraryOtherSpec,
    CertificateOfContraryUser
  },

  data: function () {
    return {
      title: "گواهی عدم خلاف",
      formKey: "66515ac7-90c7-4ddf-8bf0-86663e237822",
      name: "CertificateOfContrary",
      main: true,
      workflowCompatible: true,
      result: null,
      OtherResult: null,
      activeTab: "showjahatTab",
      hasSodor: false,
      showRevokeReason: false,
      results: {
        Sh_MissFoul: {},
        Base_ShahrsaziArchive: [],
        canceledComment: "",
        Base_Edge: [],
        Base_Using: [],
        Base_Front: [],
        EngInfo: [],
        Base_HouseInfo: {},
        Base_ControllerInfo: [],
        Base_SupplyParking: [],
        Sh_BaroKaf: {}
      },
      saveResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestSecList: [],
      reqSecRes: null,
      checkIsConfirmOutputResult: null,
      confirmOutputResult: null,
      revokeResult: null,
      archiveBizCode: ""
    }
  },

  computed: {
    archiveConfig () {
      return window.getConfigValue("archiveCore").district.ApprovalCertificate
    },
    pEntityId () {
      if (!this.buildingSettings || !this.buildingSettings.ShahrsaziSettings)
      { return -1 }
      return this.buildingSettings.ShahrsaziSettings
        .ArchiveCertificateOfContraryEntityId
    }
  },

  async created () {
    this.buildingSettings = await this.$stKartable.dispatch(
      "formSettings/getSettings",
      {
        key: "BuildingSettings",
        nidProc: GLOBAL_SETTINGS_GUID
      }
    )
  },

  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.checkIsConfirmOutput()
    } else {
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
    }
  },

  methods: {
    // selectedSecChange (e) {
    //   // debugger
    //   //  اگر سرویس لیستی رو برگردوند توی کمبو مقدار اول رو نمایش بده (این بخش توی کد هم به این صورت بود)
    //   // ولی این که کمبو رو تغییر کنه ، دیتای جدیدش مشخص نیست توی کدوم سرویس باید ارسال بشه ، توی سورس کد چیزی وجود نداشت
    //   // با توجه به صحبت خانم روستا به همین صورت اوکی هست و کمبو تغییری داده نمیشه
    // },
    checkIsConfirmOutput () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pOutputEngTitle: "Output_MissFoul"
      }
      this.$services.SC.checkIsConfirmOutput(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.checkIsConfirmOutputResult = res.data
            if (this.checkIsConfirmOutputResult.Sh_Output) {
              this.hasSodor = true
              this.updateArchiveBizCode(
                this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
              )
            } else {
              this.hasSodor = false
              this.loadData()
            }
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadRequestSec () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pEumSecNoGroup: ClsEnumEumSecNoGroup.AdamKhalaf.value
      }
      try {
        const { data } = await this.$services.SI.loadRequestSec(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.reqSecRes = this.getResponse(data)
        if (this.reqSecRes.success) {
          const _l = this.reqSecRes?.data?.Sh_RequestSec_List ?? []
          this.requestSecList = _l
            .map((m) => {
              return {
                ...m,
                ID: m.NidSec,
                Title: `شماره: ${m?.SecNo ?? "---"}  تاریخ: ${
                  m?.SecDate ?? "---"
                }`
              }
            })
            .sort((a, b) => b.SecDate - a.SecDate)
          if (this.requestSecList.length > 0) {
            this.$refs.agrSpeRef.selectedSec = this.requestSecList[0].ID
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async loadData () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      try {
        const { data } = await this.$services.SC.loadMissFoul(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.results = this.result.data
          this.loadRequestSec()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    async secregistration () {
      if (this.requestSecList.length > 0) {
        this.showConfirm(
          "درخواست مورد نظر قبلا ثبت دبیرخانه شده است آیا تمایل دارید دوباره ثبت شود؟"
        ).onOk(async () => {
          await this.saveRequestSec()
        })
      } else {
        await this.saveRequestSec()
      }
    },
    async saveRequestSec () {
      try {
        this.showLoading()
        const payload = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: ClsEnumEumSecNoGroup.AdamKhalaf.value,
            NidProc: this.selectedRequest.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.AdamKhalaf.value,
              NidProc: this.selectedRequest.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/Sara8Reports/RptFoul",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.WorkflowTitel,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SI.saveRequestSec(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.OtherResult = this.getResponse(data)
        if (this.OtherResult.success) {
          this.showSuccess("ثبت دبیرخانه با موفقیت انجام شد")
          await this.loadRequestSec()
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ثبت دبیرخانه درخواست ${this.selectedRequest.NidWorkItem} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    tagrequest () {
      alert("...به زودی")
    },

    certificatIssuance () {
      this.showLoading()
      const nosaziObj = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      let data = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MissFoul",
          OutputDate: new PersianDate().toLocale("en").format("L"),
          OutputNo: this.results.Sh_MissFoul.CertificateNo,
          OutputPerTitle: "عدم خلاف",
          ReportName: "/Sara8Reports/RptFoul"
        },
        pNosaziCode: {
          Apartment: nosaziObj.Apartment,
          Block: nosaziObj.Block,
          Building: nosaziObj.Building,
          CI_City: 0,
          District: nosaziObj.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: nosaziObj.House,
          IsRoot: false,
          NidBase:
            this.results.NidLib.RHouse.NidBase ||
            "00000000-0000-0000-0000-000000000000",
          NidNosaziCode:
            this.results.NidLib.RHouse.NidNosaziCode ||
            "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit:
            this.results.NidLib.RHouse.NidRevisit ||
            "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: nosaziObj.Region,
          Shop: nosaziObj.Shop
        },
        pReportPath: "/Sara8Reports/RptFoul",
        pArchiveDomain: nosaziObj.District,
        pReportDomain: nosaziObj.District,
        pEntityId: this.pEntityId,
        pCurrentDate: false
      }
      this.$services.SC.confirmOutput(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.confirmOutputResult = this.getResponse(data)
          if (this.confirmOutputResult.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            this.checkIsConfirmOutput()
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور گواهی برای ${this.selectedRequest.NidWorkItem} انجام گردید`
            })
          }
        })
        .catch((response) => {
          console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    revokeCertificat () {
      this.showConfirm("آیا از ابطال گواهی اطمینان دارید؟").onOk(() => {
        this.showRevokeReason = true
      })
    },
    confirmRevoke () {
      const payload = {
        pDtoOut: {
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MissFoul",
          OutputNo: null,
          OutputPerTitle: "عدم خلاف",
          ReportName: "/Sara8Reports/RptFoul",
          RevokeDate: new PersianDate().toLocale("en").format("L"),
          RevokeNidUser: this.currentUser.NidUser,
          RevokeUserName: this.getUserDisplayName(),
          RevokeComment: this.canceledComment
        },
        pDomain: this.selectedDistrict
      }
      this.$services.SC.revokeOutput(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.revokeResult = this.getResponse(data)
          if (this.revokeResult.success) {
            await this.log({
              action: this.logActions.revokeCertificate,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال گواهی روی شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
            this.showSuccess("ابطال گواهی با موفقیت انجام شد.")
            this.showRevokeReason = false
            this.checkIsConfirmOutput()
          }
        })
        .catch((response) => {
          console.log(response, "error_response")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async print () {
      const reportPath =
        "/Sara8Reports/RptFoul_Pishnevis"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        TokenKey: "HTTP/1.1"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode
      })
    },

    save () {
      debugger
      let self = this
      let data = {
        pMissFoul: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff
        },

        pNidProc: this.selectedRequest.NidProc
      }
      this.showLoading()
      this.$services.SC.saveMissFoul(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          self.saveResult = this.getResponse(data)
          if (self.saveResult.success) {
            debugger
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
            this.loadData()
            this.showSuccess("ذخیره با موفقیت انجام شد.")
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    }
  }
}
</script>
