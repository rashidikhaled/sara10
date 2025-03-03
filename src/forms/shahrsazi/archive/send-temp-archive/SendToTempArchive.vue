<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper title="ارسال به بایگانی موقت">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          :enabled="enabled"
          @input="handelChangeNosaziCode"
        />
        <!-- @input="handleBaseNosaziCodeChanged" -->

        <safa-status :result="baseLibResult"/>
        <safa-status :result="sendResult"></safa-status>
        <safa-status :result="changeStateResult"></safa-status>
      </template>

      <div class="row q-col-gutter-sm">
        <safa-combo
          v-model="Value.Cause"
          cdcName="TemporaryArchiveCauseExit"
          ciName="CI_TemporaryArchiveCauseExit"
          class="col-12"
          domainName="CI_SaraM1"
          label="علت بایگانی"
          label-width="130px"
        ></safa-combo>
        <text-template
          v-model="Value.Comment"
          cdcName="Comment"
          class="col-12"
          formKey="f905b71b-9c44-45cb-8832-0d84bbd06ac6"
          label=" توضیحات ارسال به بایگانی"
          label-width="130px"
        />
      </div>

      <template v-slot:footer>
        <FormActions :showEditButton="false">
          <template v-slot:after>
            <btn-default
              label="ارسال"
              spCaption="ارسال"
              @click="send"
            />
            <!-- spId="c4a97728-a091-4317-8c98-d254031966c4" -->
            <btn-cancel @click="cancel"/>
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/send-temporary-archive',

  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'ارسال به بایگانی موقت',
      formKey: "006cc7c2-d24c-4cd8-b9a7-e64abaed5e0b", // از زمل ست شد
      // formKey: 'b0b365d0-6d19-4c1b-a969-a4b710cc4217',
      name: 'SendToTempArchive',
      main: true,
      sidebarCompatible: true,
      Value: {
        Name: '',
        Num: 0,
        Date: '',
        Comment: '',
        Cause: 0,
        Address: '',
        Title: ''
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
      sendResult: null,
      changeStateResult: null
    }
  },
  components: {},
  props: {
    passedData: Object,
    enabled: {
      type: String,
      default: '0-0-0-0-0-0-0'
    }
  },
  mounted () {
    if (this.selectedRequest === null) {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
    }
  },
  methods: {
    handelChangeNosaziCode (value) {
      this.baseNosaziCode = { ...value }
    },
    send () {
      this.showConfirm('آیا برای ارسال به بایگانی موقت اطمینان دارید؟').onOk(
        () => {
          this.showLoading()
          this.editmode = 'r'

          let data = {
            pNidProc: this.selectedRequest.NidProc,
            // pDtoWorkflowData: {
            //   StateName: this.selectedRequestResults.StatesInfo.WorkflowStateName,
            //   WorkflowGuid: this.selectedRequestResults.WorkflowInstance
            //     .NidWorkflowDeff
            // },
            pDtoWorkflowData: {
              StateName: this.selectedRequest.WorkflowTitel,
              WorkflowGuid: this.selectedRequest.NidWorkflowDeff
            },
            pUser: this.currentUser,
            pComments: this.Value.Comment,
            pCI_TemporaryArchiveCauseEnter: this.Value.Cause,
            pStateTitle: this.selectedRequest.TaskTitel
          }

          this.$services.SC.sendToTemporaryKartabl(data, {
            config: {
              District: this.selectedDistrict
            }
          })
            .then(({ data }) => {
              this.sendResult = this.getResponse(data)
              if (this.sendResult.success) {
                this.showSuccess('ارسال به بایگانی موقت با موفقیت انجام شد.')
                this.changeState()
                // this.$stKartable.dispatch('clearKartableState')
                this.cancel()
              }
            })
            .catch(response => {
              console.log('error', response)
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        }
      )
    },
    changeState () {
      let payload = {
        NidProc: this.selectedRequest.NidProc,
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName(),
        ProcStatus: 3
      }

      this.$srvWorkflow
        .setProcStatus(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(async ({ data }) => {
          this.changeStateResult = this.getResponse(data)
          if (this.changeStateResult.success) {
            // this.data = this.getResponse(data).ProcEventResult
            await this.log({
              action: this.logActions.send,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: 'NidProc'
            })
          }
        })
        .catch(response => {
          console.log('error', response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.hideSidebar('SendToTempArchive')
      this.redirectToKartable()
    }
  }
}
</script>
