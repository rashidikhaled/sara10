<template>
      <fit>
        <safa-status :result="saveBarokafResult" />
        <safa-status :result="result"/>
        <safa-status :result="headerResult"/>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              name="showَAllCalculationTab"
              label="تمام محاسبات"
            />
            <tab-menu
              name="showFichTab"
              label="فیش"
              @click="getDutyFiches"
            />
            <tab-menu
              name="showOtherAccountTab"
              label="حساب های متفرقه"
            />
            <tab-menu
              name="showAllCalHistoryTab"
              label="تاریخچه ی تمام محاسبات"
            />
            <tab-menu
              name="showMafasaTab"
              label="مفاصا حساب"
            />
            <tab-menu
              name="showCommentTab"
              label="توضیحات"
            />
          </template>
          <tab-content
            name="showَAllCalculationTab"
            title="تمام محاسبات"
          >
            <DutyAllCalculation
              :headerResults="headerResults"
              :headerResultsAllCalculate="headerResultsAllCalculate"
              :categoryInfoMode="categoryInfoMode"
              :results="results"
              :baseNosaziCode="baseNosaziCode"
              @reloadAllCalculation="reloadAllCalculation"
            />
          </tab-content>
          <tab-content
            name="showFichTab"
            title="فیش"
          >
            <DutyFiche
              :loadCancelFiches="loadCancelFiches"
              :fichesResults="fichesResults"
              :results="results"
              :baseNosaziCode="baseNosaziCode"
              :formKey="formKey"
              :title="title"
            />
          </tab-content>
          <tab-content
            name="showOtherAccountTab"
            title="حساب های متفرقه"
          >
            <DutyOtherAccount
              :loadCancelOddment="loadCancelOddment"
              :oddmentResults="oddmentResults"
              :results="results"
            />
          </tab-content>
          <tab-content
            name="showAllCalHistoryTab"
            title="تاریخچه تمام محاسبات"
            :padding="false"
          >
            <DutyAllCalcHistory :results="results" />
          </tab-content>
          <tab-content
            name="showMafasaTab"
            title="مفاصا حساب"
          >
            <DutyMafasaHesab :results="results" />

          </tab-content>
          <tab-content
            name="showCommentTab"
            title="توضیحات"
          >
            <DutyComment :results="results" />
          </tab-content>
        </safa-tabs>
      </fit>
</template>

<script>
import DutyAllCalculation from './dutyPartials/DutyAllCalculation.vue'
import DutyFiche from './dutyPartials/DutyFiche.vue'
import DutyOtherAccount from './dutyPartials/DutyOtherAccount.vue'
import DutyAllCalcHistory from './dutyPartials/DutyAllCalcHistory.vue'
import DutyComment from './dutyPartials/DutyComment.vue'
import DutyMafasaHesab from './dutyPartials/DutyMafasaHesab.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
export default {
  // route: '/avareze-senfi/senfi-moredi',
  mixins: [baseFormMixin, loaderMixin],
  data: function () {
    return {
      title: 'صنفی موردی تجمیع',
      formKey: 'e8301bed-56a2-4944-ba0b-9d99a4c7411c',
      name: 'USenfiMoreditajmi',
      main: true,
      sidebarCompatible: true,
      activeTab: 'showَAllCalculationTab',
      saveBarokafResult: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      results: {
        Base_AddressInfo: {},
        Base_CommonEstate: {},
        Base_Owner: [],
        NickNameNids: [],
        NidJobList: [],
        DutyMafasaHesabList: []
      },
      result: null,
      headerResults: { DutySessionHeaders: [] },
      headerResultsAllCalculate: [],
      headerResult: null,
      ownerName: '',
      fichesResults: {
        DutyFichesPayCount: [],
        DutyFicheSub: []
      },
      loadCancelFiches: true,
      oddmentResult: null,
      oddmentResults: { DutyOddmentAccount: [] },
      loadCancelOddment: false,
      categoryInfoMode: 'e'
    }
  },
  components: {
    DutyAllCalculation,
    DutyFiche,
    DutyOtherAccount,
    DutyAllCalcHistory,
    DutyComment,
    DutyMafasaHesab
  },
  mounted () {},
  methods: {
    handleBaseNosaziCodeChanged2 () {
      this.getShopCodeInfo()
    },
    getShopCodeInfo () {
      this.showLoading()
      let self = this
      this.ownerName = ''
      let data = {
        pDistrict: this.baseNosaziCode.District,
        pRegion: this.baseNosaziCode.Region,
        pBlock: this.baseNosaziCode.Block,
        pHouse: this.baseNosaziCode.House,
        pBuilding: this.baseNosaziCode.Building,
        pApartment: this.baseNosaziCode.Apartment,
        pShop: this.baseNosaziCode.Shop,
        pDutyType: 2,
        pEumNosaziCodeGroup: 0,
        pEumBaseInfoGroup: 0,
        pLoadAllJobs: true,
        pIsLoadDeletedNosaziCode: false
      }
      this.$services.SB.getShopCodeInfo(data)
        .then(({ data }) => {
          self.result = this.getResponse(data)

          if (this.result.success) {
            self.results = self.result.data
            if (self.results.HasApartement) {
              this.showError('کد نوسازی دارای آپارتمان می باشد.')
            }
            this.getDutyCalculateHeaders()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyCalculateHeaders () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2
      }
      this.$services.SB.getDutyCalculateHeaders(data)
        .then(({ data }) => {
          this.headerResult = this.getResponse(data)

          if (this.headerResult.success) {
            this.headerResults = this.headerResult.data
            console.log(this.headerResults.DutySessionHeaders)
            this.headerResultsAllCalculate = this.headerResults.DutySessionHeaders.map(
              x => {
                if (x.CI_DutyYear <= x.CI_DutyYear_Payoff) {
                  x.class = 'is-from-formul-white'
                } else if (x.IsSure) {
                  x.class = 'is-from-formul'
                }
                return x
              }
            )
            console.log(this.headerResultsAllCalculate)
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getDutyFiches () {
      this.showLoading()
      let data = {
        pNidList: this.results.NidJobList,
        pSysCiDutyType: 2,
        pUnLoadCancelFiches: this.loadCancelFiches
      }

      this.$services.SB.getDutyFichesPayCount(data)
        .then(({ data }) => {
          this.fichesResult = this.getResponse(data)

          if (this.fichesResult.success) {
            this.fichesResults = this.fichesResult.data
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // otherAccount () {
    //   this.showLoading()
    //   let data = {
    //     pNid: this.results.NidList[0],
    //     pSysCiDutyType: 1,
    //     pUnLoadCancelOddment: this.loadCancelOddment
    //   }

    //   this.$services.SB.getDutyOddmentAccount(data)
    //     .then(({ data }) => {
    //       this.oddmentResult = this.getResponse(data)

    //       if (this.oddmentResult.success) {
    //         this.oddmentResults = this.oddmentResult.data
    //       }
    //     })
    //     .catch(response => {
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    // }
    reloadAllCalculation () {
      this.getDutyCalculateHeaders()
    }
  }
}
</script>
<style>
.is-from-formul-white {
  background-color: red;
}
</style>
