<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
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

          <div
            class="flex col-auto q-mr-sm q-gutter-x-sm items-center justify-end"
          >  <btn-default
              v-if="exitBlackListStatus"
              label="تغییر وضعیت"
              @click="changeStatus"
            />
            <btn-default
              v-if="exitBlackListStatus"
              label="تغییر وضعیت"
              @click="changeStatus"

            />
            <btn-default
              label="خروج از لیست سیاه"

              @click="exitBlackList"

            />
            <btn-default label="بازآوری" @click="reLoad" />
          </div>
        </div>
        <!-- <fit> -->
            <!-- helper="agShahrsaziBlackList" -->
          <safa-grid
            title="لیست سیاه"
            :columns="agIncomeBlackList"
            fit
            v-model="results.BlackList"
            min-height="170px"
            max-height="100%"
            height="100%"

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
            @selection:changed="selectedRowHandler"

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
      <IncomeExitBlackList
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
      <IncomeChangeStatusBlackList
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
import IncomeExitBlackList from "./partials/IncomeExitBlackList.vue"
import IncomeChangeStatusBlackList from "./partials/IncomeChangeStatusBlackList.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "../../../../utils/nosaziCodeOperation"

export default {
  route: "/black-list/BlackList",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'لیست سیاه',
      formKey: '975eaaca-8245-4afa-9603-c5d2954e03c3',
      name: 'UIncomeBlckList',
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
    IncomeExitBlackList,
    IncomeChangeStatusBlackList
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    agIncomeBlackList () {
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

    getRowClass ({ data: row }) {
      if (!row) return
      if (row.EumBlackListStatus === 0) return 'enter-black-list'
      if (row.EumBlackListStatus === 1) return 'exit-black-list'
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
      let domainStr = "Domain = 'Income'" //  معادل سرا10 نداریم مجبور شدم فعلا این رو هارد کد بگذرام
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
      // if (this.allDomain) {
      conditionStr += " And " + domainStr
      // }
      // if (this.nidWorkItem !== '' && conditionStr !== '') {
      //   conditionStr += ' AND ' + ' NidWorkItem = ' + this.nidWorkItem
      // } else if (this.nidWorkItem !== '') {
      //   conditionStr = 'where' + ' NidWorkItem = ' + this.nidWorkItem
      // }

      /// //
      const _this = this

      _this.showLoading()
      // #region payload & config
      let data = {}
      if (this.reLoadClick) {
        data = {
          pFromRow: 0,
          pToRow: 100,
          pWhere: "",
          pNationalCode: ""
        }
      } else {
        data = {
          pFromRow: 0,
          pToRow: 100,
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
              x.Domain = 'درآمد'
              if (x.EumBlackListStatus === 0) {
                x.class = 'enter-black-list'
              }
              if (x.EumBlackListStatus === 1) {
                x.class = 'exit-black-list'
              }
            })
            if (_this.reLoadClick) {
              _this.reLoadClick = false
            }

            const strNosaziCode = convertNosaziCodeObjectToString(
              _this.baseNosaziCode
            )
            _this.tempBlacklist = _this.results.BlackList.map((row) => {
              return {
                ...row,

                isSelected: false

              }
            })
            await _this.log({
              action: _this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          _this.serverError()
          // console.log(this.getResponse(response))
        })
        .finally(() => {
          _this.hideLoading()
          _this.loading = false
        })
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
    selectedRowHandler
    (e) {
      this.selectedRow = null
      this.$nextTick(() => {
        const rows = e.api.getSelectedRows()
        if (rows.length > 0) {
          this.selectedRow = rows[0]
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
        }
      })
    },
    selectedChange (e) {
      debugger
      this.selectedRow = e.api.getSelectedRows()
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
      debugger
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
      this.blackListForm = false
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
    }
    // loading (val) {
    //   if (this.gridApi) {
    //     if (val) this.gridApi.showLoadingOverlay()
    //     else this.gridApi.hideOverlay()
    //   }
    // }
  }
}
</script>
