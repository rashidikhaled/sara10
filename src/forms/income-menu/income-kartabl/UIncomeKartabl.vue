<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getIncomesResponse"/>
        <safa-status :result="getIncomeDetailsResponse"/>
      </template>
      <fit>
        <div
          :class="['q-pa-sm', $q.dark.isActive ? 'bg-lighten2' : 'bg-grey-2']"
          style="border-bottom: 1px solid #e0e0e0"
        >
          <FormRow>
            <FormControl>
              <safa-datepicker
                label="از تاریخ"
                label-width="70px"
                v-model="fromDate"
                cdcName="fromDate"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                label="تا تاریخ"
                label-width="70px"
                v-model="toDate"
                cdcName="toDate"
              />
            </FormControl>
            <FormControl>
              <safa-text
                label="کد درخواست"
                label-width="70px"
                v-model="nidWorkItem"
                cdcName="nidWorkItem"
                @keypress.enter="loadObj"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="منطقه"
                label-width="70px"
                source-type="local"
                :options="districts"
                v-model="selectedRegion"
                cdcName="selectedRegion"
              />
            </FormControl>
            <nosazi-code-input
              label="کد نوسازی"
              label-width="70px"
              v-model="baseNosaziCode"
              cdcName="baseNosaziCode"
              @enter="loadObj"
            />
            <div>
              <btn-search @click="loadObj"/>
            </div>
          </FormRow>
        </div>
        <!-- helper="incomeKartabl" -->
        <safa-datatable
          title="کارتابل درآمد"
          v-model="incomeList"
          cdcName="incomeList"
          :columns="columns"
          fit
          paginate
          min-height="200px"
          height="100%"
          max-height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :showRowNumber="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :take="20"
          :customButtons="customButtons"
          class="q-pa-sm"
          @dbclick="dbclickRow"
        />
      </fit>
    </form-wrapper>

    <safa-popup
      title="جزئیات درآمد"
      v-model="showIncomeDetail"
      width="1000px"
      height="700px"
    >
      <IncomeDetailsTabs
        v-model="selectRequest"
        :incomeDetailResults="incomeDetailResults"
        :totalUserAmount="totalUserAmount"
        :totalSysAmount="totalSysAmount"
        :incomeFiche="incomeFiche"
        :selectedRegion="selectedRegion"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import IncomeDetailsTabs from './partials/IncomeDetailsTabs.vue'

export default {
  mixins: [baseFormMixin],
  components: { IncomeDetailsTabs },
  data () {
    return {
      title: 'کارتابل درآمد',
      name: 'UIncomeKartabl',
      formKey: '8445aee9-087e-4cac-ac52-5cc67fd0f1ef',
      main: true,

      columns: [

        {
          "field": "RowNum",
          "title": "شماره ردیف"
        },
        {
          "field": "NidWorkItem",
          "title": "شماره درخواست"
        },
        {
          "field": "NosaziCode",
          "title": "کد نوسازی"
        },
        {
          "field": "CreateDate",
          "title": "تاریخ محاسبه"
        },
        {
          "field": "UserName",
          "title": "نام محاسب"
        },
        {
          "field": "RequesterName",
          "title": "نام متقاضی"
        },
        {
          "field": "WorkflowTitel",
          "title": "نوع درخواست"
        }

      ],

      getIncomesResponse: null,
      incomeList: [],
      nidWorkItem: '',
      fromDate: '',
      toDate: '',
      selectedRegion: 1,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      customButtons: [
        {
          icon: 'refresh',
          onClick: this.reloadObj,
          text: 'بازآوری کارتابل'
        }
      ],
      selectRequest: null,
      showIncomeDetail: false,

      getIncomeDetailsResponse: null,
      incomeDetailResults: {
        Income: {},
        Income_Calculation_ForChange: [],
        IncomeParameters: [],
        Income_Discount: [],
        Income_LogMethod: [],
        Income_OddmentAccount: [],
        Income_PrePayment: []
      },
      selectedCalcList: [],
      getIncomeFicheResponse: null,
      incomeFiche: []
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      if (
        this.baseNosaziCode.District !== 0 &&
        this.selectedRegion !== this.baseNosaziCode.District
      ) {
        this.selectedRegion = this.baseNosaziCode.District
      }
      let districtStr
      let regionStr
      let blockStr
      let hoseStr
      let buildingStr
      let apartmentStr
      let shopStr
      let conditionStr = ''
      let dateCondition = this.fromDate !== '' && this.toDate !== ''
      if (this.selectedRegion) {
        districtStr = 'District = ' + this.selectedRegion
        conditionStr = 'where ' + districtStr
      } else {
        districtStr = ''
      }
      // if (this.baseNosaziCode.District !== 0) {
      //   districtStr = "District = " + this.baseNosaziCode.District;
      //   conditionStr = "where " + districtStr;
      // } else {
      //   districtStr = "";
      // }
      if (this.baseNosaziCode.Region !== 0) {
        regionStr = 'Region = ' + this.baseNosaziCode.Region
        conditionStr += ' AND ' + regionStr
      } else {
        regionStr = ''
      }
      if (this.baseNosaziCode.Block !== 0) {
        blockStr = 'Block = ' + this.baseNosaziCode.Block
        conditionStr += '  AND  ' + blockStr
      } else {
        blockStr = ''
      }
      if (this.baseNosaziCode.House !== 0) {
        hoseStr = 'House = ' + this.baseNosaziCode.House
        conditionStr += '  AND  ' + hoseStr
      } else {
        hoseStr = ''
      }
      if (this.baseNosaziCode.Building !== 0) {
        buildingStr = 'Building = ' + this.baseNosaziCode.Building
        conditionStr += '  AND  ' + buildingStr
      } else {
        buildingStr = ''
      }
      if (this.baseNosaziCode.Apartment !== 0) {
        apartmentStr = 'Apartment = ' + this.baseNosaziCode.Apartment
        conditionStr += '  AND ' + apartmentStr
      } else {
        apartmentStr = ''
      }
      if (this.baseNosaziCode.Shop !== 0) {
        shopStr = 'Shop = ' + this.baseNosaziCode.Shop
        conditionStr += ' AND ' + shopStr
      } else {
        shopStr = ''
      }

      if (
        this.nidWorkItem !== '' &&
        conditionStr !== '' &&
        dateCondition === true
      ) {
        conditionStr +=
          ' AND ' +
          ' NidWorkItem = ' +
          this.nidWorkItem +
          'And I.CreateDate BETWEEN \'' +
          this.fromDate +
          '\' AND \'' +
          this.toDate +
          '\''
      } else if (this.nidWorkItem !== '' && conditionStr !== '') {
        conditionStr += ' AND ' + ' NidWorkItem = ' + this.nidWorkItem
      } else if (this.nidWorkItem !== '' && dateCondition === true) {
        conditionStr =
          'where' +
          ' NidWorkItem = ' +
          this.nidWorkItem +
          'And I.CreateDate BETWEEN \'' +
          this.fromDate +
          '\' AND \'' +
          this.toDate +
          '\''
      } else if (dateCondition === true && conditionStr !== '') {
        conditionStr +=
          ' AND I.CreateDate BETWEEN \'' +
          this.fromDate +
          '\' AND \'' +
          this.toDate +
          '\''
      }
      const payload = {
        pFrom: 0,
        pTo: 50,
        pWhere: conditionStr
      }
      this.showLoading()
      this.$services.SD.getIncomes(payload, {
        config: { District: this.selectedRegion }
      })
        .then(async ({ data }) => {
          this.getIncomesResponse = this.getResponse(data)
          if (this.getIncomesResponse.success) {
            this.incomeList = this.getIncomesResponse.data.Incomes
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: ''
            })
            this.resetValidation()
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    dbclickRow (e) {
      this.selectRequest = e.row
      this.getIncomeDetails()
    },

    getIncomeDetails () {
      const payload = {
        pNidIncome: this.selectRequest.NidIncome,
        PLoadFun:
          'Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount'
      }
      this.showLoading()
      this.$services.SD.getIncomeDetails(payload, {
        config: { District: this.selectedRegion }
      })
        .then(({ data }) => {
          this.getIncomeDetailsResponse = this.getResponse(data)
          if (this.getIncomeDetailsResponse.success) {
            this.incomeDetailResults = this.getIncomeDetailsResponse.data
            this.getIncomeFiche()
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    getIncomeFiche () {
      this.showLoading()
      this.$services.SD.getIncomeFiche(
        { pNidIncome: this.selectRequest.NidIncome },
        { config: { District: this.selectedRegion } }
      )
        .then(({ data }) => {
          this.getIncomeFicheResponse = this.getResponse(data)
          if (this.getIncomeFicheResponse.success) {
            this.incomeFiche = this.getIncomeFicheResponse.data.Income_Fiche
            this.showIncomeDetail = true
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    reloadMainForm () {
      this.showIncomeDetail = true
      this.loadObj()
    },

    reloadObj () {
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.nidWorkItem = ''
      this.fromDate = ''
      this.toDate = ''
      this.selectedRegion = 1
      this.loadObj()
    }
  },

  watch: {
    selectedRegion () {
      if (this.baseNosaziCode.District === 0) this.loadObj()
    }
  },

  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    },
    // incomeCiIncomeCalcList () {
    //   return this.incomeDetailResults.Income_Calculation_ForChange.filter(
    //     c => c.selected
    //   ).map(x => ({
    //     ID: x.CI_IncomeCalculation,
    //     Title: x.IncomeCalculation_Title
    //   }))
    // },
    totalUserAmount () {
      return this.incomeDetailResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.Value || '0')
          return sum
        },
        0
      )
    },
    totalSysAmount () {
      return this.incomeDetailResults.Income_Calculation_ForChange.reduce(
        (sum, one) => {
          if (!sum) sum = 0
          sum += parseInt(one.SysValue || '0')
          return sum
        },
        0
      )
    }
  }
}
</script>
