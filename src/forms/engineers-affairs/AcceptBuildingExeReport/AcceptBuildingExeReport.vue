<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper
      :title="title"
      fullscreen
      hide-title
      hide-close
      :padding="true"
    >
      <!-- <template v-slot:header> -->
      <safa-status :result="getEngineersReportsRes" />
      <safa-status :result="loadObjRes" />
      <safa-status :result="confirmBuildingExecRepMainRes" />
      <safa-status :result="revokeRes" />
      <safa-status :result="getBuildingExecRepDetailMainListRes" />
      <safa-status :result="getBuildingReportFormOperationRes" />
      <!-- </template> -->

      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="سال"
              label-width="40px"
              ciName="CI_Years"
              cdcName="CI_Years"
              domainName="engineer"
              v-model="CI_Years"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کدارجاع"
              label-width="40px"
              cdcName="NidWorkitem"
              v-model="NidWorkitem"
              @keyup.enter="loadObj"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ گزارش از"
              cdcName="txtFromDate"
              v-model="txtFromDate"
              required
              validation="required"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ گزارش تا"
              v-model="txtToDate"
              cdcName="txtToDate"
              required
              validation="required"
            />
          </FormControl>
          <nosazi-code-input
            v-model="NosaziCode"
            cdcName="NosaziCode"
            label="کد نوسازی "
            :actions="true"
            @enter="loadObj"
          />
          <div>
            <btn-default class="q-mr-sm" label="بازآوری" @click="loadObj" />
            <btn-default
              class="q-mr-sm"
              label="بازآوری مجدد"
              @click="reRefresh"
            />
            <btn-default class="q-mr-sm" label="چاپ آرشیو" />
            <!-- بدون عملکرد در سرا 8  -->
          </div>
        </FormRow>

        <safa-grid
          :title="title"
          :value="[]"
          :columns="phaseReportKartablColumns"
          cdcName="BuildingExecRepInfoMainList"
          :getRowStyle="getRowStyle"
          rowModelType="serverSide"
          paginate
          :pageSize="50"
          :cacheBlockSize="50"
          :masterDetail="true"
          :detailCellRendererParams="detailCellRendererParams"
          @row:click="rowClickHandler"
          @grid:ready="onGridReady"
        >
          <template #header>
            <div class="flex items-center q-gutter-x-sm q-mr-xs">
              <safa-checkbox
                label="نمایش موارد تایید شده"
                v-model="chkShowConfirm"
                cdcName="chkShowConfirm"
              />
              <q-separator vertical />
            </div>
          </template>
        </safa-grid>
      </fit>

      <template #footer>
        <form-actions m="r" :showEditButton="false">
          <btn-default
            label="تغییر وضعیت"
            @click="changeStatus"
            spId="5f2203fb-3795-42ea-994e-837d5c15e6ab"
            spCaption="تغییر وضعیت"
            :disabled="disabledChangeStateBtn"
          />
          <btn-default
            label="تایید"
            @click="confirm"
            :disabled="disabledAccept"
            spId="366293ad-c9db-4e32-adde-06ab05c298fb"
            spCaption="تایید"
          />
          <btn-default
            label="ابطال/اصلاح"
            @click="revoke"
            :disabled="disabledRevoke"
            spId="9f2358a8-d015-45c9-80dd-c76e302d56b9"
            spCaption="ابطال/اصلاح"
          />
          <btn-default
            label="ارجاع به ثبت درخواست منطقه"
            spId="e7b74a62-1051-40ef-9f5f-5cee2d8db7fd"
            spCaption="ارجاع به ثبت درخواست منطقه"
          />
          <btn-default
            label="ارجاع به پلیس ساختمان"
            @click="showCompDecPolice"
            spId="1e8b6a11-a907-4787-a52f-ce7adb565780"
            spCaption="ارجاع به پلیس ساختمان"
          />
        </form-actions>
      </template>
    </form-wrapper>

    <safa-popup
      title="آرشیو"
      v-model="showReportArchive"
      width="900px"
      height="600px"
    >
      <ArchiveReport ref="archiveReport" />
    </safa-popup>
    <safa-popup
      title="توضیحات گزارش"
      v-model="showDecEng"
      width="900px"
      height="600px"
    >
      <Comment :selectedItem="selectedItem" />
    </safa-popup>
    <safa-popup
      title="سوابق گزارشات"
      v-model="showHistoryEng"
      width="900px"
      height="600px"
    >
      <History v-model="selectedItem" :formKey="formKey" :title="title" :name="name" />
    </safa-popup>
    <safa-popup
      title="متن گزارش"
      v-model="showCommentReport"
      width="500px"
      height="366px"
    >
      <CommentReport :selectedItem="selectedItem" />
    </safa-popup>

    <safa-popup
      title="متن گزارش"
      v-model="showArchive"
      width="900px"
      height="600px"
    >
      <EndArchive v-model="selectedItem" />
    </safa-popup>

    <safa-popup
      title="توضیحات"
      v-model="showDecPolice"
      width="500px"
      height="366px"
    >
      <DecPolice :selectedItem="selectedRow" />
    </safa-popup>

    <safa-popup
      title="توضیحات"
      v-model="showHistoryReportTable"
      width="1000px"
      height="700px"
    >
      <HistoryReportTable :selectedItem2="selectedItem2" />
    </safa-popup>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Comment from "./partials/Comment"
import History from "./partials/History"
import CommentReport from "./partials/CommentReport"
import EndArchive from "./partials/EndArchive"
import DecPolice from "./partials/DecPolice"
import HistoryReportTable from "./partials/HistoryReportTable"
import ArchiveReport from "./partials/ArchiveReport"
import PersianDate from "persian-date"
import { filterModelToSqlQuery } from "../../../kartable/utils/agQueryTools"
// import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

const GuidEmpty = "00000000-0000-0000-0000-000000000000"

const EumReportStatus = {
  None: 0, // بررسی نشده است
  Send: 1, // ارسال شده
  Confirm: 2, // تایید
  Revoke: 3 // ابطال
}

export default {
  mixins: [baseFormMixin],
  components: {
    Comment,
    CommentReport,
    EndArchive,
    DecPolice,
    HistoryReportTable,
    History,
    ArchiveReport
  },
  data () {
    return {
      title: "کارتابل گزارشات مرحله ای",
      name: "AcceptBuildingExeReport",
      formKey: "60b20031-23f6-4872-b06b-4620e8bf9f99",
      main: true,

      // condition
      chkShowConfirm: false, // کامنت آقای صالحی: pStatus هم توش 2 نباشه چون اولش لزومی نداره تایید شده ها نمایش داده بشه
      showDecEng: false,
      showHistoryEng: false,
      showCommentReport: false,
      showReportArchive: false,
      showArchive: false,
      showDecPolice: false,
      showHistoryReportTable: false,
      // getTotalOnlyFirstTimeDeclaration: false, //  به در خواست آقای صالحی این مقدار برای این ست شده که فقط برای بار اول توتال رو بگیره
      // توتال از سمت سرویس داینامیک شده و این روش دیگه جواب تمیده
      // variables
      selectedRow: null,
      selectedItem2: null,
      detailList: [],
      selectedItem: {},
      CI_Years: 0,
      NidWorkitem: 0,
      txtFromDate: "",
      txtToDate: "",
      type: "Confirm",
      NosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      CI_ExecLevels: "",
      ReportPath: "/Engineers/EngineerRpt/RptBuildingExecRep",
      ArchiveDomain_Engineer: "EngineersCertificate",
      baseNosaziCodeArchive: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      // Grids
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
            {
              field: "ExecLevel",
              title: "",
              editor: "action",
              width: "100px",
              filterable: false,
              sortable: false,
              lockPosition: true,
              // pinned: "right",
              btnColor: "primary",
              cellRenderer: "AgCallbackBtnCustomLabel",
              callback: (params) => this.showCompHistoryReportTable(params)
            },
            {
              field: "DetailComments",
              title: "چاپ گزارش",
              editor: "action",
              width: "100px",
              filterable: false,
              sortable: false,
              lockPosition: true,
              // pinned: "right",
              btnColor: "primary",
              cellRenderer: "agCallbackBtn",
              callback: (params) => this.printReportHandler(params)
            },
            { field: "ExecRep", title: "عنوان گزارش", width: "200px" },
            { field: "ExecLevel", title: "مرحله گزارش", width: "auto" },
            { field: "DetailComments", title: "متن گزارش", width: "auto" },
            { field: "BuildingExecDate", title: "تاریخ", width: "100px" }
          ]
        },
        // get the rows for each Detail Grid
        getDetailRowData: async (params) => {
          await this.getBuildingExecRepDetailMainList(params.data)
          setTimeout(() => {
            let logDetail = this.detailList.map((m) => {
              return {
                ExecRep: m.ExecRep || "",
                ExecLevel: m.ExecLevel || "",
                ExecStatus: m.ExecStatus || "",
                DetailComments: m.DetailComments || "",
                BuildingExecDate: m.BuildingExecDate || "",
                Comments: m.Comments || "",
                NIdBuildingExecRep: m.NIdBuildingExecRep || ""
              }
            })
            params.successCallback(logDetail)
          }, 1000)
        }
      },
      kartableList: [],
      clsReportSettingReports: [],

      // age-grid
      gridApi: null,
      prvPage: null,
      isload: null,

      // Res
      getEngineersReportsRes: null,
      revokeRes: null,
      confirmBuildingExecRepMainRes: null,
      loadObjRes: null,
      getBuildingExecRepDetailMainListRes: null,
      getBuildingReportFormOperationRes: null
    }
  },
  computed: {
    disabledAccept () {
      if (this.selectedRow && this.selectedRow.EumReportStatus === 3) {
        return true
      } else if (this.selectedRow && this.selectedRow.EumReportStatus !== 2) {
        return false
      }
      return true
    },
    disabledRevoke () {
      if (this.selectedRow && this.selectedRow.EumReportStatus !== 3) {
        return false
      }
      return true
    },
    disabledChangeStateBtn () {
      if (
        this.selectedRow &&
        this.selectedRow.EumReportStatus !== 2 &&
        this.selectedRow.EumReportStatus !== 3
      ) {
        return false
      }
      return true
    },
    phaseReportKartablColumns () {
      return [
        {
          field: "",
          title: "",
          width: "40px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          cellRenderer: "agGroupCellRenderer"
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "70px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.BtnReport(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "80px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "توضیحات",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showCompComment(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "70px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "سوابق",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showCompHistory(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "95px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "گزارش سوابق",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.BtnHistoryReport(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "90px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "متن گزارش",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showCompCommentReport(params)
        },
        {
          field: "",
          title: "",
          editor: "action",
          width: "90px",
          filterable: false,
          sortable: false,
          lockPosition: true,
          // pinned: "right",
          btnColor: "primary",
          btnTitle: "نمایش فایل",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.showCompArchive(params)
        },
        {
          field: "SerialID",
          title: "کد پیگیری",
          width: "150px"
        },
        {
          field: "IsAcceptCaption",
          title: "وضعیت",
          width: "200px"
        },
        {
          field: "OperationStartDate",
          title: "تاریخ شروع عملیات",
          width: "160px"
        },
        {
          field: "IdentityCode",
          title: "کد مهندس",
          width: "120px"
        },
        {
          field: "StudyFieldRel",
          title: "رشته تحصیلی",
          width: "200px"
        },
        {
          field: "NidWorkItem",
          title: "کدارجاع",
          width: "110px"
        },
        {
          field: "NosaziCodeStr",
          title: "کد نوسازی",
          width: "120px"
        },
        {
          field: "BuildingExecDate",
          title: "تاریخ گزارش",
          width: "115px"
        },
        {
          field: "SedimentCount",
          title: "مدت زمان رسوب گزارش",
          width: "170px"
        },
        {
          field: "BuildingExecTime",
          title: "ساعت گزارش",
          width: "140px"
        },
        {
          field: "BuildingExecDateTime",
          title: "تاریخ و ساعت گزارش",
          width: "150px"
        },
        {
          field: "ExecLevel",
          title: "عنوان گزارش",
          width: "200px"
        },
        {
          field: "CI_ExecFloor",
          title: "طبقه",
          editor: "combo",
          domain: "engineer",
          width: "100px"
        },
        {
          field: "SecretariatDate",
          title: "تاریخ دبیرخانه",
          width: "100px",
          editor: "date"
        },
        {
          field: "SecretariatNo",
          title: "شماره دبیرخانه",
          width: "200px"
        },

        // { field: 'OwnerNationalCode', title: 'کدملی مالک', width: '100px' },
        {
          field: "IsObservedBuilding",
          title: "ساختمان دارای تخلف است؟",
          editor: "checkbox",
          width: "180px"
        },
        {
          field: "CI_ExecSendStatus",
          title: "وضعیت ارسال",
          editor: "combo",
          domain: "engineer",
          width: "200px"
        },
        { field: "AcceptDate", title: "تاریخ تایید", width: "150px" },
        { field: "AcceptTime", title: "ساعت تایید", width: "150px" },
        {
          field: "AcceptDate",
          title: "تاریخ تایید",
          width: "140px"
        },
        {
          field: "AcceptTime",
          title: "ساعت تایید",
          width: "130px"
        },
        {
          field: "RevokeDate",
          title: "تاریخ عدم تایید",
          width: "130px"
        },
        {
          field: "RevokeTime",
          title: "ساعت عدم تایید",
          width: "130px"
        },
        {
          field: "Eng_Revoke",
          title: "کاربر عدم تایید کننده",
          width: "180px",
          editor: "date"
        },
        {
          field: "Eng_Accept",
          title: "کاربر تایید کننده",
          width: "180px",
          editor: "date"
        }
      ].map((e) => ({
        ...e,
        ...(!e.useFilter
          ? {
            filter: "agMultiColumnFilter",
            filterParams: {
              filters: [
                {
                  filter: "agTextColumnFilter"
                },
                this.customFilterValues
              ]
            }
          }
          : {})
      }))
    },
    customFilterValues () {
      return {
        filter: "agSetColumnFilter",
        filterParams: {
          values: (params) => params.success(this.getFilterValues(params)),
          refreshValuesOnOpen: true,
          defaultToNothingSelected: true
        }
      }
    }
  },
  watch: {
    chkShowConfirm () {
      this.loadObj()
    },
    isload () {
      if (this.prvPage > 0) {
        this.gridApi.paginationGoToPage(this.prvPage)
        this.prvPage = null
      }
    }
  },

  methods: {
    loadObj () {
      if (!this.isValidForm()) return
      if (new Date(this.txtFromDate) > new Date(this.txtToDate)) {
        return this.showError("تاریخ گزارشات وارد شده معتبر نمیباشد!")
      }
      this.gridApi.setFilterModel(null)
      // this.gridApi.onFilterChanged()
      this.prvPage = this.gridApi.paginationGetCurrentPage()
      this.gridApi.refreshServerSide({ purge: true })
    },

    async setKartableDatasource () {
      this.selectedRow = null
      if (!this.currentUser.jobLocation?.allowDomains) {
        let msg = `محل خدمت برای کاربر ${this.getUserDisplayName()} تعریف نشده است `
        this.showError(msg)
        return
      }

      this.gridApi.setGridOption("serverSideDatasource", {
        getRows: async (params) => {
          // const pageSize = params.request.endRow - params.request.startRow
          // const pageIndex = params.request.startRow / pageSize

          // برای این سرویس نیاز به بازنگری از سمت سرویس میباشد
          const From = 0 // params.request.startRow
          const To = 100000 // params.request.endRow
          try {
            const pWhere = Object.entries(params.api.getFilterModel()).reduce(
              (acc, [field, filter]) =>
                acc +
                filterModelToSqlQuery(field, filter, {
                  queryBuilder: undefined,
                  normalize: ![].includes(field),
                  appendOperator: "AND"
                }),
              ""
            )
            const payload = {
              pCI_Year: this.CI_Years,
              pDistrict: this.NosaziCode.District,
              pRegion: this.NosaziCode.Region,
              pBlock: this.NosaziCode.Block,
              pHouse: this.NosaziCode.House,
              pBuilding: this.NosaziCode.Building,
              pApartment: this.NosaziCode.Apartment,
              pShop: this.NosaziCode.Shop,
              pNidEngineer: "00000000-0000-0000-0000-000000000000", // this.getNidUser()
              pNidWorkItem: this.NidWorkitem,
              pDistricts: this.currentUser.jobLocation?.allowDomains || "",
              pCI_ExecLevels: "0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,21,22,23,254,255",
              pStatus: this.chkShowConfirm === false ? "1,3" : "1,2,3",
              pFromDate: this.txtFromDate,
              pToDate: this.txtToDate,
              pWhere,
              IsSara10: true,
              From,
              To
            }
            const { data } =
              await this.$services.engineers.GetBuildingExecRepInfoMainList(
                payload
              )
            this.loadObjRes = this.getResponse(data)
            if (
              this.loadObjRes.success &&
              this.loadObjRes.data.GetBuildingExecRep_Info_MainListResult
            ) {
              // eslint-disable-next-line camelcase
              const { BuildingExecRep_Info_MainList, Total } =
                this.loadObjRes.data.GetBuildingExecRep_Info_MainListResult
              // eslint-disable-next-line camelcase
              this.kartableList = BuildingExecRep_Info_MainList ?? []
              let rowCount = Total ?? 0
              this.resetValidation()
              params.success({
                rowData: this.kartableList,
                rowCount
              })
            } else {
              params.fail()
            }
            this.isload = !this.isload
          } catch (e) {
            console.error(e)
            params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },

    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", this.onServerFailCallback)
      this.setKartableDatasource()
    },

    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },

    async reRefresh () {
      this.selectedRow = null
      this.chkShowConfirm = true
      this.NosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.CI_Years = 0
      this.NidWorkitem = 0
      // this.txtFromDate = ""
      // this.txtToDate = ""
      this.loadObj()
    },

    confirmBuildingExecRepMain () {
      this.showLoading()
      const payload = {
        pNIdBuildingExecRep: this.selectedRow.NIdBuildingExecRep,
        pNidBuildingReportFormFloors:
          this.selectedRow.NidBuildingReportFormFloors,
        pNidUser_Accept: this.getNidUser(),
        pSecretariatNo: this.selectedRow.SecretariatNo ?? 0,
        pSecretariatDate: this.selectedRow.SecretariatDate ?? null,
        pReportPath: this.ReportPath,
        pArchiveDomain_Engineer: this.ArchiveDomain_Engineer,
        pUserName: this.getUserDisplayName(),
        pCI_ExecSendStatus: this.selectedRow.CI_ExecSendStatus,
        pType: this.type,
        pChangeStatusDate: this.selectedRow.ChangeStatusDate,
        pChangeStatusTime: this.selectedRow.ChangeStatusTime
      }
      this.$services.engineers
        .confirmBuildingExecRepMain(payload)
        .then(async ({ data }) => {
          this.confirmBuildingExecRepMainRes = this.getResponse(data)
          if (this.confirmBuildingExecRepMainRes.success) {
            if (this.type === "ChangeStatus") {
              this.showSuccess(
                "گزارش انتخاب شده با موفقیت تغییر وضعیت داده شد"
              )

              await this.log({
                action: this.logActions.update,
                bizCode: this.selectedRow.NIdBuildingExecRep,
                bizCodeTitle: "NIdBuildingExecRep",
                nosaziCode: this.selectedRow.NosaziCodeStr ?? "",
                nidWorkitem: this.selectedRow.NidWorkItem ?? "",
                saveDesc: `بروزرسانی اطلاعات گزارش انتخاب شده با کد پیگیری ${
                  this.selectedRow.SerialID ?? " --- "
                } در فرم ${this.title} انجام گردید.`
              })
            } else if (this.type === "Confirm") {
              this.showSuccess("گزارش انتخاب شده با موفقیت تایید شد")
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NIdBuildingExecRep,
                bizCodeTitle: "NIdBuildingExecRep",
                nosaziCode: this.selectedRow.NosaziCodeStr ?? "",
                nidWorkitem: this.selectedRow.NidWorkItem ?? "",
                saveDesc: `تایید اطلاعات گزارش انتخاب شده با کد پیگیری ${
                  this.selectedRow.SerialID ?? " --- "
                } در فرم ${this.title} انجام گردید.`
              })
            }
          }
          this.loadObj()
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getBuildingExecRepDetailMainList ({
      NIdBuildingExecRep,
      NosaziCodeStr,
      NidWorkItem,
      SerialID
    }) {
      this.showLoading()
      this.$services.engineers
        .getBuildingExecRepDetailMainList({
          pNIdBuildingExecRep: NIdBuildingExecRep
        })
        .then(async ({ data }) => {
          this.getBuildingExecRepDetailMainListRes = this.getResponse(data)
          if (this.getBuildingExecRepDetailMainListRes.success) {
            this.detailList =
              this.getBuildingExecRepDetailMainListRes.data
                ?.GetBuildingExecRep_DetailMainListResult
                ?.BuildingExecRep_DetailMainList ?? []

            await this.log({
              action: this.logActions.view,
              bizCode: NIdBuildingExecRep,
              bizCodeTitle: "NIdBuildingExecRep",
              nosaziCode: NosaziCodeStr ?? "",
              nidWorkitem: NidWorkItem ?? "",
              saveDesc: `بارگذاری اطلاعات جزئیات گزارش انتخاب شده با کد پیگیری ${
                SerialID ?? " --- "
              } در فرم ${this.title} انجام گردید.`
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

    confirm () {
      this.type = "Confirm"
      let path = ""
      if (this.selectedRow.CI_ExecLevel === 254) {
        path = this.clsReportSettingReports.find(
          (f) => f.ReportName === "RptOperationBuildingForm"
        )
      } else if (this.selectedRow.CI_ExecLevel === 255) {
        path = this.clsReportSettingReports.find(
          (f) => f.ReportName === "RptOperationBuildingForm2"
        )
      } else {
        path = this.clsReportSettingReports.find(
          (f) => f.ReportName === "RptBuildingExecRep"
        )
      }
      console.log("path", path)
      this.ReportPath = `${path.ReportPath}`
      this.ArchiveDomain_Engineer = "EngineersCertificate"
      this.confirmBuildingExecRepMain()
    },

    changeStatus () {
      this.type = "ChangeStatus"
      this.ReportPath = ""
      this.ArchiveDomain_Engineer = ""
      this.confirmBuildingExecRepMain()
    },

    async revoke () {
      try {
        const {
          NIdBuildingExecRep,
          NidBuildingReportFormFloors,
          SecretariatNo,
          SecretariatDate,
          SerialID,
          NosaziCodeStr,
          NidWorkItem,
          // eslint-disable-next-line no-unused-vars, camelcase
          CI_ExecLevel
        } = this.selectedRow
        if (NIdBuildingExecRep === GuidEmpty) return

        let repObj = null
        // eslint-disable-next-line camelcase, eqeqeq
        if (CI_ExecLevel == 254) {
          repObj = this.clsReportSettingReports.find(
            // eslint-disable-next-line camelcase, eqeqeq
            (f) => f.ReportName == "RptOperationBuildingForm"
          )
          // eslint-disable-next-line camelcase, eqeqeq
        } else if (CI_ExecLevel == 255) {
          repObj = this.clsReportSettingReports.find(
            // eslint-disable-next-line camelcase, eqeqeq
            (f) => f.ReportName == "RptOperationBuildingForm2"
          )
        } else {
          repObj = this.clsReportSettingReports.find(
            // eslint-disable-next-line camelcase, eqeqeq
            (f) => f.ReportName == "RptBuildingExecRep"
          )
        }

        const payload = {
          pNIdBuildingExecRep: NIdBuildingExecRep,
          pNidBuildingReportFormFloors: NidBuildingReportFormFloors,
          pNidUser_Revoke: this.getNidUser(),
          pSecretariatNo: SecretariatNo || 0,
          pSecretariatDate: SecretariatDate || "",
          pArchiveDomain_Engineer: "EngineersCertificate",
          pReportPath: repObj.ReportPath
        }

        // console.debug("payload revokeBuildingExecRepMain :>> ", payload)

        this.showLoading()
        const { data } =
          await this.$services.engineers.revokeBuildingExecRepMain(payload)
        this.revokeRes = this.getResponse(data)
        if (this.revokeRes.success) {
          this.showSuccess(
            "عملیات ابطال/اصلاح گزارش انتخاب شده با موفقیت انجام گردید."
          )
          await this.log({
            action: this.logActions.cancel,
            bizCode: NIdBuildingExecRep,
            bizCodeTitle: "NIdBuildingExecRep",
            nosaziCode: NosaziCodeStr ?? "",
            nidWorkitem: NidWorkItem ?? "",
            saveDesc: `عملیات ابطال/اصلاح گزارش انتخاب شده با کد پیگیری ${
              SerialID ?? " --- "
            } با موفقیت در فرم ${this.title} انجام گردید.`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async BtnReport (tmpSel) {
      // eslint-disable-next-line eqeqeq
      if (tmpSel.EumReportStatus == EumReportStatus.Confirm) {
        if (
          tmpSel.NidProc !== null &&
          tmpSel.NidProc !== "00000000-0000-0000-0000-000000000000"
        ) {
          this.showLoading()
          this.$services.engineers
            .getBuildingReportFormOperation({
              pNIdBuildingExecRep: tmpSel.NIdBuildingExecRep
            })
            .then(async ({ data }) => {
              this.getBuildingReportFormOperationRes = this.getResponse(data)
              if (this.getBuildingReportFormOperationRes.success) {
                await this.log({
                  action: this.logActions.printReport,
                  bizCode: tmpSel?.NIdBuildingExecRep ?? "",
                  bizCodeTitle: "NIdBuildingExecRep",
                  nosaziCode: tmpSel?.NosaziCodeStr ?? "",
                  nidWorkitem: tmpSel?.NidWorkItem ?? "",
                  saveDesc: `عملیات چاپ اطلاعات گزارش انتخاب شده با کد پیگیری ${
                    tmpSel?.SerialID ?? " --- "
                  } در فرم ${this.title} انجام گردید.`
                })

                if (
                  this.getBuildingReportFormOperationRes.data
                    ?.GetBuildingReport_FormOperationResult
                    ?.BuildingExecRep_Info_Main?.ArchiveNidFile
                ) {
                  const self = this
                  this.showReportArchive = true

                  this.$nextTick(() => {
                    self.$refs.archiveReport.archiveBizCode = tmpSel.NidProc
                  })
                } else {
                  // this.loadReportFromArchive(tmpSel.NidProc)
                  const self = this
                  this.showReportArchive = true

                  this.$nextTick(() => {
                    self.$refs.archiveReport.archiveBizCode = tmpSel.NidProc
                  })
                }
              }
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        } else {
          this.showError("مقدار NidProc صحیح نمیباشد !")
        }
      } else {
        let path = ""
        switch (tmpSel.CI_ExecLevel) {
          case 254:
            path = "RptOperationBuildingForm"
            break
          case 255:
            path = "RptOperationBuildingForm2"
            break
          default:
            path = "RptBuildingExecRep"
            break
        }
        // const reportPath = `/Engineers/${path}`

        const reportPath = `${window.getConfigValue(
          "engineersConfig.reportPath"
        )}/${path}`
        const queryParams = {
          NIdBuildingExecRep: tmpSel.NIdBuildingExecRep,
          UserName: this.getUserDisplayName(),
          FloorNo: tmpSel.CI_ExecFloor ?? 0
        }
        this.showReport(reportPath, queryParams)

        await this.log({
          action: this.logActions.printReport,
          bizCode: tmpSel?.NIdBuildingExecRep ?? "",
          bizCodeTitle: "NIdBuildingExecRep",
          nosaziCode: tmpSel?.NosaziCodeStr ?? "",
          nidWorkitem: tmpSel?.NidWorkItem ?? "",
          saveDesc: `عملیات چاپ جزئیات گزارش انتخاب شده با کد پیگیری ${
            tmpSel?.SerialID ?? " --- "
          } در فرم ${this.title} انجام گردید.`
        })
      }
    },
    async BtnHistoryReport (data) {
      // const reportPath = `/Engineers/RptBuildingExecRep2`
      const reportPath = `${window.getConfigValue(
        "engineersConfig.reportPath"
      )}/RptBuildingExecRep2`
      const queryParams = {
        NIdBuildingExecRep: data?.NIdBuildingExecRep,
        UserName: this.getUserDisplayName(),
        FloorNo: data.CI_ExecFloor ?? 0
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: data.NIdBuildingExecRep,
        bizCodeTitle: "NIdBuildingExecRep",
        nosaziCode: data.NosaziCodeStr ?? "",
        nidWorkitem: data.NidWorkItem ?? "",
        saveDesc: `عملیات چاپ برای گزارش انتخاب شده با کد پیگیری ${
          data.SerialID ?? " --- "
        } در فرم ${this.title} انجام گردید.`
      })
    },
    showCompComment (selectedItem) {
      this.selectedItem = selectedItem
      this.showDecEng = true
    },
    showCompHistory (selectedItem) {
      this.selectedItem = selectedItem
      this.showHistoryEng = true
    },
    showCompCommentReport (selectedItem) {
      this.selectedItem = selectedItem
      this.showCommentReport = true
    },
    showCompArchive (e) {
      this.selectedItem = e
      this.showArchive = true
    },
    showCompHistoryReportTable (e) {
      this.selectedItem2 = e
      this.showHistoryReportTable = true
    },
    showCompDecPolice () {
      if (!this.selectedRow) {
        this.showSuccess("لطفا یک ردیف را انتخاب کرده و دوباره امتحان کنید")
        return
      }
      this.showDecPolice = true
    },
    normalizeParams (array) {
      let result = {}
      for (let element of array) {
        let pair = element.split(";")
        let key = pair[0]
        let value = pair[1]
        if (value === "") {
          value = null
        }
        if (!isNaN(value)) {
          value = Number(value)
        }
        result[key] = value
      }
      return result
    },
    async printReportHandler (e) {
      if (e.DetailComments) {
        const url = e.DetailComments
        const path =
          url.split(".aspx?")[1].split("ReportParameter=")[0] +
          "ReportParameter="
        console.log("path :>> ", path)

        const tmpParams = url
          .split(".aspx?")[1]
          .split("ReportParameter=")[1]
          .split(",")
        const params = this.normalizeParams(tmpParams)

        console.log("params :>> ", params)

        const reportPath = path
        const queryParams = params
        this.showReport(reportPath, queryParams)
        this.log({
          action: this.logActions.printReport,
          bizCode: "",
          bizCodeTitle: ""
        })
      }
    },

    rowClickHandler (e) {
      this.selectedRow = e.data
    },

    getFilterValues (params) {
      try {
        const list = [
          ...new Set(this.kartableList.map((e) => e[params.column.colId]))
        ]
          .filter(Boolean)
          .map((str) => `${str}`.convertToPersian())

        return list
      } catch (ex) {
        return []
      }
    },

    getRowStyle ({ data }) {
      if (!data) return
      if (data.IsObservedBuilding) {
        return {
          backgroundColor: "#f3170075"
        }
      }
    },

    async getEngineersReports () {
      try {
        const { data } = await this.$services.eng.getEngineersReports()
        this.getEngineersReportsRes = this.getResponse(data)
        if (this.getEngineersReportsRes.success) {
          this.clsReportSettingReports =
            this.getEngineersReportsRes?.data?.GetEngineersReportsResult
              ?.EngineersReports?.Reports ?? []
        }
      } catch (e) {
        console.error(e)
      }
    }
  },

  created () {
    const currentDate = new PersianDate()
    this.txtFromDate = currentDate
      .subtract("years", 1)
      .toLocale("en")
      .format("YYYY/MM/DD")
    this.txtToDate = currentDate.toLocale("en").format("YYYY/MM/DD")
    this.getEngineersReports()
  }
}
</script>
