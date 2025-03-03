<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="searchObjRes" />
      </template>
      <fit>
        <form-row>
          <form-control>
            <safa-text
              label="ممیز"
              label-width="65px"
              v-model="txtSurveyor"
              cdcName="txtSurveyor"
            >
              <template v-slot:append>
                <q-icon
                  style="position: relative; right: 5px; font-size: 18px"
                  @click="btnSelectSurveyorClick"
                  color="primary"
                  name="more_horiz"
                  class="cursor-pointer"
                />
              </template>
            </safa-text>
          </form-control>

          <nosazi-code-input
            label="کدنوسازی"
            v-model="baseNosaziCode"
            @enter="doSearch"
            cdcName="baseNosaziCode"
            label-width="65px"
            :actions="false"
          />
          <div class="col-auto">
            <btn-search label="جستجو" @click="doSearch" />
          </div>
          <div class="col-auto">
            <btn-cancel label="پاک کردن" @click="clean" />
          </div>
        </form-row>
        <safa-grid
          title="ارجاع شده ها"
          v-model="tmpModel"
          cdcName="hlChangeAssignment"
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
          :columns="hlChangeAssignmentColumns"
          :suppressRowClickSelection="false"
          :allowMultipleSelection="false"
          class="q-mt-sm"
          @grid:ready="onGridReady"
        />
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default
            label="تغییر ممیز گروهی"
            @click="showWhenGroupChangeAudit"
          >
          </btn-default>
          <btn-default label="گزارش" @click="report" />
        </div>
        <safa-popup v-model="showUReferralAuditor" title="ارجاع به ممیز">
          <UReferralAuditor :selecterSurveyor="dataRow" />
        </safa-popup>
        <safa-popup v-model="showUSurveyors" title="لیست ممیزان">
          <UList :showBtn="true" @getDataFromUList="getDataFromUList" />
        </safa-popup>
      </template>
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
import UList from "./partial/UList.vue"
import USearchUAssignToSurveyor from "../search/partials/UAssignToSurveyor.vue"

// Constant
const tmpSelectedSurveyor = {
  NidSurveyor: "00000000-0000-0000-0000-000000000000"
}

export default {
  mixins: [baseFormMixin],
  components: {
    UList,
    USearchUAssignToSurveyor
  },
  data () {
    return {
      title: "لیست ارجاعات ممیز",
      name: "UAuditorReferences",
      formKey: "DEDEC311-5742-4132-866A-3754F5BDB465",
      main: true,

      // popup
      showUSurveyors: false,
      showUReferralAuditor: false,
      showAssignToSurveyor: false,

      // #region variables
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
      txtSurveyor: "",
      dataRow: "",
      nidBase: "",
      selectedSurveyor: { ...tmpSelectedSurveyor },
      // #endregion

      // Resposns
      searchObjRes: null,
      gridApi: null,

      // grids
      hlChangeAssignmentColumns: [
        {
          field: "agCallbackBtn",
          title: "تغییر ممیز",
          btnTitle: "تغییر ممیز",
          width: "140px",
          callback: (params) => this.hlAssign(params)
        },
        {
          title: "کد نوسازی",
          field: "NosaziCodestr",
          width: "150px"
        },
        {
          title: "تاریخ بررسی",
          field: "RequiredRevisitDate",
          width: "100px",
          editor: "date"
        },
        {
          title: "ساعت بررسی",
          field: "RequiredRevisitTime",
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
          width: "100px"
        },
        {
          title: "تاریخ ارجاع",
          field: "SurveyorAssignDate",
          width: "100px"
        },
        {
          title: "ساعت ارجاع",
          field: "SurveyorAssignTime",
          width: "100px"
        },
        {
          title: "کاربر ارجاع دهنده",
          field: "NameUserAssignToSurveyor",
          width: "100px"
        },
        {
          title: "تاریخ دانلود",
          field: "SurveyorDownloadDate",
          width: "100px"
        },
        {
          title: "ساعت دانلود",
          field: "SurveyorDownloadTime",
          width: "100px"
        }
      ]
    }
  },
  methods: {
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

    done (msg) {
      this.gridApi.refreshServerSide({
        purge: true
      })

      if (msg) {
        this.showSuccess(msg)
      }
    },
    doSearch () {
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
    async setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          this.showLoading()
          if (this.selectedSurveyor == null) {
            this.selectedSurveyor = { ...tmpSelectedSurveyor }
          }
          const payload = {
            pDistrict: this.baseNosaziCode.District,
            pRegion: this.baseNosaziCode.Region,
            pBlock: this.baseNosaziCode.Block,
            pHouse: this.baseNosaziCode.House,
            pBuilding: this.baseNosaziCode.Building,
            pApartment: this.baseNosaziCode.Apartment,
            pShop: this.baseNosaziCode.Shop,
            pNidSurveyor: this.selectedSurveyor.NidSurveyor,
            pFromRow: params.request.startRow,
            pToRow: params.request.endRow
          }
          try {
            const { data } = await this.$services.SO.getCanAssignToSurveyorList(
              payload
            )
            this.searchObjRes = this.getResponse(data)
            if (this.searchObjRes.success) {
              params.success({
                rowData: this.searchObjRes.data.CanAssignToSurveyor_List,
                rowCount:
                  this.searchObjRes.data.CanAssignToSurveyor_List[0]
                    ?.TotalCount || 0
              })
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `نمایش اطلاعات در فرم ${this.title} انجام گردید.`
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
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },
    clean () {
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.txtSurveyor = ""
      this.selectedSurveyor = { ...tmpSelectedSurveyor }
    },
    async report () {
      const reportPath =
        "/Surveyor/RptAssignments"
      const queryParams = {
        NidSurvey: this.selectedSurveyor.NidSurveyor
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedSurveyor.NidSurveyor,
        bizCodeTitle: "NidSurveyor"
      })
    },
    ReAssignObj (dataItem) {
      this.dataRow = dataItem.dataItem
      this.nidBase = dataItem.dataItem.NidBase
      this.showUReferralAuditor = true
    },
    getDataFromUList (dataItem) {
      this.selectedSurveyor = dataItem
      this.txtSurveyor = `${dataItem.SName} ${dataItem.SFamily}`
      this.showUSurveyors = false
      // todo
    },
    btnSelectSurveyorClick () {
      this.showUSurveyors = true
    },
    showWhenGroupChangeAudit () {
      this.showUSurveyors = true
    }
  }
}
</script>
