<template>
  <form-wrapper title="ارجاع به ممیز">
    <template #header>
      <safa-status :result="getSurveyorListRes" />
      <safa-status :result="getUploadedRevisitListRes" />
      <safa-status :result="assignObjectToSurveyorWithChildrenRes" />
      <safa-status :result="assignBlockToSurveyorRes" />
      <safa-status :result="assignToSurveyorChangeSurveyorRes" />
      <safa-status :result="assignObjectToSurveyorNoChildrenRes" />
    </template>
    <fit>
      <form-row class="q-mb-sm" :sm="2" :md="2" :lg="2" :xl="2">
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
            <!-- :label-width="$q.screen.gt.md ? '30px' : '80px'" -->
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

      <form-row class="q-mb-sm" :sm="2" :md="2" :lg="2" :xl="2">
        <form-control>
          <safa-combo
            label="مرجع اطلاعات :"
            cdcName="cmbRevisitList"
            v-model="filters.cmbRevisitList"
            label-width="80px"
            source-type="local"
            :options="cmbRevisitListOptions"
          />
        </form-control>
        <safa-checkbox
          label="آیا به آخرین دستگاهی که بازدید کرده است ارسال شود؟"
          label-width="80px"
          v-model="filters.chkSendToLastTablet"
          cdcName="chkSendToLastTablet"
        />
      </form-row>

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
        rowModelType="serverSide"
        :filterable="true"
        :columns="surveyorListColumns"
        :suppressRowClickSelection="false"
        :allowMultipleSelection="false"
        @grid:ready="onGridReady"
        cdcName="ObjectSurveyList"
        title="لیست جستجو"
        ref="objectSurvey"
        class="q-mb-sm"
      />

      <div class="flex items-center q-gutter-x-sm q-pb-xs">
        <div style="flex-grow: 1" v-if="showComment">
          <text-template
            label="توضیحات :"
            v-model="comments"
            :rows="2"
            validations="required"
            cdcName="Comments"
            label-width="70px"
          />
        </div>

        <btn-default
          class="full-height"
          label="ارجاع به ممیز"
          @click="btnAssignClick"
        />
      </div>
    </fit>
  </form-wrapper>
</template>

<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Constants
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export default {
  name: "USearchUAssignToSurveyor",

  mixins: [baseFormMixin],

  props: {
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      // Context
      tmpModel: [],
      dataContext: {
        revisitListComplete: []
      },
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      surveyorListColumns: [
        {
          field: "isSelected",
          width: 42,
          headerCheckboxSelection: false,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false,
          resizable: false
        },
        /* {
        "field": "", "title": "عکس", "width": "100px" }, */
        {
          field: "DeviceCode",
          title: "شماره دستگاه",
          width: "150px"
        },
        { field: "SName", title: "نام", width: "100px" },
        { field: "SFamily", title: "نام خانوادگی", width: 130 },
        {
          field: "SNationalCode",
          title: "کد ملی",
          width: "100px",
          cell: "NationalCodeTemplate"
        },
        { field: "STelephone", title: "تلفن", width: "100px" },
        { field: "SCellPhone", title: "تلفن همراه", width: "100px" },
        { field: "SAddress", title: "آدرس", width: "auto" }
      ],
      isBlock: false,
      withChildren: true,

      nidBase: EMPTY_GUID,
      isChangedSurveyor: false,
      fromSurveyorNid: EMPTY_GUID,
      comments: "",

      cmbRevisitListOptions: [],
      filters: {
        DeviceCode: "",
        Name: "",
        cmbRevisitList: EMPTY_GUID,
        chkSendToLastTablet: false
      },
      gridApi: null,
      columnApi: null,
      loading: false,

      // Visiblity
      showComment: true,

      // Responses
      getSurveyorListRes: null,
      getUploadedRevisitListRes: null,
      assignObjectToSurveyorWithChildrenRes: null,
      assignBlockToSurveyorRes: null,
      assignToSurveyorChangeSurveyorRes: null,
      assignObjectToSurveyorNoChildrenRes: null
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
      this.setServerSideDatasource()
    },

    loadObj (params) {
      if (params) {
        Object.assign(this.tmpNosaziCode, {
          District: params.District,
          Region: params.Region,
          Block: params.Block
        })
        if (params.NidBase) this.nidBase = params.NidBase
        this.isBlock = params.IsBlock
        if (params.hasOwnProperty("WithChildren")) {
          this.withChildren = params.WithChildren
        }
      }
    },

    doSearch () {
      if (!this.gridApi) return
      this.gridApi.paginationGoToPage(0)

      this.gridApi.refreshServerSide({
        purge: true
      })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          if (this.loading) return false
          this.loading = true

          if (this.isChangedSurveyor) this.showComment = false

          this.dataContext.revisitListComplete = []
          this.cmbRevisitListOptions = [
            {
              ID: this.nidBase,
              Title: "اطلاعات اصلی"
            }
          ]

          this.filters.cmbRevisitList = this.nidBase

          await this.$services.SO.getSurveyorList({
            pGetActive: "1",
            pFullName: this.filters.Name,
            pDeviceCode: this.filters.DeviceCode,
            pFromRow: params.request.startRow,
            pToRow: params.request.endRow
          })
            .then(async ({ data }) => {
              this.getSurveyorListRes = this.getResponse(data)

              if (this.getSurveyorListRes.success) {
                params.success({
                  rowData: this.getSurveyorListRes.data.SurveyorList.map(
                    (e) => {
                      return {
                        ...e,
                        isSelected: false
                      }
                    }
                  ),
                  rowCount:
                    this.getSurveyorListRes.data.SurveyorList[0]?.TotalCount ||
                    0
                })

                await this.$services.SO.getUploadedRevisitList({
                  pNidBase: this.nidBase
                })
                  .then(({ data: data2 }) => {
                    this.getUploadedRevisitListRes = this.getResponse(data2)
                    if (this.getUploadedRevisitListRes.success) {
                      this.dataContext.revisitListComplete =
                        this.getUploadedRevisitListRes.data.UploadedRevisitList

                      if (
                        this.dataContext.revisitListComplete &&
                        this.dataContext.revisitListComplete.length > 0
                      ) {
                        this.cmbRevisitListOptions = []

                        this.dataContext.revisitListComplete.forEach((item) => {
                          this.cmbRevisitListOptions.push({
                            // eslint-disable-next-line standard/computed-property-even-spacing
                            [`${item?.SName ?? ""} ${item?.SFamily || ""} ${
                              item?.SurveyorUploadDate || ""
                            } ${item?.SurveyorUploadTime || ""}`]: item.NidBase
                          })
                        })

                        this.cmbRevisitList = this.nidBase
                      }
                    } else throw new Error("server error...")
                  })
                  .catch((ex) => {
                    throw ex
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

    btnAssignClick () {
      if (this.showComment && !this.comments) {
        return this.showWarning("لطفا توضیحات را وارد نمایید !", {
          title: "اخطار"
        })
      }

      if (this.isChangedSurveyor) {
        this.changeSurveyorObj()
      } else {
        if (this.isBlock) this.assignBlock()
        else {
          if (this.withChildren) {
            this.assignObjectWithChildren()
          } else {
            this.assignObjectNoChildren()
          }
        }
      }
    },

    assignObjectWithChildren () {
      let tmpSurveyor = null

      let tmpNidAssignSurvey = EMPTY_GUID
      if (this.filters.chkSendToLastTablet) {
        if (
          this.dataContext.revisitListComplete != null &&
          this.dataContext.revisitListComplete.length > 0
        ) {
          tmpNidAssignSurvey =
            this.dataContext.revisitListComplete[0].NidSurveyor
        } else if (this.gridApi.getSelectedRows()?.[0] == null) {
          return this.showError(
            "بازدیدی برای این پرونده انجام نشده است. لطفا ممیز را انتخاب کنید !",
            {
              title: "اخطار"
            }
          )
        } else {
          tmpSurveyor = this.gridApi.getSelectedRows()?.[0]
          tmpNidAssignSurvey = tmpSurveyor.NidSurveyor
        }
      } else {
        if (this.gridApi.getSelectedRows()?.[0] == null) {
          return this.showError("لطفا ممیز را انتخاب نمایید !", "اخطار")
        } else {
          tmpSurveyor = this.gridApi.getSelectedRows()?.[0]
          tmpNidAssignSurvey = tmpSurveyor.NidSurveyor
        }
      }

      this.showLoading()

      this.$services.SO.assignObjectToSurveyorWithChildren({
        pNidBase: this.filters.cmbRevisitList,
        pNidSurveyor: tmpNidAssignSurvey,
        pNidUserAssignToSurveyor: this.getNidUser(),
        pNameUserAssignToSurveyor: this.getUserDisplayName(),
        Comments: this.comments
      })
        .then(async ({ data }) => {
          this.assignObjectToSurveyorWithChildrenRes = this.getResponse(data)

          if (this.assignObjectToSurveyorWithChildrenRes.success) {
            if (
              this.assignObjectToSurveyorWithChildrenRes.data
                .AssignToSurveyorCount > 0
            ) {
              this.done()

              await this.log({
                action: this.logActions.save,
                bizCode: tmpNidAssignSurvey,
                bizCodeTitle: "NidSurveyor",
                saveDesc: `ارجاع به ممیز در فرم ${this.title} انجام گردید.`
              })
            } else {
              this.showWarning("موردی جهت بررسی انتخاب نشده است !", {
                title: "اخطار"
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
    },

    changeSurveyorObj () {
      this.showLoading()

      const tmpSurveyor = this.gridApi.getSelectedRows()?.[0]
      this.$services.SO.assignToSurveyorChangeSurveyor({
        pDistrict: this.tmpNosaziCode.District,
        pRegion: this.tmpNosaziCode.Region,
        pBlock: this.tmpNosaziCode.Block,
        pHouse: this.tmpNosaziCode.House,
        pBuilding: this.tmpNosaziCode.Building,
        pApartment: this.tmpNosaziCode.Apartment,
        pShop: this.tmpNosaziCode.Shop,
        pFromNidSurveyor: this.fromSurveyorNid,
        pToNidSurveyor: tmpSurveyor.NidSurveyor,
        pNidUserAssignToSurveyor: this.getNidUser(),
        pNameUserAssignToSurveyor: this.getUserDisplayName(),
        Comments: this.comments
      })
        .then(({ data }) => {
          this.assignToSurveyorChangeSurveyorRes = this.getResponse(data)

          if (this.assignToSurveyorChangeSurveyorRes.success) {
            if (
              this.assignToSurveyorChangeSurveyorRes.data
                .AssignToSurveyorCount > 0
            ) {
              this.done("تغییر ارجاع با موفقیت انجام شد !")
            } else {
              this.showWarning("موردی جهت بررسی انتخاب نشده است !", {
                title: "اخطار"
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
    },

    assignBlock () {
      const tmpSurveyor = this.gridApi.getSelectedRows()?.[0]

      if (!tmpSurveyor) {
        return this.showWarning("لطفا ممیز را انتخاب نمایید !")
      }
      this.showLoading()

      this.$services.SO.assignBlockToSurveyor({
        pDistrict: this.tmpNosaziCode.District,
        pRegion: this.tmpNosaziCode.Region,
        pBlock: this.tmpNosaziCode.Block,
        pNidSurveyor: tmpSurveyor.NidSurveyor,
        pNidUserAssignToSurveyor: this.getNidUser(),
        pNameUserAssignToSurveyor: this.getUserDisplayName(),
        Comments: this.comments
      })
        .then(async ({ data }) => {
          this.assignBlockToSurveyorRes = this.getResponse(data)

          if (this.assignBlockToSurveyorRes.success) {
            if (this.assignBlockToSurveyorRes.data.AssignToSurveyorCount > 0) {
              this.done()

              await this.log({
                action: this.logActions.save,
                bizCode: tmpSurveyor.NidSurveyor,
                bizCodeTitle: "NidSurveyor",
                saveDesc: `ارجاع به ممیز در فرم ${this.title} انجام گردید.`
              })
            } else {
              this.showWarning("موردی جهت بررسی انتخاب نشده است !", {
                title: "اخطار"
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
    },

    assignObjectNoChildren () {
      let tmpSurveyor = null,
        tmpNidAssignSurvey = EMPTY_GUID

      if (this.filters.chkSendToLastTablet) {
        if (
          this.dataContext.revisitListComplete &&
          this.dataContext.revisitListComplete.length > 0
        ) {
          tmpNidAssignSurvey =
            this.dataContext.revisitListComplete[0].NidSurveyor
        } else if (!this.gridApi.getSelectedRows()?.[0]) {
          return this.showError(
            "بازدیدی برای این پرونده انجام نشده است. لطفا ممیز را انتخاب کنید !",
            {
              title: "اخطار"
            }
          )
        } else {
          tmpSurveyor = JSON.parse(
            JSON.stringify(this.gridApi.getSelectedRows()?.[0])
          )
        }
      } else {
        if (!this.gridApi.getSelectedRows()?.[0]) {
          return this.showError("لطفا ممیز را انتخاب کنید !")
        } else {
          tmpSurveyor = this.gridApi.getSelectedRows()?.[0]
          tmpNidAssignSurvey = tmpSurveyor.NidSurveyor
        }
      }

      this.showLoading()

      this.$services.SO.assignObjectToSurveyorNoChildren({
        pNidBase: this.filters.cmbRevisitList,
        pNidSurveyor: tmpNidAssignSurvey,
        pNidUserAssignToSurveyor: this.getNidUser(),
        pNameUserAssignToSurveyor: this.getUserDisplayName(),
        Comment: this.comments
      })
        .then(async ({ data }) => {
          this.assignObjectToSurveyorNoChildrenRes = this.getResponse(data)

          if (this.assignObjectToSurveyorNoChildrenRes.success) {
            if (
              this.assignObjectToSurveyorNoChildrenRes.data
                .AssignToSurveyorCount > 0
            ) {
              this.done()

              await this.log({
                action: this.logActions.save,
                bizCode: tmpNidAssignSurvey,
                bizCodeTitle: "NidSurveyor",
                saveDesc: `ارجاع به ممیز در فرم ${this.title} انجام گردید.`
              })
            } else {
              this.showWarning("موردی جهت بررسی انتخاب نشده است !", {
                title: "اخطار"
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
    },

    done (msg = "ارجاع به ممیز با موفقیت انجام شد") {
      this.$emit("done", {
        msg,
        context: this.gridApi.getSelectedRows()?.[0] || []
      })
    }
  },

  watch: {
    loading (val) {
      if (val) this.showLoading()
      else this.hideLoading()
    }
  }
}
</script>
