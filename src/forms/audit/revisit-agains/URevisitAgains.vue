<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="searchObjRes"/>
        <safa-status :result="ReAssignObjRes"/>
      </template>
      <fit>
        <!-- helper="revisitAgainsColumns" -->

        <safa-grid
          v-model="tmpModel"
          cdcName="revisitAgains"
          title="لیست بازدیدهای مجدد"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :bordered="true"
          :paginate="true"
          :pageSize="100"
          :cacheBlockSize="100"
          :animateRows="true"
          rowModelType="serverSide"
          :filterable="true"
          :columns="revisitAgainsColumns"
          :suppressRowClickSelection="false"
          :allowMultipleSelection="false"
          @grid:ready="onGridReady"
          @selection:changed="rowChanged"
          @row:dblclick="rowDblclick"
          ref="objectSurvey"
        >
          <template v-slot:header>
            <div class="flex q-gutter-x-sm q-mr-xs">
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="doSearch"
                cdcName="baseNosaziCode"
                label-width="90px"
              />
              <btn-search @click="doSearch"/>
              <q-separator vertical/>
            </div>
          </template>
        </safa-grid>
      </fit>
      <safa-popup
        title="ارجاع به ممیز"
        v-model="showAssignToSurveyor"
        width="900px"
        height="600px"
      >
        <fit>
          <USearchUAssignToSurveyor
            ref="USearchUAssignToSurveyor"
            :formKey="formKey"
            :title="title"
            :name="name"
            @done="done"
          />
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import USearchUAssignToSurveyor from "../search/partials/UAssignToSurveyor.vue"

export default {
  mixins: [baseFormMixin],
  components: { USearchUAssignToSurveyor },

  data () {
    return {
      title: "بازدیدهای مجدد",
      formKey: "F6111442-C9AE-4E41-BAE5-22D273DAE0E4",
      name: "URevisitAgains",
      main: true,

      // popup
      showAssignToSurveyor: false,

      // variables
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0
      },

      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      House: "",
      Block: "",
      Region: "",
      District: "",
      dataRow: {},
      nidBase: "",
      gridApi: null,

      // grid
      revisitAgainsColumns: [
        {
          title: "کد نوسازی",
          field: "NosaziCodestr",
          width: "100px"
        },
        {
          title: "نام ممیز",
          field: "SName",
          width: "100px"
        },
        {
          title: "نام خانوادگی ممیز",
          field: "SFamily",
          width: "130px"
        },
        {
          title: "تاریخ ارجاع",
          field: "SurveyorAssignDate",
          width: "140px"
        },
        {
          title: "ساعت ارجاع",
          field: "SurveyorAssignTime",
          width: "100px"
        },
        {
          title: "کاربر ارجاع دهنده",
          field: "NameUserAssignToSurveyor",
          editor: "date",
          width: "140px"
        },
        {
          field: "agCallbackBtn",
          title: "ارجاع به ممیز جدید",
          btnTitle: "ارجاع به ممیز جدید",
          width: "140px",
          callback: (params) => this.hlAssign(params)
        }
      ],

      // service
      searchObjRes: null,
      ReAssignObjRes: null
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },
    hlAssign (params) {
      const self = this
      this.showAssignToSurveyor = true
      this.$nextTick(() => {
        self.$refs.USearchUAssignToSurveyor.loadObj({
          NidBase: params.NidBase,
          IsBlock: false,
          IsChangedSurveyor: false
        })
      })
    },
    // getCurrentMode (value) {
    //   this.showCompanyInfo = value
    // },
    doSearch () {
      debugger
      Object.assign(this.tmpNosaziCode, {
        District: this.baseNosaziCode.District,
        Region: this.baseNosaziCode.Region,
        Block: this.baseNosaziCode.Block
      })

      this.searchObj()
    },
    async searchObj () {
      this.setServerSideDatasource()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          this.showLoading()
          const payload = {
            pEumRequiredRevisit: 6,
            pHouse: this.baseNosaziCode.House,
            pBlock: this.baseNosaziCode.Block,
            pRegion: this.baseNosaziCode.Region,
            pDistrict: this.baseNosaziCode.District,
            pFromRow: params.request.startRow,
            pToRow: params.request.endRow
          }
          try {
            const { data } =
              await this.$services.SO.getObjectInStatusToSurveyor(payload)
            this.searchObjRes = this.getResponse(data)
            if (this.searchObjRes.success) {
              params.success({
                rowData: this.searchObjRes.data.ObjectInStatusToSurveyor,
                rowCount:
                  this.searchObjRes.data.ObjectInStatusToSurveyor[0]
                    ?.TotalCount || 0
              })
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
              })
            }
          } catch (e) {
            console.error(e)
            this.serverError()
            params.fail()
          } finally {
            this.hideLoading()
          }
        }
      })
    },
    // async ReAssignObj (dataItem) {
    //   if (!this.isValidForm()) return
    //   this.dataRow = dataItem
    //   this.nidBase = dataItem.dataItem.NidBase
    //   this.showCompanyInfo = true
    // },

    done ({ msg }) {
      setTimeout(() => {
        this.showAssignToSurveyor = false
      }, 700)
      this.gridApi.refreshServerSide({
        purge: true
      })

      if (msg) {
        this.showSuccess(msg)
      }
    }
  }
}
</script>
