<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      title="ثبت درخواست پلیس ساختمان"
      :padding="false"
      v-if="mainForm"
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
           @fetched="fetched"
          v-if="isShowNosaziCode"
          ref="formHeaderRef"
        />
        <safa-status :result="baseLibResult" />
        <safa-status :result="checkValidResult" />
        <safa-status :result="allRequestListResult" />
        <safa-status :result="workflowListResult" />
      </template>
      <fit>
        <safa-tabs
          ref="safaTabs"
          v-model="activeTab"
          :bordered="false"
          class="fit"
        >
          <template v-slot:tabs>
            <tab-menu
              name="showNewTab"
              label="درخواست جدید"
            />
            <tab-menu
              name="showOldTab"
              label="درخواست های قبلی"
            />
          </template>
          <tab-content
            name="showNewTab"
            title="درخواست جدید"
          >
            <fit>
              <RequestSubmissionNewPolice
                :workFlowItemArray="workFlowItemArray"
                :results="results"
                :nosaziCode="baseLibResults._NidNosaziCode"
                :baseNosaziCode="baseNosaziCode"
                :attachInfo="attachInfo"
                @reload="reload"
                @showMainForm="showMainForm"
                :baseLibResults="baseLibResults"
                :m="mode"
                :formKey="formKey"
                :title="title"
                :name="name"
                ref="requestSubmissionNewRef"
              />
            </fit>
          </tab-content>
          <tab-content
            name="showOldTab"
            title="درخواست قبلی"
            :padding="false"
          >
            <RequestSubmissionOldPolice :allRequestListResults="allRequestListResults" />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default
            @click="accept"
            :disabled="!isSearch"
            label="تأیید"
          />
          <btn-cancel
            @click="cancle"
            :disabled="!isSearch"
            label="انصراف"
          />
        </div>
      </template>
    </form-wrapper>
    <ShowModal
      vertical
      title="پیوست درخواست"
      v-model="showAttachList"
    >

      <RequestSubmissionAttach
        :attachResults="attachResults"
        @backMainForm="backMainForm"
        @getAttachInfo="getAttachInfo"
      />
      <template v-slot:footer>
        <div class="q-gutter-sm q-my-sm">
          <btn-default
            label="انتخاب پیوست"
            @click="selectAttach"
            class=""
          />
          <btn-default
            label="بازگشت"
            @click="backMainForm"
          />
        </div>
      </template>
    </ShowModal>
    <UHomePage v-if="isShowDashboard"></UHomePage>
  </safa-form>
</template>
<script>
import RequestSubmissionOldPolice from './partials/RequestSubmissionOldPolice.vue'
import RequestSubmissionNewPolice from './partials/RequestSubmissionNewPolice.vue'
import RequestSubmissionAttach from './partials/RequestSubmissionAttach.vue'
import UHomePage from 'src/kartable/Kartable.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin.js'
import messageMixin from 'src/mixins/messageMixin.js'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/request-submission-Police',
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  props: { value: Object },
  data () {
    return {
      title: 'شهرسازی- ثبت درخواست پلیس ساختمان',
      formKey: 'ad55a6d4-6ad9-47e2-874a-b082ee523530',
      name: 'RequestSubmissionPolice',
      main: true,
      mainForm: true,

      activeTab: 'showNewTab',
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
      checkValidResult: null,
      workFlowItemList: [],
      workFlowItemArray: [],
      workFlowItemDeff: [],
      showAttachList: false,
      attachResults: {},
      attachInfo: {},
      workflowListResult: null,
      allRequestListResult: null,
      isShowDashboard: false,
      isShowNosaziCode: true,
      checkValidResults: { ValidRequest_ForBlackList_BeforSaveRequest: [] }
    }
  },
  components: {
    RequestSubmissionOldPolice,
    RequestSubmissionNewPolice,
    RequestSubmissionAttach,
    UHomePage
  },
  methods: {
    cancle () {
      this.isEditable = false
      this.isSearch = false
    },
    accept () {
      this.$refs.requestSubmissionNewRef.accept()
    },
    fetched (value) {
      this.baseLibResults = value

      this.validation()
      this.allRequestList()

      this.isEditable = true
      this.isSearch = true
    },
    // handleBaseNosaziCodeChanged () {
    //   // getBaseLibInNosaziCode method
    //   this.ownerName = ''
    //   this.oldNosaziCode = ''
    //   let self = this
    //   let data = {
    //     pNosaziCode: {
    //       Apartment: this.baseNosaziCode.Apartment,
    //       Block: this.baseNosaziCode.Block,
    //       Building: this.baseNosaziCode.Building,
    //       CI_City: 0,
    //       District: this.baseNosaziCode.District,
    //       EumBaseInfoGroup: 0,
    //       EumNosaziCodeGroup: 0,
    //       EumNosaziCodeObjType: 0,
    //       EumRevisitGroup: 0,
    //       House: this.baseNosaziCode.House,
    //       IsRoot: 'false',
    //       NidBase: '00000000-0000-0000-0000-000000000000',
    //       NidNosaziCode: '00000000-0000-0000-0000-000000000000',
    //       Region: this.baseNosaziCode.Region,
    //       Shop: this.baseNosaziCode.Shop
    //     },
    //     pLoadFunc:
    //       'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
    //     pIsLoadDeletedNosaziCode: false
    //   }
    //   this.showLoading()
    //   this.$services.SA.getBaseLibInNosaziCode(data)
    //     .then(({ data }) => {
    //       self.baseLibResult = this.getResponse(data)

    //       const strNosaziCode = convertNosaziCodeObjectToString(
    //         this.baseNosaziCode
    //       )

    //       await this.log({
    //         action: this.logActions.view,
    //         bizCode: strNosaziCode,
    //         bizCodeTitle: 'کد نوسازی',
    //         nosaziCode: strNosaziCode
    //       })

    //       if (self.baseLibResult.success) {
    //         self.baseLibResults = self.baseLibResult.data
    //         if (self.baseLibResults.Base_Owner.length !== 0) {
    //           for (var i = 0; i < self.baseLibResults.Base_Owner.length; i++) {
    //             if (
    //               self.baseLibResults.Base_Owner[i].OwnerName !== null &&
    //               self.baseLibResults.Base_Owner[i].OwnerLastName !== null
    //             ) {
    //               this.ownerName +=
    //                 self.baseLibResults.Base_Owner[i].OwnerName +
    //                 ' ' +
    //                 self.baseLibResults.Base_Owner[i].OwnerLastName +
    //                 ','
    //             }
    //             if (
    //               self.baseLibResults.Base_Owner[i].OwnerName !== null &&
    //               self.baseLibResults.Base_Owner[i].OwnerLastName === null
    //             ) {
    //               this.ownerName +=
    //                 self.baseLibResults.Base_Owner[i].OwnerName + ','
    //             }
    //             if (
    //               self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
    //               self.baseLibResults.Base_Owner[i].OwnerName === null
    //             ) {
    //               this.ownerName +=
    //                 self.baseLibResults.Base_Owner[i].OwnerLastName + ','
    //             }
    //           }
    //         }
    //         if (self.baseLibResults.Base_PreCodeInfo.length !== 0) {
    //           for (
    //             var j = 0;
    //             j < self.baseLibResults.Base_PreCodeInfo.length;
    //             j++
    //           ) {
    //             this.oldNosaziCode +=
    //               self.baseLibResults.Base_PreCodeInfo[j].PreCode + ','
    //           }
    //         }
    //         this.validation()
    //         this.allRequestList()
    //       }
    //     })
    //     .catch((response) => {
    //       self.workflowListResult = this.getResponse(response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })
    //   this.isEditable = true
    //   this.isSearch = true
    // },
    getShWorkFlow () {
      // getShWorkflowListInNosaziCodeObjType method
      // let i = 0
      let self = this
      let WorkflowList = {
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }
      this.showLoading()
      this.$services.SA.getShNewWorkflowListInNosaziCodeObjType(WorkflowList)
        .then(async ({ data }) => {
          self.workflowListResult = this.getResponse(data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          if (self.workflowListResult.success) {
            self.workflowListResults = self.workflowListResult.data
            // self.workflowListResults.Sh_WorkflowList_InNosaziCodeObjType.WorkflowTitel.sort()

            self.workFlowItemArray = self.workflowListResults.Sh_NewWorkflowList_InNosaziCodeObjType.map(
              (x) => ({
                ID: x.NidWorkflowDeff,
                Title: x.WorkflowTitel
              })
            ).sort(({ Title: xID }, { Title: yID }) => {
              if (xID < yID) {
                return -1
              }
              if (xID > yID) {
                return 1
              }
              return 0
            })

            // self.workflowListResults.Sh_WorkflowList_InNosaziCodeObjType.forEach(
            //   x => {
            //     this.workFlowItemList.push(x.WorkflowTitel)
            //     this.workFlowItemDeff.push(x.NidWorkflowDeff)
            //     this.workFlowItemList.sort()
            //   }
            // )
            // this.workFlowItemList.forEach(x => {
            //   this.workFlowItemArray.push({
            //     ID: this.workFlowItemDeff[i++],
            //     Title: x
            //   })
            // })
          }
        })
        .catch((response) => {
          // console.log(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    validation () {
      let self = this
      let checkData = {
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }
      this.showLoading()
      this.$services.SC.checkValidationForBlackListBeforSaveRequest(checkData)
        .then(async ({ data }) => {
          self.checkValidResult = this.getResponse(data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          // validation on air
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })

          if (self.checkValidResult.errors.length === 0) {
            this.getShWorkFlow()
          }
          self.checkValidResults = self.checkValidResult.data
          if (self.checkValidResult.errors.length === 0) {
            this.getShWorkFlow()
          } else {
            this.workFlowItemArray = self.checkValidResults.ValidRequest_ForBlackList_BeforSaveRequest.map(
              (x) => ({
                ID: x.NidWorkflowDeff,
                Title: x.WorkflowTitel
              })
            ).sort(({ Title: xID }, { Title: yID }) => {
              if (xID < yID) {
                return -1
              }
              if (xID > yID) {
                return 1
              }
              return 0
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
    allRequestList () {
      let self = this
      let oldrequestData = {
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }
      this.showLoading()
      this.$services.SC.getAllRequestList(oldrequestData)
        .then(async ({ data }) => {
          self.allRequestListResult = this.getResponse(data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
          if (self.allRequestListResult.success) {
            self.allRequestListResults = self.allRequestListResult.data
          }
        })
        .catch((response) => {
          self.allRequestListResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    reload (value) {
      if (value) {
        this.isEditable = false
        this.isShowDashboard = true
        this.isShowNosaziCode = false
        this.mainForm = false
        this.allRequestList()
      }
    },
    showMainForm ({ isAttach, attachList }) {
      if (isAttach) {
        this.mainForm = false
        this.showAttachList = true
      }

      this.attachResults = attachList
    },
    backMainForm () {
      this.mainForm = true
      this.showAttachList = false
    },
    selectAttach () {
      if (this.selectedRow !== null) {
        this.backMainForm()
      } else {
        this.showError('درخواستی برای پیوست انتخاب نشده است.')
      }
    },
    getAttachInfo (attachInfo) {
      this.attachInfo = attachInfo
    }
  },
  mounted () {
    if (this.value) this.baseNosaziCode = this.value

    this.$nextTick(async () => {
      await this.$refs.formHeaderRef.load()
    })
  }
}
</script>
