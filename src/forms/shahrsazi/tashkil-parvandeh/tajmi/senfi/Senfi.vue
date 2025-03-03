<template>
  <diV>
    <FormHeader :task-info="taskInfo" />
    <form-wrapper>
    <section >
      <div class="form-title">عوارض صنفی</div>
       <safa-status class="col-12" :result="senfiResult" />
      <safa-status class="col-12" :result="baseLibResult" />
      <safa-status class="col-12" :result="checkValidResult" />
      <safa-status class="col-12" :result="allRequestListResult" />
      <safa-status class="col-12" :result="workflowListResult" />
      <q-tabs
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
        <!-- <q-tab name="showBaseTab" label="پایه مالی" /> -->
        <q-tab name="showCommentTab" label="توضیحات" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="showَAllCalculationTab">
          <SenfiAllCalculation class="col-12" />
        </q-tab-panel>
        <q-tab-panel name="showFichTab">
          <SenfiFich />
        </q-tab-panel>
        <q-tab-panel name="showOtherAccountTab">
          <SenfiOtherAccount class="col-12" />
        </q-tab-panel>
        <q-tab-panel name="showAllCalHistoryTab">
          <SenfiAllCalcHistory class="col-12" />
        </q-tab-panel>
        <q-tab-panel name="showMafasaTab">
          <SenfiMafasaAccount class="col-12" />
        </q-tab-panel>
        <q-tab-panel name="showCommentTab">
          <SenfiComment class="col-12" />
        </q-tab-panel>
      </q-tab-panels>
       </section>
      <template v-slot:footer>
        <q-btn
          class="btn-cancel q-mt-md"
          size="sm"
          @click="cancel"
          label="  بازگشت به فرم اصلی"
        />
      </template>
    </form-wrapper>
  </diV>
</template>
<script>
import SenfiAllCalculation from '../..//tajmi/senfi/SenfiAllCalculation.vue'
import SenfiFich from '../../tajmi/senfi/SenfiFich.vue'
import SenfiOtherAccount from '../../tajmi/senfi/SenfiOtherAccount.vue'
import SenfiAllCalcHistory from '../../tajmi/senfi/SenfiAllCalcHistory.vue'
import SenfiMafasaAccount from '../../tajmi/senfi/SenfiMafasaAccount.vue'
import SenfiComment from '../../tajmi/senfi/SenfiComment.vue'
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'request-submission',
  route: '/tarhe-tafzili/request-submission',
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
      nosaziForm: null
    }
  },
  components: {
    SenfiAllCalculation,
    SenfiFich,
    SenfiOtherAccount,
    SenfiAllCalcHistory,
    SenfiMafasaAccount,
    // SenfiBaseFinancial,
    SenfiComment
  },
  watch: {
    baseNosaziCode () {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedNosaziCode.CodeFrom
      )
    }
  },
  mixins: [baseFormMixin],
  props: { selectedNosaziCode: String,
    senfiResult: Object },
  methods: {
    load () {
      let data = {
        PNidProc: this.selectedNosaziCode.NidFrom
      }

      this.$services.SC.loadRequestInfo(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.selectedNosaziCode
            })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
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
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          self.baseLibResult = this.getResponse(data)

          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data
            this.nosaziCode = self.baseLibResults.BuildingObj.NidNosaziCode
            for (var i = 0; i < self.baseLibResults.Base_Owner.length; i++) {
              if (self.baseLibResults.Base_Owner[i].OwnerName === null) {
                self.baseLibResults.Base_Owner[i].OwnerName = ''
              }
              if (self.baseLibResults.Base_Owner[i].OwnerLastName === null) {
                self.baseLibResults.Base_Owner[i].OwnerLastName = ''
              }
              this.ownerName =
                self.baseLibResults.Base_Owner[i].OwnerName +
                self.baseLibResults.Base_Owner[i].OwnerLastName +
                ','
            }
            for (
              var j = 0;
              j < self.baseLibResults.Base_PreCodeInfo.length;
              j++
            ) {
              this.oldNosaziCode =
                self.baseLibResults.Base_PreCodeInfo[j].PreCode
            }
            let checkData = {
              pNidNosaziCode: self.nosaziCode
            }
            this.showLoading()
            this.$services.SC.checkValidationForBlackListBeforSaveRequest(
              checkData
            )
              .then(({ data }) => {
                self.checkValidResult = this.getResponse(data)

                if (self.checkValidResult.success) {
                  // getShWorkflowListInNosaziCodeObjType method
                  let WorkflowList = {
                    pNidNosaziCode: self.nosaziCode
                  }
                  this.showLoading()
                  this.$services.SA.getShWorkflowListInNosaziCodeObjType(
                    WorkflowList
                  )
                    .then(async ({ data }) => {
                      self.workflowListResult = this.getResponse(data)

                      if (self.workflowListResult.success) {
                        self.workflowListResults = self.workflowListResult.data
                        await this.log({
                          action: this.logActions.view,
                          bizCode: this.selectedNosaziCode,
                          bizCodeTitle: 'کد نوسازی',
                          nosaziCode: this.selectedNosaziCode
                        })
                      }

                      // getAllRequestList method
                      let oldrequestData = {
                        pNidNosaziCode: self.nosaziCode
                      }
                      this.showLoading()
                      this.$services.SC.getAllRequestList(oldrequestData)
                        .then(async ({ data }) => {
                          self.allRequestListResult = this.getResponse(data)

                          if (self.allRequestListResult.success) {
                            self.allRequestListResults =
                              self.allRequestListResult.data
                            await this.log({
                              action: this.logActions.view,
                              bizCode: this.selectedNosaziCode,
                              bizCodeTitle: 'کد نوسازی',
                              nosaziCode: this.selectedNosaziCode
                            })
                          }
                        })
                        .catch(response => {
                          this.serverError()
                        })
                        .finally(() => {
                          this.hideLoading()
                        })
                    })
                    .catch(response => {
                      this.serverError()
                    })
                    .finally(() => {
                      this.hideLoading()
                    })
                }
              })
              .catch(response => {
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      // CheckValidation_ForBlackList_BeforSaveRequest method
      this.isEditable = true
      this.isSearch = true
    },
    cancel () {
      this.nosaziForm = false
      this.senfiResult = null
      this.$emit('showmTajmiContainer', this.nosaziForm)
    }
  },
  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.selectedNosaziCode.CodeFrom
    )
    this.load()
  }
}
</script>
