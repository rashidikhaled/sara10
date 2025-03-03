<template>
  <fit>
    <safa-status :result="saveResult" />
    <safa-status :result="getDutyFicheSubsRes" />
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="loadCancelFiches"
        cdcName="loadCancelFiches"
        label="عدم نمایش فیش های باطله"
      />
    </div>
    <fit>
      <safa-splitter v-model="gridSplitter" class="fit" margin="0">
        <template v-slot:before>
          <fit>
            <safa-grid
              v-model="fichesResults.DutyFichesPayCount"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :detailCellRendererParams="detailCellRendererParams"
              :masterDetail="true"
              :allowSelectionWhenReadonlyMode="true"
              cdcName="DutyFichesPayCount"
              fit
              height="100%"
              helper="agDutyFich1"
              m="r"
              max-height="100%"
              min-height="200px"
              paginate
              :getRowClass="getRowClass"
              title="فیش ها"
              :suppressRowClickSelection="false"
              @selection:changed="selectedRowHandler"
            />
            <!-- :rowGroupPanelShow="'always'" -->
            <!-- :show-selected-checkbox="true" -->
            <!-- :allowMultipleSelection="true" -->
            <!-- <safa-datatable
              :allowCopy="false"
              helper="dutyFich1"
              :hideHeader="true"
              v-model="fichesResults.DutyFichesPayCount"
              @row-click="click"
              fit
              max-height="100%"
              height="100%"
              minHeight="100%"
              title="فیش ها"
              cdcName="DutyFichesPayCount"
            /> -->
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              v-model="getDutyFicheSubsResult.DutyFicheSub"
              :allowCopy="false"
              :hideHeader="true"
              cdcName="DutyFicheDetails"
              fit
              height="100%"
              helper="dutyFich2"
              max-height="100%"
              minHeight="100%"
              title="جزئیات فیش ها"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>

    <safa-popup
      v-model="isShowPaymentDetailsModal"
      height="300px"
      title="مشخصات فیش پرداختی"
      width="300px"
    >
      <DutyFichePaymentDetails
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :nosaziSetting="nosaziSetting"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowPaymentDetailsModal2"
      height="300px"
      title="مشخصات فیش پرداختی"
      width="300px"
    >
      <DutyFichePaymentDetails2
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche2="reloadDutyFiche2"
      />
    </safa-popup>

    <safa-popup
      v-model="isShowPoseSeectionModal"
      height="300px"
      title="انتخاب کردن پوز"
      width="300px"
    >
      <DutyFichePoseSelection
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup v-model="isShowPoseHistoryModal" title="تاریخچه پرداخت با پوز">
      <DutyFichePoseHistory
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowRefundSpecModal"
      title="مشخصات فیش استرداد"
      width="400px"
    >
      <DutyFicheRefundSpec
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowBuildingFicheModal"
      title="فیش های ملک"
      @hide="isShowBuildingFicheModal = false"
      @onCloseModal="isShowBuildingFicheModal = false"
    >
      <DutyFicheBuilding
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup v-model="isShowAcceptedFicheModal" title="فیش های تأیید بانک">
      <DutyFicheAccepted
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :results="results"
        :selectedRow="selectedRow"
        :title="title"
        @reloadDutyFiche="reloadDutyFiche"
      />
    </safa-popup>
    <safa-popup v-model="isShowReloadFicheModal" title="فیش های حذف شده">
      <form-wrapper :padding="false">
        <DutyFicheReload
          ref="deletedList"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :results="results"
          :selectedRow="selectedRow"
          :title="title"
          @closeReloadModal="closeReloadModal"
          @reloadDutyFiche="reloadDutyFiche"
        />
        <template v-slot:footer>
          <btn-default label="بازآوری" @click="reloadDeletedFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup v-model="isShowRevokedFicheModal" title="فیش های ابطال شده">
      <form-wrapper :padding="false">
        <DutyFicheRevokedList
          ref="revokList"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :results="results"
          :selectedRow="selectedRow"
          :title="title"
          @closeRevokedFichesModal="closeRevokedFichesModal"
          @reloadDutyFiche="reloadDutyFiche"
        />
        <template v-slot:footer>
          <btn-default label="بازآوری" @click="reloadRevokedFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="showRevokeReason"
      height="280px"
      title="توضیحات ابطال فیش پرداختی"
      width="500px"
    >
      <fit>
        <text-template
          v-model="canceledComment"
          class="fit q-pa-sm"
          label="دلیل ابطال"
        />
        <div class="q-gutter-sm q-pa-sm">
          <btn-default label="ابطال" @click="confirmRevoke" />
          <btn-default label="انصراف" @click="showRevokeReason = false" />
        </div>
      </fit>
    </safa-popup>
  </fit>
</template>
<script>
import DutyFichePaymentDetails from "./DutyFichePaymentDetails.vue"
import DutyFichePaymentDetails2 from "./DutyFichePaymentDetails2.vue"
import DutyFichePoseSelection from "./DutyFichePoseSelection.vue"
import DutyFichePoseHistory from "./DutyFichePoseHistory.vue"
import DutyFicheRefundSpec from "./DutyFicheRefundSpec.vue"
import DutyFicheBuilding from "./DutyFicheBuilding.vue"
import DutyFicheAccepted from "./DutyFicheAccepted.vue"
import DutyFicheReload from "./DutyFicheReload.vue"
import DutyFicheRevokedList from "./DutyFicheRevokedList.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import converter from "xml-js"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  name: "DutyFiche",
  mixins: [baseFormMixin],
  data: function () {
    return {
      gridSplitter: 60,
      fichesResult: {},
      getDutyFicheSubsResult: { DutyFicheSub: [] },
      selectedRow: null,
      saveResult: null,
      loadCancelFiches: true,
      canceledComment: "",
      isShowPaymentDetailsModal: false,
      showRevokeReason: false,
      isShowPoseSeectionModal: false,
      isShowPoseHistoryModal: false,
      isShowPaymentDetailsModal2: false,
      isShowRefundSpecModal: false,
      isShowBuildingFicheModal: false,
      isShowAcceptedFicheModal: false,
      isShowReloadFicheModal: false,
      isShowRevokedFicheModal: false,
      getDutyFicheSubsRes: null,
      nosaziSetting: null,
      // disabledAcceptBtn: true,
      // disabledAcceptPoseBtn: true,
      // disabledPoseHistoryBtn: true,
      // disabledIssuanceBtn: true,
      disabledRevokeBtn: true,
      // disabledRefundBtn: true,
      // disabledDeleteBtn: true,
      disabledInstallmentBtn: true,
      // disabledPrintFicheBtn: true
      // disabledPrintBrazBtn: true
      // disabledCalcFactorBtn: true,
      // disabledReloadBtn: false,
      nidFk: "00000000-0000-0000-0000-000000000000",
      fichesResults: { DutyFichesPayCount: [], DutyFicheSub: [] },
      detailCellRendererParams: {
        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
          // rowSelection: 'multiple',
          // suppressRowClickSelection: true,
          // enableRangeSelection: true,
          pagination: true,
          detailRowAutoHeight: true,
          detailRowHeight: 400,
          // paginationAutoPageSize: true,
          defaultColDef: {
            sortable: true,
            flex: 1
          },
          columnDefs: [
            { field: "title", title: "عنوان", width: "150px" },
            { field: "amount", title: "مقدار", width: "200px" },
            { field: "comment", title: "توضیحات", width: "auto" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: (params) => {
          setTimeout(() => {
            if (params.data.OtherFields) {
              let arrayOfClsLog = converter.xml2json(params.data.OtherFields, {
                compact: true,
                ignoreDoctype: true,
                ignoreCdata: true
              })
              const clsLog = JSON.parse(arrayOfClsLog)
              if (clsLog.ArrayOfClsLog && clsLog.ArrayOfClsLog.ClsLog) {
                const list = clsLog.ArrayOfClsLog.ClsLog
                let logDetail = list.map((m) => {
                  return {
                    title: m.Subject._text || "",
                    amount: m.Value._text || "",
                    comment: m.Comment._text || ""
                  }
                })
                params.successCallback(logDetail)
              }
            }
          }, 1000)
        }
      }
    }
  },
  props: {
    results: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  components: {
    DutyFichePaymentDetails,
    DutyFichePaymentDetails2,
    DutyFichePoseSelection,
    DutyFichePoseHistory,
    DutyFicheRefundSpec,
    DutyFicheBuilding,
    DutyFicheAccepted,
    DutyFicheReload,
    DutyFicheRevokedList
  },
  async created () {
    const result = await this.loadFormSetting("nosaziSettings", {
      nidProc: GLOBAL_SETTINGS_GUID
    })
    this.nosaziSetting = result
    //  console.log('nosaziSettings',await this.loadFormSetting('nosaziSettings'));
    //  console.log('SenfiSettings',await this.loadFormSetting('SenfiSettings'));
    //  console.log('commissionSettings',await this.loadFormSetting('commissionSettings'));
    //  console.log('BuildingSettings',await this.loadFormSetting('BuildingSettings')); // تنظیمات شهرسازی
    //  console.log('Sharsazi-PersonalSetting',await this.loadFormSetting('Sharsazi-PersonalSetting')); // تنظیمات شخصی
  },
  computed: {
    isDisableFichButtonsWithStatusCondition () {
      if (!this.selectedRow) return true // true => disable buttons
      if (
        this.selectedRow.EumDutyFicheStatus !== 4 &&
        this.selectedRow.EumDutyFicheStatus !== 1
      ) {
        return false
      } // false => enable buttons
      return true // default is disable
    },
    isDisableBtn () {
      if (!this.selectedRow) return true // true => disable buttons
      const condition =
        this.selectedRow.EumDutyFicheStatus === 4 &&
        this.selectedRow.EumDutyFicheStatus === 1
      if (condition || this.selectedRow.EumDutyFicheStatus === 0) {
        return true
      }
      return true
    },
    isDisableFichButtons () {
      return !this.selectedRow
    },
    isDisablerefund () {
      if (!this.selectedRow) return true // true => disable buttons
      const condition =
        this.selectedRow.EumDutyFicheStatus === 4 &&
        this.selectedRow.EumDutyFicheStatus === 1
      if (condition || this.selectedRow.EumDutyFicheStatus !== 0) {
        return false
      }
      return true
    }
  },

  methods: {
    report () {
      const reportPath =
        "?ReportPath=/Sara8Reports/RptMafasaHesab&ReportParameter="
      const queryParams = {
        NidFK: this.nidFk,
        NIdUser: this.getNidUser(),
        NidFiche: this.selectedRow.NidFiche,
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
    },
    reloadRevokedFiche () {
      this.$refs.revokList.reloadRevokedFiche()
    },
    reloadDeletedFiche () {
      this.$refs.deletedList.reloadDeletedFiche()
    },
    loadData () {
      this.showLoading()
      let payLoad = {
        pNidList: this.results.NidList,
        pSysCiDutyType: 1,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            let pageModel = res.data

            const getFicheStatusClass = (status) => {
              switch (status) {
                case 0:
                  return "dutyFichePermanent"
                case 1:
                  return "dutyFicheConfirm"
                case 2:
                  return "dutyFicheCancel"
                case 3:
                  return "dutyFicheTempExport"
                case 4:
                  return "dutyFicheConfirmBank"
                case 5:
                  return "dutyFicheRevoke"
                default:
                  return ""
              }
            }

            pageModel.DutyFichesPayCount = [
              ...(pageModel.DutyFichesPayCount || [])
            ].map((x) => ({
              ...x,
              class: getFicheStatusClass(x.EumDutyFicheStatus),
              isSelectedNode: false
            }))

            this.fichesResults = pageModel

            /*
              if (
                list.DutyFichesPayCount &&
                list.DutyFichesPayCount.length > 0
              ) {
                this.fichesResults.DutyFichesPayCount.map((x) => {
                  if (x.EumDutyFicheStatus === 0) {
                    x.class = 'dutyFichePermanent'
                  } else if (x.EumDutyFicheStatus === 1) {
                    x.class = 'dutyFicheConfirm'
                  } else if (x.EumDutyFicheStatus === 2) {
                    x.class = 'dutyFicheCancel'
                  } else if (x.EumDutyFicheStatus === 3) {
                    x.class = 'dutyFicheTempExport'
                  } else if (x.EumDutyFicheStatus === 4) {
                    x.class = 'dutyFicheConfirmBank'
                  } else if (x.EumDutyFicheStatus === 5) {
                    x.class = 'dutyFicheRevoke'
                  }
                  return x
                })
              } */

            console.log(
              "DutyFichesPayCount list .....",
              this.fichesResults.DutyFichesPayCount
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })

        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    selectedRowHandler (e) {
      this.selectedRow = null
      this.$nextTick(() => {
        const rows = e.api.getSelectedRows()
        if (rows.length > 0) {
          this.selectedRow = rows[0]
          this.getDutyFicheSubs()
        }
      })
    },

    async getDutyFicheSubs () {
      try {
        this.showLoading()
        const payload = { pNidFiche: this.selectedRow.NidFiche }
        const { data } = await this.$services.SB.getDutyFicheSubs(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.getDutyFicheSubsRes = this.getResponse(data)
        if (this.getDutyFicheSubsRes.success) {
          this.getDutyFicheSubsResult = this.getDutyFicheSubsRes.data
          let dutyFicheSub = this.getDutyFicheSubsResult.DutyFicheSub
          if (dutyFicheSub && dutyFicheSub.length > 0) {
            this.nidFk = dutyFicheSub[0].NidFK
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidFiche,
            bizCodeTitle: "NidFiche"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    accept () {
      this.showConfirm("آیا از تأیید فیش انتخاب شده اطمینان دارید؟").onOk(
        () => {
          this.isShowPaymentDetailsModal = true
        }
      )
    },
    reloadDutyFiche () {
      if (this.isShowPoseSeectionModal) {
        this.isShowPoseSeectionModal = false
      }
      if (this.isShowPaymentDetailsModal) {
        this.isShowPaymentDetailsModal = false
      }
      if (this.isShowPoseHistoryModal) {
        this.isShowPoseHistoryModal = false
      }
      if (this.isShowPaymentDetailsModal2) {
        this.isShowPaymentDetailsModal2 = false
      }
      if (this.isShowRefundSpecModal) {
        this.isShowRefundSpecModal = false
      }
      this.loadData()
    },
    reloadDutyFiche2 (value) {
      this.isShowPaymentDetailsModal2 = false
      this.saveResult = value
      this.loadData()
    },
    acceptWithPose () {
      this.isShowPoseSeectionModal = true
    },
    getRowClass (params) {
      let row = params.data
      // if (row.EumDutyFicheStatus === 0) return "bg-green-3"
      if (row.EumDutyFicheStatus === 1) return "bg-green-2"
      if (row.EumDutyFicheStatus === 2) return "bg-pink-2"
      if (row.EumDutyFicheStatus === 3) return "bg-grey-1"
      if (row.EumDutyFicheStatus === 4) return "bg-green-3"
      if (row.EumDutyFicheStatus === 5) return "bg-grey-3"

      return { background: "transparent" }
    },
    poseHistory () {
      this.isShowPoseHistoryModal = true
    },
    acceptBank () {
      if (this.selectedRow !== null) {
        this.showLoading()
        const payload = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 1,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService(payload, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche"
              })

              this.loadData()
            }
          })
          .catch((err) => {
            console.error(err)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    acceptBank2 () {
      if (this.selectedRow !== null) {
        this.showLoading()
        const payload = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 1,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService2(payload, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche"
              })
              this.loadData()
            }
          })
          .catch((err) => {
            console.error(err)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    acceptTempBank () {
      if (this.selectedRow !== null) {
        this.isShowPaymentDetailsModal2 = true
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    revoke () {
      if (this.selectedRow !== null) {
        this.showConfirm("آیا از ابطال فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.showRevokeReason = true
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },

    confirmRevoke () {
      const payload = {
        pNidFiche: this.selectedRow.NidFiche,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 1,
        IsRefund: false,
        pCanceledComment: this.canceledComment
      }

      this.showLoading()
      this.$services.SB.cancelFiche(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("فیش انتخاب شده با موفقیت باطل شد.")
            this.showRevokeReason = false
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche"
            })

            this.loadData()
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    refund () {
      if (this.selectedRow !== null) {
        this.showConfirm("آیا از استرداد فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.isShowRefundSpecModal = true
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    deleteFiche () {
      this.showConfirm("آیا از حذف فیش انتخاب شده اطمینان دارید؟").onOk(() => {
        if (this.selectedRow !== null) {
          this.showLoading()
          const payload = {
            pNidFiche: this.selectedRow.NidFiche,
            pUserCode: this.getNidUser(),
            pUserName: this.getUserDisplayName()
          }
          this.$services.SB.deleteFiche(payload, {
            config: { District: this.baseNosaziCode.District }
          })
            .then(async ({ data }) => {
              this.saveResult = this.getResponse(data)

              if (this.saveResult.success) {
                this.showSuccess("فیش انتخاب شده با موفقیت حذف شد")
                await this.log({
                  action: this.logActions.delete,
                  bizCode: this.selectedRow.NidFiche,
                  bizCodeTitle: "NidFiche"
                })
                this.loadData()
              }
            })
            .catch((err) => {
              console.error(err)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          this.showError("هیچ فیشی انتخاب نشده است.")
        }
      })
    },
    buildingFiche () {
      this.isShowBuildingFicheModal = true
    },
    closeReloadModal () {
      this.isShowReloadFicheModal = false
      this.loadData()
    },
    closeRevokedFichesModal () {
      this.isShowRevokedFicheModal = false
      this.loadData()
    },
    printReport () {
      const reportPath =
        "?ReportPath=/Sara8Reports/PishagahiNosazi&ReportParameter="
      const queryParams = {
        District: this.baseNosaziCode.District,
        NidFiche: this.selectedRow.NidFiche
      }
      this.showReport(reportPath, queryParams)
    },
    printFiche () {
      const reportPath =
        "?ReportPath=/Sara8Reports/RptReconFiche&ReportParameter="
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidFiche: this.selectedRow.NidFiche,
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
    },
    async printPerferazhFiche () {
      if (!this.selectedRow) {
        this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        return
      }
      const reportPath =
        "/Sara8Reports/RptPosPrint"
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidFiche: this.selectedRow.NidFiche,
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    },
    factorMohasebatReport () {
      const reportPath =
        "?ReportPath=/Sara8Reports/RptPrintLogFiche&ReportParameter="
      const queryParams = {
        NidFiche: this.selectedRow.NidFiche,
        District: this.baseNosaziCode.District
      }
      this.showReport(reportPath, queryParams)
    }
  },
  watch: {
    loadCancelFiches () {
      this.loadData()
    }
  }
}
</script>
