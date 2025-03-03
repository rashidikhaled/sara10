<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper
      :title="title"
      vertical
    >
      <div class="row q-mb-sm">
        <btn-default label="ترسیم محدوده روی نقشه"/>
      </div>
      <safa-tabs
        v-model="activeTab"
        fit
      >
        <template v-slot:tabs>
          <tab-menu
            label="لیست کد نوسازی"
            name="nosaziList"
          />
          <tab-menu
            label="قیمت منطقه ای"
            name="regionPrice"
          />
        </template>
        <tab-content
          :padding="false"
          name="nosaziList"
          title="لیست کد نوسازی"
        >
          <UNosaziList/>
        </tab-content>
        <tab-content
          :padding="false"
          name="regionPrice"
          title="قیمت منطقه ای"
        >
          <URegionPrice/>
        </tab-content>
      </safa-tabs>
      <div>
      </div>
      <template v-slot:footer>
        <btn-default label="محاسبه"/>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UNosaziList from './partials/UNosaziList'
import URegionPrice from './partials/URegionPrice'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/price-settings/price-from-map',

  mixins: [baseFormMixin],
  components: {
    UNosaziList,
    URegionPrice
  },
  data () {
    return {
      title: 'قیمت منطقه ای از روی نقشه',
      formKey: '37FA5F62-753E-4E2D-B01F-F8A452A98420',
      name: 'UPriceFromMapTabs',
      main: true,
      activeTab: 'nosaziList',
      items: [],
      ShowModal: false,
      loadIncomeListPrequest: {
        pNidProc: 'd4b57d19-35d6-41a3-8339-4bf16a3f0f93'
      },
      results: {
        calculateRow: {},
        allFichesList: {},
        details: {},
        mode: 'r'
      },
      loadAllFichesPrequest: {
        pNidProc: 'ad1878e5-d528-492c-a11b-52cd8f9b1a87'
      },
      loadDetailsPreqsuest: {
        pNidIncome: '8fc98967-7d59-484b-942b-2f1271604875',
        PLoadFun:
          'Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount,NidBase'
      }
    }
  },
  mounted () {
    // if (this.selectedRequest === null) {
    //   this.showError('لطفا از کارتابل یک آیتم را انتخاب کنید')
    //   return
    // } else if (this.selectedRequest !== null) {
    //   this.loadIncomeListPrequest.pNidProc = this.selectedRequest.NidProc
    // }
    // this.loadIncomelist()
    // this.getAllFicheByIncomeList()
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    loadIncomelist () {
      this.$q.loading.show()
      this.$services.SD.getIncomeList(this.loadIncomeListPrequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.results.calculateRow = this.getResponse(
            response.data
          ).data.IncomeList
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    getAllFicheByIncomeList () {
      this.$q.loading.show()
      this.$services.SD.getAllFicheByIncomeList(this.loadAllFichesPrequest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          // this.results.allFichesList = this.getResponse(response.data).data.allFichesList[0].Income_Fiche

          this.results.allFichesList = [
            this.getResponse(response.data).data.All_FicheByIncomeList[0]
              .Income_Fiche
          ]

          this.results.allFichesList[0].IncomeCreateDate = this.getResponse(
            response.data
          ).data.All_FicheByIncomeList[0].IncomeCreateDate
          this.results.allFichesList[0].IncomeCreateTime = this.getResponse(
            response.data
          ).data.All_FicheByIncomeList[0].IncomeCreateTime
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    selectedChange (e) {
      // console.log('selectedChange', e)
      this.loadDetailsPreqsuest.pNidIncome = e.dataItem.NidIncome

      this.$q.loading.show()
      this.$services.SD.getIncomeDetails(this.loadDetailsPreqsuest, {
        config: {
          District: 1
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.results.details = this.getResponse(response.data).data

          // console.log('this.results.details', this.results.details)
        })
        .catch((ex) => {
          this.$q.dialog({
            title: 'خطا در سرور',
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
  }
}
</script>
