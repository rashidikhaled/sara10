<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper title="لیست موافقت اصولی" vertical :padding="false">
      <safa-status :result="requestDetailsRes" />
      <safa-status :result="CopyMovafeghatOsooliRes" />
      <safa-status :result="saveResult" />
      <safa-status :result="CopyFromRevisitToOneOfMovafeghatOsooliRes" />
      <safa-status :result="copyFromParvandehToOneOfMovafeghatOsooliRes" />
      <safa-status :result="reportValidationRes" />
      <safa-status :result="getApprovalTaskRes" />
      <safa-status :result="requestSecRes" />
      <safa-status :result="deleteMovafeghatOsooliRes" />
      <safa-status :result="updateLastRequestStateRes" />
      <safa-status :result="loadOneMovafeghatOsooliFromListRes" />
      <safa-status :result="copyFromMojazMovafeghatOsooliToOneOfMovafeghRes" />
      <safa-status :result="confirmOutputResult" />

      <fit>
        <safa-tabs
          v-model="activeTab"
          height="100%"
          class="fit"
          :padding="false"
        >
          <template v-slot:tabs>
            <tab-menu name="list" label="لیست" />
            <tab-menu
              name="details"
              label="جزئیات موافقت اصولی"
              v-if="isShowNewTab"
            />
          </template>
          <tab-content name="list">
            <UList
              @registerSecretariatInfo="registerSecretariatInfo"
              :cboSecOptions="requestSecList"
              :detaileModel="detaileModel"
              :m="mode"
              @onEmitopenNewTab="openNewTab"
              @rowdbclick="dbclick"
              @rowClick="rowClick"
              :isNew="isNew"
              :formKey="formKey"
              :title="title"
              :name="name"
              :forceReadonly="forceReadonly"
              ref="agrSpeRef"
            />
          </tab-content>
          <tab-content name="details">
            <UDetails
              v-model="detaileModelDetails"
              :m="mode"
              :engineerInfo="engineerInfo"
              :isNew="isNew"
              ref="detailsTab"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <FormActions
          v-if="activeTab === 'details'"
          :m="mode"
          @edit="isEditable = true"
          @cancel="cancelObj"
          @save="saveObj"
        >
          <btn-default
           label="کپی از بازدید"
            @click="btncopyFromRevisit"
            v-show="ulistDbClicked"
             />
          <btn-default
            label="کپی از تشکیل پرونده"
            @click="btncopyFromParvandeh"
            v-show="ulistDbClicked"
          />
          <btn-default
            label="کپی از مجاز موافقت اصولی"
            @click="btnCopyFromMojazMovafeghatOsooli"
          />
          <btn-default label="چاپ پیش نویس" @click="btnReportValidation"  :disable="showPishnevis" />
          <btn-default label="صدور گواهی" @click="certificatIssuance"  :disable="showPishnevis"/>
        </FormActions>

        <div class="row q-gutter-sm" v-if="activeTab === 'list'">
          <btn-default
           label="جدید"
            @click="openNewDetails"

            />
          <btn-default label="کپی موافقت اصولی" @click="btnCopyClick" />
          <btn-default label="حذف موافقت اصولی" @click="btndelete" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import UList from "./partials/UList.vue"
import UDetails from "./partials/UDetails.vue"
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js"
export default {
  route: "/shahrsazi/movafeghat-osooli-list",
  data () {
    return {
      title: "لیست موافقت اصولی",
      formKey: "8a5bde21-9221-43f4-9d16-ace2a8e41c1f",
      name: "UMovafeghatOsooliListTabs",
      main: true,

      // Cond
      IsLoadedFromHistory: false,
      showPishnevis: false,
      pIsPishnevis: false,

      // combo
      requestSecList: [],
      // activeTab
      activeTab: "list",

      // res
      requestDetailsRes: null,
      CopyMovafeghatOsooliRes: null,
      saveResult: null,
      CopyFromRevisitToOneOfMovafeghatOsooliRes: null,
      copyFromParvandehToOneOfMovafeghatOsooliRes: null,
      reportValidationRes: null,
      getApprovalTaskRes: null,
      requestSecRes: null,
      deleteMovafeghatOsooliRes: null,
      updateLastRequestStateRes: null,
      loadOneMovafeghatOsooliFromListRes: null,
      copyFromMojazMovafeghatOsooliToOneOfMovafeghRes: null,
      confirmOutputResult: null,

      // var
      MaxPriority: null,
      IsLoadDeletedNosaziCode: false,
      isShowNewTab: false,
      isNew: false,
      ulistDbClicked: false,
      engineerInfo: [],
      requestResult: null,
      detaileModel: {
        Base_Attachment: [],
        Base_Bezel: [],
        Base_BuildingInfo: {
          CI_CreateDesign: 0,
          CreateYearTo: "",
          CI_StableStatus: 0,
          StartDate: null,
          CreateYearFrom: "",
          CI_HistoricalStatus: 0,
          EndDate: null,
          AllowableDensityLicence: "",
          RampArea: "",
          BusyArea: "",
          UpperHeight: "",
          InfrastructureArea: "",
          DownerHeight: "",
          LightfastArea: "",
          Height: null,
          CI_BuildingPosition: 0,
          Defilade: null,
          CI_RoofType: 0,
          CommercialGapDepth: null,
          MultiBuildingToftImpartArea: null
        },
        Base_CommonEstate: {
          CI_BuildingStep: 0,
          CI_HouseUser: 0,
          CI_ViewCode: 0,
          ViewArea: "",
          CommercialGapWidth: null

        },
        Base_Door: [],
        Base_Front: [],
        Base_Gap: [],
        Base_Installation: [],
        Base_OtherEquipment: [],
        Base_Parking: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Wall: [],
        ErrorResult: {},
        NosaziCodeType: {},
        Sh_MovafeghatOsooli: {
          ControlComments: "",
          Comments: "",
          CertificateNo: "",
          CertificateDate: null

        },
        Sh_MovafeghatOsooli_List: []
      },
      detaileModelDetails: {
        Base_Attachment: [],
        Base_Bezel: [],
        Base_BuildingInfo: {
          CI_CreateDesign: 0,
          CreateYearTo: "",
          CI_StableStatus: 0,
          StartDate: null,
          CreateYearFrom: "",
          CI_HistoricalStatus: 0,
          EndDate: null,
          AllowableDensityLicence: "",
          RampArea: "",
          BusyArea: "",
          UpperHeight: "",
          InfrastructureArea: "",
          DownerHeight: "",
          LightfastArea: "",
          Height: null,
          CI_BuildingPosition: 0,
          Defilade: null,
          CI_RoofType: 0,
          CommercialGapDepth: null,
          MultiBuildingToftImpartArea: null
        },
        Base_CommonEstate: {
          CI_BuildingStep: 0,
          CI_HouseUser: 0,
          CI_ViewCode: 0,
          ViewArea: "",
          CommercialGapWidth: null

        },
        Base_Door: [],
        Base_Front: [],
        Base_Gap: [],
        Base_Installation: [],
        Base_OtherEquipment: [],
        Base_Parking: [],
        Base_SupplyParking: [],
        Base_Using: [],
        Base_Wall: [],
        ErrorResult: {},
        NosaziCodeType: {},
        Sh_MovafeghatOsooli: {
          ControlComments: "",
          Comments: "",
          CertificateNo: "",
          CertificateDate: null

        },
        Sh_MovafeghatOsooli_List: []
      },
      selectedRow: null
    }
  },
  mixins: [baseFormMixin],
  components: {
    UList,
    UDetails
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    setModePishnevis () {
      this.showPishnevis = this.detaileModel.Sh_MovafeghatOsooli_List[0]?.NidBase.toUpperCase() === this.selectedRow?.data?.NidBase.toUpperCase() ?? true
    },
    cancelObj () {
      this.isEditable = false
      this.loadOneMovafeghatOsooliFromList()
    },
    openNewTab () {
      this.isShowNewTab = true
      this.activeTab = "details"
      this.isNew = true
    },
    openNewDetails () {
      this.ulistDbClicked = false
      this.isShowNewTab = true
      this.activeTab = "details"
      this.isNew = true
      this.loadOneMovafeghatOsooliFromList()
    },
    dbclick (e) {
      this.ulistDbClicked = true
      this.selectedRow = e
      this.isShowNewTab = true
      this.activeTab = "details"
      this.isNew = false
      this.loadOneMovafeghatOsooliFromList()
    },
    rowClick (e) {
      this.selectedRow = e
      // this.setModePishnevis()
    },
    async loadObj () {
      this.showLoading()
      const payload = {
        pIsLoadDeletedNosaziCode: this.IsLoadDeletedNosaziCode,
        pNidProc: this.selectedRequest.NidProc
      }

      try {
        const { data } = await this.$services.SC.getShMovafeghatOsooliList(payload)
        this.requestDetailsRes = this.getResponse(data)
        if (this.requestDetailsRes.success) {
          this.detaileModel = this.requestDetailsRes.data
          this.MaxPriority =
            this.requestDetailsRes.data.Sh_MovafeghatOsooli_List.reduce(
              (max, x) =>
                x.PriorityMovafeghatOsooli > max
                  ? x.PriorityMovafeghatOsooli
                  : max,
              this.requestDetailsRes.data.Sh_MovafeghatOsooli_List[0]
                .PriorityMovafeghatOsooli
            )
          this.loadRequestSec()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async loadRequestSec () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pEumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value
      }

      try {
        const { data } = await this.$services.SI.loadRequestSec(payload)
        this.requestSecRes = this.getResponse(data)
        if (this.requestSecRes.success) {
          const _l = this.requestSecRes?.data?.Sh_RequestSec_List ?? []
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
    async loadOneMovafeghatOsooliFromList () {
      this.setModePishnevis()
      this.showLoading()
      // "cbba1528-d64c-4690-b03c-ec07d0b0c931"
      const payLoad = {
        pNidBase: this.selectedRow?.data?.NidBase ?? '00000000-0000-0000-0000-000000000000',
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: this.IsLoadDeletedNosaziCode
      }
      try {
        const { data } = await this.$services.SC.loadOneMovafeghatOsooliFromList(payLoad)
        this.loadOneMovafeghatOsooliFromListRes = this.getResponse(data)
        if (this.loadOneMovafeghatOsooliFromListRes.success) {
          this.detaileModelDetails = this.loadOneMovafeghatOsooliFromListRes?.data
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
    async saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pMovafeghatOsooli: this.detaileModelDetails,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName:
            this.taskInfo.WorkflowTitel,
          WorkflowGuid:
            this.taskInfo.NidWorkflowDeff ||
            "00000000-0000-0000-0000-000000000000"
        }
      }

      try {
        const { data } =
          await this.$services.SC.saveOneMovafeghatOsooliFromList(payload)
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
          this.loadOneMovafeghatOsooliFromList()
          await this.log({
            action: this.logActions.save,
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
    // ثبت دبیرخانه
    async registerSecretariatInfo () {
      if (this.requestSecList.length > 0) {
        return this.showError(
          "درخواست مورد نظر قبلا ثبت دبیرخانه شده است آیا تمایل دارید دوباره ثبت شود؟"
        )
      }
      try {
        this.showLoading()
        const payload = {
          pRequestSec: {
            ErrorResult: null,
            EumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value,
            NidProc: this.selectedRequest.NidProc,
            SecretariatReceiver: null,
            SecretariatSummary: null,
            SecretariatTypeDesc: null,
            Sh_RequestSec: {
              EumSecNoGroup: ClsEnumEumSecNoGroup.MovafeghatOsooli.value,
              NidProc: this.selectedRequest.NidProc,
              NidSec: "00000000-0000-0000-0000-000000000000",
              ReportPath: "/Sara8Reports/RptMovafeghatOsooli",
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
        const { data } = await this.$services.SI.saveRequestSec(payload)
        this.saveRequestSecRes = this.getResponse(data)
        if (this.saveRequestSecRes.success) {
          this.showSuccess("ثبت دبیرخانه با موفقیت انجام شد")
        }
        await this.log({
          action: this.logActions.save,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode
        })
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    // btn
    btnCopyClick () {
      this.showConfirm("آیا از کپی ردیف موافقت اصولی اطمینان دارید؟").onOk(() => {
        this.CopyClosed()
      })
    },
    async CopyClosed () {
      this.showLoading()
      if (!this.selectedRow) {
        return this.showError("لطفا ابتدا یک ردیف را انتخاب کنید")
      }
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pNidBase: this.selectedRow?.data?.NidBase ?? '00000000-0000-0000-0000-000000000000'
      }
      try {
        const { data } = await this.$services.SC.copyMovafeghatOsooli(payload)
        this.CopyMovafeghatOsooliRes = this.getResponse(data)
        if (this.CopyMovafeghatOsooliRes.success) {
          this.showSuccess("کپی با موفقیت انجام شد.")
          this.loadObj()
          this.loadRequestSec()
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    btndelete () {
      this.showConfirm("آیا از حذف موافقت اصولی مطمئن هستید؟").onOk(() => {
        this.deleteMovafeghatOsooli()
      })
    },
    async deleteMovafeghatOsooli () {
      this.showLoading()
      if (!this.selectedRow) {
        return this.showError("لطفا ابتدا یک ردیف را انتخاب کنید")
      }
      const payload = {
        pNidBase: this.selectedRow?.data?.NidBase ?? '00000000-0000-0000-0000-000000000000'
      }
      try {
        const { data } = await this.$services.SC.deleteMovafeghatOsooli(
          payload
        )
        this.deleteMovafeghatOsooliRes = this.getResponse(data)
        if (this.deleteMovafeghatOsooliRes.success) {
          this.loadObj()
          this.loadRequestSec()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    // async updateLastRequestState () {
    //   this.showLoading()
    //   if (!this.selectedRow) {
    //     return this.showError("لطفا ابتدا یک ردیف را انتخاب کنید")
    //   }
    //   const payload = {
    //     pNidProc: this.selectedRequest.NidProc,
    //     pLastRequestState: "ردیف موافقت اصولی حذف شد"
    //   }
    //   try {
    //     const { data } = await this.$services.SC.updateLastRequestState(
    //       payload
    //     )
    //     this.updateLastRequestStateRes = this.getResponse(data)
    //     if (this.updateLastRequestStateRes.success) {
    //       this.showSuccess("حذف با موفقیت انجام شد.")
    //       await this.log({
    //         action: this.logActions.delete,
    //         bizCode: this.value.NidBase,
    //         bizCodeTitle: "NidBase"
    //       })
    //     }
    //   } catch (e) {
    //     console.error(e)
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    btncopyFromRevisit () {
      this.showConfirm(
        "آیا از کپی اطلاعات بازدید به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.copyFromRevisit()
      })
    },
    async copyFromRevisit () {
      this.showLoading()
      const payload = {
        pNidBase_MovafeghatOsooli: this.selectedRow?.data?.NidBase ?? '00000000-0000-0000-0000-000000000000',
        pNidProc: this.selectedRequest.NidProc
      }
      try {
        const { data } =
          await this.$services.SC.copyFromRevisitToOneOfMovafeghatOsooli(
            payload
          )
        this.CopyFromRevisitToOneOfMovafeghatOsooliRes = this.getResponse(data)
        if (this.CopyFromRevisitToOneOfMovafeghatOsooliRes.success) {
          this.showSuccess("اطلاعات بازدید با موفقیت کپی شد.")
          this.loadOneMovafeghatOsooliFromList()
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    btncopyFromParvandeh () {
      this.showConfirm(
        "آیا از کپی اطلاعات تشکیل پرونده به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.copyFromParvandeh()
      })
    },
    async copyFromParvandeh () {
      this.showLoading()
      const payload = {
        pNidBase_MovafeghatOsooli: this.selectedRow?.data.NidBase ?? '00000000-0000-0000-0000-000000000000',
        pNidProc: this.selectedRequest.NidProc
      }
      try {
        const { data } =
          await this.$services.SC.copyFromParvandehToOneOfMovafeghatOsooli(
            payload
          )
        this.copyFromParvandehToOneOfMovafeghatOsooliRes =
          this.getResponse(data)
        if (this.copyFromParvandehToOneOfMovafeghatOsooliRes.success) {
          this.showSuccess("اطلاعات تشکیل پرونده با موفقیت کپی شد.")
          this.loadOneMovafeghatOsooliFromList()
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    btnCopyFromMojazMovafeghatOsooli () {
      this.showConfirm(
        "آیا از کپی اطلاعات مجاز موافقت اصولی به موافقت اصولی اطمینان دارید؟"
      ).onOk(() => {
        this.copyFromMojazMovafeghatOsooli()
      })
    },
    async copyFromMojazMovafeghatOsooli () {
      this.showLoading()
      const payload = {
        pNidBase_MovafeghatOsooli: this.selectedRow?.data?.NidBase ?? '00000000-0000-0000-0000-000000000000',
        pNidProc: this.selectedRequest.NidProc
      }
      try {
        const { data } =
          await this.$services.SC.copyFromMojazMovafeghatOsooliToOneOfMovafeghatOsooli(
            payload
          )
        this.copyFromMojazMovafeghatOsooliToOneOfMovafeghRes =
          this.getResponse(data)
        if (this.copyFromMojazMovafeghatOsooliToOneOfMovafeghRes.success) {
          this.showSuccess("کپی از مجاز موافقت اصولی با موفقیت انجام شد.")
          this.loadOneMovafeghatOsooliFromList()
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async btnReportValidation () {
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pFormName: this.name,
        pIsPishnevis: this.pIsPishnevis,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName:
            this.taskInfo.WorkflowTitel,
          WorkflowGuid:
            this.taskInfo.NidWorkflowDeff ||
            "00000000-0000-0000-0000-000000000000"
        }
      }
      try {
        const { data } = await this.$services.SC.reportValidation(payload)
        this.reportValidationRes = this.getResponse(data)
        if (this.reportValidationRes.success) {
          await this.print(this.reportValidationRes?.data)
          await this.log({
            action: this.logActions.copy,
            bizCode: this.value.NidBase,
            bizCodeTitle: "NidBase"
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    // باید توکنش رو از سرویس بالا بگیره
    async print (tokenkey) {
      const reportPath = "/Sara8Reports/RptMovafeghatOsooli_Pishnevis"
      const queryParams = {
        NidUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        TokenKey: tokenkey
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptMovafeghatOsooli_Pishnevis",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode
      })
    },
    // این از گردشکار میاد ، تو زمل، قدیمی نوشته شده
    // سمت سرا8 شیرازم این دکمه کار نمیکنه
    async certificatIssuance () {
      this.showLoading()
      let selectedNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      const payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_MovafeghatOsooli",
          OutputPerTitle: "موافقت اصولی",
          ReportName: "/Sara8Reports/RptMovafeghatOsooli",
          OutputDate: this.results.Sh_MovafeghatOsooli.CertificateDate,
          OutputNo: this.results.Sh_MovafeghatOsooli.CertificateNo
        },
        pNosaziCode: {
          Apartment: selectedNosaziCode.Apartment,
          Block: selectedNosaziCode.Block,
          Building: selectedNosaziCode.Building,
          CI_City: 0,
          District: selectedNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: selectedNosaziCode.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: selectedNosaziCode.Region,
          Shop: selectedNosaziCode.Region
        },
        pReportPath: "/Sara8Reports/RptMovafeghatOsooli",
        pArchiveDomain: selectedNosaziCode.District,
        pReportDomain: selectedNosaziCode.District,
        pEntityId: 0,
        pCurrentDate: false
      }
      try {
        const { data } = await this.$services.SC.confirmOutput(payload)
        this.confirmOutputResult = this.getResponse(data)
        if (this.confirmOutputResult.success) {
          this.showSuccess("صدور گواهی با موفقیت انجام شد.")
          // this.checkIsConfirmOutput()
          await this.log({
            action: this.logActions.certificateExport,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `صدور گواهی برای ${this.selectedRequest.NidWorkItem} انجام گردید`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    }
    // checkIsConfirmOutput () {
    //   this.showLoading()
    //   const payload = {
    //     pNidProc: this.selectedRequest.NidProc,
    //     pOutputEngTitle: "Output_MovafeghatOsooli"
    //   }
    //   this.$services.SC.checkIsConfirmOutput(payload, {
    //     config: { District: this.selectedDistrict }
    //   })
    //     .then(({ data }) => {
    //       this.checkResult = this.getResponse(data)
    //       if (this.checkResult.success) {
    //         this.checkIsConfirmOutputResult = this.checkResult.data
    //         if (this.checkIsConfirmOutputResult.Sh_Output) {
    //           this.hasSodor = true
    //           this.updateArchiveBizCode(
    //             this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
    //           )
    //         } else {
    //           this.hasSodor = false
    //           this.loadObj()
    //           // this.loadRequestSec()
    //         }
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }

  }
}
</script>
