<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :hasFooter="false" :padding="false" title="لیست سیاه">
      <fit>
        <safa-status :result="baseLibResult" />
        <safa-status :result="result" />
        <expantion-section
          v-model="expansionState"
          default-opened
          title="جستجو"
        >
          <safa-group label-width="79px">
            <safa-text
              v-model="importerUser"
              :label-width="$q.screen.gt.xs ? '79px' : 'auto'"
              cdcName="importerUser"
              label=" کاربر وارد کننده به لیست"
            >
            </safa-text>

            <safa-datepicker
              v-model="entryDateFrom"
              cdcName="entryDateFrom"
              label="تاریخ ورود از"
              locale="fa"
            >
            </safa-datepicker>
            <safa-datepicker
              v-model="entryDateTo"
              cdcName="entryDateTo"
              label="تا تاریخ"
              locale="fa"
            >
            </safa-datepicker>
            <safa-text
              v-model="outgoingUser"
              :label-width="$q.screen.gt.xs ? '79px' : 'auto'"
              cdcName="outgoingUser"
              label="کاربر خارج کننده از لیست"
            >
            </safa-text>

            <safa-datepicker
              v-model="exitDateFrom"
              cdcName="exitDateFrom"
              label="تاریخ خروج از "
              locale="fa"
            >
            </safa-datepicker>
            <safa-datepicker
              v-model="exitDateTo"
              cdcName="exitDateTo"
              label="تا تاریخ"
              locale="fa"
            >
            </safa-datepicker>
            <safa-combo
              v-model="entryCause"
              cdcName="entryCause"
              ciName="CI_BlackListCause"
              domainName="CI_SaraM1"
              label="علت ورود"
            ></safa-combo>
            <safa-text
              v-model="nationalCode"
              cdcName="nationalCode"
              label="کد ملی "
            >
            </safa-text>
            <div class="flex q-col-gutter-x-sm">
              <safa-label class="q-pt-sm q-mr-md">کد نوسازی</safa-label>
              <nosazi-code-input
                v-model="baseNosaziCode"
                :actions="true"
                cdcName="baseNosaziCode"
              />
            </div>
          </safa-group>
          <div class="flex q-gutter-x-sm justify-end">
            <btn-search @click="search" />
            <btn-delete label="پاک کردن" @click="cancle" />
          </div>
        </expantion-section>

        <div class="row q-mb-sm q-gutter-sm justify-between">
          <safa-combo
            v-model="selectedRegion"
            :options="districts"
            cdcName="Region"
            class="col-md-3 q-px-sm"
            label="منطقه"
            label-width="80px"
            source-type="local"
            @input="districtChanged"
          />
          <div class="flex col q-col-gutter-x-md">
            <safa-checkbox
              v-model="allDomain"
              cdcName="allDomain"
              label="نمایش تمام دامنه ها"
              @input="onAllDistrictUpdated"
            />
            <safa-securityPanel
              id="48293c6b-84c6-4a44-b6d6-ae0d3b4386b9"
              caption="نمایش همه مناطق"
              tag="div"
              class="flex"
            >
              <safa-checkbox
                v-model="allDistrict"
                cdcName="allDistrict"
                label="نمایش تمام مناطق "
                @input="load"
              />
            </safa-securityPanel>
          </div>
          <div
            class="flex col-auto q-mr-sm q-gutter-x-sm items-center justify-end">

            <!-- طبق سرا8 ، و با هماهنگی با آقای زاهد-خانم روستا- خانم غلامی - خانم شیرانی این مورد کامنت شد -->
          <!-- <btn-default
              v-if="exitBlackListStatus"
              label="تغییر وضعیت"
              @click="changeStatus"
            /> -->
            <safa-securityPanel
            caption="تغییر وضعیت"
            id="113b821f-b056-4359-b96d-c421699d7575"
          >
            <btn-default
              v-if="exitBlackListStatus"
              label="تغییر وضعیت"
              @click="changeStatus"
            />
          </safa-securityPanel>
            <btn-default
              label="خروج از لیست سیاه"
              spCaption="خروج از لیست سیاه"
              @click="exitBlackList"
              spId="c462253d-fa03-484c-9877-9869ac862ad0"
            />
            <btn-default label="بازآوری" @click="reLoad" />
          </div>
        </div>
        <!-- <fit> -->
            <!-- helper="agShahrsaziBlackList" -->
          <safa-grid
            title="لیست سیاه"
            :columns="agShahrsaziBlackList"
            fit
            v-model="tmpModel"
            min-height="170px"
            max-height="100%"
            height="100%"
            rowModelType="serverSide"
            cdcName="blackList"
            :checkboxSelection="true"
            :filterable="false"
            :showRowNumber="true"
            ref="blackListGrid"
            id="blackListGrid"
            :bordered="true"
            :paginate="true"
            :pageSize="20"
            :cacheBlockSize="20"
            :cacheOverflowSize="2"
            :maxBlocksInCache="10"
            :suppressRowClickSelection="false"
            :maxConcurrentDatasourceRequests="1"
            :infiniteInitialRowCount="1000"
            :getRowClass="getRowClass"
            m="r"
            :add-row="false"
            :allow-copy="false"
            :delete-row="false"
            @selection:changed="selectedChange"
            @grid:ready="onGridReady"
          />
        <!-- <safa-datatable
          ref="grid2"
          v-model="results.BlackList"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :filterable="true"
          :paginate="true"
          :pageSize="20"
          cdcName="blackList"
          class="fit"
          height="100%"
          helper="shahrsaziBlackList"
          m="r"
          maxHeight="100%"
          title="لیست سیاه"
          @selectedChange="selectedChange"
        /> -->
        <!-- </div> -->
        <!-- </fit> -->
        <!-- </div> -->
      </fit>
    </form-wrapper>

    <safa-popup v-model="exitBlackListForm">
      <ExitBlackList
        :baseNosaziCodeFromParent="baseNosaziCode"
        :entryCause="entryCauseObj"
        :formKey="formKey"
        :name="name"
        :nidBlack="nidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="nosaziCode"
        :taskInfo="selectedRow"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </safa-popup>
    <safa-popup v-model="changeStatusForm">
      <ChangeStatusBlackList
        :baseNosaziCodeFromParent="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :nidBlack="nidBlack"
        :nidNosaziCode="nidNosaziCode"
        :nosaziCode="nosaziCode"
        :taskInfo="selectedRow"
        :title="title"
        @backToBlackListForm="backToBlackListForm"
      />
    </safa-popup>
  </safa-form>
</template>
<script>
import ExitBlackList from "./black-list-partials/ExitBlackList.vue"
import ChangeStatusBlackList from "./black-list-partials/ChangeStatusBlackList.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "../../../../utils/nosaziCodeOperation"

export default {
  route: "/black-list/BlackList",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "لیست سیاه",
      formKey: "f9c32495-a0ae-4f6d-a238-7533a9d54822",
      name: "BlackList",
      main: true,
      sidebarCompatible: true,
      allDomain: true,
      allDistrict: false,
      exitBlackListStatus: false,
      exitBlackListForm: false,
      changeStatusForm: false,
      blackListForm: true,
      expansionState: true,
      entryDateFrom: "",
      entryDateTo: "",
      exitDateFrom: "",
      exitDateTo: "",
      outgoingUser: "",
      importerUser: "",
      entryCause: 0,
      // Context
      gridApi: null,
      loading: false,
      tmpModel: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedRegion: 1,
      nationalCode: "",
      result: null,
      results: { BlackList: [] },
      baseLibResult: null,
      tempBlacklist: null,
      selectedRow: null,
      entryCauseObj: null,
      nidBlack: "00000000-0000-0000-0000-000000000000",
      nosaziCode: null,
      reLoadClick: false,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000"
    }
  },
  components: {
    ExitBlackList,
    ChangeStatusBlackList
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    agShahrsaziBlackList () {
      return [
        {
          field: "RowId",
          title: "ردیف",
          width: "82px"
        },
        {
          field: "isSelected",
          width: "42px",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true,
          filter: false,
          filterable: false
        },
        {
          field: "EumBlackListStatus",
          title: "",
          width: "100px",
          cellRenderer: "agBlackListStatusTemplate"

        },
        {
          field: "EumBlackListControl",
          title: "",
          width: "100px",
          cellRenderer: "agGridBlackListControlTemplate"
        },

        {
          field: "NosaziCode",
          title: "کد نوسازی",
          width: "150px"
        },
        {
          field: "CI_BlackListCause",
          title: "علت ورود به لیست سیاه",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "Domain",
          title: "دامنه",
          width: "90px"
        },
        {
          field: "EnterDate",
          title: "تاریخ ورود به لیست",
          editor: "date",
          width: "120px"
        },
        {
          field: "EnterTime",
          title: "ساعت ورود به لیست",
          width: "120px"
        },
        {
          field: "UserEnter",
          title: "کاربر وارد کننده به لیست",
          width: "190px"
        },
        {
          field: "EnterComments",
          title: "توضیحات ورود",
          width: "400px"
        },
        {
          field: "ExitDate",
          title: "تاریخ خروج از لیست",
          editor: "date",
          width: "130px"
        },
        {
          field: "ExitTime",
          title: "ساعت خروج از لیست",
          width: "130px"

        },
        {
          field: "UserExit",
          title: "کاربر خارج کننده از لیست",
          width: "190px"
        },
        {
          "field": "ExitComments",
          "title": "توضیحات خروج",
          "width": "400px"
        }
      ]
    }
  },
  methods: {
    onGridReady (params) {
      this.gridApi = params.api
      this.load()
    },
    getRowClass ({ data: row }) {
      if (!row) return
      if (row.EumBlackListStatus === 0) return "shahrsazi-enter-black-list"
      if (row.EumBlackListStatus === 1) return "shahrsazi-exit-black-list"
    },
    districtChanged (District) {
      this.baseNosaziCode = { ...this.baseNosaziCode, District }
    },
    onAllDistrictUpdated () {
      this.load()
    },
    load () {
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ""
      let domainStr = "Domain='Sara8'" //  معادل سرا10 نداریم مجبور شدم فعلا این رو هارد کد بگذرام
      if (this.baseNosaziCode.District !== 0) {
        if (!this.allDistrict) {
          districtStr = "District = " + this.baseNosaziCode.District
          conditionStr = "Where " + districtStr
        } else {
          conditionStr = ''
        }
      } else if (this.baseNosaziCode.District === 0) {
        if (!this.allDistrict) {
          conditionStr = "Where District =  " + this.selectedRegion
        } else {
          conditionStr = ''
        }
      }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = "Region = " + this.baseNosaziCode.Region
        conditionStr += "  AND " + regionStr
      } else {
        regionStr = ""
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = "Block = " + this.baseNosaziCode.Block
        conditionStr += "  AND  " + blockStr
      } else {
        blockStr = ""
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = "House = " + this.baseNosaziCode.House
        conditionStr += "  AND  " + hoseStr
      } else {
        hoseStr = ""
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = "Building = " + this.baseNosaziCode.Building
        conditionStr += "  AND  " + buildingStr
      } else {
        buildingStr = ""
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = "Apartment = " + this.baseNosaziCode.Apartment
        conditionStr += "  AND " + apartmentStr
      } else {
        apartmentStr = ""
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = "Shop = " + this.baseNosaziCode.Shop
        conditionStr += " AND " + shopStr
      } else {
        shopStr = ""
      }
      if (this.importerUser !== "") {
        conditionStr += " And  UserEnter Like '%" + this.importerUser + "%' "
      }
      if (this.entryDateFrom !== "" && this.entryDateTo !== "") {
        conditionStr +=
          " And EnterDate between '" +
          this.entryDateFrom +
          "' and '" +
          this.entryDateTo +
          "' "
      }
      if (this.exitDateFrom !== "" && this.exitDateTo !== "") {
        conditionStr +=
          " And ExitDate between '" +
          this.exitDateFrom +
          "' and '" +
          this.exitDateTo +
          "' "
      }
      if (this.outgoingUser !== "") {
        conditionStr += " And  UserExit Like '%" + this.outgoingUser + "%'"
      }
      if (this.entryCause !== 0) {
        conditionStr += " And CI_BlackListCause = " + this.entryCause
      }
      debugger
      if (!this.allDomain) {
        conditionStr += "And " + domainStr
      }
      // if (this.nidWorkItem !== '' && conditionStr !== '') {
      //   conditionStr += ' AND ' + ' NidWorkItem = ' + this.nidWorkItem
      // } else if (this.nidWorkItem !== '') {
      //   conditionStr = 'where' + ' NidWorkItem = ' + this.nidWorkItem
      // }

      /// //
      const _this = this
      if (_this.loading) return false
      _this.loading = true
      _this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          _this.showLoading()
          // #region payload & config
          let data = {}
          if (this.reLoadClick) {
            data = {
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow,
              pWhere: "",
              pNationalCode: ""
            }
          } else {
            data = {
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow,
              pWhere: conditionStr,
              pNationalCode: this.nationalCode
            }
          }
          // #endregion
          console.log("data ************************", data)
          _this.$services.SA.getBlackList(data, {
            config: { District: _this.selectedRegion }
          })
            .then(async ({ data }) => {
              _this.result = _this.getResponse(data)
              if (_this.result.success) {
                _this.results = this.result.data
                // this.results.BlackList=[{NosaziCode:'',CI_BlackListCause:0,EumBlackListStatus:0}]
                _this.results.BlackList.map((x) => {
                  if (x.EumBlackListStatus === 0) {
                    x.class = "shahrsazi-enter-black-list"
                  }
                  if (x.EumBlackListStatus === 1) {
                    x.class = "shahrsazi-exit-black-list"
                  }
                })
                if (_this.reLoadClick) {
                  _this.reLoadClick = false
                }

                const strNosaziCode = convertNosaziCodeObjectToString(
                  _this.baseNosaziCode
                )
                _this.tempBlacklist = _this.results.BlackList.map((row, _i) => {
                  return {
                    ...row,
                    RowId: ++_i,
                    isSelected: false

                  }
                })
                params.success({
                  rowData: _this.tempBlacklist,
                  rowCount: _this.tempBlacklist[0]?.TableCount || 0
                })
                await _this.log({
                  action: _this.logActions.view,
                  bizCode: strNosaziCode,
                  bizCodeTitle: "کد نوسازی"
                })
              }
            })
            .catch((response) => {
              params.fail()
              _this.serverError()
              // console.log(this.getResponse(response))
            })
            .finally(() => {
              _this.hideLoading()
              _this.loading = false
              _this.storeCurrentState()
            })
        }
      })
      /// /
    },
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      let self = this
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)
          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          self.baseLibResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.load()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },
    cancle () {
      this.entryDateFrom = ""
      this.entryDateTo = ""
      this.exitDateFrom = ""
      this.exitDateTo = ""
      this.nationalCode = ""
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.importerUser = ""
      this.outgoingUser = ""
      this.entryCause = 0
    },
    selectedChange (params) {
      this.selectedRow = params.api.getSelectedRows()[0]
      this.$stKartable.dispatch("setSelectedRequest", this.selectedRow) // برای تغییر وضعیت باید سلکت نوسازی کد بروز بشه
      this.nidNosaziCode = this.selectedRow.NidNosaziCode
      this.entryCauseObj = this.selectedRow.CI_BlackListCause
      this.nidBlack = this.selectedRow.NidBlack
      this.nosaziCode = this.selectedRow.NosaziCode
      if (this.selectedRow.EumBlackListStatus === 0) {
        this.exitBlackListStatus = true
      } else if (this.selectedRow.EumBlackListStatus === 1) {
        this.exitBlackListStatus = false
      }
    },

    exitBlackList () {
      if (this.selectedRow === null) {
        this.showError("لطفا ابتدا یک مورد از لیست انتخاب نمایید.")
      } else {
        if (this.selectedRow.EumBlackListStatus === 1) {
          this.showError("مورد انتخاب شده قبلا از لیست سیاه خارج شده است.")
        } else {
          this.exitBlackListForm = true
        }
      }
    },
    reLoad () {
      this.reLoadClick = true
      this.cancle()
      this.load()
    },
    changeStatus () {
      this.changeStatusForm = true
    },
    backToBlackListForm (val) {
      if (val) {
        if (this.exitBlackListForm) {
          this.exitBlackListForm = false
          this.blackListForm = true
        }
        if (this.changeStatusForm) {
          this.changeStatusForm = false
          this.blackListForm = true
        }

        this.load()
      }
    }
  },
  beforeDestroy () {
    this.$stKartable.dispatch("setSelectedRequest", this.selectedRequest) // برای تغییر وضعیت باید سلکت نوسازی کد بروز بشه
  },
  watch: {
    selectedRegion () {
      this.load()
    },
    loading (val) {
      if (this.gridApi) {
        if (val) this.gridApi.showLoadingOverlay()
        else this.gridApi.hideOverlay()
      }
    }
  }
}
</script>
