<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- درخواست فیزیک پرونده"
  >
    <form-wrapper
      :hasFooter="isRequestSubmissionTab"
      :padding="false"
      title="درخواست فیزیک پرونده"
      vertical
    >
      <template v-slot:header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
        <safa-status :result="requestResult"></safa-status>
        <!-- <safa-status :result="baseLibResult" /> -->
        <!-- <safa-status :result="checkValidResult" /> -->
        <!-- <safa-status :result="allRequestListResult" /> -->
        <!-- <safa-status :result="workflowListResult" /> -->
      </template>
      <fit>
        <safa-tabs
          v-model="activeTab"
          :padding="false"
          class="fit"
          height="100%"
        >
          <template v-slot:tabs>
            <tab-menu label="ثبت درخواست" name="showRequestSubmissionTab"/>
            <tab-menu label="تاریخچه" name="showHistoryTab"/>
          </template>
          <tab-content name="showRequestSubmissionTab" title="ثبت درخواست">
            <DocumentPhysicReqSubmission
              ref="requestSubmission"
              :formKey="formKey"
              :name="name"
              :nosaziCode="baseLibResults._NidNosaziCode"
              :results="results"
              :title="title"
              @backToMainForm="backToMainForm"
            />
          </tab-content>
          <tab-content :padding="false" name="showHistoryTab" title="تاریخچه">
            <DocumentPhysicReqHistory :editmode="editmode" :results="results"/>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-if="isRequestSubmissionTab" v-slot:footer>
        <form-actions :showEditButton="false">
          <template v-slot:after>
            <tab-actions v-model="activeTab" :buttons="tabActions[activeTab]"/>
            <btn-default
              label="دریافت پرونده"
              @click="recieveDoc"
            ></btn-default>
            <btn-default label="تحویل پرونده" @click="sendDoc"></btn-default>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import DocumentPhysicReqSubmission from './partials/DocumentPhysicReqSubmission.vue'
import DocumentPhysicReqHistory from './partials/DocumentPhysicReqHistory.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
import messageMixin from 'src/mixins/messageMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/archive/document-request',
  mixins: [baseFormMixin, messageMixin],
  data () {
    return {
      title: 'درخواست فیزیک پرونده',
      // formKey: "A9C0DE5E-23F4-4177-A612-EBF09B87A2EF",
      formKey: 'c3f12c1c-5187-48d5-85cd-5965e86bb9b5',
      name: 'DocumentPhysicReq',
      main: true,
      editmode: 'e',
      activeTab: 'showRequestSubmissionTab',
      results: { PrintRequestList: [] },
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
      isSearch: false,
      nosaziCode: '',
      isEditable: false,
      tabActions: {
        showRequestSubmissionTab: [
          {
            label: 'دریافت پرونده',
            type: 'default'
            // click: (e, btn) => {
            // this.$refs.requestSubmission.recieveDoc()
            // }
          },
          {
            label: 'تحویل پرونده',
            type: 'default'
            // click: (e, btn) => this.$refs.requestSubmission.sendDoc()
          }
        ]
      },
      isRequestSubmissionTab: true,
      requestResult: [],
      isView: false,
      selectedDistrict: 1
    }
  },
  components: {
    DocumentPhysicReqSubmission,
    DocumentPhysicReqHistory
  },
  watch: {
    activeTab () {
      if (this.activeTab === 'showRequestSubmissionTab') {
        this.isRequestSubmissionTab = true
      } else {
        this.isRequestSubmissionTab = false
      }
    }
  },
  methods: {
    recieveDoc () {
      this.$refs.requestSubmission.recieveDoc()
      this.editmode = 'r'
    },
    sendDoc () {
      this.$refs.requestSubmission.sendDoc()
      this.editmode = 'r'
    },
    fetched (val) {
      this.selectedDistrict = val.MainObj.District
      this.handleBaseNosaziCodeChanged()
    },
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      this.ownerName = ''
      this.oldNosaziCode = ''
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
      this.$services.SA.getBaseLibInNosaziCode(data, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          self.baseLibResult = this.getResponse(data)

          if (self.baseLibResult.success) {
            self.baseLibResults = self.baseLibResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })

            this.load()
          }
        })
        .catch((response) => {
          self.workflowListResult = this.getResponse(response)
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = true
      this.isSearch = true
    },
    load () {
      let data = {
        pNidNosaziCode: this.baseLibResults._NidNosaziCode
      }

      this.$services.SC.getPrintRequest(data, {
        config: {
          District: this.selectedDistrict
        }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.results = this.requestResult.data
            this.results.PrintRequestList = this.normalizePrintRequestList()
          }
          console.log('list', this.results.PrintRequestList)
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
            })
          }
          this.isView = true
        })
        .catch((response) => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    normalizePrintRequestList () {
      return this.results.PrintRequestList.map((x) => {
        if (x.RequestStatus === 1) {
          x.RequestStatus = 'دریافت پرونده'
        }
        if (x.RequestStatus === 2) {
          x.RequestStatus = 'تحویل پرونده'
        }
        return { ...x }
      })
    },
    backToMainForm (val) {
      if (val) {
        this.load()
      }
    }
  }
}
</script>
