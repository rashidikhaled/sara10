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
        <!-- <tab-menu
          name="showBaseTab"
          label="پایه مالی"
        /> -->
        <tab-menu
          name="showCommentTab"
          label="توضیحات"
        />
      </template>
      <tab-content name="showَAllCalculationTab">
        <TajmiBasedOnRequestSenfiAllCalculation/>
      </tab-content>
      <tab-content
        name="showFichTab"
        v-if="activeTab==='showFichTab'"
      >
        <TajmiBasedOnRequestSenfiFich/>
      </tab-content>
      <tab-content name="showOtherAccountTab"  v-if="activeTab==='showOtherAccountTab'">
        <TajmiBasedOnRequestSenfiOtherAccount
          :formKey="formKey"
          :title="title"
          :name="name"
        />
      </tab-content>
      <tab-content name="showAllCalHistoryTab" :padding="false" v-if="activeTab==='showAllCalHistoryTab'">
        <TajmiBasedOnRequestSenfiAllCalcHistory
          class="col-12"
        />
      </tab-content>
      <tab-content name="showMafasaTab" v-if="activeTab==='showMafasaTab'">
        <TajmiBasedOnRequestSenfiMafasaAccount
          class="col-12"
        />
      </tab-content>
      <!-- <tab-content name="showBaseTab" v-if="activeTab==='showBaseTab'">
        <TajmiBasedOnRequestNosaziFinancial
          class="col-12"
        />
      </tab-content> -->
      <tab-content name="showCommentTab">
        <TajmiBasedOnRequestSenfiComment
          class="col-12"
        />
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
import TajmiBasedOnRequestSenfiAllCalculation from './TajmiBasedOnRequestSenfiAllCalculation.vue'
import TajmiBasedOnRequestSenfiFich from './TajmiBasedOnRequestSenfiFich.vue'
import TajmiBasedOnRequestSenfiOtherAccount from './TajmiBasedOnRequestSenfiOtherAccount.vue'
import TajmiBasedOnRequestSenfiAllCalcHistory from './TajmiBasedOnRequestSenfiAllCalcHistory.vue'
import TajmiBasedOnRequestSenfiMafasaAccount from './TajmiBasedOnRequestSenfiMafasaAccount.vue'
import TajmiBasedOnRequestSenfiComment from './TajmiBasedOnRequestSenfiComment.vue'
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
  mixins: [baseFormMixin],
  components: {
    TajmiBasedOnRequestSenfiAllCalculation,
    TajmiBasedOnRequestSenfiFich,
    TajmiBasedOnRequestSenfiOtherAccount,
    TajmiBasedOnRequestSenfiAllCalcHistory,
    TajmiBasedOnRequestSenfiMafasaAccount,
    // SenfiBaseFinancial,
    TajmiBasedOnRequestSenfiComment
  },
  watch: {
    baseNosaziCode () {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedNosaziCode.CodeFrom
      )
    }
  },

  props: {
    selectedNosaziCode: String,
    senfiResult: Object,
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
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          } else {
            this.showError('خطایی رخ داده است')
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
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
        .then(async ({ data }) => {
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
                    .then(({ data }) => {
                      self.workflowListResult = this.getResponse(data)

                      if (self.workflowListResult.success) {
                        self.workflowListResults = self.workflowListResult.data
                      }

                      // getAllRequestList method
                      let oldrequestData = {
                        pNidNosaziCode: self.nosaziCode
                      }
                      this.showLoading()
                      this.$services.SC.getAllRequestList(oldrequestData)
                        .then(({ data }) => {
                          self.allRequestListResult = this.getResponse(data)

                          if (self.allRequestListResult.success) {
                            self.allRequestListResults =
                              self.allRequestListResult.data
                          }
                        })
                        .catch(response => {
                          self.allRequestListResult = this.getResponse(
                            response
                          )
                          this.serverError()
                        })
                        .finally(() => {
                          this.hideLoading()
                        })
                    })
                    .catch(response => {
                      self.workflowListResult = this.getResponse(response)
                      this.serverError()
                    })
                    .finally(() => {
                      this.hideLoading()
                    })
                }
              })
              .catch(response => {
                self.checkValidResult = this.getResponse(response)
                this.serverError()
              })
              .finally(() => {
                this.hideLoading()
              })

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
        })
        .catch(response => {
          self.baseLibResult = this.getResponse(response)
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
