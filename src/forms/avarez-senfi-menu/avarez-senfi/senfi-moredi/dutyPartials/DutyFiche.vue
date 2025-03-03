<template>
  <safa-form id="4c39d37b-42a1-4cd5-af59-ef85f890e069" caption="صنفی موردی">
    <fit>
      <safa-status :result="saveResult" />
      <div class="row q-mb-sm">
        <safa-checkbox
          label="عدم نمایش فیش های باطله"
          v-model="loadCancelFiches"
          @click="reloadFichesList"
          cdcName="loadCancelFiches"
        />
      </div>
      <safa-splitter
        v-model="splitterValue"
        class="fit"
        vertical
        margin="0"
        style="min-height: 200px"
      >
        <template v-slot:after>
          <fit>
            <safa-datatable
              helper="dutyFich2"
              v-model="dutyFicheSubResults.DutyFicheSub"
              :hideHeader="true"
              height="100%"
              max-height="100%"
              min-height="100px"
              title="جزئیات فیش ها"
              cdcName="dutyFicheSubList"
              fit
            />
          </fit>
        </template>
        <template v-slot:before>
          <fit>
            <!-- <safa-grid
              v-model="fichesResults.DutyFichesPayCount"
              :addRow="false"
              :allowCopy="false"
              :allowMultipleSelection="true"
              :deleteRow="false"
              :detailCellRendererParams="detailCellRendererParams"
              :masterDetail="true"
              :show-selected-checkbox="true"
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
              @row:click="selectedRowHandler"
            /> -->
            <safa-grid
              v-model="fichesResults.DutyFichesPayCount"
              :addRow="false"
              :allowCopy="false"
              :deleteRow="false"
              :detailCellRendererParams="detailCellRendererParams"
              :masterDetail="true"
              :checkboxSelection="true"
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
              @row:click="selectedRowHandler"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
    <safa-popup
      v-model="isShowPaymentDetailsModal"
      title="مشخصات فیش پرداختی"
      width="400px"
      height="310px"
    >
      <DutyFichePaymentDetails
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
    <safa-popup v-model="isShowPaymentDetailsModal2" title="مشخصات فیش پرداختی">
      <DutyFichePaymentDetails2
        @reloadDutyFiche2="reloadDutyFiche2"
        :selectedRow="selectedRow"
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>

    <safa-popup
      v-model="isShowPoseSeectionModal"
      title="انتخاب کردن پوز"
      width="300px"
      height="300px"
    >
      <DutyFichePoseSelection
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :title="title"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowPoseHistoryModal"
      title="تاریخچه پرداخت با پوز"
      vertical
    >
      <form-wrapper :padding="false">
        <DutyFichePoseHistory
          @reloadDutyFiche="reloadDutyFiche"
          :selectedRow="selectedRow"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="isShowRefundSpecModal"
      title="مشخصات فیش استرداد"
      width="400px"
      height="310px"
    >
      <DutyFicheRefundSpec
        @reloadDutyFiche="reloadDutyFiche"
        :selectedRow="selectedRow"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
    <safa-popup v-model="isShowBuildingFicheModal" title="فیش های ملک">
      <form-wrapper>
        <DutyFicheBuilding
          @reloadDutyFiche="reloadDutyFiche"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </form-wrapper>
    </safa-popup>
    <safa-popup v-model="isShowAcceptedFicheModal" title="فیش های تأیید بانک">
      <form-wrapper>
        <DutyFicheAccepted
          @reloadDutyFiche="reloadDutyFiche"
          :selectedRow="selectedRow"
          :results="results"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </form-wrapper>
    </safa-popup>
    <safa-popup v-model="isShowReloadFicheModal" title="فیش های حذف شده">
      <form-wrapper>
        <DutyFicheReload
          @reloadDutyFiche="reloadDutyFiche"
          @closeReloadModal="closeReloadModal"
          :selectedRow="selectedRow"
          :results="results"
          :baseNosaziCode="baseNosaziCode"
          ref="deletedList"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
        <template v-slot:footer>
          <btn-default label="بازآوری" @click="reloadDeletedFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup v-model="isShowRevokedFicheModal" title="فیش های ابطال شده">
      <form-wrapper>
        <DutyFicheRevokedList
          @reloadDutyFiche="reloadDutyFiche"
          @closeRevokedFichesModal="closeRevokedFichesModal"
          :selectedRow="selectedRow"
          :baseNosaziCode="baseNosaziCode"
          :results="results"
          ref="revokList"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
        <template v-slot:footer>
          <btn-default label="بازآوری" @click="reloadRevokedFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <!-- </fit> -->
    <!-- </div> -->
  </safa-form>
</template>
<script>
import DutyFichePaymentDetails from "./DutyFichePaymentDetails"
import DutyFichePaymentDetails2 from "./DutyFichePaymentDetails2"
import DutyFichePoseSelection from "./DutyFichePoseSelection"
import DutyFichePoseHistory from "./DutyFichePoseHistory"
import DutyFicheRefundSpec from "./DutyFicheRefundSpec"
import DutyFicheBuilding from "./DutyFicheBuilding"
import DutyFicheAccepted from "./DutyFicheAccepted"
import DutyFicheReload from "./DutyFicheReload"
import DutyFicheRevokedList from "./DutyFicheRevokedList"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      splitterValue: 50,
      fichesResult: {},
      dutyFicheSubResults: { DutyFicheSub: [] },
      selectedRow: null,
      saveResult: null,
      isShowPaymentDetailsModal: false,
      isShowPoseSeectionModal: false,
      isShowPoseHistoryModal: false,
      isShowPaymentDetailsModal2: false,
      isShowRefundSpecModal: false,
      isShowBuildingFicheModal: false,
      isShowAcceptedFicheModal: false,
      isShowReloadFicheModal: false,
      isShowRevokedFicheModal: false,
      dutyFicheSubResult: null,
      disabledAcceptBtn: true,
      disabledAcceptPoseBtn: true,
      disabledPoseHistoryBtn: true,
      disabledIssuanceBtn: true,
      disabledRevokeBtn: true,
      disabledRefundBtn: true,
      disabledDeleteBtn: true,
      disabledInstallmentBtn: true,
      disabledPrintFicheBtn: true,
      disabledPrintBrazBtn: true,
      disabledCalcFactorBtn: true,
      disabledReloadBtn: false,
      isDisableMafasaReport: true,
      fichesResults: { DutyFichesPayCount: [] },
      getDutyFicheSubsRes: null,
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
      },
      nidFk: "00000000-0000-0000-0000-000000000000",
      DutyFicheStatus: null
    }
  },
  props: {
    results: Object,
    loadCancelFiches: Boolean,
    // fichesResults: Object,
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: {
      type: String,
      default: "DutyFiche"
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
  methods: {
    reloadRevokedFiche () {
      this.$refs.revokList.reloadRevokedFiche()
    },
    reloadDeletedFiche () {
      this.$refs.deletedList.reloadDeletedFiche()
    },
    reloadFichesList () {
      this.showLoading()
      let payload = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(payload, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
            this.fichesResults = {
              ...this.fichesResults,
              DutyFichesPayCount: this.fichesResults?.DutyFichesPayCount ?? []
            }
            this.fichesResults.DutyFichesPayCount = this.fichesResults.DutyFichesPayCount.map((x) => {
              if (x.EumDutyFicheStatus === 0) {
                x.class = "dutyFichePermanent"
              } else if (x.EumDutyFicheStatus === 1) {
                x.class = "dutyFicheConfirm"
              } else if (x.EumDutyFicheStatus === 2) {
                x.class = "dutyFicheCancel"
              } else if (x.EumDutyFicheStatus === 3) {
                x.class = "dutyFicheTempExport"
              } else if (x.EumDutyFicheStatus === 4) {
                x.class = "dutyFicheConfirmBank"
              } else if (x.EumDutyFicheStatus === 5) {
                x.class = "dutyFicheRevoke"
              }
              return x
            })

            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          console.error(response)
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
          this.DutyFicheStatus = this.selectedRow.EumDutyFicheStatus
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
          this.dutyFicheSubResults = this.getDutyFicheSubsRes.data
          let dutyFicheSub = this.dutyFicheSubResults.DutyFicheSub
          if (dutyFicheSub && dutyFicheSub.length > 0) {
            this.nidFk = dutyFicheSub[0].NidFK
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NidFiche,
            bizCodeTitle: "NidFiche",
            saveDesc: `بارگذاری اطلاعات فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    selectedChange (e) {
      console.log("@@@", e)
      this.selectedRow = e.dataItem
    },
    click (dataItem) {
      this.selectedRow = dataItem
      this.DutyFicheStatus = dataItem.EumDutyFicheStatus
      if (dataItem.EumDutyFicheStatus === 1) {
        this.isDisableMafasaReport = false
      }
      if (dataItem.EumDutyFicheStatus !== 0) {
        this.disabledPoseHistoryBtn = false
        this.disabledRevokeBtn = false
        this.disabledRefundBtn = false
        this.disabledPrintBrazBtn = false
        this.disabledCalcFactorBtn = false
        this.disabledReloadBtn = false
      } else {
        this.disabledAcceptBtn = false
        this.disabledAcceptPoseBtn = false
        this.disabledPoseHistoryBtn = false
        this.disabledRevokeBtn = false
        this.disabledRefundBtn = false
        this.disabledPrintFicheBtn = false
        this.disabledCalcFactorBtn = false
        this.disabledReloadBtn = false
        this.disabledDeleteBtn = false
      }
      this.showLoading()
      let data = { pNidFiche: dataItem.NidFiche }
      this.$services.SB.getDutyFicheSubsForJob(data, { config: { District: this.baseNosaziCode.District } })
        .then(({ data }) => {
          this.dutyFicheSubResult = this.getResponse(data)

          if (this.dutyFicheSubResult.success) {
            this.dutyFicheSubResults = this.dutyFicheSubResult.data
            if (this.dutyFicheSubResults.DutyFicheSubForJob.length > 0) {
              this.nidFk = this.dutyFicheSubResults.DutyFicheSubForJob[0].NidFK
            }
          }
        })
        .catch((response) => {
          console.error(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      if (this.selectedRow) {
        this.showConfirm("آیا از تأیید فیش انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.isShowPaymentDetailsModal = true
          }
        )
      } else {
        this.showError("لطفا یک فیش انتخاب نمایید.")
      }
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
      this.reloadFichesList()
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
    // getRowClass (params) {
    //   let row = params.data
    //   // if (row.EumDutyFicheStatus === 0) return "bg-green-3"
    //   if (row.EumDutyFicheStatus === 1) return "bg-green-2"
    //   if (row.EumDutyFicheStatus === 2) return "bg-pink-2"
    //   if (row.EumDutyFicheStatus === 3) return "bg-grey-1"
    //   if (row.EumDutyFicheStatus === 4) return "bg-green-3"
    //   if (row.EumDutyFicheStatus === 5) return "bg-grey-3"

    //   return { background: "transparent" }
    // },
    reloadDutyFiche2 (value) {
      this.isShowPaymentDetailsModal2 = false
      this.saveResult = value
      this.reloadFichesList()
    },
    acceptWithPose () {
      this.showConfirm(
        "آیا از تأیید فیش انتخاب شده از طریق پوز اطمینان دارید؟"
      ).onOk(() => {
        this.isShowPoseSeectionModal = true
      })
    },
    poseHistory () {
      this.isShowPoseHistoryModal = true
    },
    acceptBank () {
      if (this.selectedRow !== null) {
        this.showLoading()
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 2,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService(data, { config: { District: this.baseNosaziCode.District } })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche",
                saveDesc: `تایید فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
              })
              this.reloadFichesList()
            }
          })
          .catch((response) => {
            console.error(response)
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
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 2,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false
        }

        this.$services.SB.confirmFicheViaBankService2(data, { config: { District: this.baseNosaziCode.District } })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: "NidFiche",
                saveDesc: `تایید فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
              })
              this.reloadFichesList()
            }
          })
          .catch((response) => {
            console.error(response)
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
            this.showLoading()
            let data = {
              pNidFiche: this.selectedRow.NidFiche,
              pUserCode: this.getNidUser(),
              pUserName: this.getUserDisplayName(),
              PDutyType: 2,
              IsRefund: false
            }

            this.$services.SB.cancelFiche(data, { config: { District: this.baseNosaziCode.District } })
              .then(async ({ data }) => {
                this.saveResult = this.getResponse(data)
                if (this.saveResult.success) {
                  this.showSuccess("فیش انتخاب شده با موفقیت باطل شد.")
                  await this.log({
                    action: this.logActions.cancel,
                    bizCode: this.selectedRow.NidFiche,
                    bizCodeTitle: "NidFiche",
                    saveDesc: `ابطال فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
                  })
                  this.reloadFichesList()
                }
              })
              .catch((response) => {
                console.error(response)
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
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
          let data = {
            pNidFiche: this.selectedRow.NidFiche,
            pUserCode: this.getNidUser(),
            pUserName: this.getUserDisplayName()
          }
          this.$services.SB.deleteFiche(data, { config: { District: this.baseNosaziCode.District } })
            .then(async ({ data }) => {
              this.saveResult = this.getResponse(data)
              if (this.saveResult.success) {
                await this.log({
                  action: this.logActions.delete,
                  bizCode: this.selectedRow.NidFiche,
                  bizCodeTitle: "NidFiche",
                  saveDesc: `حذف فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
                })
                this.showSuccess("فیش انتخاب شده با موفقیت حذف شد")
                this.reloadFichesList()
              }
            })
            .catch((response) => {
              console.error(response)
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
      this.reloadFichesList()
    },
    closeRevokedFichesModal () {
      this.isShowRevokedFicheModal = false
      this.reloadFichesList()
    },
    async printReport () {
      if (!this.selectedRow) {
        this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        return
      }
      const reportPath =
        "/Sara8Reports/PishagahiSenfi"
      const queryParams = {
        District: this.baseNosaziCode.District,
        NidFiche: this.selectedRow.NidFiche
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche"
      })
    },
    async printFiche () {
      if (!this.selectedRow) {
        this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        return
      }
      const reportPath =
        "/Sara8Reports/RptShopFiche"
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
    async factorMohasebatReport () {
      if (!this.selectedRow) {
        this.showError("لطفا فیش مورد نظر را انتخاب نمایید.")
        return
      }
      const reportPath =
        "/Sara8Reports/RptPrintLogFiche"
      const queryParams = {
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
    async printMafasaReport () {
      // if (this.DutyFicheStatus !== this.EnumDutyFicheStatus.Confirm) {
      //   this.isDisableMafasaReport = true
      // } else {
      //   this.isDisableMafasaReport = false
      const reportPath =
          "/Sara8Reports/RptMafasaHesab"
      const queryParams = {
        NidFK: this.nidFk,
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
    }
    // }
  },
  mounted () {
    this.reloadFichesList()
  },
  watch: {
    loadCancelFiches () {
      this.reloadFichesList()
    }
  },
  computed: {
    EnumDutyFicheStatus () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("EnumDutyFicheStatus")
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
    },
    isDisableFichButtonsWithStatusCondition () {
      if (!this.selectedRow) return true // true => disable buttons
      if (
        this.selectedRow.EumDutyFicheStatus !== 4 &&
        this.selectedRow.EumDutyFicheStatus !== 1
      ) {
        return false
      } // false => enable buttons
      return true // default is disable
    }
  }
}
</script>
<style scoped>
.senfi-checkBox {
  margin-left: -10px;
}
</style>
