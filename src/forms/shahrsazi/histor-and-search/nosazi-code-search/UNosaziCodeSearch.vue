<template>
  <fit>
    <safa-status :result="result" />
    <safa-status :result="baseLibRes" />
    <div class="q-pa-sm">
      <nosazi-code-input
        v-model="Base_NosaziCode"
        @enter="loadObj"
        :selectedFromMelkSearch="selectedFromMelkSearch"
        :NosaziCode="NosaziCode"
        cdcName="Base_NosaziCode"
        ref="nosaziCodeInput"
        :actions="false"
      />
    </div>
    <internal-section>
      <div class="row q-col-gutter-x-xl">
        <div class="col-12 col-sm-auto">
          <div class="q-gutter-md flex">
            <div class="q-mr-xs">چگونگی شرط:</div>
            <safa-radio
              label="شبیه"
              :val="false"
              v-model="isEqual"
              cdcName="ConditionOperator"
            />
            <safa-radio
              label="مساوی"
              :val="true"
              v-model="isEqual"
              cdcName="ConditionOperator"
            />
          </div>
        </div>
        <div class="col-12 col-sm-auto">
          <div class="q-gutter-sm-md q-gutter-xs-sm flex">
            <div class="q-mr-sm-md">نوع پرونده:</div>
            <safa-radio
              label="جاری"
              :val="0"
              v-model="baseInfoGroup"
              @input="handleBaseInfoChanged"
              cdcName="Jari"
            />
            <safa-radio
              label="ممیزی"
              :val="1"
              v-model="baseInfoGroup"
              @input="handleBaseInfoChanged"
              cdcName="Momayezi"
            />
            <safa-radio
              label="مجاز پروانه"
              :val="2"
              v-model="baseInfoGroup"
              @input="handleBaseInfoChanged"
              cdcName="MojazParvaneh"
            />
            <safa-radio
              label="مجاز پایانکار"
              :val="3"
              v-model="baseInfoGroup"
              @input="handleBaseInfoChanged"
              cdcName="MojazPayankar"
            />
            <safa-radio
              label="نوسازی"
              :val="100"
              v-model="baseInfoGroup"
              @input="handleBaseInfoChanged"
              cdcName="nosazi"
            />
          </div>
        </div>
      </div>
    </internal-section>
    <div v-if="!parvandehDialogState">
      <expantion-section
        default-open
        title="فیلدهای مورد نمایش"
        v-model="expansionState"
      >
        <div class="q-gutter-md">
          <safa-checkbox
            v-model="displayedFieldObj.Base_PreCodeInfo"
            val="Base_PreCodeInfo"
            label="کد شناسایی قدیم"
            cdcName="PreCodeInfo"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_JobInfo"
            val="Base_JobInfo"
            label="نام واحد شغلی"
            cdcName="JobInfo"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_SubScription"
            val="Base_SubScription"
            label="اشتراکات"
            cdcName="SubScription"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_JobOwner"
            val="Base_JobOwner"
            label="متصدی شغل"
            cdcName="JobOwner"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_RegisterPlack_1"
            val="Base_RegisterPlack_1"
            label="پلاک ثبتی"
            cdcName="RegisterPlack"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_ShahrsaziArchive"
            val="Base_ShahrsaziArchive"
            label="مجوزات"
            cdcName="ShahrsaziArchive"
          />
          <safa-checkbox
            v-model="displayedFieldObj.PlackAbi"
            val="PlackAbi"
            label="پلاک آبی"
            cdcName="checkPlackAbi"
          />
          <safa-checkbox
            v-model="displayedFieldObj.Base_File"
            val="Base_File"
            label="شماره پرونده مادر"
            cdcName="checkBase_File"
          />
        </div>
      </expantion-section>
    </div>

    <template>
      <safa-tabs v-model="currentTab" height="auto" :fit="false">
        <template v-slot:tabs>
          <tab-menu name="address" label="آدرس و مالک" />
          <tab-menu name="registerPlaque" label="پلاک ثبتی" />
          <tab-menu name="preCode" label="کد قدیم" />
          <tab-menu name="jobAndsubscription" label="شغلی و اشتراک ها" />
          <tab-menu name="exportation" label="گواهی ها و مجوزات" />
          <tab-menu name="blockTab" label="کد بلوک و ملک" />
        </template>
        <tab-content name="address" title="آدرس و مالک">
          <addressInfo
            :m="mode"
            :Base_Owner="Base_Owner"
            :Base_CommonEstate="Base_CommonEstate"
            :Base_AddressInfo="Base_AddressInfo"
            :Base_AddressPostCode="Base_AddressPostCode"
            :Base_File="Base_File"
          />
        </tab-content>
        <tab-content name="registerPlaque" title="پلاک ثبتی">
          <register-plaque
            :m="mode"
            :Base_RegisterPlack_1="Base_RegisterPlack_1"
          />
        </tab-content>
        <tab-content name="preCode" title="کد قدیم">
          <preCode :m="mode" :Base_PreCodeInfo="Base_PreCodeInfo" />
        </tab-content>
        <tab-content name="jobAndsubscription" title="شغلی و اشتراک ها">
          <jobAndsubscription
            :m="mode"
            :Base_JobOwner="Base_JobOwner"
            :Base_JobInfo="Base_JobInfo"
            :checkBase="checkBase"
          />
        </tab-content>
        <tab-content name="exportation" title="گواهی ها و مجوزات">
          <exportation
            :m="mode"
            :Base_ShahrsaziArchive="Base_ShahrsaziArchive"
          />
        </tab-content>
        <tab-content name="blockTab" title="کد بلوک و ملک">
          <blockTab
            :m="mode"
            :isGetData="isGetData"
            :Base_NosaziCode1="Base_NosaziCode1"
            @onBaseNosaziCode1="onBaseNosaziCodeChanged($event)"
          />
        </tab-content>
      </safa-tabs>
      <div class="row q-gutter-sm q-pa-sm">
        <btn-search label="جستجو" @click="doitSearch" />
        <btn-delete label="پاک کردن" @click="handleReset" />
      </div>
      <fit>
        <!-- <safa-datatable2
          :columns="searchListColumns"
          v-model="SearchList"
          :selectable="selectable"
          allowMultipleSelection
          :paginate="true"
          :page="page"
          :take="take"
          :allowCopy="false"
          :serverServe="true"
          :perPage="[50]"
          :pageSize="50"
          :countData="totalRow"
          height="100%"
          max-height="100%"
          class="q-mt-sm"
          fit
          ref="SearchListGrid"
          cdcName="SearchList"
          @updatePagination="updatePaging"
          @selection:changed="selectionChanged"
          @row-click="rowClickHandler"
          @dbclick="dbClickHandler"
        /> -->
        <safa-grid
          :columns="searchListColumns"
          v-model="SearchList"
          :checkboxSelection="true"
          :suppressRowClickSelection="false"
          :showRowNumber="true"
          allowMultipleSelection
          :paginate="true"
          :allowCopy="false"
          :pageSize="50"
          height="100%"
          :cacheBlockSize="50"
          max-height="100%"
          class="q-mt-sm"
          fit
          id="SearchList"
          ref="SearchListGrid"
          @row:click="rowClickHandler"
          @row:dblclick="dbClickHandler"
          cdcName="SearchList"
          @selection:changed="selectionChanged"
          :rowModelType="'serverSide'"
          @grid:ready="onGridReady"
        />
        <!-- @pagination:changed="updatePaging"
         -->
      </fit>
    </template>
    <safa-popup v-model="parvandehDialogState" width="1300px" height="700px">
      <u-parvandeh-info
        :preferNosaziCode="selectedFromGridNosaziCode"
        :taskInfo="selectedRecord"
        :shallshowCloseBtn="parvandehDialogState"
        @closeParvandeh="onCloseParvandeh($event)"
        ref="parvandehInfo"
      />
    </safa-popup>
    <!-- <form-actions m="r" :showEditButton="false" class="q-mt-sm">
      <btn-default label="انتخاب" @click="selectedNewNosaziCode" />
    </form-actions> -->
  </fit>
  <!-- </form-wrapper>
  </safa-form> -->
</template>

<script>
/* eslint-disable vue/no-side-effects-in-computed-properties */
import {
  compareNosaziCodeObjects,
  convertStringToNosaziCodeObject
} from "src/utils/nosaziCodeOperation"
import UParvandehInfo from "../../tashkil-parvandeh/parvandeh-info/UParvandehInfo.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import addressInfo from "./partials/addressInfo.vue"
import registerPlaque from "./partials/registerPlaque.vue"
import preCode from "./partials/preCode.vue"
import jobAndsubscription from "./partials/jobAndsubscription.vue"
import exportation from "./partials/exportation.vue"
import blockTab from "./partials/blockTab.vue"
import mapMixin from "src/mixins/mapMixin"

export default {
  mixins: [baseFormMixin, mapMixin],
  components: {
    UParvandehInfo,
    addressInfo,
    registerPlaque,
    preCode,
    jobAndsubscription,
    exportation,
    blockTab
  },
  route: "/history-and-search/nosazi-code-search",
  props: {
    selectable: {
      type: Boolean,
      default: true
    },
    isFromComponent: {
      type: Boolean,
      default: false
    },
    value: Object,
    readOnly: Boolean,
    NosaziCode: Object,
    formKey: String,
    name: String,
    title: String,
    selectNosaziCode: Object
  },

  data () {
    return {
      // title: 'جستجوی ملک',
      // formKey: '320655BE-DFBA-4FF5-ABE0-B2F5F90550E3',
      // name: 'UNosaziCodeSearch',
      // main: true,
      // sidebarCompatible: true,
      newSelectedTables: ["Base_Owner", "Base_AddressInfo"],
      showFields: false,
      isGetData: false,
      closeForm: false,
      result: null,
      expansionState: true,
      checkBase: {
        checkBase_PreCodeInfo: false,
        checkBase_JobInfo: false,
        checkBase_SubScription: false,
        checkBase_JobOwner: false,
        checkBase_RegisterPlack_1: false,
        checkBase_ShahrsaziArchive: false,
        checkPlackAbi: false,
        checkBase_File: false,
        checkSubscriptions_water: false,
        checkSubscriptions_Electricity: false,
        checkSubscriptions_Gas: false,
        checkSubscriptions_Phone: false,
        checkSubscriptions_All: false,
        Subscriptions_number: ""
      },
      displayedFieldObj: {
        Base_PreCodeInfo: false,
        Base_JobInfo: false,
        Base_SubScription: false,
        Base_JobOwner: false,
        Base_RegisterPlack_1: false,
        Base_ShahrsaziArchive: false,
        PlackAbi: false,
        Base_File: false,
        Base_AddressPostCode: false
      },
      SearchList: [],
      selectedRecord: null,
      baseLibRes: null,
      baseLibResults: {
        MainObj: null
      },
      baseNosaziCode: null,
      parvandehDialogState: false,
      isEqual: false,
      selectedTables: ["Base_Owner", "Base_AddressInfo", "Base_RegisterPlack"], // Fixed tables
      //  "Base_OwnerHistory","Base_RegisterPlack_1","Base_PreCodeInfo","Base_JobInfo","Base_JobOwner"
      Base_Info: {
        EumBaseInfoGroup: 0
      },
      baseInfoGroup: 0,
      Base_JobInfo: { JobUnitName: "", CI_JobName: null },
      Base_NosaziCode: {
        EumNosaziCodeGroup: 0,
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      selectedFromGridNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      Base_NosaziCode1: { Block: 0, House: 0 },
      Base_Owner: {
        OwnerName: "",
        OwnerLastName: "",
        OwnerFatherName: "",
        NationalCode: "",
        CellPhone: ""
      },
      Base_AddressInfo: {
        MainAddress: ""
      },
      Base_CommonEstate: {
        Telephone: "",
        Plack: "",
        Vahed: ""
      },
      Base_File: {
        FileIdMother: ""
      },
      Base_RegisterPlack_1: {
        CI_RegisterPlackTypeGroup: null,
        CI_RegisterPlackType: null,
        RegisterPlackTypeValue: null
      },
      Base_PreCodeInfo: {
        PreCode: null
      },
      Base_JobOwner: {
        OwnerName: null,
        OwnerLastName: null
      },
      Base_AddressPostCode: {
        PostCode: ""
      },
      Base_ShahrsaziArchive: {
        EumShahrsaziArchiveGroup: 0,
        CertificateNo: null,
        CertificateDate: null
      },
      currentTab: "address",
      tabs: [
        { name: "address", label: "آدرس و مالک" },
        { name: "registerPlaque", label: "پلاک ثبتی" },
        { name: "preCode", label: "کد قدیم" },
        { name: "job", label: "شغلی" },
        { name: "subscription", label: "اشتراکات" },
        { name: "exportation", label: "گواهی ها و مجوزات" },
        { name: "blockTab", label: "کد بلوک و ملک" }
      ],
      columns: [
        { field: "OwnerName_Full", title: "مالک", width: "250px" },
        { field: "NosaziCode", title: "کد نوسازی", width: "150px" },
        { field: "FullAddress", title: "آدرس", width: "350px" }
      ],
      from: 0,
      to: 50,
      page: 1,
      skip: 0,
      take: 20,
      pageable: {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: [10, 50, 75, 100, 150, 200, 300, 400],
        previousNext: true
      },
      selectedFromMelkSearch: ""
    }
  },

  computed: {
    totalRow () {
      return (this.SearchList[0] && this.SearchList[0].TotalCount) || 1
    },
    config () {
      return {
        config: {
          District: this.Base_NosaziCode.District
        }
      }
    },

    query () {
      // 'Base_SubScription',
      // "Base_NosaziCode1",
      return [
        "Base_NosaziCode",
        "Base_Info",
        "Base_AddressInfo",
        "Base_Owner",
        "Base_JobInfo",
        "Base_CommonEstate",
        "Base_PreCodeInfo",
        "Base_RegisterPlack_1",
        "Base_JobOwner",
        "Base_ShahrsaziArchive",
        "Base_AddressPostCode",
        "Base_File"
      ]
        .map(this.generateQuery)
        .filter((x) => x)
        .join(" AND ")
    },
    searchListColumns () {
      let columns = [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection",
          checkboxSelection: true,
          showDisabledCheckboxes: true
        },
        { field: "NosaziCode", title: "کد نوسازی", width: "150px" },
        { field: "OwnerName_Full", title: "مالک", width: "180px" },
        { field: "FullAddress", title: "آدرس", width: "350px" },
        { field: "RegisterPlack_Full", title: "پلاک ثبتی", width: "250px" }
      ]

      if (
        this.displayedFieldObj.Base_PreCodeInfo ||
        this.Base_PreCodeInfo.PreCode
      ) {
        columns = [
          ...columns,
          {
            field: "PreCodeInfo_Full",
            title: "کد شناسایی قدیم",
            width: 100
          },
          this.selectedTables.push("Base_PreCodeInfo")
        ]
      }
      if (
        this.displayedFieldObj.Base_JobInfo ||
        this.Base_JobInfo.JobUnitName
      ) {
        const selectedTables =
          this.selectedTables.indexOf("Base_JobInfo") > -1
            ? this.selectedTables
            : this.selectedTables.push("Base_JobInfo")
        columns = [
          ...columns,
          {
            field: "JobUnitName",
            title: "نام واحد شغلی",
            width: 100
          },
          selectedTables
          // this.selectedTables.push('Base_JobInfo'),
        ]
      }
      if (this.displayedFieldObj.Base_File || this.Base_File.FileIdMother) {
        columns = [
          ...columns,
          {
            field: "FileIdMother",
            title: "شماره پرونده مادر",
            width: 100
          },
          this.selectedTables.push("Base_File")
        ]
      }
      if (this.displayedFieldObj.Base_JobInfo || this.Base_File.Base_JobInfo) {
        columns = [
          ...columns,
          { field: "JobUnitName", title: "نام واحد شغلی", width: 100 }
        ]
        this.selectedTables.push("Base_JobInfo")
      }
      if (this.displayedFieldObj.Base_SubScription) {
        columns = [
          ...columns,
          {
            field: "SubScription_Full",
            title: "اشتراکات",
            width: 100
          },
          this.selectedTables.push("Base_SubScription")
        ]
      }
      if (
        this.displayedFieldObj.Base_JobOwner ||
        this.Base_JobOwner.OwnerName
      ) {
        columns = [
          ...columns,
          {
            field: "JobOwner_Full",
            title: "متصدی شغل",
            width: "170px"
          },
          this.selectedTables.push("Base_JobOwner")
        ]
      }
      // if (this.displayedFieldObj.Base_RegisterPlack_1) {
      //   columns = [
      //     ...columns,
      //     {
      //       field: "RegisterPlack_Full",
      //       title: "پلاک ثبتی",
      //       width: "250px1"
      //     },
      //     this.selectedTables.push("Base_RegisterPlack")
      //   ];
      // }
      if (this.displayedFieldObj.Base_ShahrsaziArchive) {
        columns = [
          ...columns,
          {
            field: "ShahrsaziArchive_Full",
            title: "مجوزات",
            width: 300
          },
          this.selectedTables.push("Base_ShahrsaziArchive")
        ]
      }
      if (this.displayedFieldObj.PlackAbi) {
        columns = [
          ...columns,
          {
            field: "Plack",
            title: "پلاک آبی",
            width: 100
          },
          this.selectedTables.push("PlackAbi")
        ]
      }

      if (
        this.displayedFieldObj.Base_AddressPostCode ||
        this.Base_AddressPostCode.PostCode
      ) {
        columns = [
          ...columns,
          {
            field: "PostCode",
            title: "کد پستی",
            width: 100
          },
          this.selectedTables.push("Base_AddressPostCode")
        ]
      }
      let validColumns = columns.filter(
        (x) => typeof x === "object" && !Array.isArray(x) && x !== null
      )
      return validColumns
    }
  },

  async created () {
    await this.getSettingData()
  },

  methods: {
    selectedNewNosaziCode () {
      this.$refs.nosaziCodeInput.changeCodeFromUNosaziCodeSearch(
        this.selectedFromMelkSearch
      )
      const code = convertStringToNosaziCodeObject(this.selectedFromMelkSearch)
      this.$emit("select", code)
    },

    rowClickHandler (params) {
      let row = params.data
      this.selectedFromMelkSearch = row.NosaziCode
      this.$stKartable.dispatch("setSelectedRequest", null)
      this.selectedRecord = row
      if (this.selectedRecord) {
        const { District, Region, Block, House, Building, Apartment, Shop } =
          this.selectedRecord
        this.baseNosaziCode = {
          District,
          Region,
          Block,
          House,
          Building,
          Apartment,
          Shop
        }
        // this.$emit("selectNosaziCode", this.baseNosaziCode)
      } else {
        this.baseNosaziCode = null
      }
      // this.selectedNewNosaziCode()
      this.showCodeOnMap(row.NosaziCode)
    },
    selectionChanged (params) {
      let selectedRows = params.api.getSelectedRows() || []
      console.log("selectionChanged", selectedRows)
      const nosaziCodes = [
        ...new Set(selectedRows.map((x) => x.NosaziCode))
      ].filter(Boolean)
      // console.log('nosaziCodes', nosaziCodes)
      if (nosaziCodes.length === 0) return
      const splitter = `','`
      const query = `and (Code in ('${nosaziCodes.join(splitter)}'))`
      // console.log('query', query)
      this.showOnMapByExpression(query)
      setTimeout(() => {
        this.$KaisMap.CMap.getView().setZoom(16)
      }, 2000)
    },
    async getSettingData () {
      const result = await this.loadFormSetting("Sharsazi-PersonalSetting")
      if (result && result.PersonalSettingNosazi) {
        this.Base_NosaziCode = {
          ...this.Base_NosaziCode,
          District: parseInt(result.PersonalSettingNosazi.DefaultDistrict) || 0,
          Region: parseInt(result.PersonalSettingNosazi.DefaultRegion) || 0
        }
      }
    },
    onBaseNosaziCodeChanged (val) {
      this.Base_NosaziCode.Block = val.Block
      this.Base_NosaziCode.House = val.House
    },
    async doitSearch () {
      this.gridApi.setFilterModel(null)
      // this.gridApi.onFilterChanged()
      this.prvPage = this.gridApi.paginationGetCurrentPage()
      this.gridApi.refreshServerSide({
        purge: true
      })
    },
    checkSelectable () {
      const existSelectColumn = this.columns.some((x) => x.field === "select")
      if (this.selectable && !existSelectColumn) {
        this.columns = [
          { field: "isSelected", title: "انتخاب", cell: "grid-actions" },
          ...this.columns
        ]
      }
    },
    generateQuery (scope) {
      if (scope === "Base_RegisterPlack_1") {
        const conditions = []
        let counter = 1
        if (this.Base_RegisterPlack_1.CI_RegisterPlackTypeGroup) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Asli'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue ${
              this.isEqual
                ? `= N'${this.Base_RegisterPlack_1.CI_RegisterPlackTypeGroup}'`
                : `Like N'%${this.Base_RegisterPlack_1.CI_RegisterPlackTypeGroup}%'`
            }`
          )
          counter += 1
        }

        if (this.Base_RegisterPlack_1.CI_RegisterPlackType) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Fari'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue ${
              this.isEqual
                ? ` = N'${this.Base_RegisterPlack_1.CI_RegisterPlackType}'`
                : `Like N'%${this.Base_RegisterPlack_1.CI_RegisterPlackType}%'`
            }`
          )
          counter += 1
        }
        if (this.Base_RegisterPlack_1.RegisterPlackTypeValue) {
          conditions.push(
            `Base_RegisterPlack_${counter}.CI_RegisterPlackTypeGroup=N'Register_Ghete'`
          )
          conditions.push(
            `Base_RegisterPlack_${counter}.RegisterPlackTypeValue ${
              this.isEqual
                ? `= N'${this.Base_RegisterPlack_1.RegisterPlackTypeValue}'`
                : `Like N'%${this.Base_RegisterPlack_1.RegisterPlackTypeValue}%'`
            }`
          )
          counter += 1
        }
        return conditions.join(" AND ")
      }

      return Object.keys(this[scope])
        .filter(
          (key) =>
            ["Base_NosaziCode", "Base_Info"].includes(scope) || this[scope][key]
        )
        .map((key) => this.sanitize(scope, key))
        .filter((x) => x)
        .join(" AND ")
    },
    sanitize (scope, key, isEqual = this.isEqual) {
      let value = this[scope][key]
      if (!value && !["EumNosaziCodeGroup", "EumBaseInfoGroup"].includes(key)) {
        return ""
      }
      let operand = isEqual ? "=" : "LIKE"
      if (typeof value === "string") {
        value = isEqual ? `N'${value}'` : `N'%${value}%'`
      } else if (Array.isArray(value)) {
        if (value.length === 0 || value.includes(0)) {
          // Empty arrays or [] or [0] or [1, 2, 0]
          return ""
        }
        value = `(${value.join(", ")})`
        operand = "IN"
      } else {
        // Numbers
        value = isEqual ? `${value}` : `${value}`
        operand = "="
      }
      return `${scope}.${key} ${operand} ${value}`
    },

    handleBaseInfoChanged () {
      this.Base_NosaziCode.EumNosaziCodeGroup = this.baseInfoGroup === 1 ? 1 : 0
      this.Base_Info.EumBaseInfoGroup =
        this.baseInfoGroup === 1 ? 0 : this.baseInfoGroup
    },
    onCloseParvandeh () {
      this.isParvandehDialogVisible = false
    },
    dbClickHandler ({ data }) {
      let row = data
      if (this.isFromComponent === true) {
        this.selectedNewNosaziCode(row)
        this.selectedFromGridNosaziCode = convertStringToNosaziCodeObject(
          row.NosaziCode
        )
      } else {
        this.selectedFromGridNosaziCode = convertStringToNosaziCodeObject(
          row.NosaziCode
        )
        this.selectCurrentNosaziCode(row)
      }
    },
    async selectCurrentNosaziCode (row) {
      this.selectedRecord = row
      await this.loadObj()
      this.parvandehDialogState = true
      // if (this.selectable) {
      //   const code = convertStringToNosaziCodeObject(row.NosaziCode)
      //   this.$emit("selectNosaziCode", code)
      // } else if (this.baseNosaziCode) {
      //   this.parvandehDialogState = true
      //   // this.$router.push('/parvandeh/info')
      // }
    },
    async loadObj () {
      if (!this.Base_NosaziCode.District) {
        return this.showError("لطفا منطقه را برای کدنوسازی تعیین نمایید")
      }
      try {
        this.showLoading()
        const payload = {
          pNosaziCode: {
            Apartment: this.Base_NosaziCode.Apartment,
            Block: this.Base_NosaziCode.Block,
            Building: this.Base_NosaziCode.Building,
            CI_City: 0,
            District: this.Base_NosaziCode.District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House: this.Base_NosaziCode.House,
            IsRoot: "false",
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            Region: this.Base_NosaziCode.Region,
            Shop: this.Base_NosaziCode.Shop
          },
          pLoadFunc:
            "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.getBaseLibInNosaziCode(
          payload,
          { config: { District: this.Base_NosaziCode.District } }
        )
        this.baseLibRes = this.getResponse(data)
        if (this.baseLibRes.success) {
          this.baseLibResults = this.baseLibRes.data
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async handleReset () {
      this.isEqual = false
      this.SearchList = []
      this.selectedTables = ["Base_AddressInfo", "Base_Owner"] // Fixed tables
      this.Base_Info = { EumBaseInfoGroup: 0 }
      this.Base_NosaziCode = {
        EumNosaziCodeGroup: 0,
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      await this.getSettingData()
      this.Base_AddressInfo = { MainAddress: "" }
      this.Base_Owner = {
        OwnerName: "",
        OwnerLastName: "",
        OwnerFatherName: "",
        NationalCode: "",
        CellPhone: ""
      }
      this.Base_NosaziCode1 = { Block: 0, House: 0 }
      this.Base_JobInfo = { JobUnitName: "", CI_JobName: null }
      this.checkBase = { Subscriptions_number: "" }
      this.Base_CommonEstate = {
        MainAddress: "",
        Telephone: "",
        Plack: "",
        Vahed: ""
      }
      this.Base_File = { Base_File: "" }
      this.Base_AddressPostCode = { PostCode: "" }
      this.Base_RegisterPlack_1 = {
        CI_RegisterPlackTypeGroup: null,
        CI_RegisterPlackType: null,
        RegisterPlackTypeValue: null
      }
      this.Base_PreCodeInfo = { PreCode: null }
      this.Base_JobOwner = {
        OwnerName: null,
        OwnerLastName: null,
        CI_JobName: null
      }
      this.Base_SubScription = {
        CI_SubScriptionType: [0],
        SubScriptionVal: null
      }
      this.Base_ShahrsaziArchive = {
        EumShahrsaziArchiveGroup: 0,
        CertificateNo: null,
        CertificateDate: null
      }
    },
    onServerFailCallback (params) {
      console.error("onServerFailCallback", params)
    },
    onGridReady (params) {
      this.gridApi = params.api
      this.gridApi.addEventListener(
        'failCallback',
        this.onServerFailCallback
      )
      this.setGridDatasource()
    },
    // updatePaging ({ page, perPage, total, lastPage, from, to }) {
    //   // this.page = page
    //   this.setGridDatasource()
    // },
    selectAllRows () {
      // console.log(this.$refs?.SearchListGrid?.selectedKeys)
      try {
        this.$refs.SearchListGrid.selectedKeys = this.SearchList.map(
          (row) => row.uniqueID
        )
      } catch {}
    },
    async setGridDatasource () {
      this.gridApi.setServerSideDatasource({
        getRows: async (params) => {
          try {
            this.showLoading()
            this.isGetData = true
            if (!this.Base_NosaziCode.District) {
              this.showError('لطفا منطقه را برای کدنوسازی تعیین نمایید')
              return
            }
            this.Base_NosaziCode.EumNosaziCodeGroup = this.baseInfoGroup === 1 ? 1 : 0
            this.Base_Info.EumBaseInfoGroup = this.baseInfoGroup === 1 ? 0 : this.baseInfoGroup
            let payload = {
              pDistrict: this.config.config.District,
              pSelectedTables: this.selectedTables.join(','),
              // pSelectedTables: this.newSelectedTables.toString(),
              // pWhere: `Base_NosaziCode.Block = ${this.base} And Base_NosaziCode.EumNosaziCodeGroup = ${'222'} And Base_Info.EumBaseInfoGroup = ${'222'} And Base_NosaziCode.District = ${'222'} And Base_NosaziCode.Region = ${'222'} And Base_NosaziCode.Block = ${'222'} And Base_NosaziCode.House = ${'222'}`,
              pWhere: this.query,
              pFromRow: params.request.startRow,
              pToRow: params.request.endRow
            }

            const { data } = await this.$services.SA.search(payload, this.config)
            this.result = this.getResponse(data)
            this.hideLoading()
            debugger
            if (this.result.success) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.query,
                bizCodeTitle: 'pWhere'
              })
              if (this.result.data) {
                debugger
                this.SearchList = this.result.data.SearchList.sort((x, y) =>
                  compareNosaziCodeObjects(x, y)
                ).map((x) => ({ ...x, Selected: true }))

                params.success({
                  rowData: this.SearchList,
                  rowCount: this.SearchList[0]?.TotalCount || 0
                })
              }
            } else {
              // this.showError('انجام نشد')
              params.fail()
            }
          } catch (error) {
            console.log(error.message)
            this.showError('خطایی در سرویس رخ داد')
            params.fail()
          } finally {
            this.hideLoading()
          }
        }
      })
    },
    show () {
      this.showFields = !this.showFields
    }
  },
  mounted () {
    // this.checkSelectable()
    this.setLayout("half")
    // if (this.NosaziCode !== null) {
    //   this.Base_NosaziCode = this.NosaziCode;
    // }

    // this.Base_NosaziCode = { ...this.Base_NosaziCode, District: 0 };
  },
  watch: {
    /* selectable () {
      this.checkSelectable()
    }, */
    displayedFieldObj: {
      handler (val) {
        this.handleChangeField()
      },
      deep: true
    },
    "Base_AddressPostCode.PostCode": {
      handler () {
        if (this.Base_AddressPostCode.PostCode !== "") {
          // eslint-disable-next-line camelcase
          const hasBase_AddressPostCode =
            this.selectedTables.indexOf("Base_AddressPostCode") > -1
          // eslint-disable-next-line camelcase
          if (!hasBase_AddressPostCode) {
            this.selectedTables.push("Base_AddressPostCode")
          }
        } else {
          this.selectedTables = this.selectedTables.filter(
            (item) => item !== "Base_AddressPostCode"
          )
        }
      },
      deep: true
    },
    "Base_File.FileIdMother": {
      handler () {
        if (this.Base_File.FileIdMother !== "") {
          // eslint-disable-next-line camelcase
          const hasBase_File = this.selectedTables.indexOf("Base_File") > -1
          // eslint-disable-next-line camelcase
          if (!hasBase_File) {
            this.selectedTables.push("Base_File")
          }
        } else {
          this.selectedTables = this.selectedTables.filter(
            (item) => item !== "Base_File"
          )
        }
      },
      deep: true
    },
    "Base_ShahrsaziArchive.CertificateNo": {
      handler () {
        if (this.Base_ShahrsaziArchive.CertificateNo !== "") {
          // eslint-disable-next-line camelcase
          const hasBase_ShahrsaziArchive =
            this.selectedTables.indexOf("Base_ShahrsaziArchive") > -1
          // eslint-disable-next-line camelcase
          if (!hasBase_ShahrsaziArchive) {
            this.selectedTables.push("Base_ShahrsaziArchive")
          }
        } else {
          this.selectedTables = this.selectedTables.filter(
            (item) => item !== "Base_ShahrsaziArchive"
          )
        }
      },
      deep: true
    },
    "Base_ShahrsaziArchive.CertificateDate": {
      handler () {
        if (this.Base_ShahrsaziArchive.CertificateDate !== "") {
          // eslint-disable-next-line camelcase
          const hasBase_ShahrsaziArchive =
            this.selectedTables.indexOf("Base_ShahrsaziArchive") > -1
          // eslint-disable-next-line camelcase
          if (!hasBase_ShahrsaziArchive) {
            this.selectedTables.push("Base_ShahrsaziArchive")
          }
        } else {
          this.selectedTables = this.selectedTables.filter(
            (item) => item !== "Base_ShahrsaziArchive"
          )
        }
      },
      deep: true
    },
    "Base_JobInfo.CI_JobName": {
      handler () {
        if (this.Base_JobInfo.CI_JobName !== "") {
          // eslint-disable-next-line camelcase
          const hasBase_JobInfo =
            this.selectedTables.indexOf("Base_JobInfo") > -1
          // eslint-disable-next-line camelcase
          if (!hasBase_JobInfo) {
            this.selectedTables.push("Base_JobInfo")
          }
        } else {
          this.selectedTables = this.selectedTables.filter(
            (item) => item !== "Base_JobInfo"
          )
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
#nosazi-code-search .form-wrapper {
  .nosazicode-wrapper {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  .q-header {
    display: block !important;
  }
}
</style>
