<template>
  <safa-form
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" padding fullscreen hide-title hide-close>
      <safa-status :result="result" />
      <safa-status :result="getLoadInfoSearchRes" />
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره درخواست"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.NidWorkItem"
              cdcName="NidWorkItem"
              type="number"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="شماره کمیسیون"
              ciName="CI_Commission"
              domainName="Commission77"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.CI_Commission"
              cdcName="CI_Commission"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره دبیرخانه"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.SecretariatNo"
              cdcName="SecretariatNo"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره پیش آگهی"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.NoticeNo"
              cdcName="NoticeNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ درخواست"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.CreateDate"
              cdcName="CreateDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ برگزاری"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.HoldingDate"
              cdcName="HoldingDate"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره رای"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.VoteNo"
              cdcName="VoteNo"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ شروع"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.FromDate"
              cdcName="FromDate"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ پایان"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.ToDate"
              cdcName="ToDate"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.Request_Info.OwnerName"
              cdcName="OwnerName"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="مرحله درخواست"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.SysCI_Request"
              :options="stateOptions"
              source-type="local"
              cdcName="TaskStates"
              type="multiple"
              ref="TaskStatesRef"
            />
          </FormControl>
          <FormControl>
            <safa-combo2
              label="منطقه"
              label-width="90px"
              v-model="model.ClsSearchRequest_info.CI_Region"
              :options="regionOptions"
              source-type="local"
              cdcName="region"
              type="multiple"
              ref="regionRef"
            />
          </FormControl>
          <nosazi-code-input
            label=" کد نوسازی"
            label-width="90px"
            v-model="baseNosaziCode"
            @enter="search"
          />
          <div class="col" />
          <div class="q-gutter-sm">
            <btn-search @click="search" />
            <btn-default label="پاک کردن" @click="clean" />
          </div>
        </FormRow>
        <safa-grid
          title="کارتابل کمیسیون 77"
          m="r"
          height="100%"
          maxHeight="100%"
          min-height="300px"
          ref="kartableCommission77"
          cdcName="getSearchRequestRes"
          filterable
          sortable
          :getRowStyle="getRowStyle"
          paginate
          :columns="KartableCommission77Columns"
          v-model="getSearchRequestRes"
          :pageSize="50"
          @row:click="rowClickHandler"
          :checkboxSelection="true"
          :suppressRowClickSelection="false"
        >
        </safa-grid>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import commission77Mixin from "src/forms/commission77-menu/mixins/commission77Mixin.js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { fixObjColor } from "src/utils/colorHelper"
import { currentDate } from "src/utils/index"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin, commission77Mixin],

  data () {
    return {
      title: "کارتابل کمیسیون 77",
      name: "UKartableCommission77",
      formKey: "36a70b1d-0b1f-4ebb-9eda-2eeb5b17f89f",
      main: true,
      getSearchRequestRes: [],
      stateOptions: [],
      regionOptions: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        ClsSearchRequest_info: {
          Request_Info: {
            NidWorkItem: 0,
            CI_Commission: 0,
            SecretariatNo: null,
            CreateDate: null,
            HoldingDate: null,
            FromDate: null,
            ToDate: null,
            OwnerName: null,
            NosaziCode: ""
          },
          NoticeNo: "",
          VoteNo: "",
          SysCI_Request: [],
          CI_Region: []
        }
      },
      result: null,
      getLoadInfoSearchRes: null,
      getLoadInfoSearchResult: null
    }
  },

  computed: {
    KartableCommission77Columns () {
      return [
        // {
        //   field: "Row",
        // editable: false,
        //   title: "ردیف",
        //   width: "80x"
        // },
        // {
        //   field: "isSelectedNode",
        // editable: false,
        //   title: "",
        //   width: "74px",
        //   filterable: true,
        //   headerCheckboxSelection: true,
        //   lockPosition: true,
        //   pinned: "right",
        //   editor: "selection",
        // },
        // {
        //   field: "DifferenceDaysDeadlineDate",
        // editable: false,
        //   title: "مدت زمان سپری شده از صدور پیش آگهی",
        //   width: "100px",
        //   cellRenderer: (params) =>
        //     `<span>${this.calcDifferenceDaysDeadlineDate(
        //       params.data.NoticeDate
        //     )}</span>`
        // },
        // {
        //   field: "DifferenceUProclamationDays",
        // editable: false,
        //   title: "مدت زمان سپری شده از صدور ابلاغیه",
        //   width: "100px",
        //   cellRenderer: (params) =>
        //     `<span>${this.calcDifferenceDaysDeadlineDate(
        //       params.data.AnnouncementDate
        //     )}</span>`
        // },
        // {
        //   field: "DifferenceVoteDays",
        // editable: false,
        //   title: "مدت زمان سپری شده از صدور رای",
        //   width: "100px",
        //   cellRenderer: (params) =>
        //     `<span>${this.calcDifferenceDaysDeadlineDate(
        //       params.data.VoteDate
        //     )}</span>`
        // },
        {
          field: "NidWorkItem",
          editable: false,
          title: "شماره درخواست ",
          width: "120px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right"
        },
        {
          field: "NosaziCode",
          editable: false,
          title: "کد نوسازی",
          width: "120px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right"
        },
        {
          field: "",
          editable: false,
          title: "مدت زمان سپری شده",
          width: "150px",
          filterable: false,
          headerCheckboxSelection: false,
          lockPosition: true,
          cellRenderer: "agDifferenceDayCellRenderer"
        },
        {
          field: "CI_RequestType",
          editable: false,
          title: "نوع عوارض",
          width: "120px",
          editor: "combo",
          domain: "Commission77"
        },
        {
          field: "NidWorkItem",
          editable: false,
          title: "شماره ارجاع",
          width: "120px"
        },
        {
          field: "Distrcit",
          editable: false,
          title: "منطقه",
          width: "80px"
        },
        {
          field: "Title",
          editable: false,
          title: "مرحله",
          width: "120px"
        },
        {
          field: "Price",
          editable: false,
          title: "مبلغ",
          width: "120px",
          editor: "money"
        },
        {
          field: "FromDate",
          editable: false,
          title: "تاریخ شروع",
          width: "100px"
        },
        {
          field: "ToDate",
          editable: false,
          title: "تاریخ پایان",
          width: "100px"
        },
        {
          field: "CI_Commission",
          editable: false,
          title: "شماره کمیسیون",
          width: "150px",
          editor: "combo",
          domain: "Commission77"
        },
        {
          field: "CreateDate",
          editable: false,
          title: "تاریخ درخواست",
          width: "120px"
        },
        {
          field: "CreateTime",
          editable: false,
          title: "زمان درخواست",
          width: "120px"
        },
        {
          field: "NoticeNo",
          editable: false,
          title: "شماره پیش آگهی",
          width: "120px"
        },
        {
          field: "NoticeDate",
          editable: false,
          title: "تاریخ پیش آگهی",
          width: "120px"
        },
        {
          field: "AnnouncementNo",
          editable: false,
          title: "شماره ابلاغیه",
          width: "115px"
        },
        {
          field: "AnnouncementDate",
          editable: false,
          title: "تاریخ ابلاغیه",
          width: "115px"
        },
        {
          field: "HoldingDate",
          editable: false,
          title: "تاریخ برگزاری",
          width: "115px"
        },
        {
          field: "HoldingTime",
          editable: false,
          title: "زمان برگزاری",
          width: "115px"
        },
        {
          field: "UserDescription",
          editable: false,
          title: "توضیحات کاربر",
          width: "115px"
        },
        {
          field: "Description",
          editable: false,
          title: "توضیحات کارشناسی",
          width: "150px"
        },
        {
          field: "VoteNoe",
          editable: false,
          title: "شماره رای",
          width: "115px"
        },
        {
          field: "VoteDate",
          editable: false,
          title: "تاریخ رای",
          width: "115px"
        },
        {
          field: "SecretariatNo",
          editable: false,
          title: "شماره دبیرخانه",
          width: "115px"
        },
        {
          field: "OwnerName",
          editable: false,
          title: "نام مالک",
          width: "115px"
        },
        {
          field: "Address",
          editable: false,
          title: "آدرس",
          width: "300"
        },
        {
          field: "CreatorUserName",
          editable: false,
          title: "کاربر ایجاد کننده",
          width: "200px"
        }
      ]
    }
  },

  watch: {
    'model.ClsSearchRequest_info.Request_Info.NidWorkItem': {
      handler () {
        if (this.model.ClsSearchRequest_info.Request_Info.NidWorkItem === '') this.model.ClsSearchRequest_info.Request_Info.NidWorkItem = 0
      },
      deep: true
    }
  },

  methods: {
    async rowClickHandler (params) {
      await this.$store.dispatch(
        "commission77/setSelectedCommission77",
        params.data
      )
    },
    onSelectionChanged (params) {
      this.updateCheckedRows(params)
    },
    updateCheckedRows (params) {
      const checkedIds = (params.api.getSelectedRows() || [])?.map(
        (row) => row.NidRequest
      )
      this.$store.dispatch("commission77/setSelectedAllNidRequest", checkedIds)
    },
    getRowStyle (params) {
      let color = fixObjColor(params.data, "ColorRow", "unset")
      return { background: color }
    },
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.commission77.getLoadInfoSearch()
        this.getLoadInfoSearchRes = this.getResponse(data)
        if (this.getLoadInfoSearchRes.success) {
          const res = this.getLoadInfoSearchRes
          if (res.data.hasOwnProperty("GetLoadInfoSearchResult")) {
            this.getLoadInfoSearchResult = res.data.GetLoadInfoSearchResult
          } else this.getLoadInfoSearchResult = res.data

          this.regionOptions = this.getLoadInfoSearchResult?.ClsSearchRequest_info?.CI_Region ?? []
          this.stateOptions = this.getLoadInfoSearchResult?.ClsSearchRequest_info?.SysCI_Request?.map(
            (e) => {
              return {
                ...e,
                ID: e.ID,
                Title: e.Title,
                ColorRow: e.ColorRow
              }
            }
          ) ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async search () {
      try {
        this.model.ClsSearchRequest_info.Request_Info.NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
        this.getLoadInfoSearchResult.ClsSearchRequest_info.Request_Info = this.model.ClsSearchRequest_info.Request_Info
        this.getLoadInfoSearchResult.ClsSearchRequest_info.NoticeNo = this.model.ClsSearchRequest_info.NoticeNo
        this.getLoadInfoSearchResult.ClsSearchRequest_info.VoteNo = this.model.ClsSearchRequest_info.VoteNo
        this.getLoadInfoSearchResult.ClsSearchRequest_info.SysCI_RequestSelected = this.$refs.TaskStatesRef.selectedItems
        this.getLoadInfoSearchResult.ClsSearchRequest_info.CI_RegionSelected = this.$refs.regionRef.selectedItems
        const payload = {
          PRequest: {
            ...this.getLoadInfoSearchResult,
            From: 1,
            To: 500
          }
        }
        this.showLoading()

        const { data } = await this.$services.commission77.getSearchRequestInfo(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          const res = this.result.data?.GetSearch_RequestInfoResult
            ? this.result.data.GetSearch_RequestInfoResult
              .ClsSearchRequest_info.ResultSearch_RequestInfo
            : this.result.data.ClsSearchRequest_info.ResultSearch_RequestInfo
          this.getSearchRequestRes =
              res.map((m) => {
                return {
                  ...m,
                  DifferenceDaysDeadlineDate: m.NoticeDate
                    ? this.calcDifferenceDaysDeadlineDate(m.NoticeDate)
                    : 0,
                  DifferenceUProclamationDays: m.AnnouncementDate
                    ? this.calcDifferenceDaysDeadlineDate(m.AnnouncementDate)
                    : 0,
                  DifferenceVoteDays: m.VoteDate
                    ? this.calcDifferenceDaysDeadlineDate(m.VoteDate)
                    : 0
                }
              }) ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    clean () {
      this.model.ClsSearchRequest_info.Request_Info.NidWorkItem = 0
      this.model.ClsSearchRequest_info.Request_Info.OwnerName = ""
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.model.ClsSearchRequest_info.Request_Info.SecretariatNo = ""
    },
    calcDifferenceDaysDeadlineDate (date) {
      if (date === null) {
        return 0
      }
      let currentdate = currentDate()
        .split("/")
        .map((x) => parseInt(x))

      return new PersianDate(currentdate)
        .toLocale("en")
        .diff(
          new PersianDate(date.split("/").map((x) => parseInt(x))).toLocale(
            "en"
          ),
          "days"
        )
    }
  },

  created () {
    this.loadObj()
  }
}
</script>
