<template>
  <fit>
    <safa-status :result="getSurveyorRes" />
    <safa-status :result="getSurveyorTasksInBlockGroupRes" />
    <safa-status :result="getSurveyorTasksInBlockDetailsRes" />

    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="tabAssignment" label="ارجاعات" />
        <tab-menu name="auditorSpecifications" label="مشخصات ممیز" />
      </template>
      <tab-content name="tabAssignment">
        <fit>
          <safa-splitter
            v-model="horizontalSplitterModel"
            horizontal
            class="fit"
            margin="0"
          >
            <template v-slot:before>
              <safa-grid
                :value="tmpModel"
                :addRow="false"
                :allowCopy="false"
                :deleteRow="false"
                :bordered="true"
                :paginate="true"
                :pageSize="20"
                :cacheBlockSize="20"
                :animateRows="true"
                height="100%"
                max-height="100%"
                min-height="200px"
                rowModelType="serverSide"
                :filterable="true"
                :columns="gvListColumns"
                :suppressRowClickSelection="false"
                :allowMultipleSelection="false"
                @grid:ready="onGridReady"
                @selection:changed="rowChanged"
                title="ارجاع شده ها به ممیز :"
              />
            </template>
            <template v-slot:after>
              <safa-grid
                :value="tmpModel"
                :addRow="false"
                :allowCopy="false"
                :deleteRow="false"
                :bordered="true"
                :paginate="true"
                :pageSize="20"
                :cacheBlockSize="20"
                :animateRows="true"
                height="100%"
                max-height="100%"
                min-height="200px"
                rowModelType="serverSide"
                :filterable="true"
                :columns="expanderCaptionColumns"
                :suppressRowClickSelection="false"
                :allowMultipleSelection="false"
                @grid:ready="onDetailsGridReady"
                @selection:changed="detailsRowChanged"
                title="جزییات ارجاع"
              />
            </template>
          </safa-splitter>
        </fit>
      </tab-content>
      <tab-content name="auditorSpecifications">
        <div>
          <div class="row q-col-gutter-x-sm">
            <div class="col-12 col-sm-9">
              <form-row class="q-mb-sm">
                <form-control>
                  <safa-text
                    label="نام :"
                    label-width="95px"
                    :m="m"
                    required
                    validation="required"
                    v-model="dataContext.S_Surveyor.SName"
                    cdcName="SName"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="نام خانوادگی :"
                    label-width="95px"
                    :m="m"
                    required
                    validation="required"
                    v-model="dataContext.S_Surveyor.SFamily"
                    cdcName="txtSFamily"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="کدملی :"
                    label-width="95px"
                    :m="m"
                    required
                    validation="required"
                    v-model="dataContext.S_Surveyor.SNationalCode"
                    cdcName="txtSNationalCode"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="تلفن :"
                    label-width="95px"
                    :m="m"
                    v-model="dataContext.S_Surveyor.STelephone"
                    cdcName="txtSTelephone"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="تلفن همراه :"
                    label-width="95px"
                    :m="m"
                    v-model="dataContext.S_Surveyor.SCellPhone"
                    cdcName="txtSCellPhone"
                  />
                </form-control>
                <form-control>
                  <safa-text
                    label="شماره دستگاه :"
                    label-width="95px"
                    :m="m"
                    required
                    validation="required"
                    v-model="dataContext.S_Surveyor.DeviceCode"
                    cdcName="txtDeviceCode"
                  />
                </form-control>
                <form-control class="col-12">
                  <safa-text
                    label="آدرس :"
                    label-width="95px"
                    :m="m"
                    v-model="dataContext.S_Surveyor.SAddress"
                    cdcName="txtSAddress"
                  />
                </form-control>
              </form-row>
            </div>
            <div class="col-12 col-sm-3">
              <div class="flex items-center q-gutter-x-sm">
                <q-separator vertical />
                <ImageUploader
                  title="عکس ممیز"
                  type=".png, .jpg"
                  v-model="SImage"
                  :maxFileSize="0.1"
                  :m="m"
                  @getFile="getFile"
                />
              </div>
            </div>
          </div>
        </div>
      </tab-content>
    </safa-tabs>
  </fit>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import mapMixin from "src/mixins/mapMixin"

export default {
  name: "USurveyorUDetails",

  mixins: [baseFormMixin, mapMixin],

  props: {
    m: {
      type: String,
      default: ""
    }
  },

  data () {
    return {
      // Context
      dataContext: {
        S_Surveyor: {}
      },
      params: {},
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0
      },

      horizontalSplitterModel: 50,
      activeTab: "tabAssignment",
      SImage: null,
      gridApi: null,
      detailsGridApi: null,
      expanderCaption: [],
      tmpModel: [],
      gvListColumns: [
        { field: "NosaziCodestr", title: "کد نوسازی", width: "150px" },
        {
          field: "NameUserAssignToSurveyor",
          title: "کاربر ارجاع دهنده",
          width: 175
        },
        {
          field: "SurveyorAssignDate",
          title: "تاریخ ارجاع",
          width: "100px",
          editor: "date"
        },
        { field: "SurveyorAssignTime", title: "ساعت ارجاع", width: "100px" },
        {
          field: "ObjCount",
          title: "تعداد کل",
          width: "100px"
        },
        {
          field: "CountSurvey",
          title: "بررسی شده",
          width: 110,
          editor: "checkbox"
        },
        {
          field: "CountRequiredRevisit",
          title: "نیاز به بازدید دارد",
          width: 140
        },
        {
          field: "CountNotRequiredRevisit",
          title: "نیاز به بازدید ندارد",
          width: 140
        },
        {
          field: "CountAssignToSurveyor",
          title: "ارجاع به ممیز",
          width: 130
        },
        {
          field: "CountDownloadWithSurveyor",
          title: "دانلود شده",
          width: "100px"
        },
        {
          field: "CountUploadWithSurveyor",
          title: "آپلود شده",
          width: "100px"
        },
        {
          field: "CountRevisitAgain",
          title: "نیاز به بازدید مجدد",
          width: 145
        },
        {
          field: "CountFirstConfirm",
          title: "تایید اول",
          width: "100px"
        },
        {
          field: "CountSecondConfirm",
          title: "تایید دوم",
          width: "100px"
        }
      ],
      expanderCaptionColumns: [
        { field: "NosaziCodestr", title: "کد نوسازی", width: "150px" },
        {
          field: "NameUserAssignToSurveyor",
          title: "کاربر ارجاع دهنده",
          width: 170
        },
        {
          field: "SurveyorAssignDate",
          title: "تاریخ ارجاع",
          width: "100px",
          editor: "date"
        },
        { field: "SurveyorAssignTime", title: "ساعت ارجاع", width: "100px" },
        {
          field: "SurveyorDownloadDate",
          title: "تاریخ دانلود",
          width: "100px",
          editor: "date"
        },
        { field: "SurveyorDownloadTime", title: "ساعت دانلود", width: 115 },
        {
          field: "SurveyorUploadDate",
          title: "تاریخ آپلود",
          width: "100px",
          editor: "date"
        },
        { field: "SurveyorUploadTime", title: "ساعت آپلود", width: "100px" },
        {
          field: "AgainRevisitDate",
          title: "تاریخ نیاز به بازدید مجدد",
          width: 175,
          editor: "date"
        },
        {
          field: "AgainRevisitTime",
          title: "ساعت نیاز به بازدید مجدد",
          width: 175
        },
        {
          field: "FirstConfirmationDate",
          title: "تاریخ تایید اول",
          width: 145,
          editor: "date"
        },
        {
          field: "CountSurvey",
          title: "ساعت تایید اول",
          width: 130
        },
        {
          field: "SecondConfirmationDate",
          title: "تاریخ تایید دوم",
          width: 130,
          editor: "date"
        },
        {
          field: "SecondConfirmationTime",
          title: "ساعت تایید دوم",
          width: 130
        }
      ],

      // Responses
      getSurveyorRes: null,
      getSurveyorTasksInBlockGroupRes: null,
      getSurveyorTasksInBlockDetailsRes: null
    }
  },

  methods: {
    loadObj (params) {
      this.activeTab = "tabAssignment"
      if (params) Object.assign(this.params, params)
      if (!this.params.NidSurveyor) return

      if (!this.gridApi) {
        setTimeout(() => {
          this.loadObj()
        }, 100)
        return false
      }

      console.log("params: ", this.params)
      this.loadAssingments()
      this.gridApi.refreshServerSide({
        purge: true
      })

      this.$services.SO.getSurveyor({
        pNidSurveyor: this.params.NidSurveyor
      })
        .then(({ data }) => {
          this.getSurveyorRes = this.getResponse(data)

          if (this.getSurveyorRes.success) {
            this.dataContext = this.getSurveyorRes.data
            // todo SImage
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

    loadAssingments () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          try {
            this.showLoading()

            const { data } =
              await this.$services.SO.getSurveyorTasksInBlockGroup({
                pDeviceCode: this.params.DeviceCode,
                pFromRow: params.request.startRow,
                pToRow: params.request.endRow
              })

            this.getSurveyorTasksInBlockGroupRes = this.getResponse(data)

            if (this.getSurveyorTasksInBlockGroupRes.success) {
              params.success({
                rowData:
                  this.getSurveyorTasksInBlockGroupRes.data
                    .SurveyorTasksInBlock_Group,
                rowCount:
                  this.getSurveyorTasksInBlockGroupRes.data
                    .SurveyorTasksInBlock_Group[0]?.TotalCount || 0
              })
              this.$nextTick(() => {
                params.api.forEachRowNode((node) => {
                  if (node.rowIndex === 0) {
                    node.setSelected(true)
                  }
                })
              })
            }
          } catch (ex) {
            console.error(ex)
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

    onDetailsGridReady (params) {
      this.detailsGridApi = params.api
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },

    rowChanged () {
      const tmpSelected = this.gridApi.getSelectedRows()?.[0] || null

      if (!tmpSelected) return

      Object.assign(this.tmpNosaziCode, {
        District: tmpSelected.District,
        Region: tmpSelected.Region,
        Block: tmpSelected.Block
      })

      this.loadAssignedDetails(this.params.DeviceCode, this.tmpNosaziCode)
    },

    detailsRowChanged () {
      const tmpSelected = this.detailsGridApi.getSelectedRows()?.[0] || null
      if (!tmpSelected || !tmpSelected.NosaziCodeStr_Map) return

      this.showCodeOnMap(tmpSelected.NosaziCodeStr_Map, true)
    },

    loadAssignedDetails (pDeviceCode, nosaziCode) {
      this.detailsGridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          try {
            this.showLoading()
            const { data } =
              await this.$services.SO.getSurveyorTasksInBlockDetails({
                pDeviceCode,
                pDistrict: nosaziCode.District,
                pRegion: nosaziCode.Region,
                pBlock: nosaziCode.Block,
                pFromRow: params.request.startRow,
                pToRow: params.request.endRow
              })

            this.getSurveyorTasksInBlockDetailsRes = this.getResponse(data)
            if (this.getSurveyorTasksInBlockDetailsRes.success) {
              params.success({
                rowData:
                  this.getSurveyorTasksInBlockDetailsRes.data
                    .SurveyorTasksInBlock_Details,
                rowCount:
                  this.getSurveyorTasksInBlockDetailsRes.data
                    .SurveyorTasksInBlock_Details[0]?.TotalCount || 0
              })
            }
          } catch (ex) {
            console.error(ex)
            this.serverError()
            params.fail()
          } finally {
            this.hideLoading()
          }
        }
      })
    },
    getFile () {}
  }
}
</script>
