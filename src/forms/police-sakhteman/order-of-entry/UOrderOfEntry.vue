<template>
  <form-wrapper :title="title" vertical :padding="false">
    <template #header>
      <safa-status :result="getSealedOperationListRes" />
      <safa-status :result="getSealedOrder2Res" />
      <safa-status :result="saveSealedOrderRes" />
      <safa-status :result="revokeSealedOperationRes" />
      <safa-status :result="confirmOutputRes" />
    </template>

    <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
      v-if="hasSodor"
    />
    <safa-tabs v-model="activeTab" v-else>
      <template v-slot:tabs>
        <tab-menu name="list" label="لیست دستورات" />
        <tab-menu name="details" label="جزئیات" v-if="showDetail" />
      </template>

      <tab-content name="list" :padding="false">
        <safa-datatable
          title="لیست عملیات"
          v-model="sealedOperationList"
          cdcName="SealedOperationList"
          helper="sealedOperationList"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          m="r"
          fit
          @SelectClick="selectSealedOperation"
          @CancelClick="revokeSealedOperation"
          paginate
          :pageSize="10"
        />
      </tab-content>

      <tab-content name="details">
        <fit>
          <FormRow class="q-mb-sm">
            <FormControl>
              <safa-text
                label="شماره"
                label-width="90px"
                v-model="model.SealedOperation.OperationNo"
                cdcName="OperationNo"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ اعتبار حکم ورود"
                label-width="90px"
                v-model="validityDate"
                cdcName="validityDate"
                required
                validarions="required"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تعداد مرتبه حکم ورود"
                label-width="90px"
                v-model="numberTimes"
                cdcName="numberTimes"
                required
                :validarions="['required', validations.numberTimes]"
                :m="mode"
              />
            </FormControl>
          </FormRow>
          <safa-splitter
            class="fit"
            vertical
            margin="0"
            v-model="splitterValue"
          >
            <template v-slot:before>
              <fit>
                <safa-datatable
                  fit
                  title="درخواست حکم ورود"
                  helper="warrantListHokm"
                  m="r"
                  height="100%"
                  class="q-mb-sm"
                  v-model="model.Warrant.WarrantList"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="false"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                  cdcName="WarrantList"
                  paginate
                  :pageSize="10"
                />
                <div class="row q-col-gutter-sm">
                  <safa-text
                    label="توضیحات"
                    type="textarea"
                    class="col-12"
                    :m="mode"
                    v-model="model.SealedOperation.Comments"
                    cdcName="Comments"
                    :rows="1"
                  />
                </div>
              </fit>
            </template>
            <template v-slot:after>
              <fit>
                <!-- helper="agWarrantOrderList " -->
                <safa-grid
                  title="درخواست حکم ورود"
                  :columns="columns"
                  v-model="model.Warrant.WarrantOrderList"
                  cdcName="agWarrantOrderList"
                  :show-selected-checkbox="true"
                  :allowMultipleSelection="true"
                  :addRow="false"
                  :deleteRow="false"
                  :allowCopy="false"
                  :m="mode"
                  height="100%"
                  max-height="100%"
                  fit
                  paginate
                  :pageSize="10"
                  ref="warrantOrderList"
                />
              </fit>
            </template>
          </safa-splitter>
        </fit>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <form-actions
        :m="mode"
        :showNewButton="activeTab === 'list'"
        :showEditButton="activeTab !== 'list' && !hasSodor"
        @newInfo="newOrder"
        @edit="isEditable = true"
        @save="saveObj"
        @cancel="cancel"
      >
        <!-- newSPId="6838f835-5b90-421c-be51-80325bd41478"
        newSPCaption="جدید" -->
        <template v-slot:after v-if="activeTab !== 'list'">
          <btn-default
            label="چاپ پیش نویس"
            @click="print"
            v-show="!hasSodor && !isEditable"
          />
          <btn-default
            label=" صدور گواهی"
            @click="confirmLicense"
            v-show="!hasSodor && !isEditable"
          />
          <btn-default
            label="ابطال گواهی"
            @click="revokeCertificat"
            v-show="hasSodor && !isEditable"
          />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import Joi from "joi"
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UOrderOfEntry",
      title: "دستور حکم ورود",
      formKey: "58e4c9b2-b2f6-4b5d-8bd4-1e4b434834ea",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // #region services
      getSealedOperationListRes: null,
      getSealedOrder2Res: null,
      saveSealedOrderRes: null,
      revokeSealedOperationRes: null,
      confirmOutputRes: null,
      // #endregion
      columns: [
        {
          field: 'IsSelect',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection',
          checkboxSelection: true,
          showDisabledCheckboxes: true
        },
        { field: "FullCI", title: "عنوان / جزییات تقاضا", editable: false, width: "250px" },
        { field: "Comment", title: "توضیحات", width: "250px", validations: "required" }
      ],
      // #region variables
      selectedOperation: null,
      archiveBizCode: "",
      activeTab: "list",
      sealedOperationList: [],
      splitterValue: 50,
      model: {
        SealedOperationList: null,
        SealedOperation: {
          Comments: "",
          OperationNo: ""
        },
        Warrant: {
          WarrantList: [],
          WarrantOrderList: []
        }
      },
      nidProc: "00000000-0000-0000-0000-000000000000",
      nidWorkflowDeff: "00000000-0000-0000-0000-000000000000",
      nidOper: null,
      hasSodor: false,
      showDetail: false,

      numberTimes: 1,
      validityDate: currentDate(),

      eumSealedOperationType: {
        SealedOrder: 1, // "دستور پلمب"
        Sealed: 2, // "پلمب"
        // SealedRemoveOrder_Temp: 3, // "دستور رفع پلمب - موقت"
        SealedRemove: 4, // "رفع پلمب"
        SealedDetach: 5, // "فک پلمب"
        SealedRemoveOrder_Perm: 6, // "دستور رفع پلمب - دائم"
        WarrantRun: 7, // "اجرای حکم"
        WarrantRunOrder: 8, // "دستور حکم ورود"
        SealedOrder_And_WarrantRunOrder: 9, // "دستور حکم ورود و پلمب"
        SealedLack: 10, // "عدم پلمب"
        Execution: 11, // "اجرائیات"
        RequestRemoveSealed: 12, // "تقاضای رفع پلمب"
        SealedRemoveOrder_Perm_Condition11: 13 // "- به شرط داشتن اجراییات -دستور رفع پلمب - دائم"
      },

      validations: {
        numberTimes: Joi.custom(
          function (value, helper) {
            if (this.numberTimes === 0) { return helper.message("مقدار 0 برای تعداد مرتبه حکم ورود مجاز نمی باشد.") }
            return true
          }.bind(this)
        )
      }
      // #endregion
    }
  },
  mounted () {
    if (this.isSelectedRequest()) {
      this.nidProc = this.selectedRequest.NidProc
      this.nidWorkflowDeff = this.selectedRequest.NidWorkflowDeff
      this.loadObj()
      this.validityDate = this.addDayToCurrentDate(14)
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SH.getSealedOperationList({
          pNidProc: this.nidProc
        })
        this.getSealedOperationListRes = this.getResponse(data)
        if (this.getSealedOperationListRes.success) {
          this.sealedOperationList =
            this.getSealedOperationListRes.data?.SealedOperationList.filter(
              (f) =>
                f.EumSealedOperationType ===
                this.eumSealedOperationType.WarrantRunOrder // 8 "دستور حکم ورود"
            ) ?? []
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش لیست دستور حکم ورود روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async newOrder () {
      this.nidOper = "00000000-0000-0000-0000-000000000000"
      await this.getSealedOrder2()
      this.showDetail = true
      this.isEditable = true
      this.activeTab = "details"
    },

    cancel () {
      this.isEditable = false
      this.getSealedOrder2()
    },

    async getSealedOrder2 () {
      try {
        this.showLoading()
        const payLoad = {
          pNidProc: this.nidProc,
          pNidOper: this.nidOper,
          NidWorkflowDeff: "00000000-0000-0000-0000-000000000000" // this.nidWorkflowDeff
        }
        const { data } = await this.$services.SH.getSealedOrder2(payLoad)
        this.getSealedOrder2Res = this.getResponse(data)
        if (this.getSealedOrder2Res.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `نمایش دستور حکم ورود روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.$nextTick(() => {
            this.model = this.normalizeModel(this.getSealedOrder2Res.data)
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    addDayToCurrentDate (addDays) {
      const tmp = currentDate().split('/')
      let y = parseInt(tmp[0])
      let m = parseInt(tmp[1])
      let d = parseInt(tmp[2])
      let today = new PersianDate([y, m, d])
      return today
        .add('days', addDays)
        .toLocale('en')
        .format('L')
    },
    normalizeSaveWarrantOrderList (list) {
      return list.map((m) => {
        return {
          ...m,
          ValidityDate: this.validityDate,
          NumberTimes: this.numberTimes,
          IsSelect: m.selected ?? false
        }
      })
    },
    normalizeModel (e) {
      return {
        ...e,
        SealedOperation: {
          ...e.SealedOperation,
          OperationNo: e.SealedOperation.OperationNo || "",
          NidOper:
            e.SealedOperation.NidOper || "00000000-0000-0000-0000-000000000000",
          NidProc: this.nidProc || "00000000-0000-0000-0000-000000000000",
          NidUser: this.getNidUser(),
          EumSealedOperationType: this.eumSealedOperationType.WarrantRunOrder, // 8 "دستور حکم ورود"
          UserName: this.currentUser.username
        },
        SealedOperationCIList: [],
        Warrant: {
          ...e.Warrant,
          WarrantList: this.normalizeWarrantList(e.Warrant?.WarrantList) ?? [],
          WarrantOrderList:
            this.normalizeWarrantOrderList(e.Warrant?.WarrantOrderList) ?? []
        }
      }
    },
    normalizeWarrantList (arr) {
      return arr?.filter((f) => f.CI_WarrantTitle === 1) ?? [] // WarrantTitleOrder : "حکم ورود"
    },
    normalizeWarrantOrderList (arr) {
      const list = arr?.filter((f) => f.CI_WarrantTitleOrder === 1) ?? [] // WarrantTitleOrder : "حکم ورود"
      return list.map((m) => {
        return {
          ...m,
          selected: m.IsSelect ?? false
        }
      })
    },

    selectSealedOperation ({ dataItem }) {
      this.selectedOperation = dataItem
      this.checkIsConfirm()
    },

    async checkIsConfirm () {
      this.nidOper = this.selectedOperation.NidOper
      try {
        this.showLoading()
        const { data } = await this.$services.SH.checkIsConfirmLicense({
          pNidProc: this.nidProc,
          pLicenseNo: this.selectedOperation.OperationNo
        })
        this.checkIsConfirmLicenseRes = this.getResponse(data)
        if (this.checkIsConfirmLicenseRes.success) {
          const res = this.checkIsConfirmLicenseRes.data
          if (res.License && res.License.ArchiveBizCode) {
            this.updateArchiveBizCode(res.License.ArchiveBizCode)
            this.hasSodor = true
          } else this.hasSodor = false
          await this.getSealedOrder2()
          this.showDetail = true
          this.activeTab = "details"
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (!this.isValidForm()) return

      this.$nextTick(() => {
        this.$refs.warrantOrderList.gridApi.refreshCells()
      })
      this.$forceUpdate()
      if (this.model.SealedOperation.OperationNo === "") {
        this.model.SealedOperation.OperationNo = null
      }
      const warOrdList = this.normalizeSaveWarrantOrderList(
        this.$refs.warrantOrderList.gridApi.getSelectedRows()
      )
      this.model.Warrant.WarrantOrderList = warOrdList
      try {
        this.showLoading()
        const { data } = await this.$services.SH.saveSealedOrder({
          pDistrict: this.selectedDistrict,
          pObj: { ...this.model }
        })
        this.saveSealedOrderRes = this.getResponse(data)
        if (this.saveSealedOrderRes.success) {
          this.nidOper = this.saveSealedOrderRes.data.NidOper
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره ی اطلاعات دستور حکم ورود روی درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.showSuccess("ذخیره ی اطلاعات با موفقیت انجام شد.")
          await this.getSealedOrder2()
          await this.loadObj()
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    revokeSealedOperation ({ dataItem }) {
      this.nidOper = dataItem.NidOper
      this.showConfirm("آیا از ابطال دستور پلمب اطمینان دارید؟").onOk(
        async () => {
          try {
            this.showLoading()
            const { data } = await this.$services.SH.revokeSealedOperation({
              pNidOper: this.nidOper
            })
            this.revokeSealedOperationRes = this.getResponse(data)
            if (this.revokeSealedOperationRes.success) {
              await this.log({
                action: this.logActions.cancel,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ابطال روی شماره عملیات ${dataItem.OperationNo} انجام گردید.`
              })
              this.showSuccess("ردیف مورد نظر با موفقیت ابطال شد.")
              this.isEditable = false
              this.activeTab = "list"
              this.showDetail = false
              await this.loadObj()
            }
          } catch (e) {
            console.error(e)
            this.serverError()
          } finally {
            this.hideLoading()
          }
        }
      )
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    confirmLicense () {
      this.showLoading()
      const payload = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          LicenseDate: currentDate(),
          LicenseNo: this.model.SealedOperation.OperationNo,
          NidProc: this.nidProc,
          OutputEngTitle:
            "Output_RptBuildingPoliceLicence" +
            `${this.model.SealedOperation.OperationNo}`,
          OutputPerTitle: "گواهی پلیس ساختمان",
          ReportName: "/BuildingPolice/RptBuildingPoliceLicence"
        },
        pReportPath: "/BuildingPolice/RptBuildingPoliceLicence",
        pArchiveDomain: "BuildingPolice",
        pReportDomain: this.selectedDistrict || 1,
        pNidOper: this.nidOper
      }
      this.$services.SH.confirmLicense(payload, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.confirmOutputRes = this.getResponse(data)
          if (this.confirmOutputRes.success) {
            this.showSuccess("صدور گواهی با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور گواهی روی شماره عملیات ${this.model.SealedOperation.OperationNo} انجام گردید.`
            })
            await this.checkIsConfirm()
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

    revokeCertificat () {
      this.showConfirm("آیا از ابطال گواهی اطمینان دارید؟").onOk(() => {
        const payload = {
          pDtoOut: {
            OutputEngTitle:
              "Output_RptBuildingPoliceLicence" +
              `${this.model.SealedOperation.OperationNo}`,
            OutputPerTitle: "گواهی پلیس ساختمان",
            NidProc: this.selectedRequest.NidProc,
            ReportName: "/BuildingPolice/RptBuildingPoliceLicence",
            RevokeNidUser: this.getNidUser(),
            RevokeUserName: this.getUserDisplayName(),
            LicenseNo: this.model.SealedOperation.OperationNo
          },
          pDomain: this.selectedDistrict
        }
        this.$services.SH.revokeLicense(payload, {
          config: { District: this.selectedDistrict }
        })
          .then(async ({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              await this.log({
                action: this.logActions.revokeCertificate,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `ابطال گواهی روی شماره عملیات ${this.model.SealedOperation.OperationNo} انجام گردید.`
              })
              this.showSuccess("ابطال گواهی با موفقیت انجام شد.")
              // this.hasSodor = false
              await this.checkIsConfirm()
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    async print () {
      const reportPath =
        "/BuildingPolice/RptBuildingPoliceLicence_Pishnevis"
      const queryParams = {
        NidProc: this.nidProc,
        NidOper: this.nidOper,
        OperationNo: this.model.SealedOperation.OperationNo,
        RptDomain: "BuildingPolice",
        District: this.selectedDistrict
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش روی شماره عملیات ${this.model.SealedOperation.OperationNo} انجام گردید.`
      })
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  }
}
</script>
