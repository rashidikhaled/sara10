<template>
  <fit>
    <safa-status :result="getSurveyorListRes" />
    <safa-status :result="changeSurveyorActivationRes" />
<div class="q-mt-sm">
    <form-row class="q-mb-md" :sm="2" :md="2" :lg="2" :xl="2">
      <form-control>
        <safa-text
          label="شماره دستگاه :"
          label-width="80px"
          v-model="filters.DeviceCode"
          cdcName="DeviceCode"
          @keypress.enter="doSearch"
        />
      </form-control>
      <form-control>
        <div class="flex items-center q-gutter-x-sm">
          <safa-text
            label="نام :"
            label-width="30px"
            v-model="filters.Name"
            cdcName="Name"
            style="flex-grow: 1"
            @keypress.enter="doSearch"
          />
          <btn-search label="جستجو" @click="doSearch" />
        </div>
      </form-control>
    </form-row>
  </div>
    <safa-grid
      :value="tmpModel"
      cdcName="surveyors"
      title="لیست بازدیدهای مجدد"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="false"
      :bordered="true"
      :paginate="true"
      :pageSize="50"
      :cacheBlockSize="50"
      :animateRows="true"
      rowModelType="serverSide"
      :filterable="true"
      :columns="surveyorsColumns"
      :suppressRowClickSelection="false"
      :allowMultipleSelection="false"
      @grid:ready="onGridReady"
      @row-click="clickRow"
      ref="USurveyors"
    />
  </fit>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  name: "USurveyorsUList",

  mixins: [baseFormMixin],

  data () {
    return {
      // Context
      filters: {
        DeviceCode: "",
        Name: ""
      },
      tmpModel: [],
      surveyorsColumns: [
        /* {
        "field": "", "title": "عکس", "width": 100 }, */
        {
          field: "DeviceCode",
          title: "شماره دستگاه",
          width: 150
        },
        { field: "SName", title: "نام", width: 100 },
        { field: "SFamily", title: "نام خانوادگی", width: 130 },
        {
          field: "SNationalCode",
          title: "کد ملی",
          width: 100,
          cell: "NationalCodeTemplate"
        },
        {
          field: "STelephone",
          title: "تلفن",
          width: 100
        },
        {
          field: "SCellPhone",
          title: "تلفن همراه",
          width: 100
        },
        {
          field: "SAddress",
          title: "آدرس",
          width: 100
        },
        {
          field: "RegistDate",
          title: "تاریخ ثبت",
          width: 100
        },
        {
          field: "RegistTime",
          title: "ساعت ثبت",
          width: 100
        },
        {
          field: "IsActive",
          title: "وضعیت",
          width: 100,
          editor: "checkbox"
        },
        {
          field: "agCallbackBtn",
          title: "تغییر وضعیت",
          btnTitle: "تغییر وضعیت",
          width: 120,
          callback: (params) => this.hlChangeStatusClick(params)
        }
      ],
      gridApi: null,

      // Responses
      getSurveyorListRes: null,
      changeSurveyorActivationRes: null
    }
  },
  mounted () {
    window.hideLoading = this.hideLoading
  },
  methods: {
    clickRow (dataItem) {
      this.dataRow = dataItem
    },
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
      this.setServerSideDatasource()
    },

    doSearch () {
      this.gridApi.refreshServerSide({
        purge: true
      })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          this.showLoading()
          this.$services.SO.getSurveyorList({
            pGetActive: -1,
            pFullName: this.filters.Name,
            pDeviceCode: this.filters.DeviceCode,
            pFromRow: params.request.startRow,
            pToRow: params.request.endRow
          })
            .then(({ data }) => {
              this.getSurveyorListRes = this.getResponse(data)
              if (this.getSurveyorListRes.success) {
                params.success({
                  rowData: this.getSurveyorListRes.data.SurveyorList,
                  rowCount:
                    this.getSurveyorListRes.data.SurveyorList[0]?.TotalCount ||
                    0
                })
              }
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
              params.fail()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      })
    },

    hlChangeStatusClick (params) {
      this.showLoading()
      this.$services.SO.changeSurveyorActivation({
        pNidSurveyor: params.NidSurveyor
      })
        .then(async ({ data }) => {
          this.changeSurveyorActivationRes = this.getResponse(data)
          if (this.changeSurveyorActivationRes.success) {
            this.showSuccess("تغییر وضعیت با موفقیت انجام شد !")

            await this.log({
              action: this.logActions.view,
              bizCode: params.NidSurveyor,
              bizCodeTitle: "NidSurveyor",
              saveDesc: `تغییر وضعیت در فرم ${this.title} انجام گردید.`
            })
            this.doSearch()
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    rowDblclick ({ data }) {
      this.$emit("showSurveyorDetails", {
        NidSurveyor: data.NidSurveyor,
        DeviceCode: data.DeviceCode
      })
    }
  }
}
</script>
