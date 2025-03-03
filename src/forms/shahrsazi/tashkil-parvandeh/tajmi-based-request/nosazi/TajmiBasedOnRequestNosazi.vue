<template>
  <fit>
    <safa-status :result="baseLibResult" />
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu
          name="showَAllCalculationTab"
          label="تمام محاسبات"
        />
        <tab-menu
          name="showFichTab"
          label="فیش"
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
          name="showBaseTab"
          label="پایه مالی"
        />
        <tab-menu
          name="showCommentTab"
          label="توضیحات"
        />
      </template>
      <tab-content name="showَAllCalculationTab">
        <TajmiBasedOnRequestNosaziAllCalculation
          :nosaziResult="nosaziResult"
          :selectedNosaziCode="selectedNosaziCode"
          :codeInfoResults="codeInfoResults"
        />
      </tab-content>
      <tab-content
        name="showFichTab"
        v-if="activeTab==='showFichTab'"
      >
        <TajmiBasedOnRequestNosaziFiche
          :loadCancelFiches="loadCancelFiches"
          :selectedNosaziCode="selectedNosaziCode"
          :codeInfoResults="codeInfoResults"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showOtherAccountTab"  v-if="activeTab==='showOtherAccountTab'">
        <TajmiBasedOnRequestNosaziotherAccount
          class="col-12"
          :loadCancelOddment="loadCancelOddment"
          :selectedNosaziCode="selectedNosaziCode"
          :codeInfoResults="codeInfoResults"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showAllCalHistoryTab" :padding="false" v-if="activeTab==='showAllCalHistoryTab'">
        <TajmiBasedOnRequestNosaziAllCalcHistory
          class="col-12"
          :codeInfoResults="codeInfoResults"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showMafasaTab" v-if="activeTab==='showMafasaTab'">
        <TajmiBasedOnRequestNosaziMafasaAccount
          class="col-12"
          :codeInfoResults="codeInfoResults"
          :selectedNosaziCode="selectedNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showBaseTab" v-if="activeTab==='showBaseTab'">
        <TajmiBasedOnRequestNosaziFinancial
          class="col-12"
          :codeInfoResults="codeInfoResults"
          :selectedNosaziCode="selectedNosaziCode"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showCommentTab">
        <TajmiBasedOnRequestNosaziComment
          :codeInfoResults="codeInfoResults"
          class="col-12"
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
import TajmiBasedOnRequestNosaziAllCalculation from './TajmiBasedOnRequestNosaziAllCalculation.vue'
import TajmiBasedOnRequestNosaziFiche from './TajmiBasedOnRequestNosaziFiche.vue'
import TajmiBasedOnRequestNosaziotherAccount from './TajmiBasedOnRequestNosaziotherAccount.vue'
import TajmiBasedOnRequestNosaziAllCalcHistory from '../../tajmi-based-request/nosazi/TajmiBasedOnRequestNosaziAllCalcHistory.vue'
import TajmiBasedOnRequestNosaziMafasaAccount from './TajmiBasedOnRequestNosaziMafasaAccount.vue'
import TajmiBasedOnRequestNosaziFinancial from './TajmiBasedOnRequestNosaziFinancial.vue'
import TajmiBasedOnRequestNosaziComment from './TajmiBasedOnRequestNosaziComment.vue'
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
    TajmiBasedOnRequestNosaziAllCalculation,
    TajmiBasedOnRequestNosaziFiche,
    TajmiBasedOnRequestNosaziotherAccount,
    TajmiBasedOnRequestNosaziAllCalcHistory,
    TajmiBasedOnRequestNosaziMafasaAccount,
    TajmiBasedOnRequestNosaziFinancial,
    TajmiBasedOnRequestNosaziComment
  },
  props: {
    nosaziResult: Object,
    selectedNosaziCode: String,
    nosaziResults: Object,
    codeInfoResults: Object,
    selectedNosaiCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
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
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.selectedNosaziCode.CodeFrom
    )
  }
}
</script>
