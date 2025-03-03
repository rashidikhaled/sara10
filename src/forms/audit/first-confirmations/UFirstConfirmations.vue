<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getCanFirstConfirmListRes"/>
        <safa-status :result="doFirstConfirmationRes"/>
      </template>
      <fit>
        <safa-grid
          :value="tmpModel"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :bordered="true"
          :paginate="true"
          :pageSize="100"
          rowModelType="serverSide"
          :filterable="true"
          :columns="firstConfirmColumns"
          :suppressRowClickSelection="false"
          :allowMultipleSelection="false"
          @grid:ready="onGridReady"
          @row:dblclick="rowDblclick"
          cdcName="ObjectSurveyList"
          title="لیست جستجو"
          ref="objectSurvey"
        >
          <template v-slot:header>
            <div class="flex q-gutter-x-sm q-mr-xs">
              <nosazi-code-input
                v-model="baseNosaziCode"
                @enter="search"
                cdcName="baseNosaziCode"
                label-width="90px"
                enabled="1-1-1-1-0-0-0"
              />
              <btn-search @click="search"/>
              <q-separator vertical/>
            </div>
          </template>
        </safa-grid>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاییدات اول",
      formKey: "7B2A033E-7419-40B6-A5FC-1E4A5B233BFF",
      name: "UFirstConfirmations",
      main: true,

      // Context
      gridApi: null,

      // columnApi: null,
      tmpModel: [],
      firstConfirmColumns: [
        {
          field: "",
          title: "نایید اول",
          width: "100px",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.doFirstConfirmationHandler(params)
        },
        {
          title: "کد نوسازی",
          field: "NosaziCodestr"
        },
        {
          title: "تاریخ بررسی",
          field: "RequiredRevisitDate",
          editor: "date"
        },
        {
          title: "ساعت بررسی",
          field: "RequiredRevisitTime"
        },
        {
          title: "نام ممیز",
          field: "SName"
        },
        {
          title: "نام خانوادگی ممیز",
          field: "SFamily"
        },
        {
          title: "تاریخ ارجاع",
          field: "SurveyorAssignDate",
          editor: "date"
        },
        {
          title: "ساعت ارجاع",
          field: "SurveyorAssignTime"
        },
        {
          title: "کاربر ارجاع دهنده",
          field: "NameUserAssignToSurveyor"
        },
        {
          title: "تاریخ دانلود",
          field: "SurveyorDownloadDate",
          editor: "date"
        },
        {
          title: "ساعت دانلود",
          field: "SurveyorDownloadTime"
        },
        {
          title: "تاریخ آپلود",
          field: "SurveyorUploadDate",
          editor: "date"
        },
        {
          title: "ساعت آپلود",
          fild: "SurveyorUploadTime"
        }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      loading: false,

      // Responses
      getCanFirstConfirmListRes: null,
      doFirstConfirmationRes: null
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      // this.columnApi = params.columnApi
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },

    search () {
      if (!this.baseNosaziCode.District) {
        this.showError("وارد کردن منطقه الزامی است.")
        return
      }

      this.loadObj()
    },

    loadObj () {
      this.setServerSideDatasource()
      // this.gridApi.refreshServerSide({
      //   purge: true
      // })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          try {
            if (this.loading) return false
            this.loading = true
            const payload = {
              pDistrict: Number(this.baseNosaziCode.District) ?? 0,
              pRegion: Number(this.baseNosaziCode.Region) ?? 0,
              pBlock: Number(this.baseNosaziCode.Block) ?? 0,
              pHouse: Number(this.baseNosaziCode.House) ?? 0,
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow
            }
            const { data } = await this.$services.SO.getCanFirstConfirmList(payload)
            this.getCanFirstConfirmListRes = this.getResponse(data)
            if (this.getCanFirstConfirmListRes.success) {
              params.success({
                rowData:
                this.getCanFirstConfirmListRes.data?.CanFirstConfirm_List,
                rowCount:
                  this.getCanFirstConfirmListRes.data?.CanFirstConfirm_List[0]
                    ?.TotalCount || 0
              })
            } else {
              params.fail()
            }
          } catch (ex) {
            console.error(ex)
            this.serverError()
            params.fail()
          } finally {
            this.loading = false
          }
        }
      })
    },

    doFirstConfirmationHandler (params) {
      this.showConfirm(
        `آیا از تایید اول کد ${params.NosaziCodestr} اطمینان دارید؟`
      ).onOk(async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.SO.doFirstConfirmation({
            pNidProc: params.NidProc,
            pNidUser: this.getNidUser(),
            pUserName: this.currentUser.username
          })
          this.doFirstConfirmationRes = this.getResponse(data)
          if (this.doFirstConfirmationRes.success) {
            this.search()
            await this.log({
              action: this.logActions.confirm,
              bizCode: params.NosaziCodestr,
              bizCodeTitle: "NosaziCode",
              nosaziCode: params.NosaziCodestr,
              saveDesc: `تایید اول برای کدنوسازی ${params.NosaziCodestr} انجام گردید.`
            })
          }
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      })
    },
    rowDblclick ({ data: tmpItem }) {
      const params = {
        NosaziCode_House: `${tmpItem.District}-${tmpItem.Region}-${tmpItem.Block}-${tmpItem.House}-0-0-0`,
        NidBase: tmpItem.NidBase,
        NidProc: tmpItem.NidProc,
        IsLoadedFromMenu: false,
        ObjType: tmpItem.EumNosaziCodeObjType,
        IsConfirmations: true
      }

      if (tmpItem.EumRequiredRevisit) {
        params.EumRevisit = tmpItem.EumRequiredRevisit
      }

      this.$window.open({
        component: "USearchUParvandeh",
        title: `جزئیات پرونده (${tmpItem.House}-${tmpItem.Block}-${tmpItem.Region}-${tmpItem.District})`,
        keepAlive: false,
        padding: false,
        width: '900px',
        height: '600px',
        componentProps: {
          formKey: this.formKey,
          title: this.title,
          name: this.name,
          params: { ...params }
        }
      })
    }
  },

  watch: {
    loading (val) {
      if (val) {
        this.showLoading()
      } else {
        this.hideLoading()
      }
    }
  },

  created () {
    if (this.$store.getters["ui/layoutMode"] === "full") {
      this.setLayout("map")
      this.setLayoutSplitterWidth(65)
    }
  }
}
</script>
