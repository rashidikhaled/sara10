<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
  >
    <form-wrapper :padding="false" :title="title">
      <template #header>
        <safa-status :result="getObjectSurveyRes" />
        <safa-status :result="loadHousesFromBlockRes" />
      </template>
      <fit>
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
          :columns="searchListColumns"
          :suppressRowClickSelection="false"
          :allowMultipleSelection="false"
          @grid:ready="onGridReady"
          @selection:changed="rowChanged"
          @row:dblclick="rowDblclick"
          cdcName="ObjectSurveyList"
          title="لیست جستجو"
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
              <btn-search @click="doSearch" />
              <q-separator vertical />
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
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"

// Partial Components
import USearchUAssignToSurveyor from "./partials/UAssignToSurveyor.vue"

// Constants
const EMPTY_GUID = "00000000-0000-0000-0000-000000000000"

export default {
  mixins: [baseFormMixin],

  components: { USearchUAssignToSurveyor },

  data () {
    return {
      title: "جستجو",
      formKey: "37EA1BC4-F5ED-8739-B6B1-E2B57C014E8E",
      name: "USearch",
      main: true,

      // Context
      gridApi: null,
      columnApi: null,
      tmpModel: [],
      dataContext: {
        ObjectSurvey: []
      },
      searchListColumns: [
        {
          field: "agCallbackBtn",
          title: "ارجاع بلوک",
          btnTitle: "ارجاع",
          callback: (params) => this.hlAssign(params)
        },
        {
          title: "کد نوسازی",
          field: "NosaziCodestr",
          width: 110
        },
        {
          title: "تعداد کل",
          field: "ObjCount",
          width: 105
        },
        {
          title: "بررسی شده",
          field: "CountSurvey",
          cellStyle: (params) => this.getCellStyle(params, "SurveyStyle"),
          width: 115
        },
        {
          title: "نیاز به بازدید دارد",
          field: "CountRequiredRevisit",
          width: 145
        },
        {
          title: "نیاز به بازدید ندارد",
          field: "CountNotRequiredRevisit",
          width: 150
        },
        {
          title: "ارجاع به ممیز",
          field: "CountAssignToSurveyor",
          cellStyle: (params) => this.getCellStyle(params, "AssignedStyle"),
          width: 125
        },
        {
          title: "دانلود شده",
          field: "CountDownloadWithSurveyor",
          cellStyle: (params) => this.getCellStyle(params, "DownloadStyle"),
          width: 110
        },
        {
          title: "آپلود شده",
          field: "CountUploadWithSurveyor",
          cellStyle: (params) => this.getCellStyle(params, "UploadStyle"),
          width: 110
        },
        {
          title: "تایید اول",
          field: "CountFirstConfirm",
          cellStyle: (params) => this.getCellStyle(params, "FirstConfirmStyle"),
          width: 110
        },
        {
          title: "تایید دوم",
          field: "CountSecondConfirm",
          cellStyle: (params) =>
            this.getCellStyle(params, "SecondConfirmStyle"),
          width: 110
        },
        {
          title: "نیاز به بازدید مجدد",
          field: "CountRevisitAgain",
          width: 145
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
      tmpNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0
      },
      houseTreeContainer: {
        list: [],
        treeSize: 0,
        current: 1,
        pageSize: 20
      },
      loading: false,

      // Popups
      showAssignToSurveyor: false,

      // Responses
      getObjectSurveyRes: null,
      loadHousesFromBlockRes: null
    }
  },

  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi
      this.gridApi.addEventListener("failCallback", (ex) => {
        console.error("failCallback: ", ex)
      })
    },

    rowChanged (params) {},

    async rowDblclick ({ data: tmpItem }) {
      // حوزه
      // eslint-disable-next-line eqeqeq
      if (tmpItem.District > 0 && tmpItem.Region == 0) {
        this.tmpNosaziCode.District = tmpItem.District
        this.tmpNosaziCode.Region = tmpItem.Region
        this.loadObj()
      } else if (
        tmpItem.District > 0 &&
        tmpItem.Region > 0 &&
        // eslint-disable-next-line eqeqeq
        tmpItem.Block == 0
      ) {
        this.tmpNosaziCode.District = tmpItem.District
        this.tmpNosaziCode.Region = tmpItem.Region
        this.tmpNosaziCode.Block = tmpItem.Block
        this.loadObj()
      }
      // بلوک
      else if (
        tmpItem.District > 0 &&
        tmpItem.Region > 0 &&
        tmpItem.Block > 0 &&
        // eslint-disable-next-line eqeqeq
        tmpItem.House == 0
      ) {
        this.setForm({
          formKey: "USearchUParvandeh",
          title: `جزئیات پرونده (${tmpItem.Block}-${tmpItem.Region}-${tmpItem.District})`,
          props: {
            formKey: this.formKey,
            title: this.title,
            name: this.name,
            activeHouseTreeContainer: this.houseTreeContainer,
            params: {
              IsLoadedFromMenu: this.isSelectFromMenu,
              District: tmpItem.District,
              Region: tmpItem.Region,
              Block: tmpItem.Block,
              IsBlock: true
            }
          }
        })
      } else {
        this.houseTreeContainer = {
          list: [],
          treeSize: 0,
          current: 0,
          pageSize: 20
        }

        this.showLoading()

        const from =
          this.houseTreeContainer.current * this.houseTreeContainer.pageSize
        const to = from + this.houseTreeContainer.pageSize

        await this.$services.SO.loadHousesFromBlock({
          pDistrict: tmpItem.District,
          pRegion: tmpItem.Region,
          pBlock: tmpItem.Block,
          pFromRow: from,
          pToRow: to
        })
          .then(({ data }) => {
            this.loadHousesFromBlockRes = this.getResponse(data)
            if (this.loadHousesFromBlockRes.success) {
              const tmpTree = this.loadHousesFromBlockRes.data.HousesList.sort(
                (a, b) => a.House - b.House
              )

              if (tmpTree && tmpTree.length > 0) {
                this.houseTreeContainer.list = tmpTree
                this.houseTreeContainer.treeSize =
                  this.loadHousesFromBlockRes.data.HousesCount
              }
              this.showLoading()
              this.setForm({
                formKey: "USearchUParvandeh",
                title: `جزئیات پرونده (${tmpItem.House}-${tmpItem.Block}-${tmpItem.Region}-${tmpItem.District})`,
                props: {
                  formKey: this.formKey,
                  title: this.title,
                  name: this.name,
                  activeHouseTreeContainer: this.houseTreeContainer,
                  params: {
                    IsLoadedFromMenu: this.isSelectFromMenu,
                    District: tmpItem.District,
                    Region: tmpItem.Region,
                    Block: tmpItem.Block,
                    IsBlock: false,
                    Apartment: {
                      NosaziodeC_House: `${tmpItem.District}-${tmpItem.Region}-${tmpItem.Block}-${tmpItem.House}-0-0-0`,
                      NidBase: EMPTY_GUID,
                      NosaziCode: tmpItem.NosaziCodestr
                    }
                  }
                }
              })

              this.hideLoading()
            }
          })
          .catch((ex) => {
            console.error(ex)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },

    doSearch () {
      Object.assign(this.tmpNosaziCode, {
        District: this.baseNosaziCode.District,
        Region: this.baseNosaziCode.Region,
        Block: this.baseNosaziCode.Block
      })

      this.loadObj()
    },

    loadObj () {
      this.setServerSideDatasource()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },

    setServerSideDatasource () {
      this.gridApi.setGridOption('serverSideDatasource', {
        getRows: async (params) => {
          try {
            if (this.loading) return false
            this.loading = true;

            ["District", "Region", "Block"].forEach((e) => {
              if (!this.isNullOrEmpty(this.tmpNosaziCode[e])) {
                this.baseNosaziCode[e] = this.tmpNosaziCode[e]
              }
            })
            this.setCode()

            const { data } = await this.$services.SO.getObjectSurvey({
              pDistrict: this.baseNosaziCode.District,
              pRegion: this.baseNosaziCode.Region,
              pBlock: this.baseNosaziCode.Block,
              pHouse: this.baseNosaziCode.House,
              pBuilding: this.baseNosaziCode.Building,
              pApartment: this.baseNosaziCode.Apartment,
              pShop: this.baseNosaziCode.Shop,
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow
            })
            this.getObjectSurveyRes = this.getResponse(data)

            if (this.getObjectSurveyRes.success) {
              this.columnApi.setColumnVisible(
                "agCallbackBtn",
                this.baseNosaziCode.Block === 0 &&
                  this.baseNosaziCode.Region !== 0
              )

              params.success({
                rowData: this.getObjectSurveyRes.data.ObjectSurvey,
                rowCount:
                  this.getObjectSurveyRes.data.ObjectSurvey[0]?.TotalCount || 0
              })
            } else params.fail()
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

    isNullOrEmpty: (val) => val === "" || val === null || isNaN(val),

    setCode () {
      [
        "District",
        "Region",
        "Block",
        "House",
        "Building",
        "Apartment",
        "Shop"
      ].forEach((scope) => {
        if (this.isNullOrEmpty(this.baseNosaziCode[scope])) {
          this.baseNosaziCode[scope] = 0
        }
      })
    },

    getCellStyle ({ data }, type) {
      if (!type || !data || typeof data !== "object") return

      switch (type) {
        case "SurveyStyle":
          if (data.CountNotSurvey > 0 && data.CountSurvey === 0) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (data.CountNotSurvey === 0 && data.CountSurvey === data.ObjCount) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "LightYellow"
          }

        case "AssignedStyle":
          if (data.CountNotSurvey > 0 && data.CountSurvey === 0) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (
            data.CountNotSurvey === 0 &&
            data.ObjCount - data.CountNotRequiredRevisit ===
              data.CountAssignToSurveyor
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }

          return {
            backgroundColor: "LightYellow"
          }

        case "DownloadStyle":
          if (
            data.CountDownloadWithSurveyor === 0 &&
            (data.CountRequiredRevisit > 0 || data.CountNotSurvey > 0)
          ) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (
            data.CountNotSurvey === 0 &&
            data.ObjCount - data.CountNotRequiredRevisit ===
              data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountAssignToSurveyor
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }
          if (data.CountRequiredRevisit > 0) {
            return {
              backgroundColor: "LightYellow"
            }
          }
          break

        case "UploadStyle":
          if (
            data.CountUploadWithSurveyor === 0 &&
            (data.CountRequiredRevisit > 0 || data.CountNotSurvey > 0)
          ) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (
            data.CountNotSurvey === 0 &&
            data.ObjCount - data.CountNotRequiredRevisit ===
              data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountUploadWithSurveyor
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }
          if (data.CountRequiredRevisit > 0) {
            return {
              backgroundColor: "LightYellow"
            }
          }
          break

        case "FirstConfirmStyle":
          if (
            data.CountFirstConfirm === 0 &&
            (data.CountRequiredRevisit > 0 || data.CountNotSurvey > 0)
          ) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (
            data.CountNotSurvey === 0 &&
            data.ObjCount - data.CountNotRequiredRevisit ===
              data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountUploadWithSurveyor &&
            data.CountUploadWithSurveyor === data.CountFirstConfirm
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }
          return {
            backgroundColor: "LightYellow"
          }

        case "SecondConfirmStyle":
          if (
            data.CountSecondConfirm === 0 &&
            (data.CountRequiredRevisit > 0 || data.CountNotSurvey > 0)
          ) {
            return {
              backgroundColor: "#f4d5de"
            }
          }

          if (
            data.CountNotSurvey === 0 &&
            data.ObjCount - data.CountNotRequiredRevisit ===
              data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountAssignToSurveyor &&
            data.CountDownloadWithSurveyor === data.CountUploadWithSurveyor &&
            data.CountUploadWithSurveyor === data.CountFirstConfirm &&
            data.CountFirstConfirm === data.CountSecondConfirm
          ) {
            return {
              backgroundColor: "PaleGreen"
            }
          }
          return {
            backgroundColor: "LightYellow"
          }
      }
    },

    hlAssign (params) {
      const self = this
      this.showAssignToSurveyor = true
      this.$nextTick(() => {
        self.$refs.USearchUAssignToSurveyor.loadObj({
          District: params.District,
          Region: params.Region,
          Block: params.Block,
          IsBlock: params.House === 0
        })
      })
    },

    done ({ msg }) {
      this.showAssignToSurveyor = false
      this.gridApi.refreshServerSide({
        purge: true
      })

      if (msg) {
        this.showSuccess(msg)
      }
    }
  },

  watch: {
    loading (val) {
      if (val) this.showLoading()
      else this.hideLoading()
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
