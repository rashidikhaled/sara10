<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      :title="title"
      :padding="false"
      @load="$emit('load')"
    >
      <safa-status :result="requestSecResult" />
      <safa-status :result="OtherResult" />
      <safa-status :result="saveResult" />
      <safa-status :result="checkResult" />
      <safa-status :result="confirmOutputResult" />
      <safa-status :result="revokeResult" />
      <safa-status :result="result" />

      <!-- :userLoginId="getNidUser()"
      :userLoginName="currentUser.UserName" -->
      <!-- :bizCode="checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode" -->
      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        :options="archiveOptions"
        v-if="hasSodor"
      />

      <safa-tabs v-else v-model="activeTab" fit>
        <template v-slot:tabs>
          <tab-menu name="showSpecificTab" label=" مشخصات" />
          <tab-menu name="showMojavezTab" label="مجوزها" />
          <tab-menu name="showUserTab" label="کاربری ها و پیش آمدگی ها" />
          <tab-menu name="showTarhTab" label="طرح تفصیلی و کروکی" />
          <tab-menu name="showCommentTab" label="توضیحات" />
        </template>
        <tab-content name="showSpecificTab">
          <ParvanehSpecification
          :cboSecOptions="requestSecList"
          :results="results"
          :m="mode"
          ref="parvanehSpecificationRef"/>
        </tab-content>
        <tab-content name="showMojavezTab" :padding="false">
          <ParvanehMojavez :results="results" :m="mode"  />
        </tab-content>
        <tab-content name="showUserTab" :padding="false">
          <ParvanehUser :results="results" />
        </tab-content>
        <tab-content name="showTarhTab" :padding="false">
          <ParvanehTarh :m="mode" :results="results" />
        </tab-content>
        <tab-content name="showCommentTab">
          <ParvanehComment
            :results="results"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :showEditButton="!hasSodor"
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="cancel"
        >
          <template #after>
            <btn-save
              @click="secregistration"
              label="ثبت دبیرخانه"
              v-show="!hasSodor"
            />
            <btn-default
              @click="print"
              label=" چاپ پیش نویس"
              v-show="!hasSodor && !isEditable"
            />
            <!-- صدور گواهی در مشهد وجود ندارد -->
            <btn-default
              @click="certificatIssuance"
              label="صدور گواهی"
              v-show="!hasSodor && !isEditable"
            />
            <!-- این کلید در سرا 8 مشهد هم عملیاتی انجام نمی دهد در حال حاضر -->
            <!-- <btn-default label="درخواست" v-if="!hasSodor"/> -->

            <btn-default
              label="ابطال گواهی"
              @click="revokeCertificat"
              v-show="hasSodor"
            />
            <btn-default label="چاپ" @click="print" v-show="hasSodor" />
            <btn-default
              v-show="activeTab === 'showTarhTab' && !isEditable"
              label="مشاهده کروکی"
              @load="loadData"
              @click="showCroquie = true"
            />
            <btn-default
              v-show="activeTab === 'showTarhTab' && isEditable"
              label="رسم کروکی"
              @load="loadData"
              @click="showCroquie = true"
            />
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
            v-model="canceledComment"
          />
          <div class="q-gutter-sm q-pa-sm">
            <btn-default label="ابطال" @click="confirmRevoke" />

            <btn-default label="انصراف" @click="showRevokeReason = false" />
          </div>
        </fit>
      </safa-popup>
      <safa-popup
        v-model="showCroquie"
        title="رسم کروکی"
        width="980px"
        height="730px"
      >
        <UDrawCroque
          v-model="results"
          :m="isEditable"
          @cancel="showCroquie = false"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import ParvanehUser from "./partials/ParvanehUser.vue"
import ParvanehSpecification from "./partials/ParvanehSpecification.vue"
import ParvanehMojavez from "./partials/ParvanehMojavez.vue"
// import ParvanehKoroki from './partials/ParvanehKoroki.vue'
import ParvanehComment from "./partials/ParvanehComment.vue"
import ParvanehTarh from "./partials/ParvanehTarh.vue"
import UDrawCroque from "./partials/UDrawCroque"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"

export default {
  route: "/parvaneh",
  mixins: [baseFormMixin],
  components: {
    ParvanehUser,
    ParvanehSpecification,
    ParvanehMojavez,
    // ParvanehKoroki,
    ParvanehComment,
    ParvanehTarh,
    UDrawCroque
  },
  data: function () {
    return {
      title: "پروانه",
      formKey: "F114B2AF-E873-472F-B62C-79D38B6131BB",
      name: "Parvaneh",
      main: true,
      requestSecList: [],
      workflowCompatible: true,
      hasSodor: false,
      requestSecResult: null,
      OtherResult: null,
      requestSecObj: null,
      activeTab: "showSpecificTab",
      showRevokeReason: false,
      canceledComment: "",
      results: {
        Sh_ExportParvaneh: {},
        Base_CommonEstate: {},
        Base_HouseInfo: {},
        Base_Edge: [],
        Base_ShahrsaziArchive: [],
        Base_Commitment: [],
        Base_ControllerInfo: [],
        Base_Using: [],
        Base_Front: [],
        Sh_BaroKaf: {},
        Sh_MapControl: {},
        Base_Letter: [],
        Base_PlanMosavab: [],
        Base_PlanMojaz: [],
        Base_PlanForWork: [],
        NidLib: {
          RHouse: {}
        }
      },
      saveResult: null,
      buildingSettings: {},
      checkIsConfirmOutputResult: null,
      checkResult: null,
      confirmOutputResult: null,
      revokeResult: null,
      result: null,
      archiveWrapperList: [],
      showCroquie: false,
      archiveBizCode: "",
      archiveOptions: {
        showOnlyStates: null,
        showTree: true
      }
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore").district.ApprovalCertificate
    },
    passedProps () {
      return {
        m: this.mode,
        results: this.results
      }
    },
    isShowBtnSodorGavahi () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("btnSodorGavahi")
    },
    pEntityId () {
      if (!this.buildingSettings || !this.buildingSettings.ShahrsaziSettings) {
        return -1
      }
      return this.buildingSettings.ShahrsaziSettings.ArchiveParvanehEntityId
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
      this.checkIsConfirmOutput()
    } else {
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
    }
  },
  beforeMount () {
    // eslint-disable-next-line no-undef
    archiveStore.showTree = true
  },
  beforeDestroy () {
    // eslint-disable-next-line no-undef
    // archiveStore.showOnlyStates = null
    this.archiveOptions.showOnlyStates = null
  },
  methods: {
    checkIsConfirmOutput () {
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pOutputEngTitle: "Output_Parvaneh"
      }
      this.$services.SC.checkIsConfirmOutput(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          this.checkResult = this.getResponse(data)
          if (this.checkResult.success) {
            this.checkIsConfirmOutputResult = this.checkResult.data
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

    async loadData () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      try {
        const { data } = await this.$services.SC.loadParvaneh(payload, {
          config: { District: this.selectedDistrict }
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
      } finally {
        this.hideLoading()
      }
    },
    async loadRequestSec () {
      try {
        this.showLoading()
        const payLoad = {
          pNidProc: this.selectedRequest.NidProc,
          pEumSecNoGroup: ClsEnumEumSecNoGroup.Parvaneh.value // 1
        }
        const { data } = await this.$services.SI.loadRequestSec(payLoad, {
          config: {
            District: this.selectedDistrict
          }
        })
        this.requestSecResult = this.getResponse(data)
        if (this.requestSecResult.success) {
          this.requestSecObj = this.requestSecResult.data
          const _l = this.requestSecResult?.data?.Sh_RequestSec_List ?? []
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
            this.$refs.parvanehSpecificationRef.selectedSec = this.requestSecList[0].ID
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async secregistration () {
      debugger
      try {
        this.showLoading()
        const payload = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: ClsEnumEumSecNoGroup.Parvaneh.value,
            // EumSecNoGroup: 1,
            NidProc: this.selectedRequest.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.Parvaneh.value,
              // EumSecNoGroup: 1,
              NidProc: this.selectedRequest.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/Sara8Reports/RptLicence",
              SecDate: null,
              SecNo: null
            },
            Sh_RequestSec_List: null
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: this.selectedRequest.NidWorkflowDeff,
            WorkflowGuid: this.selectedRequest.NidWorkflowDeff
          }
        }
        const { data } = await this.$services.SI.saveRequestSec(
          payload, {
            config: { District: this.selectedDistrict }
          }
        )
        this.OtherResult = this.getResponse(data)
        debugger
        if (this.OtherResult.success) {
          this.showSuccess("ثبت دبیرخانه با موفقیت انجام شد")
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

    // sodar gavahi
    certificatIssuance () {
      this.showLoading()
      const nosaziObj = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      const payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.currentUser.UserName,
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_Parvaneh",
          OutputDate: new PersianDate().toLocale("en").format("L"),
          OutputNo: this.results.Sh_ExportParvaneh.CertificateNo,
          OutputPerTitle: "پروانه",
          ReportName: "/Sara8Reports/RptLicence"
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
        pReportPath: "/Sara8Reports/RptLicence",
        pArchiveDomain: nosaziObj.District,
        pReportDomain: nosaziObj.District,
        pEntityId: this.pEntityId,
        pCurrentDate: true
      }
      this.$services.SC.confirmOutput(payload, {
        config: { District: this.selectedDistrict }
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
          console.log(" error ...", response)
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
          OutputEngTitle: "Output_Parvaneh",
          OutputNo: null,
          OutputPerTitle: "پروانه",
          ReportName: "/Sara8Reports/RptLicence",
          RevokeDate: new PersianDate().toLocale("en").format("L"),
          RevokeNidUser: this.getNidUser(),
          RevokeUserName: this.currentUser.UserName,
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
      const reportPath = "/Sara8Reports/RptLicence"
      const queryParams = {
        NidProc: this.selectedRequest.NidProc,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        TokenKey: "HTTP/1.1",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.confirmOutput,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    save () {
      let self = this
      let payload = {
        pParvaneh: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        },

        pNidProc: this.selectedRequest.NidProc
      }
      this.showLoading()
      this.$services.SC.saveParvaneh(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          self.saveResult = this.getResponse(data)
          if (self.saveResult.success) {
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
            this.results.NidLib = false
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
    cancel () {
      this.isEditable = false
      this.loadData()
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    // updateArchiveBizCode (bizCode) {
    //   this.setArchiveStates()
    //   // eslint-disable-next-line no-undef
    //   archiveStore.bizCode = `${bizCode.toUpperCase()}`
    // },
    setArchiveStates () {
      /* this.loadNidWorkItems().then((result) => {
        console.log('result', result)
        console.log('before change', archiveStore.showOnlyStates)
        /!* var states = new Set()
        result.map(x => ({ key: x, isSelected: x === `${this.taskInfo.NidWorkItem}` })).forEach(x => {
          states.add(x)
        })
        console.log('has: ', states.has({ key: `${this.taskInfo.NidWorkItem}`, isSelected: true }))
        states.add({ key: `${this.taskInfo.NidWorkItem}`, isSelected: true }) *!/
        archiveStore.showOnlyStates = [{ key: `${this.taskInfo.NidWorkItem}`, isSelected: true }]
        // archiveStore.showOnlyStates = [`${this.taskInfo.NidWorkItem}`]
        // archiveStore.showOnlyStates = null
        console.log('bizcode', archiveStore.bizCode)
        console.log('after change', archiveStore.showOnlyStates)
        // archiveStore.showOnlySelected = true
        // if (archiveStore.stateItems && archiveStore.stateItems.length > 0) { archiveStore.stateItems[0].isSelected = true }
      })
    } */

      // archiveStore.showOnlyStates = [{ key: `${this.taskInfo.NidWorkItem}`, isSelected: true }]
      // archiveStore.showOnlyStates = [{ key: `10018029`, isSelected: true }]
      // eslint-disable-next-line no-undef
      /* archiveStore.showOnlyStates = [
        { key: `${this.taskInfo.NidWorkItem}`, isSelected: false }
      ] */
      this.archiveOptions.showOnlyStates = [
        { key: `${this.taskInfo.NidWorkItem}`, isSelected: false }
      ]
      // archiveStore.showOnlyStates = null
      /* console.log('bizcode', archiveStore.bizCode)
      console.log('after change', archiveStore.showOnlyStates) */
    }
  }
}
</script>
