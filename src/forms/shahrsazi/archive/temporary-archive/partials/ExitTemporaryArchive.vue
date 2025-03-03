<template>
  <form-wrapper title="خروج از بایگانی موقت">
    <template #header>
      <safa-status :result="baseLibResult"/>
      <safa-status :result="exitResult"/>
    <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetchedData"
          from-request
          :taskInfo="taskInfo"
          m="r"
          />
        </template>
       <fit>
    <div class="q-col-gutter-sm q-mb-sm">
      <safa-combo
        v-model="selectedTempCause"
        cdcName="TemporaryArchiveCauseExit"
        ciName="CI_TemporaryArchiveCauseExit"
        class="col-md-6"
        domainName="CI_SaraM1"
        label="علت خروج از بایگانی"
        label-width="100px"
      ></safa-combo>
      <text-template
        v-model="comment"
        :formKey="formKey"
        cdcName="comment"
        class="col-12"
        label="توضیحات"
        label-width="100px"
      />
    </div>
  </fit>
    <template v-slot:footer>
      <btn-default class="q-mr-sm" label="خروج از بایگانی" @click="exit"/>
      <btn-default label="انصراف" @click="backToMainForm"/>
    </template>
  </form-wrapper>
</template>
<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'

export default {
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  data: function () {
    return {
      comment: '',
      selectedTempCause: 0,
      m: 'r',
      nidWorkItem: '',
      requestDate: '',
      workFlowTitle: '',
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
        Sh_RequestInfo: {},
        MainObj: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      nosaziCode: '',
      nidBase: '',
      result: null,
      results: {
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        NidLib: {}
      },
      exitResult: null,
      exitTempArchive: null,
      changeStateResult: null
    }
  },
  components: {},
  props: {
    passedData: Object,
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
    },
    taskInfo: Object
  },
  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(
      this.passedData.NosaziCode
    )
    this.handleBaseNosaziCodeChanged()
  },
  methods: {
    handleBaseNosaziCodeChanged () {
      // loadRequestHeader method
      let self = this
      let data = {
        pNidProc: this.passedData.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.loadRequestHeader(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
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

            if (self.baseLibResults.Sh_RequestInfo !== null) {
              this.nidWorkItem = self.baseLibResults.Sh_RequestInfo.NidWorkItem
              this.requestDate = self.baseLibResults.Sh_RequestInfo.RequestDate
              this.workFlowTitle =
                self.baseLibResults.Sh_RequestInfo.WorkflowTitel
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.passedData.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch((response) => {
          self.baseLibResult = this.getResponse(response)
          // console.log('error', self.baseLibResult)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exit () {
      this.showConfirm('آیا برای خروج از بایگانی اطمینان دارید؟').onOk(() => {
        let data = {
          pNidProc: this.passedData.NidProc,
          pUser: this.currentUser,
          pIsUserAdmin: true,
          pComments: this.comment,
          pCI_TemporaryArchiveCauseExit: this.selectedTempCause,
          pStateTitle: this.passedData.StateTitle
        }

        this.$services.SC.backFromTemporaryKartabl(data, { config: { District: this.baseNosaziCode.District } })
          .then(async ({ data }) => {
            this.exitResult = this.getResponse(data)

            if (this.exitResult.success) {
              this.showSuccess('خروج از بایگانی موقت با موفقیت انجام شد.')
              this.updateLastRequestState()
              await this.log({
                action: this.logActions.save,
                bizCode: this.passedData.NidProc,
                bizCodeTitle: 'NidProc',
                saveDesc: 'خروج از بایگانی موقت'
              })
              this.$emit('exitDone')
            }
          })
          .catch((response) => {
            this.exitResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    backToMainForm () {
      this.$emit('exitDone')
    },
    updateLastRequestState () {
      const payload = {
        pNidProc: this.passedData.NidProc,
        pLastRequestState: 'از بایگانی موقت خارج شد'
      }
      this.$services.SC.updateLastRequestState(payload, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            // res.data.UpdateLastRequestStateResult
            await this.log({
              action: this.logActions.update,
              bizCode: this.passedData.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
