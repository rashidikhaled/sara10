<template>
  <safa-form
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
    :caption="title"
    :id="formKey"
  >
    <form-wrapper v-if="mainForm" title="ثبت درخواست" vertical :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
          v-if="isShowNosaziCode"
        />
        <safa-status :result="baseLibResult" />
        <safa-status :result="checkValidResult" />
        <safa-status :result="allRequestListResult" />
        <safa-status :result="workflowListResult" />
      </template>

      <safa-tabs v-model="activeTab" height="100%" type="fixed" class="fit">
        <template v-slot:tabs>
          <tab-menu name="showNewTab" label="درخواست جدید" />
          <tab-menu name="showOldTab" label="درخواست های قبلی" />
        </template>
        <tab-content name="showNewTab" title="درخواست جدید">
          <EditRequestSubmissionNew
            :workFlowItemArray="workFlowItemArray"
            :results="results"
            :isEditable="isEditable"
            :nosaziCode="baseLibResults._NidNosaziCode"
            :baseNosaziCode="baseNosaziCode"
            :attachInfo="attachInfo"
            @reload="reload"
            @showMainForm="showMainForm"
            @loading:show="isLoading = true"
            @loading:hide="isLoading = false"
            :baseLibResults="baseLibResults"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="subNew"
          />
        </tab-content>
        <tab-content
          name="showOldTab"
          title="درخواست های قبلی"
          :padding="false"
        >
          <EditRequestSubmissionOld
            :allRequestList="allRequestListResults.AllRequestList"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-save @click="accept" label="تأیید" />
          <btn-cancel @click="cancle" label="انصراف" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import EditRequestSubmissionOld from "./partials/EditRequestSubmissionOld.vue"
import EditRequestSubmissionNew from "./partials/EditRequestSubmissionNew.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "شهرسازی- ویرایش درخواست در شهرسازی",
      formKey: "C7AB9DF7-C62B-414E-9D66-5555722FD9D6",
      name: "UEditRequest8",
      main: true,
      sidebarCompatible: true,
      mainForm: true,

      activeTab: "showNewTab",
      getConfirmCodeBtn: false,
      disableGetCode: true,
      results: {
        Info: {
          Cellphone: ""
        }
      },
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
        BuildingObj: {},
        BlockObj: { District: 0 }
      },
      ownerName: "",
      oldNosaziCode: "",
      allRequestListResult: null,
      allRequestListResults: { AllRequestList: [] },
      isSearch: false,
      isLoading: true,
      nosaziCode: "",
      workflowListResult: null,
      workflowListResults: { Sh_NewWorkflowList_InNosaziCodeObjType: [] },
      isEditable: false,
      checkValidResult: null,
      workFlowItemList: [],
      workFlowItemArray: [],
      workFlowItemDeff: [],
      showAttachList: false,
      attachResults: {},
      attachInfo: {},
      isShowDashboard: false,
      isShowNosaziCode: true,
      checkValidResults: { ValidRequest_ForBlackList_BeforSaveRequest: [] }
    }
  },
  computed: {},
  components: {
    EditRequestSubmissionOld,
    EditRequestSubmissionNew
  },
  methods: {
    accept () {
      if (this.baseLibResults.ErrorResult.BizErrors.length !== 0) {
        this.isEditable = false

        return
      }
      this.$refs.subNew.accept()
    },
    cancle () {
      this.isEditable = false
    },
    selectAttach () {
      if (this.selectedRow !== null) {
        this.backMainForm()
      } else {
        this.showError("درخواستی برای پیوست انتخاب نشده است.")
      }
    },
    fetched (value) {
      console.log("fetched::baseLibResults", value)
      this.baseLibResults = value

      this.validation()
      this.allRequestList()
      this.results.Info = {
        RequesterNationalCode: "",
        BuyerName: "",
        MainRequesterNo: "",
        MandateNo: "",
        SecretariatNo: "",
        CI_Requester: 0,
        TelephoneNo: "",
        BuyerNationalCode: "",
        MainRequesterDate: "",
        SecretariatDate: "",
        RequesterName: "",
        Cellphone: "",
        PostCode: "",
        BuyerCellphone: "",
        MainRequesterName: "",
        TransferDang: "",
        EMail: "",
        RequesterAddress: "",
        Comment: ""
      }
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
    //   this.$services.SA.getBaseLibInNosaziCode(data, {
    //      config: { District: this.baseLibResults.BlockObj.District },
    //      })
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
    //         this.results.Info = {
    //           RequesterNationalCode: '',
    //           BuyerName: '',
    //           MainRequesterNo: '',
    //           MandateNo: '',
    //           SecretariatNo: '',
    //           CI_Requester: 0,
    //           TelephoneNo: '',
    //           BuyerNationalCode: '',
    //           MainRequesterDate: '',
    //           SecretariatDate: '',
    //           RequesterName: '',
    //           Cellphone: '',
    //           PostCode: '',
    //           BuyerCellphone: '',
    //           MainRequesterName: '',
    //           TransferDang: '',
    //           EMail: '',
    //           RequesterAddress: '',
    //           Comment: ''
    //         }
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
      const District =
        (this.baseLibResults.BlockObj &&
          this.baseLibResults.BlockObj.District) ||
        (this.baseLibResults.MainObj && this.baseLibResults.MainObj.District)
      this.$services.SA.getShNewWorkflowListInNosaziCodeObjType(WorkflowList, {
        config: { District }
      })
        .then(async ({ data }) => {
          self.workflowListResult = this.getResponse(data)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })

          if (self.workflowListResult.success) {
            self.workflowListResults = self.workflowListResult.data
            // self.workflowListResults.Sh_WorkflowList_InNosaziCodeObjType.WorkflowTitel.sort()

            self.workFlowItemArray =
              (self.workflowListResults
                .Sh_NewWorkflowList_InNosaziCodeObjType &&
                self.workflowListResults.Sh_NewWorkflowList_InNosaziCodeObjType.map(
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
                })) ||
              []

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
        .catch((ex) => {
          console.log("@@@@@@@@@@@@@@@@@@@@", ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    validation () {
      if (!this.baseLibResults || !this.baseLibResults.MainObj) return
      let self = this
      let checkData = {
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }
      this.showLoading()
      this.$services.SC.checkValidationForBlackListBeforSaveRequest(checkData, {
        config: { District: this.baseLibResults.MainObj.District }
      })
        .then(async ({ data }) => {
          self.checkValidResult = this.getResponse(data)
          self.checkValidResults = self.checkValidResult.data

          // get validation on air
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })

          if (self.checkValidResult.errors.length === 0) {
            this.getShWorkFlow()
          } else {
            this.workFlowItemArray =
              self.checkValidResults.ValidRequest_ForBlackList_BeforSaveRequest.map(
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
        .catch((ex) => {
          console.log(ex)
          // self.baseLibResult = this.getResponse(response);
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
      this.$services.SC.getAllRequestList(oldrequestData, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          self.allRequestListResult = this.getResponse(data)

          if (self.allRequestListResult.success) {
            self.allRequestListResults = self.allRequestListResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((ex) => {
          // this.serverError();
          console.log("error", ex)
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
    getAttachInfo (attachInfo) {
      this.attachInfo = attachInfo
    }
  },
  mounted () {
    this.baseNosaziCode = {
      ...this.baseNosaziCode,
      District: 0,
      Region: 0,
      Block: 0,
      House: 0,
      Building: 0,
      Apartment: 0,
      Shop: 0
    }
    // eslint-disable-next-line no-undef
    // if (window.getConfigValue('ConfirmCellPhoneForRequest')) {
    //   this.getConfirmCodeBtn = true
    // }
    // if (this.getConfirmCodeBtn === true) {
    //   this.disableGetCode = false
    // } else {
    //   this.disableConfirmCode = false
    // }
  }
  //   watch: {
  //     baseNosaziCode () {
  //       this.isEditable = false
  //
  //       this.isLoading = true
  //     }
  //   }
}
</script>
