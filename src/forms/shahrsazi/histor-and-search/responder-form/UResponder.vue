<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper @close="redirectToKartable" :title="title">
      <template #header>
        <safa-status :result="getResponserKartablRes" />
        <safa-status :result="getCommissionListInNidProcRes" />
        <safa-status :result="getBaseLibInNosaziCodeRes" />
        <safa-status :result="loadCommissionRes" />
        <q-btn
          v-if="showFormList"
          flat
          dense
          size="12px"
          color="primary"
          icon-right="arrow_back"
          @click="backToMainForm"
          label="بازگشت به فرم اصلی"
        />
      </template>
      <fit v-show="placeholder === 'showFormList'">
        <FormRow class="q-px-sm q-mb-sm">
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="90px"
              :value="baseNosaziCode.District"
              :options="districts"
              source-type="local"
              @input="districtChanged"
              cdcName="district"
            />
          </FormControl>
          <nosazi-code-input
            label="کدنوسازی"
            label-width="90px"
            @enter="reload"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
          />
          <safa-checkbox
            label="نمایش اطلاعات کد نوسازی حذف شده"
            v-model="showDeletedNosaziCode"
            cdcName="showDeletedNosaziCode"
          />
        </FormRow>
        <internal-section default-open title="جستجو" v-model="internalState">
          <FormRow>
            <FormControl>
              <safa-combo
                label="نوع درخواست"
                v-model="selectedWorkFlow"
                cdcName="selectedWorkFlow"
                sourceType="local"
                :options="workFlowItemArray"
                label-width="90px"
                required
                validations="required"
                @input="selectWorkflow"
              />
              <!-- <safa-combo
                :emit-value="false"
                @input="selectWorkflow"
                label="نوع درخواست "
                v-model="selectedWorkFlow"
                cdcName="ShahrsaziArchiveKind"
                label-width="90px"
                source-type="local"
                :options="list"
                type="multiple"
              /> -->
            </FormControl>
            <FormControl>
              <safa-combo-enum
                enum-name="EumRequestStatus"
                label="وضعیت درخواست "
                label-width="90px"
                v-model="filtering.EumRequestStatus"
                cdcName="RequestStatus"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره درخواست "
                v-model="filtering.NidWorkItem"
                cdcName="NidWorkItem"
                label-width="90px"
                @keydown.enter="search"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد قدیم "
                v-model="filtering['Base_PreCodeInfo.PreCode']"
                cdcName="PreCode"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="نام متقاضی "
                v-model="filtering.RequesterName"
                cdcName="RequesterName"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ درخواست از"
                v-model="filtering.RequestDateFrom"
                cdcName="RequestDateFrom"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تا تاریخ "
                v-model="filtering.RequestDateTo"
                cdcName="RequestDateTo"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="تلفن متقاضی "
                v-model="filtering.TelephoneNo"
                cdcName="TelephoneNo"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تاریخ صدور گواهی از"
                v-model="filtering.ExportDateFrom"
                cdcName="ExportDateFrom"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تا تاریخ"
                v-model="filtering.ExportDateTo"
                cdcName="ExportDateTo"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="شماره درخواست قدیم "
                v-model="filtering.NidWorkItemOld"
                cdcName="NidWorkItemOld"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                ci-name="CI_RegisterPlackTypeGroup"
                domain-name="CI_SaraM1"
                label="گروه پلاک ثبتی "
                v-model="
                  filtering['Base_RegisterPlack.CI_RegisterPlackTypeGroup']
                "
                cdcName="RegisterPlackTypeGroup"
                label-width="90px"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="مقدار "
                v-model="filtering['Base_RegisterPlack.RegisterPlackTypeValue']"
                cdcName="RegisterPlackTypeValue"
                label-width="90px"
              />
            </FormControl>
            <div class="q-gutter-sm">
              <btn-search @click="search" />
              <btn-cancel label="پاک کردن" @click="resetFiltering" />
            </div>
          </FormRow>
        </internal-section>
        <safa-splitter horizontal v-model="splitterModel">
          <template #before>
            <!-- <safa-datatable
              helper="responderGrid"
              title="فرم پاسخگو"
              :selectable="true"
              @selectedChange="responseSelected"
              @showFormsClick="showForms"
              @archiveShahrsaziClick="archiveShahrsaziHandler"
              @archiveCommissionClick="archiveCommissionHandler"
              fit
              ref="gridMain"
              v-model="currentData.ResponserKartabl"
              min-height="170px"
              max-height="100%"
              height="100%"
              cdcName="responderGrid"
              :paginate="true"
              :page="page"
              :take="take"
              :serverServe="true"
              :perPage="perPage"
              :countData="totalRow"
              @updatePagination="updatePaging"
            /> -->

            <safa-grid
              title="فرم پاسخگو"
              :columns="responderGridColumns"
              fit
              v-model="tmpModel"
              min-height="170px"
              max-height="100%"
              height="100%"
              rowModelType="serverSide"
              cdcName="responderGrid"
              :checkboxSelection="true"
              :filterable="true"
              :suppressRowClickSelection="false"
              :showRowNumber="true"
              ref="responderGrid"
              id="responderGrid"
              :bordered="true"
              :paginate="true"
              :pageSize="20"
              :cacheBlockSize="20"
              :cacheOverflowSize="2"
              :maxBlocksInCache="10"
              :maxConcurrentDatasourceRequests="1"
              :infiniteInitialRowCount="1000"
              :getRowClass="getRowClass"
              :add-row="false"
              :allow-copy="false"
              :delete-row="false"
              @row:click="responseSelected"
              @pagination:changed="onPaginationChanged"
              @grid:ready="onGridReady"
              @selection:changed="selectionChange"
            />
            <!--:pageable="pageable"
            :skip="skip"
            :take="take"
            :total="totalRow"
            @pagechange="pageChange"-->
          </template>
          <template #after>
            <ResponderDetails
              :formKey="formKey"
              :title="title"
              :name="name"
              :performedActivityResult="performedActivityResult"
              :selectedResponse="selectedResponse"
              :currentNidTask="currentNidTask"
              ref="responderRef"
            />
          </template>
        </safa-splitter>
      </fit>
      <fit v-if="placeholder === 'responder_forms'">
        <responder-forms
          :formKey="formKey"
          :title="title"
          :name="name"
          :task-info="selectedResponse"
          @backToMainForm="backToMainForm"
          @resetSelectedMainKartable="onSetSelectedMainKartable"
        />
      </fit>
      <fit v-else-if="placeholder === 'archive_shahrsazi'">
        <div>
          <btn-back
            class="q-mb-sm"
            label="بازگشت به فرم اصلی"
            @click="backToMainForm"
          />
        </div>
        <ArchiveShahrsazi
          :title="title"
          :formKey="formKey"
          :name="name"
          :dataItem="archiveShahrsaziData"
        />
      </fit>
      <fit v-else-if="placeholder === 'archive_commission'">
        <div>
          <btn-back
            class="q-mb-sm"
            label="بازگشت به فرم اصلی"
            @click="backToMainForm"
          />
        </div>
        <UCommissionArchive
          :formKey="formKey"
          :title="title"
          :name="name"
          :dataItem="archiveCommissionData"
          ref="archiveCommissionRef"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import responderFilteringModel from "./models/responderFiltering"
import responseKartableModel from "./models/responseKartable"
import processInfoModel from "./models/processInfo"
import ResponderForms from "./partials/ResponderForms"
import baseFormMixin from "src/mixins/baseFormMixin"
import ArchiveShahrsazi from "./partials/ArchiveShahrsazi"
import UCommissionArchive from "./partials/UCommissionArchive"
import ResponderDetails from "./partials/ResponderDetails"
import { debounce } from "quasar"
import mapMixin from "src/mixins/mapMixin"

export default {
  components: {
    ResponderForms,
    ArchiveShahrsazi,
    UCommissionArchive,
    ResponderDetails
  },
  mixins: [baseFormMixin, mapMixin],
  data () {
    return {
      name: "UResponder",
      title: "فرم پاسخگو",
      formKey: "d7491b0e-0044-4a37-adbe-e81005baf68d",
      main: true,

      // Columns
      responderGridColumns: [
        {
          field: "RowId",
          title: "ردیف",
          width: "82px"
        },
        {
          field: "isSelected",
          width: "42px",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
        },
        {
          field: "showForms",
          title: "فرمها",
          width: 120,
          cellRenderer: "agCallbackBtn",
          callback: this.showForms,
          cellStyle: {
            padding: "0"
          }
        },
        {
          field: "IsOthersReqAttached",
          title: "پیوست",
          cellRenderer: "agIsOthersReqAttached",
          width: 90
        },
        {
          field: "archiveCommission",
          title: "آرشیو کمیسیون",
          editor: "action",
          width: 120,
          cellRenderer: "agCallbackBtn",
          callback: this.archiveCommissionHandler,
          cellStyle: {
            padding: "0"
          }
        },
        {
          field: "archiveShahrsazi",
          title: "آرشیو شهرسازی",
          editor: "action",
          width: 120,
          cellRenderer: "agCallbackBtn",
          callback: this.archiveShahrsaziHandler,
          cellStyle: {
            padding: "0"
          }
        },

        {
          field: "IsAttached",
          title: "پیوستی",
          valueFormatter: (col, params) => (params.value ? "بلی" : "خیر"),
          width: 100
        },
        {
          field: "IsInBlackList",
          title: "لیست سیاه",
          cellRenderer: "agIsInBlackList",
          width: 100
        },
        {
          field: "NidWorkItem",
          title: "شماره ارجاع"
        },
        {
          field: "NidWorkItemOld",
          title: "شماره درخواست قدیمی"
        },
        {
          field: "RequestStatusTitle",
          title: "وضعیت"
        },
        {
          field: "NosaziCode",
          title: "کد نوسازی"
        },
        {
          field: "PreCode",
          title: "کد قدیم"
        },
        {
          field: "RequesterName",
          title: "نام ثبت درخواست کننده"
        },
        {
          field: "TelephoneNo",
          title: "تلفن متقاضی"
        },
        {
          field: "Cellphone",
          title: "تلفن همراه ثبت کننده درخواست"
        },
        {
          field: "WorkflowTitel",
          title: "نوع درخواست"
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست"
        },
        {
          field: "LastRequestState",
          title: "آخرین وضعیت درخواست"
        },
        {
          field: "LastTaskTitle",
          title: "مرحله درخواست"
        },
        {
          field: "ExportDate",
          title: "تاریخ صدور گواهی"
        },
        {
          field: "GarbageKartablDate",
          title: "تاریخ بایگانی دائم"
        },
        {
          field: "CommentsGarbageKartabl",
          title: "توضیحات ابطال درخواست"
        }
      ],

      // Context
      gridApi: null,
      tmpModel: [],
      loading: false,

      // Responses
      getResponserKartablRes: null,
      getBaseLibInNosaziCodeRes: null,
      getCommissionListInNidProcRes: null,

      workflowListResult: null,

      sidebarCompatible: true,
      // pageNum: '',
      searchTerm: "",
      placeholder: "showFormList",
      showFormList: false,
      splitterModel: 50,
      loadCommissionRes: null,
      currentData: { ...responseKartableModel },
      internalState: true,
      selectedWorkFlow: null,
      selectedResponse: null,
      selectedResponseData: { ...processInfoModel },
      showDeletedNosaziCode: false,
      reportList: [{ ReportTitle: 46597.47999996 }],
      performedActivityResult: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      filtering: { ...responderFilteringModel },
      skip: 0,
      take: 10,
      page: 1,
      total: 34,
      pageable: {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: [20, 50, 75, 100, 150, 200],
        previousNext: true
      },
      archiveShahrsaziData: [],
      archiveCommissionData: [],
      CommentsGarbageKartabl: "",
      currentNidTask: "",
      currentNidProc: "",
      workFlowItemArray: [],
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",
      ciWorkItem: null,
      list: [],
      perPage: 30,
      selectedRequestHelp: null
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.selectedRequestHelp = this.selectedRequest
    }
    this.baseNosaziCode.District = this.districts?.[0]?.ID ?? 0
    this.getShWorkFlow()
    // this.baseNosaziCode.District=this.selectedDistrict
  },

  computed: {
    responserState () {
      return this.$stResponder.getters["responserState"]
    },
    totalRow () {
      if (this.currentData.ResponserKartabl.length > 0) {
        return (this.currentData.ResponserKartabl[0] || {}).TableCount || 0
      } else {
        return 0
      }
    },
    query () {
      const sql = [];
      // NosaziCode fields
      ["District", "Region", "Block", "House", "Building", "Apartment", "Shop"]
        .filter((field) => this.baseNosaziCode[field] !== 0)
        .forEach((field) => {
          sql.push(`BN.${field} = ${this.baseNosaziCode[field]}`)
        });

      // Number fields
      ["Base_RegisterPlack.CI_RegisterPlackTypeGroup"]
        .filter((field) => this.filtering[field] !== null)
        .forEach((field) => {
          sql.push(`(${field} = ${this.filtering[field]})`)
        });

      // Equal Op fields
      [
        "NidWorkItem",
        "EumRequestStatus",
        "Base_RegisterPlack.RegisterPlackTypeValue"
      ]
        .filter(
          (field) =>
            this.filtering[field] !== null && this.filtering[field] !== ""
        )
        .forEach((field) => {
          sql.push(`${field} = N'${this.filtering[field]}'`)
        });

      // Like Op fields
      [
        "Base_PreCodeInfo.PreCode",
        "RequesterName",
        "NidWorkItemOld",
        "TelephoneNo"
      ]
        .filter((field) => this.filtering[field] !== null)
        .forEach((field) => {
          sql.push(`(${field} LIKE N'%${this.filtering[field]}%')`)
        })

      if (this.filtering.worktitleStr != null) {
        sql.push(this.filtering.worktitleStr)
      }
      // Dates fields
      if (
        this.filtering.RequestDateFrom != null &&
        this.filtering.RequestDateFrom !== ""
      ) {
        sql.push(`(RequestDate >= N'${this.filtering.RequestDateFrom}')`)
      }
      if (
        this.filtering.RequestDateTo != null &&
        this.filtering.RequestDateTo !== ""
      ) {
        sql.push(`(RequestDate <= N'${this.filtering.RequestDateTo}')`)
      }
      if (
        this.filtering.ExportDateFrom != null &&
        this.filtering.ExportDateFrom !== ""
      ) {
        sql.push(`(ExportDate >= N'${this.filtering.ExportDateFrom}')`)
      }
      if (
        this.filtering.ExportDateTo != null &&
        this.filtering.ExportDateTo !== ""
      ) {
        sql.push(`(ExportDate <= N'${this.filtering.ExportDateTo}')`)
      }
      if (!sql.length) {
        return ""
      }
      if (this.showDeletedNosaziCode === true) {
        sql.push("***")
      } else {
        sql.push("**")
      }
      return "Where " + sql.join(" And ")
    },
    currentTitle () {
      switch (this.placeholder) {
        case "archive_shahrsazi":
          return "فرم پاسخگو - آرشیو شهرسازی"
        case "archive_commission":
          return "فرم پاسخگو - آرشیو کمیسیون"
        default:
          return "فرم پاسخگو"
      }
    },
    districts () {
      let allowDomains = []
      if (this.currentUser.isSysAdmin) {
        allowDomains = window.getConfigValue("districts")

        return allowDomains.map(m => {
          return {
            ID: m.Id,
            Title: m.Title
          }
        })
      } else {
        if (this.currentUser.jobLocation?.allowDomains ?? false) {
          allowDomains = this.currentUser.jobLocation.allowDomains.split(",")
        } else if (this.currentUser.domain) {
          allowDomains = this.currentUser.domain
        } else {
          allowDomains = []
        }
        if (allowDomains.length > 0) {
          return allowDomains.map(m => {
            return {
              ID: Number(m),
              Title: `${m}`
            }
          })
        } else {
          this.showError("برای کاربر منطقه ای تعریف نشده است.")
          return []
        }
      }
    }
  },
  created () {
    this.getWorkItemList()
    if (this.responserState.currentData) {
      this.restoreCurrentState()
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
    },

    convertToPersian (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ي/g, "ی")
          .replace(/ك/g, "ک")
          .replace(/ة/g, "ه")
          // .replace(/\u06A9/g, "\u0643") // ک
          // .replace(/\u06CC/g, "\u0649") // ی
          // .replace(/\u06CC/g, "\u064A") // ی
          .trim()
      )
    },
    getRowClass ({ data: row }) {
      if (!row) return
      if (row.EumRequestStatus === 0) return "current-request"
      if (row.EumRequestStatus === 1) return "temporary-request"
      if (row.EumRequestStatus === 2) return "permanent-request"
      if (row.EumRequestStatus === 3) return "deleted-request"
    },
    convertToArabic (str) {
      if (typeof str === "number") str = str.toString().trim()
      if (typeof str !== "string") return str
      return (
        str
          .replace(/ی/g, "ي")
          .replace(/ک/g, "ك")
          // // .replace(/ه/g, 'ة')
          .replace(/\u0643/g, "\u06A9") // ک
          // .replace(/\u0649/g, '\u06CC') // ی
          // .replace(/\u064A/g, '\u06CC') // ی
          .trim()
      )
    },
    getShWorkFlow () {
      let self = this
      let WorkflowList = {}
      this.showLoading()
      this.$services.SA.loadNeworkflowList(WorkflowList, {
        config: { District: this.selectedDistrict }
      })
        .then(({ data }) => {
          self.workflowListResult = this.getResponse(data)
          if (self.workflowListResult.success) {
            self.workflowListResults = self.workflowListResult.data
            this.workFlowItemArray =
              self.workflowListResults.Sh_NewWorkflowList.map((x) => ({
                ID: x.WorkflowTitel,
                Title: x.WorkflowTitel
              }))
            /* .sort(({ Title: xID }, { Title: yID }) => {
            if (xID < yID) {
              return -1
            }
            if (xID > yID) {
              return 1
            }
            return 0
          }) */
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    selectWorkflow (e) {
      let str =
        "( w.WorkflowTitel LIKE N'%" +
        this.convertToArabic(e) +
        "%' " +
        "OR " +
        "w.WorkflowTitel LIKE N'%" +
        this.convertToPersian(e) +
        "%') "
      this.filtering.worktitleStr = str
    },
    async getWorkItemList () {
      await this.$ci.get({
        name: "CI_ShahrsaziArchiveKind",
        domain: "CI_SaraM1",
        callback: (list) => {
          this.list = [...list]
        }
      })
    },
    onPaginationChanged (params) {
      // if (params.newPage) {
      // this.getResponserKartabl()
      // }
    },

    storeCurrentState () {
      this.$stResponder.dispatch("setResponserState", {
        currentData: this.currentData,
        baseNosaziCode: this.baseNosaziCode,
        showDeletedNosaziCode: this.showDeletedNosaziCode
        // filter: this.filter
      })
    },
    restoreCurrentState () {
      this.currentData = this.responserState.currentData || []
      this.baseNosaziCode = this.responserState.baseNosaziCode || {}
      this.showDeletedNosaziCode = this.responserState.showDeletedNosaziCode
      // this.filter = {
      //   ...this.responserState.filter
      // }

      // this.$refs.kartable.applyFilters(this.filter || [])
    },
    backToMainForm () {
      this.placeholder = "showFormList"
      this.showFormList = false
    },
    districtChanged (District) {
      this.baseNosaziCode = { ...this.baseNosaziCode, District }
    },
    resetFiltering () {
      this.filtering = { ...responderFilteringModel }
      this.selectedWorkFlow = null
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    },
    onSetSelectedMainKartable () {
      this.$stKartable.dispatch("setSelectedRequest", this.selectedResponse)
      console.log(this.selectedResponse)
    },
    showForms (selectedItem) {
      this.selectedResponse = {
        ...selectedItem,
        BizCode: selectedItem.NosaziCode
      }
      if (
        !this.selectedResponse.NidProc ||
        this.selectedResponse.NidProc === "00000000-0000-0000-0000-000000000000"
      ) {
        return this.showError("پروسه یافت نشد. NidProc Not Found")
      }
      this.placeholder = "responder_forms"
      this.showFormList = true
    },
    archiveShahrsaziHandler (selectedItem) {
      this.placeholder = "archive_shahrsazi"
      this.archiveShahrsaziData = selectedItem
    },
    async archiveCommissionHandler (selectedItem) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getCommissionListInNidProc(
          { pNidProc: selectedItem.NidProc },
          { config: { District: selectedItem.District } }
        )
        this.getCommissionListInNidProcRes = this.getResponse(data)
        if (this.getCommissionListInNidProcRes.success) {
          const res = this.getCommissionListInNidProcRes.data
          if (res.IsAnyCommisionInNosaziCode_) {
            if (!res.ErrorResult.BizErrors.length > 0) {
              this.placeholder = "archive_commission"
              if (res.Commission_ArchiveRoot !== null || "") {
                console.log(res.Commission_ArchiveRoot)
              } else {
                this.showError(
                  "بدلیل ارتباط نداشتن با کمیسیون و یا ارسال نشدن به کمیسیون سوابق موجود نمی باشد."
                )
              }
            } else {
              this.showError(res.ErrorResult.BizErrors)
            }
            await this.log({
              action: this.logActions.save,
              bizCode: selectedItem.NosaziCode,
              bizCodeTitle: "baseNosaziCode",
              nosaziCode: selectedItem.NosaziCode
            })
          } else {
            if (
              Array.isArray(res.CommissionList_InNidProc) &&
              res.CommissionList_InNidProc.length > 0
            ) {
              await this.loadCommission(
                res.CommissionList_InNidProc[0].NidCommission,
                selectedItem.District
              )
            } else {
              this.showError("اطلاعات کمیسیون یافت نشد.")
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadCommission (nidCommission, district) {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadCommission(
          { pNidCommission: nidCommission },
          { config: { District: district } }
        )
        this.loadCommissionRes = this.getResponse(data)
        if (this.loadCommissionRes.success) {
          const res = this.loadCommissionRes.data
          this.placeholder = "archive_commission"
          this.$nextTick(() => {
            this.$refs.archiveCommissionRef.updateArchiveBizCode(
              res.Commission_ArchiveRoot
            )
            this.$refs.archiveCommissionRef.showArchive = true
          })
          console.log("loadCommissionRes.data :>> ", res)
          await this.log({
            action: this.logActions.view,
            bizCode: nidCommission,
            bizCodeTitle: "NidCommission"
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    showReportClick ({ dataItem }) {
      // console.log('showReport', dataItem)
    },

    responseSelected ({ data: row }) {
      this.selectedResponse = row || {}
      this.showSelectedRequestOnMap(row)
      this.loadPerformedActivity()
      this.$nextTick(() => {
        this.$refs.responderRef.getAllFiches()
      })
    },
    // pageChange(e) {
    //   this.skip = e.page.skip;
    //   this.take = e.page.take;
    //   this.load();
    // },
    async reload (value) {
      this.baseNosaziCode = { ...value }
      this.skip = 0
      this.take = 10
      if (this.baseNosaziCode?.District && !this.districts.filter(x => x.ID === this.baseNosaziCode.District).length)
      {
        this.showError('کد انتخاب شده در محل خدمت کاربر نمی باشد.')
        return
      }
      await this.load()
      await this.getShWorkFlow()
    },
    loadPerformedActivity () {
      if (!this.selectedResponse) {
        this.performedActivityResult = []
        return
      }
      this.$srvWorkflow
        .getAllTaskByNidProc({ NidProc: this.selectedResponse.NidProc })
        .then(({ data }) => {
          this.performedActivityResult = data.data
          if (data.data.length > 0) {
            this.currentNidTask = data.data[0].NidTask
          }
          // console.log(this.currentNidTask, '@@@')
          // this.currentNidProc = data.data[0].NidProc
        })
        .catch((response) => {
          console.log("error .....................", response)
          console.error(response, "responseError")
        })
    },
    showSelectedRequestOnMap: debounce(function (row) {
      const { NosaziCode, WKT } = row
      // const isValidBizCode = BizCode && BizCode.indexOf("-") > -1
      const isValidWKT = !!WKT

      this.mapClear()
      if (isValidWKT) this.showWKT(row, true, null, false, "task")
      setTimeout(
        () => {
          this.showCodeOnMap(NosaziCode)
        },
        isValidWKT ? 10 : 0
      )
    }, 500),
    // async fetchProcess () {
    //   const { NidProc } = this.selectedResponse || {}
    //   if (!NidProc || NidProc === '00000000-0000-0000-0000-000000000000') {
    //     return
    //   }
    //   try {
    //     this.showLoading()

    //     this.reportList = []
    //     this.selectedResponseData = { ...processInfoModel }
    //     const { data } = await this.$services.task.getProcessInfo(
    //       {
    //         PNidProc: NidProc
    //       },
    //       this.config
    //     )
    //     this.result = this.getResponse(data)
    //     if (this.result.success !== true) {
    //       return this.showError('اطلاعات درخواست بارگذاری نشد')
    //     }
    //     this.selectedResponseData = this.result.data
    //     this.selectedResponseData.Task = this.selectedResponseData.Task.sort(
    //       (x, y) => x.NidSort - y.NidSort
    //     )

    //     this.reportList = [
    //       {
    //         ReportName: '/Sara8Reports/rptRequestComments',
    //         ReportTitle: 'توضیحات درخواست'
    //       }
    //     ]
    //     await this.log({
    //       action: this.logActions.view,
    //       bizCode: NidProc,
    //       bizCodeTitle: 'NidProc'
    //     })
    //     // end
    //   } catch (error) {
    //     console.error(error, 'error')
    //     this.showError('خطایی در سرویس رخ دارد')
    //   } finally {
    //     this.hideLoading()
    //   }
    // },

    async load () {
      try {
        this.showLoading()
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          {
            pNosaziCode: this.baseNosaziCode,
            pLoadFunc:
              "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
            pIsLoadDeletedNosaziCode: false
          },
          { config: { District: this.baseNosaziCode.District } }
        )

        this.getBaseLibInNosaziCodeRes = this.getResponse(data)
        if (this.getBaseLibInNosaziCodeRes.success !== true) {
          return this.showError("اطلاعات بارگذاری نشد")
        }
        // this.CommentsGarbageKartabl = this.result.data.Sh_RequestInfo.CommentsPermanentKartabl;
        this.nidNosaziCode = this.getBaseLibInNosaziCodeRes.data._NidNosaziCode
        if (this.gridApi) this.getResponserKartabl()
        // end
      } catch (error) {
        console.error(error, "error")
        this.showError("خطایی در سرویس رخ دارد")
      } finally {
        this.hideLoading()
      }
    },
    async getResponserKartabl () {
      // if (

      //   !this.baseNosaziCode ||
      //   (this.baseNosaziCode && this.baseNosaziCode.District === 0)
      // ) {
      //   return this.showError('لطفا منطقه را برای کد نوسازی تعیین نمایید')
      // }
      const _this = this

      if (_this.loading) return false
      _this.loading = true
      let district = this.baseNosaziCode.District
      if (this.selectedRequestHelp) {
        district = this.baseNosaziCode.District ? this.baseNosaziCode.District : this.selectedNosaziCode.District
      }

      _this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            _this.showLoading()
            // #region payload & config
            const payload = {
                pFromRow: params.request.startRow,
                pToRow: params.request.endRow,
                pWhere: _this.query
              },
              config = {
                config: {
                  District: district
                }
              }
            // #endregion

            const { data } = await _this.$services.SC.getResponserKartabl(
              payload,
              config
            )
            _this.getResponserKartablRes = _this.getResponse(data)
            if (!_this.getResponserKartablRes.success) {
              _this.showError("اطلاعات بارگذاری نشد")
              throw new Error("")
            }

            const strNosaziCode = convertNosaziCodeObjectToString(
              _this.baseNosaziCode
            )

            _this.currentData = _this.getResponserKartablRes.data
            _this.internalState = false

            _this.log({
              action: _this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "baseNosaziCode",
              nosaziCode: strNosaziCode
            })
            let gridData = _this.currentData.ResponserKartabl.map((row, _i) => {
              return {
                ...row,
                RowId: ++_i
              }
            })
            // const rowsThisPage = gridData.slice(
            //   params.request.startRow,
            //   params.request.endRow
            // );
            // if on or after the last page, work out the last row.
            // let lastRow = -1;
            // if (gridData.length <= params.request.endRow) {
            //   lastRow = gridData.length;
            // }
            const dynamicLength =
              (gridData[0]?.TableCount <= gridData.length
                ? gridData.length
                : gridData[0]?.TableCount) || 0
            params.success({
              rowData: gridData,
              rowCount: dynamicLength
            })

            // params.success(rowsThisPage, lastRow)
          } catch (ex) {
            params.fail()
          } finally {
            _this.hideLoading()
            _this.loading = false
            _this.storeCurrentState()
          }
        }
      })
    },
    async search () {
      if (this.baseNosaziCode?.District && !this.districts.filter(x => x.ID === this.baseNosaziCode.District).length)
      {
        this.showError('کد انتخاب شده در محل خدمت کاربر نمی باشد.')
        return
      }
      await this.getResponserKartabl()
      this.gridApi.refreshServerSide({
        purge: true
      })

      this.showOnMap()
    },
    selectionChange (e) {
      console.log("selectionChange", e)
    },
    showOnMap () {}
  },

  watch: {
    loading (val) {
      if (this.gridApi) {
        if (val) {
          this.gridApi.showLoadingOverlay()
        } else {
          this.gridApi.hideOverlay()
        }
      }
    }
    // selectedDistrict: {
    //   handler () {
    //     this.baseNosaziCode.District = this.selectedDistrict
    //   },
    //   deep: true
    // }
  }
}
</script>
