<template>
  <form-wrapper title="خروج از لیست سیاه">
    <template #header>
      <formHeaderByNosaziCode
        v-model="baseNosaziCode"
        @enter="handleBaseNosaziCodeChanged"
      />
      <safa-status :result="baseLibResult"/>
      <safa-status :result="result"/>
      <safa-status :result="validationResult"/>
      <safa-status :result="exitBlacKListResult"/>
    </template>

    <fit>
      <div class="row q-mb-sm">
        <safa-combo
          v-model="entryCause"
          cdcName="entryCause"
          ciName="CI_BlackListCause"
          class="col-auto col-md-3"
          domainName="CI_SaraM1"
          label="علت ورود به لیست سیاه"
          label-width="90px"
        />
      </div>
      <safa-datatable
        ref="grid2"
        v-model="results.BlackListWorkflowExemption_IsEnter"
        cdcName="exitBlackList"
        helper="exitBlackList"
        title="لیست"
        @selectedChange="selectedChange"
      /> <!-- @selectedChange="selectedChange" -->
      <text-template
        v-model="comments"
        cdcName="comments"
        class="q-mt-sm"
        formKey="f060bad3-3b6b-4430-b253-4613cedc1f07"
        label="توضیحات خروج از لیست سیاه"
        label-width="90px"
        type="textarea"
      />
    </fit>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save
          label="بلی"
          @click="accept"
        />
        <btn-cancel
          label="خیر"
          @click="cancle"
        />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
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
        Base_PreCodeInfo: {},
        BuildingObj: {},
        Sh_RequestInfo: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      result: null,
      results: { BlackListWorkflowExemption_IsEnter: [] },
      selectedRow: null,
      validationResult: null,
      comments: '',
      exitBlacKListResult: null,
      exitBlackList: false
    }
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      let self = this
      this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
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
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          self.baseLibResult = this.getResponse(data)

          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            this.nosaziCode = self.baseLibResults._NidNosaziCode

            if (self.baseLibResults.Base_Owner.length !== 0) {
              for (var i = 0; i < self.baseLibResults.Base_Owner.length; i++) {
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName +
                    ' ' +
                    self.baseLibResults.Base_Owner[i].OwnerLastName +
                    ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerLastName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerName + ','
                }
                if (
                  self.baseLibResults.Base_Owner[i].OwnerLastName !== null &&
                  self.baseLibResults.Base_Owner[i].OwnerName === null
                ) {
                  this.ownerName +=
                    self.baseLibResults.Base_Owner[i].OwnerLastName + ','
                }
              }
            }
            // if (self.baseLibResults.Base_PreCodeInfo.length !== 0) {
            //   for (
            //     var j = 0;
            //     j < self.baseLibResults.Base_PreCodeInfo.length;
            //     j++
            //   ) {
            //     this.oldNosaziCode +=
            //       self.baseLibResults.Base_PreCodeInfo[j].PreCode + ','
            //   }
            // }
            if (self.baseLibResults.Base_PreCodeInfo !== null) {
              this.oldNosaziCode = self.baseLibResults.Base_PreCodeInfo.PreCode
            }
          }
        })
        .catch(response => {
          self.baseLibResult = this.getResponse(response)
          // console.log(this.baseLibResult)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getBlackListWorkFlow () {
      let data = { pNidNosaziCode: this.nidNosaziCode }
      this.$services.SA.getBlackListWorkflowExemptionIsEnter(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
          }
        })
        .catch(response => {
          this.result = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRow = e.dataItem
      this.nidBlack = e.dataItem.NidBlackFlow
    },
    validationExit () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pDomain: 'Commission77',
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SC.validationExitFromBlackList(data)
        .then(({ data }) => {
          this.validationResult = this.getResponse(data)
          if (this.validationResult.success) {
            this.exitBlackListMethod()
            this.showSuccess('خروج از لیست سیاه با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          this.validationResult = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exitBlackListMethod () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pUserName: 'مدير سيستم (sa)',
        pUserCode: '7bc16d9a-9ac4-47af-bc28-adad1622a054',
        IsAdmin: true,
        pDomain: 'Commission77',
        pSignature: {
          Password: 'lG44GEEumrHlhbAHbc2HKQ==',
          UserName: 'dkhfy9Hj5AtWM+WguTLs+g==',
          sequenceId: '7a7300ab-90b0-4cd1-a432-14c0762ae18f'
        }
      }
      this.$services.SA.exitFromBlackList(data)
        .then(({ data }) => {
          this.exitBlacKListResult = this.getResponse(data)
          if (this.exitBlacKListResult.success) {
            this.cancle()
          }
        })
        .catch(response => {
          this.exitBlacKListResult = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.validationExit()
    },
    cancle () {
      this.exitBlackList = true
      this.$emit('backToBlackListForm', this.exitBlackList)
    }
  },
  props: {
    nosaziCode: Object,
    nidNosaziCode: String,
    entryCause: Number,
    nidBlack: String,
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
  // computed: {
  //   nosaziCodeObj () {
  //     // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  //     this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
  //     return this.baseNosaziCode
  //   }
  // },
  mounted () {
    this.handleBaseNosaziCodeChanged()
    this.getBlackListWorkFlow()
  }
}
</script>
