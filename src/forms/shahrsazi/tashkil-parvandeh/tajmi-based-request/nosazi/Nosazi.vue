<template>
   <form-wrapper>
     <template #header>
       <formHeaderByNosaziCode :taskInfo="taskInfo" v-model="selectedNosaiCode"/>
     </template>
    <section >
      <div class="form-title">عوارض نوسازی</div>
      <safa-status class="col-12" :result="baseLibResult" />
      <safa-status class="col-12" :result="checkValidResult" />
      <safa-status class="col-12" :result="allRequestListResult" />
      <safa-status class="col-12" :result="workflowListResult" />

      <safa-tabs v-model="activeTab" height="calc(100vh - 400px)">
        <template v-slot:tabs>
          <tab-menu name="showَAllCalculationTab" label="تمام محاسبات" />
          <tab-menu name="showFichTab" label="فیش" />
          <tab-menu name="showOtherAccountTab" label="حساب های متفرقه" />
          <tab-menu name="showAllCalHistoryTab" label="تاریخچه ی تمام محاسبات" />
          <tab-menu name="showMafasaTab" label="مفاصا حساب" />
          <tab-menu name="showBaseTab" label="پایه مالی" />
          <tab-menu name="showCommentTab" label="توضیحات" @click="comment" />
        </template>
        <tab-content name="tab1" title=" ">T </tab-content>
         <tab-content name="showَAllCalculationTab" title="تمام محاسبات" >
            <NosaziAllCalculation
              class="col-12"
              :nosaziResult="nosaziResult"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </tab-content>
          <tab-content name="showFichTab"  title="فیش" >
            <NosaziFich
              class="col-12"
              :loadCancelFiches="loadCancelFiches"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </tab-content>
          <tab-content name="showOtherAccountTab" title="حساب های متفرقه" >
            <NosaziOtherAccount
              class="col-12"
              :loadCancelOddment="loadCancelOddment"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </tab-content>
          <tab-content name="showAllCalHistoryTab" title="تاریخچه ی تمام محاسبات" >
            <NosaziAllCalcHistory
              class="col-12"
              :codeInfoResults="codeInfoResults"
            />
          </tab-content>
          <tab-content name="showMafasaTab" title="مفاصا حساب">
            <NosaziMafasaAccount
              class="col-12"
              :codeInfoResults="codeInfoResults"
              :selectedNosaziCode="selectedNosaziCode"
            />
          </tab-content>
          <tab-content name="showBaseTab" title="پایه مالی">
            <NosaziBaseFinancial
              class="col-12"
              :codeInfoResults="codeInfoResults"
              :selectedNosaziCode="selectedNosaziCode"
            />
          </tab-content>
          <tab-content name="showCommentTab" title="توضیحات">
            <NosaziComment :codeInfoResults="codeInfoResults" class="col-12" />
          </tab-content>
      </safa-tabs>

        <!-- <q-tabs
          v-model="activeTab"
          dense
          class="text-grey col-12"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="showَAllCalculationTab" label="تمام محاسبات" />
          <q-tab name="showFichTab" label="فیش" />
          <q-tab name="showOtherAccountTab" label="حساب های متفرقه" />
          <q-tab name="showAllCalHistoryTab" label="تاریخچه ی تمام محاسبات" />
          <q-tab name="showMafasaTab" label="مفاصا حساب" />
          <q-tab name="showBaseTab" label="پایه مالی" />
          <q-tab name="showCommentTab" label="توضیحات" @click="comment" />
        </q-tabs> -->

        <q-separator />

        <!-- <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="showَAllCalculationTab">
            <NosaziAllCalculation
              class="col-12"
              :nosaziResult="nosaziResult"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </q-tab-panel>
          <q-tab-panel name="showFichTab" class="col-12">
            <NosaziFich
              class="col-12"
              :loadCancelFiches="loadCancelFiches"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </q-tab-panel>
          <q-tab-panel name="showOtherAccountTab">
            <NosaziOtherAccount
              class="col-12"
              :loadCancelOddment="loadCancelOddment"
              :selectedNosaziCode="selectedNosaziCode"
              :codeInfoResults="codeInfoResults"
            />
          </q-tab-panel>
          <q-tab-panel name="showAllCalHistoryTab">
            <NosaziAllCalcHistory
              class="col-12"
              :codeInfoResults="codeInfoResults"
            />
          </q-tab-panel>
          <q-tab-panel name="showMafasaTab">
            <NosaziMafasaAccount
              class="col-12"
              :codeInfoResults="codeInfoResults"
              :selectedNosaziCode="selectedNosaziCode"
            />
          </q-tab-panel>
          <q-tab-panel name="showBaseTab">
            <NosaziBaseFinancial
              class="col-12"
              :codeInfoResults="codeInfoResults"
              :selectedNosaziCode="selectedNosaziCode"
            />
          </q-tab-panel>
          <q-tab-panel name="showCommentTab">
            <NosaziComment :codeInfoResults="codeInfoResults" class="col-12" />
          </q-tab-panel>
        </q-tab-panels> -->
  </section>
         <template v-slot:footer>
        <q-btn
          color="grey"
          @click="cancel"
          label="بازگشت"
          class="q-mt-md "
        ></q-btn>
         </template>
   </form-wrapper>
</template>
<script>
import NosaziFich from '../../tajmi/nosazi/NosaziFich.vue'
import NosaziOtherAccount from '../../tajmi/nosazi/NosaziOtherAccount.vue'
import NosaziAllCalcHistory from '../../tajmi/nosazi/NosaziAllCalcHistory.vue'
import NosaziAllCalculation from '../../tajmi/nosazi/NosaziAllCalculation.vue'
import NosaziMafasaAccount from '../../tajmi/nosazi/NosaziMafasaAccount.vue'
import NosaziBaseFinancial from '../../tajmi/nosazi/NosaziBaseFinancial.vue'
import NosaziComment from '../../tajmi/nosazi/NosaziComment.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'nosazi',
  route: '/tarhe-tafzili/nosazi',
  data () {
    return {
      activeTab: 'showَAllCalculationTab',
      results: { Info: {} },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      allRequestListResults: { AllRequestList: [] },
      isSearch: false,
      nosaziCode: '',
      workflowListResults: { Sh_WorkflowList_InNosaziCodeObjType: [] },
      isEditable: false,
      fichesResults: { DutyFichesPayCount: [], DutyFicheSub: [] },
      loadCancelFiches: true,
      loadCancelOddment: false,
      oddmentResults: { DutyOddmentAccount: [] },
      calcuateHistoryResult: {},
      mafasaHesabResults: { DutyMafasaHesabList: [] },
      financialBaseResult: { DutyFinancialBase: [] },
      commentResults: { DutyCommentList: [] },
      nosaziForm: null
    }
  },
  components: {
    NosaziAllCalculation,
    NosaziFich,
    NosaziOtherAccount,
    NosaziAllCalcHistory,
    NosaziMafasaAccount,
    NosaziBaseFinancial,
    NosaziComment
  },
  props: {
    nosaziResult: Object,
    selectedNosaziCode: String,
    nosaziResults: Object,
    codeInfoResults: Object,
    selectedNosaiCode: Object
  },
  watch: {
    baseNosaziCode () {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedNosaziCode.CodeFrom
      )
    }
  },
  methods: {
    cancel () {
      this.nosaziForm = false
      this.$emit('showmTajmiContainer', this.nosaziForm)
    }
  },
  mounted () {
    this.baseNosaziCode = this.selectedNosaiCode
  }
}
</script>
