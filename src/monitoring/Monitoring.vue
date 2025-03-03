<template>
  <form-wrapper fullscreen hide-close hide-title vertical>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            :list="cUsers"
            placeholder="نام کاربر"
            label="نام کاربر"
            label-width="76px"
            v-model="dm.userName"
            cdcName="userName"
            :title="dm.userName"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.userName !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.userName = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            v-model="dm.actionType"
            cdcName="actionType"
            label="نوع فعالیت"
            placeholder="نوع فعالیت"
            label-width="76px"
            :list="cActionType"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.actionType !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.actionType = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            :list="cIP"
            placeholder="آی پی"
            label="آی پی"
            label-width="76px"
            v-model="dm.ip"
            cdcName="ip"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.ip !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.ip = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            :list="cFormsCaption"
            placeholder="نام فرم"
            label="عنوان بخش"
            label-width="76px"
            v-model="dm.formCaption"
            cdcName="formCaption"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.formCaption !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.formCaption = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="از تاریخ"
            label-width="76px"
            v-model="dm.fromLogDate"
            cdcName="fromLogDate"
            @search="search"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تا تاریخ"
            label-width="76px"
            v-model="dm.toLogDate"
            cdcName="toLogDate"
            @search="search"
            :maxDate="maxToLogDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            :list="cUserGroup"
            placeholder="گروه کاربر"
            label="گروه کاربر"
            label-width="76px"
            v-model="dm.userGroup"
            cdcName="userGroup"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.userGroup !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.userGroup = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <FormControl>
          <safa-text
            :list="cIsOperationFailed"
            placeholder="نوع عملیات"
            label="نوع عملیات"
            label-width="76px"
            v-model="dm.isOperationFailed"
            cdcName="isOperationFailed"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.isOperationFailed !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.isOperationFailed = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl>
        <!-- <FormControl>
          <safa-text
            :list="cDescription"
            placeholder="توضیحات"
            label="توضیحات"
            label-width="76px"
            v-model="dm.description"
            cdcName="description"
            @focus="fetchAutoCompletes()"
            @keyup.enter="search"
          >
            <template v-slot:append>
              <q-icon
                v-if="dm.description !== ''"
                style="position: relative; right: 5px"
                size="xs"
                color="primary"
                @click="dm.description = ''"
                name="clear"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </FormControl> -->
        <div class="col q-gutter-x-sm">
          <btn-search @click="search" label="جستجو" size="11px" />
          <btn-default @click="clearFilter" label="حذف فیلتر" size="11px" />
        </div>
      </FormRow>
      <safa-grid
        title="لیست فعالیت ها"
        :value="[]"
        m="r"
        :columns="activitiesColumns"
        :suppressRowClickSelection="false"
        :allowMultipleSelection="false"
        :allowSelectionWhenReadonlyMode="false"
        :selectable="false"
        fit
        min-height="400px"
        height="100%"
        max-height="100%"
        :getRowStyle="getRowStyle"
        :paginate="true"
        :pageSize="pageSize"
        :cacheBlockSize="pageSize"
        :animateRows="true"
        rowModelType="serverSide"
        @grid:ready="onGridReady"
      >
        <template #cell-userCode="{ row, col, onChangeCellValue }">
          <AgAvatarGridTemplate
            label-width="auto"
            @input="
              onChangeCellValue({
                field: col.field,
                dataItem: row,
                value: $event,
              })
            "
            :value="row[col.field]"
          />
        </template>
      </safa-grid>

      <safa-popup
        v-model="showLogDetail"
        title="جزئیات فعالیت"
        width="900px"
        height="650px"
      >
        <ChangeSetViewer :data="moreDetail" />
      </safa-popup>
      <safa-popup
        v-model="showMoreDetail"
        title="جزئیات بیشتر"
        width="900px"
        height="515px"
      >
        <NewDetails :data="moreDetail" class="activityDetails" />
      </safa-popup>
    </fit>
  </form-wrapper>
</template>
<script>
import monitoringMixin from "./mixins/monitoringMixin"

import ChangeSetViewer from "./partials/ChangeSetViewer.vue"
import NewDetails from "./partials/NewDetails.vue"

import {
  getSummary,
  getMonitoringActivity,
  getMonitoringActivityDetails
} from "./services/monitoring"

export default {
  mixins: [monitoringMixin],
  components: {
    ChangeSetViewer,
    NewDetails
  },

  computed: {
    activitiesColumns () {
      let op = {
        filterable: false,
        sortable: true
      }
      return [
        {
          field: "actions",
          title: "",
          width: "60px",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          resizable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: "AgCallbackBtn",
          btnIcon: "dvr",
          callback: (params) => this.logDetail(params),
          sortable: false,
          filterable: false
        },
        {
          field: "actions",
          title: "",
          width: "60px",
          cellStyle: {
            padding: 0,
            margin: 0
          },
          resizable: false,
          lockPosition: true,
          pinned: "right",
          cellRenderer: "AgCallbackBtn",
          btnIcon: "more_horiz",
          callback: (params) => this.moreDetailHandler(params),
          sortable: false,
          filterable: false
        },
        {
          field: "userCode",
          title: "",
          width: "50px",
          cellRenderer: "AgAvatarGridTemplate",
          resizable: false,
          lockPosition: true,
          pinned: "right",
          sortable: false,
          filterable: false
        },
        {
          field: "userName",
          title: "کاربر",
          width: "200px",
          resizable: false,
          lockPosition: true,
          pinned: "right",
          ...op
        },
        {
          field: "actionType",
          title: "نوع فعالیت",
          width: "150px",
          ...op
        },
        {
          field: "ip",
          title: "آی پی",
          width: "150px",
          ...op
        },
        {
          field: "formCaption",
          title: "عنوان بخش (نام فرم)",
          width: "200px",
          ...op
        },
        {
          field: "logDate",
          title: "تاریخ ثبت",
          width: "150px",
          ...op
        },
        {
          field: "logTime",
          title: "زمان ثبت",
          width: "150px",
          ...op
        },
        {
          field: "userGroup",
          title: "گروه کاربر",
          width: "150px",
          ...op
        },
        {
          field: "isOperationFailed",
          title: "نوع عملیات",
          width: "150px",
          ...op
        },
        {
          field: "description",
          title: "توضیحات",
          width: "400px",
          ...op
        }
      ]
    },
    maxToLogDate () {
      return this.currentDate()
    },
    cUsers () {
      return this.ac.userNames.filter((f) => f.includes(this.dm.userName))
    },
    cUserGroup () {
      return this.ac.userGroups.filter((f) => f.includes(this.dm.userGroup))
    },
    cIsOperationFailed () {
      return this.ac.isOperationFaileds.filter((f) =>
        f.includes(this.dm.isOperationFailed)
      )
    },
    // cDescription () {
    //   return this.ac.descriptions.filter((f) => f.includes(this.dm.description))
    // },
    cFormsCaption () {
      return this.ac.formsCaption.filter((f) =>
        f.includes(this.dm.formCaption)
      )
    },
    cComputerName () {
      return this.ac.computerName.filter((f) =>
        f.includes(this.dm.computerName)
      )
    },
    cRequestType () {
      return this.ac.workFlow.filter((f) => f.includes(this.dm.requestType))
    },
    cFeildsCaption () {
      return this.ac.feildCaption.filter((f) =>
        f.includes(this.dm.feildCaption)
      )
    },
    cIP () {
      return this.ac.ip.filter((f) => f.includes(this.dm.ip))
    },
    cActionType () {
      return this.actionsTypeOptions.filter((item) =>
        item.startsWith(this.dm.actionType)
      )
    },
    cJobLocation () {
      return this.ac.jobLocation.filter((f) => f.includes(this.dm.jobLocation))
    },
    cApplicationsName () {
      return this.ac.applicationsName.filter((f) =>
        f.includes(this.dm.applicationsName)
      )
    },
    cApplicationsTitle () {
      return this.ac.applicationsTitle.filter((f) =>
        f.includes(this.dm.applicationsTitle)
      )
    }
  },

  data () {
    return {
      showLogDetail: false,
      showMoreDetail: false,
      moreDetail: null,
      changeset: [],

      userNames: [],

      dm: {
        requestType: "",
        fromLogDate: this.currentDate(),
        toLogDate: this.currentDate(),
        userName: "",
        userGroup: "",
        isOperationFailed: "",
        // description: "",
        computerName: "",
        formCaption: "",
        ip: "",
        jobLocation: "",
        refrenceNumber: "",
        nosaziCode: "",
        fieldName: "",
        fieldContent: "",
        bizCode: "",
        nidKartabl: "",
        feildCaption: "",
        feildCaptionValue: "",
        actionType: "",
        applicationsName: "",
        applicationsTitle: ""
      },
      actionsTypeOptions: [],

      filter: null,
      pageSize: 500,
      ac: {
        computerName: [],
        formsCaption: [],
        feildCaption: [],
        userNames: [],
        userGroups: [],
        isOperationFaileds: [],
        // descriptions: [],
        ip: [],
        jobLocation: [],
        workFlow: [],
        actiontype: [],
        applicationsName: [],
        applicationsTitle: []
      },
      gridApi: null,
      isLoading: false
    }
  },

  watch: {
    defaultFilter (val) {
      this.filter = val
    },
    extraRequestParams () {},
    dm: {
      handler () {
        // this.fetchAutoCompletes()
        // this.search()
      },
      deep: true
    },
    "dm.userName": {
      handler (n) {
        if (n === "") {
          this.userNames = []
          this.fetchAutoCompletes()
        }
      },
      deep: true
    },
    "dm.userGroup": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.isOperationFailed": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    // "dm.description": {
    //   handler (n) {
    //     if (n === "") this.fetchAutoCompletes()
    //   },
    //   deep: true
    // },
    "dm.formCaption": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.computerName": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.ip": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.requestType": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.feildCaption": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.actionType": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.jobLocation": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.applicationsName": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    },
    "dm.applicationsTitle": {
      handler (n) {
        if (n === "") this.fetchAutoCompletes()
      },
      deep: true
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
      this.setKartableDatasource()
    },

    search () {
      this.gridApi.paginationGoToFirstPage()
      this.gridApi.refreshServerSide()
    },

    async setKartableDatasource () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          console.log("params", params)
          try {
            const { startRow, endRow, sortModel } = params.request
            if (startRow >= 10000) {
              this.showError(
                "با توجه به حجم بالای اطلاعات، لطفا بازه تاریخی کمتری جستجو نمایید. یا جهت جستجو از فیلتر بیشتری، استفاده نمایید.",
                { title: "خطا در دریافت اطلاعات" }
              )
              this.$nextTick(() => {
                params.api.paginationGoToFirstPage()
              })
              return
            }
            this.isLoading = true

            const payload = {
              ...this.getFilterParams(),
              PagingContext: {
                Skip: startRow,
                Take: endRow - startRow
              }
            }
            if (sortModel && sortModel.length > 0) {
              // userName
              // actionType
              // ip
              // formCaption
              // logDate
              // logTime
              // userGroup
              // isOperationFailed
              // description

              payload.SortDescriptors = [
                {
                  FieldName: sortModel[0].colId,
                  SortOrder: sortModel[0].sort // "asc" or "desc"
                }
              ]
            }

            console.log("payload getMonitoringActivity", payload)
            const { data } = await getMonitoringActivity(payload)
            if (data && data.searchResult) {
              let rowData = this.normalizeModel(data.searchResult)
              return params.success({
                rowData,
                rowCount: data.totalCount || 0
              })
            } else {
              this.showError("لیست فعالیت ها بارگذاری نشد.")
              return params.success({
                rowData: [],
                rowCount: 0
              })
            }
          } catch (e) {
            params.success({
              rowData: [],
              rowCount: 0
            })
            console.error(e)
            return params.fail()
          } finally {
            this.isLoading = false
          }
        }
      })
    },
    async logDetail (row) {
      await this.findById(row.id)
      this.changeset = []
      const feildCaption = row.filterModel.feildCaption
      if (feildCaption !== "") {
        const fc = this.normalizeFilterValue(feildCaption)
        const filtered = this.moreDetail.action.formChangeSet.filter(
          ({ fieldCaption }) => fieldCaption === fc
        )
        this.moreDetail.action.formChangeSet = filtered
      }
      this.showLogDetail = true
    },
    async moreDetailHandler (row) {
      await this.findById(row.id)
      this.showMoreDetail = true
    },
    async findById (id) {
      try {
        const res = await getMonitoringActivityDetails({ ID: id })
        this.moreDetail =
          res && res.data && res.data.length > 0 ? res.data[0] : {}
      } catch (e) {
        console.error(e)
      } finally {
      }
    },
    normalizeFilterValueDetail (val) {
      if (!val) return ""
      return val.split(":")[0]
    },
    mapActions (arrayVal) {
      const data = []
      data.push(
        ...arrayVal.map((x, i) => {
          const r = {}
          r.ID = x.title
          r.count = x.count
          r.title = this.actionTypeCodeToTitle(x.title)
          return r
        })
      )
      return data
    },
    normalizeModel (e) {
      if (!Array.isArray(e)) return []
      const tmpList = e.map((x, i) => {
        const rowNo = 1
        const t = x?.isOperationFailed || false
        return {
          ...x,
          id: x?.id ?? "",
          workFlowType: x?.workFlowType ?? "",
          userName: x?.userName ?? "",
          logDate: x?.logDate ?? "",
          logTime: x?.logTime ?? "",
          logDateEn: x?.logDateEn ?? "",
          ip: x?.ip ?? "",
          actionType: x?.actionType ?? 1,
          formCaption: x?.formCaption ?? "",
          applicationName: x?.applicationName ?? "",
          applicationTitle: x?.applicationTitle ?? "",
          computerName: x?.computerName ?? "",
          description: x?.description ?? "",
          isChecksumValid: x?.isChecksumValid ?? false,
          logLevel: x?.logLevel ?? 2,
          userGroup: x?.userGroup ?? "",

          filterModel: this?.dm ?? {},
          rowNo: rowNo + i,
          isOperationFailed: t === true ? "ناموفق" : "موفق"
        }
      })
      return tmpList.map((item) => {
        return {
          ...item,
          formCaption: item.formCaption !== '' ? `${item.formCaption} در ${item.applicationTitle}` : `${item.applicationTitle}: ${item.description}`,
          actionType: this.actionTypeCodeToTitle(item.actionType)
        }
      }) ?? []
    },
    normalizeFilterValue (val) {
      if (!val) return ""
      return val.split(":")[0]
    },
    clearFilter () {
      this.dm.userName = ""
      this.dm.userGroup = ""
      this.dm.isOperationFailed = ""
      // this.dm.description = ""
      this.dm.formCaption = ""
      this.dm.computerName = ""
      this.dm.nidKartabl = ""
      this.dm.ip = ""
      this.dm.bizCode = ""
      this.dm.nosaziCode = ""
      this.dm.requestType = ""
      this.dm.feildCaption = ""
      this.dm.feildCaptionValue = ""
      this.dm.applicationsName = ""
      this.dm.applicationsTitle = ""
      this.dm.fromLogDate = this.currentDate()
      this.dm.toLogDate = this.currentDate()
      this.dm.actionType = ""
      this.dm.jobLocation = ""
    },
    getFilterParams () {
      const payload = {}
      const normalize = this.normalizeFilterValue
      const {
        userName,
        userGroup,
        isOperationFailed,
        // description,
        computerName,
        formCaption,
        bizCode,
        ip,
        jobLocation,
        fromLogDate,
        toLogDate,
        nosaziCode,
        nidKartabl,
        feildCaptionValue,
        feildCaption,
        requestType,
        actionType,
        refrenceNumber,
        applicationsName,
        applicationsTitle
        // nosaziCode,
        // fieldName,
        // fieldContent
      } = this.dm
      // set filter
      if (userName) {
        payload.SelectedUserNames = [
          { Title: normalize(this.convertTextToPersian(userName)) }
        ]
      }
      if (userGroup) {
        payload.SelectedUserGroups = [
          { Title: normalize(this.convertTextToPersian(userGroup)) }
        ]
      }
      if (isOperationFailed) {
        payload.SelectedIsOperationFaileds = [
          { Title: normalize(this.convertTextToPersian(isOperationFailed)) }
        ]
      }
      // if (description) {
      //   payload.SelectedDescriptions = [
      //     { Title: normalize(this.convertTextToPersian(description)) }
      //   ]
      // }
      if (applicationsName) {
        payload.SelectedApplicationNames = [
          { Title: normalize(this.convertTextToPersian(applicationsName)) }
        ]
      }
      if (applicationsTitle) {
        payload.SelectedApplicationTitles = [
          { Title: normalize(this.convertTextToPersian(applicationsTitle)) }
        ]
      }
      if (formCaption) {
        payload.SelectedFormsCaption = [{ Title: normalize(formCaption) }]
      }
      if (requestType) {
        payload.SelectedWorkFlow = [
          { Title: normalize(this.convertTextToPersian(requestType)) }
        ]
      }
      if (jobLocation) {
        payload.SelectedJobLocations = [
          { Title: normalize(this.convertTextToPersian(jobLocation)) }
        ]
      }
      if (actionType) {
        payload.SelectedActionType = [
          {
            Title: this.actionTypeTitleToCode(
              this.convertTextToPersian(actionType)
            )
          }
        ]
      }
      if (computerName) {
        payload.ComputerName = normalize(
          this.convertTextToPersian(computerName)
        )
      }
      if (bizCode) {
        payload.BizCode = normalize(this.convertTextToPersian(bizCode))
      }
      if (ip) payload.IP = normalize(this.convertTextToPersian(ip))
      if (nosaziCode) payload.NosaziCode = normalize(nosaziCode)
      if (refrenceNumber) {
        payload.refrenceNumber = normalize(
          this.convertTextToPersian(refrenceNumber)
        )
      }
      if (feildCaption) {
        payload.SelectedFeildCaption = normalize(
          this.convertTextToPersian(feildCaption)
        )
      }
      if (feildCaptionValue) {
        payload.FeildCaptionValue = normalize(
          this.convertTextToPersian(feildCaptionValue)
        )
      }
      if (nidKartabl) payload.NidKartabl = normalize(nidKartabl)
      if (fromLogDate) payload.FromLogDate = normalize(fromLogDate)
      if (toLogDate) payload.ToLogDate = normalize(toLogDate)
      // if (this.dm.feildCaptionValue !== '') payload.Operator = '=' // '> < = <>' برای فیلتر در مقدار فیلد
      return payload
    },
    async fetchAutoCompletes () {
      try {
        if (this.dm.userName === undefined) {
          this.dm.userName = ""
        }
        if (this.dm.formCaption === undefined) {
          this.dm.formCaption = ""
        }
        if (this.dm.jobLocation === undefined) {
          this.dm.jobLocation = ""
        }
        const payload = this.getFilterParams()
        const { data } = await getSummary(payload)
        this.ac.ip = data.ip.map((x) => `${x.title}: (${x.count})`)
        this.ac.jobLocation = data.jobLocationType.map(
          (x) => `${x.title}: (${x.count})`
        )
        this.ac.workFlow = data.workFlow.map((x) => `${x.title}: (${x.count})`)
        this.ac.computerName = data.computerName.map(
          (x) => `${x.title}: (${x.count})`
        )
        const tmpFormsCaption = this.normalizeDuplicateByNull(
          data.formsCaption,
          false
        )
        this.ac.formsCaption = tmpFormsCaption.map(
          (x) => `${x.title}: (${x.count})`
        )
        this.ac.feildCaption = data.feildsCaption.map(
          (x) => `${x.title}: (${x.count})`
        )
        const tmpUsers = this.normalizeDuplicateByNull(data.userNames)
        this.ac.userNames = tmpUsers.map(
          (x) => `${x.title.split("|")[0]}: (${x.count})`
        )
        const tmpUserGroup = data?.userGroups ?? []
        this.ac.userGroups = tmpUserGroup.map(
          (x) => `${x.title.split("|")[0]}: (${x.count})`
        )
        const tmpIsOperationFailed = data?.isOperationFaileds ?? []
        this.ac.isOperationFaileds = tmpIsOperationFailed.map(
          (x) => `${x.title.split("|")[0]}: (${x.count})`
        )
        // const tmpDescription = data?.descriptions ?? []
        // this.ac.descriptions = tmpDescription.map(
        //   (x) => `${x.title.split("|")[0]}: (${x.count})`
        // )
        this.ac.workFlow = data.workFlow.map((x) => `${x.title}: (${x.count})`)
        const dataActionsTypeList = this.mapActions(data.actionsType)
        this.ac.actiontype = dataActionsTypeList.map(
          (x) => `${x.title}: (${x.count})`
        )
        this.actionsTypeOptions = []
        dataActionsTypeList.forEach((item) => {
          this.actionsTypeOptions.push(item.title)
        })
        this.ac.applicationsName = data.applicationsName.map(
          // (x) => `${x.title.split('|')[0]}: (${x.count})`
          (x) => `${x.title.split("|")[0]}`
        )
        if (data.applicationsTitle) {
          this.ac.applicationsTitle = data.applicationsTitle.map(
            // (x) => `${x.title.split('|')[0]}: (${x.count})`
            (x) => `${x.title.split("|")[0]}`
          )
        } else {
          this.ac.applicationsTitle = []
        }
      } catch (e) {
        console.error("getSummaryError :>> ", e)
      }
    },
    normalizeDuplicateByNull (list, hasNull = true) {
      if (hasNull === true) {
        const tmp = list
          .filter((f) => f.title !== "null|null")
          .sort((b, a) => {
            const [, aGuid] = a.title.split("|")
            const [, bGuid] = b.title.split("|")
            if (aGuid === "null" && bGuid !== "null") {
              return -1
            } else if (aGuid !== "null" && bGuid === "null") {
              return 1
            } else {
              return 0
            }
          })
        const _l = tmp.reduce((acc, curr) => {
          const [name, guid] = curr.title.split("|")
          const existingItem = acc.find((item) => item.title.startsWith(name))
          if (existingItem) {
            existingItem.count += curr.count
          } else {
            acc.push({
              count: curr.count,
              title: `${name}|${
                guid ||
                acc
                  .find((item) => item.title.includes(name))
                  .title.split("|")[1] ||
                null
              }`
            })
          }
          return acc
        }, [])
        return _l
      } else {
        return list.reduce((acc, curr) => {
          const existingItem = acc.find((item) => item.title === curr.title)
          if (existingItem) {
            existingItem.count += curr.count
          } else {
            acc.push(curr)
          }
          return acc
        }, [])
      }
    },
    getRowStyle ({ data }) {
      if (!data) return {}
      const c = window.getConfigValue("other.checkSumValidColor")
      if (!c) return {}
      const o = data.hasOwnProperty("isChecksumValid")
        ? data.isChecksumValid
        : false
      switch (o) {
        case true:
          return { background: (c && c.isCheckSumValidColor) || "transparent" }
        case false:
          return { background: (c && c.isNotCheckSumValidColor) || "#f4d5de" }
        default:
          return { background: "transparent" }
      }
    }
  },

  async mounted () {
    await this.fetchAutoCompletes()
    // await this.search()
  }
}
</script>
