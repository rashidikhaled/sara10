<template>
  <fit>
    <safa-status :result="getBlockSurveyRes" />

    <safa-grid
      :value="tmpModel"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="false"
      :bordered="false"
      :paginate="true"
      m="r"
      :pageSize="100"
      :cacheBlockSize="100"
      :animateRows="true"
      rowModelType="serverSide"
      :filterable="true"
      :columns="auditInfoColumns"
      :suppressRowClickSelection="false"
      :allowMultipleSelection="false"
      @grid:ready="onGridReady"
      @row:dblclick="rowDblclick"
      @selection:changed="onSelectionChanged"
      cdcName="auditInfoList"
      title="اطلاعات ممیزی"
      ref="auditInfo"
    />
  </fit>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

// Helpers
import { ClsEnumEumRequiredRevisit } from "src/forms/audit/config/enums"

export default {
  name: "USearchUBlockAuditInfo",

  mixins: [baseFormMixin, mapMixin],

  props: {
    dataContext: {
      type: Object,
      required: true
    },
    tmpNosaziCode: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: {
      type: Boolean
    }
  },

  data () {
    return {
      // Context
      tmpModel: [],
      gridApi: null,
      loading: false,
      auditInfoColumns: [
        {
          field: "NosaziCodestr",
          title: "کد نوسازی",
          width: 125
        },
        {
          field: "SurveyStyle",
          title: "بررسی شده",
          cellStyle: (params) => this.getCellStyle(params, "SurveyStyle"),
          width: 105
        },
        {
          field: "AssignStyle",
          title: "ارجاع شده",
          cellStyle: (params) => this.getCellStyle(params, "AssignStyle"),
          width: 105
        },
        {
          field: "DownloadStyle",
          title: "دانلود شده",
          cellStyle: (params) => this.getCellStyle(params, "DownloadStyle"),
          width: 105
        },
        {
          field: "UploadStyle",
          title: "آپلود شده",
          cellStyle: (params) => this.getCellStyle(params, "UploadStyle"),
          width: 105
        },
        {
          field: "FirstConfirmStyle",
          title: "تایید اول",
          cellStyle: (params) => this.getCellStyle(params, "FirstConfirmStyle"),
          width: 110
        },
        {
          field: "SecondConfirmStyle",
          title: "تایید دوم",
          cellStyle: (params) =>
            this.getCellStyle(params, "SecondConfirmStyle"),
          width: 110
        },
        {
          field: "RequiredRevisitDate",
          title: "تاریخ بررسی",
          // editor: "date",
          width: 115
        },
        {
          field: "RequiredRevisitTime",
          title: "ساعت بررسی",
          width: 115
        },
        {
          field: "SName",
          title: "نام ممیز",
          width: 150
        },
        {
          field: "SFamily",
          title: "نام خانوادگی ممیز",
          width: 160
        },
        {
          field: "NameUserAssignToSurveyor",
          title: "کاربر ارجاع دهنده",
          width: 190
        },
        {
          field: "SurveyorAssignDate",
          title: "تاریخ ارجاع",
          // editor: "date",
          width: 115
        },
        {
          field: "SurveyorAssignTime",
          title: "ساعت ارجاع",
          width: 115
        },
        {
          field: "SurveyorDownloadDate",
          title: "تاریخ دانلود",
          // editor: "date",
          width: 115
        },
        {
          field: "SurveyorDownloadTime",
          title: "ساعت دانلود",
          width: 115
        },
        {
          field: "SurveyorUploadDate",
          title: "تاریخ آپلود",
          // editor: "date",
          width: 115
        },
        {
          field: "SurveyorUploadTime",
          title: "ساعت آپلود",
          width: 115
        },
        {
          field: "FirstConfirmationDate",
          title: "تاریخ تایید اول",
          // editor: "date",
          width: 125
        },
        {
          field: "FirstConfirmationTime",
          title: "ساعت تایید اول",
          width: 125
        },
        {
          field: "SecondConfirmationDate",
          title: "تاریخ تایید دوم",
          width: 125
        },
        {
          field: "SecondConfirmationTime",
          title: "ساعت تایید دوم",
          width: 125
        },
        {
          field: "AgainRevisitDate",
          title: "تاریخ بازدید مجدد",
          // editor: "date",
          width: 135
        },
        {
          field: "AgainRevisitTime",
          title: "ساعت بازدید مجدد",
          width: 135
        }
      ],

      // Responses
      getBlockSurveyRes: null
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },

    loadSurveyInfo () {
      this.setServerSideDatasource()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          if (this.loading) return false
          this.loading = true

          this.$services.SO.getBlockSurvey({
            pDistrict: this.tmpNosaziCode.District,
            pRegion: this.tmpNosaziCode.Region,
            pBlock: this.tmpNosaziCode.Block,
            pFromRow: params.request.startRow,
            pToRow: params.request.endRow
          })
            .then(({ data }) => {
              this.getBlockSurveyRes = this.getResponse(data)

              if (this.getBlockSurveyRes.success) {
                params.success({
                  rowData: this.getBlockSurveyRes.data.BlockSurvey,
                  rowCount:
                    this.getBlockSurveyRes.data.BlockSurvey[0]?.TotalCount || 0
                })
              } else params.fail()
            })
            .catch((ex) => {
              console.error(ex)
              this.serverError()
              params.fail()
            })
            .finally(() => {
              this.loading = false
            })
        }
      })
    },

    rowDblclick ({ data }) {
      if (
        this.getBlockSurveyRes.data.BlockSurvey &&
        this.getBlockSurveyRes.data.BlockSurvey.length > 0
      ) {
        const tmpTreeInfo = {
          NosaziCode_House: `${data.District}-${data.Region}-${data.Block}-${data.House}-0-0-0`,
          NidBase: data.NidBase,
          NosaziCode: data.NosaziCodestr,
          IsLoadedFromMenu: this.isLoadedFromMenu,
          ObjType: data.EumNosaziCodeObjType
        }
        if (data.EumRequiredRevisit != null) {
          tmpTreeInfo.EumRevisit = data.EumRequiredRevisit
        }
        this.$emit("auditInfoHouseDblClick", tmpTreeInfo)
      }
    },
    onSelectionChanged (params) {
      const rowData = params.api.getSelectedRows()?.[0]

      if (!rowData) return false

      this.showCodeOnMap(rowData.NosaziCodestr)
    },

    getCellStyle ({ data }, type) {
      if (!type || !data || typeof data !== "object") return

      switch (type) {
        case "SurveyStyle":
          if (data.EumRequiredRevisit !== 0) {
            return {
              backgroundColor: "PaleGreen"
            }
          }
          return {
            backgroundColor: "#f4d5de"
          }

        case "AssignStyle":
          if (
            data.EumRequiredRevisit >=
            ClsEnumEumRequiredRevisit.AssignToSurveyor.value
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "#f4d5de"
          }

        case "DownloadStyle":
          if (
            data.EumRequiredRevisit >=
            ClsEnumEumRequiredRevisit.DownloadWithSurveyor.value
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "#f4d5de"
          }

        case "UploadStyle":
          if (
            data.EumRequiredRevisit >=
            ClsEnumEumRequiredRevisit.UploadWithSurveyor.value
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "#f4d5de"
          }

        case "FirstConfirmStyle":
          if (
            data.EumRequiredRevisit >=
            ClsEnumEumRequiredRevisit.FirstConfirm.value
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "#f4d5de"
          }

        case "SecondConfirmStyle":
          if (
            data.EumRequiredRevisit >=
            ClsEnumEumRequiredRevisit.SecondConfirm.value
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "#f4d5de"
          }
      }
    }
  }
}
</script>
