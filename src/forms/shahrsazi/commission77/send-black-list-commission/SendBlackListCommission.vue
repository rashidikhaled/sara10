<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      :title="title"
      vertical
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetchedData"
        />
        <safa-status :result="baseLibResult"/>
        <safa-status :result="result"/>
        <safa-status :result="sendResult"></safa-status>
      </template>
      <fit>
        <div class="row q-gutter-md q-mb-sm">
          <safa-combo
            v-model="entryCause"
            cdcName="entryCause"
            ciName="CI_BlackListCause"
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            domainName="CI_SaraM1"
            label="علت ورود به لیست سیاه"
          >
          </safa-combo>
          <safa-combo
            v-model="selectedStatus"
            :options="statusList"
            cdcName="selectedStatus"
            class="col-12 col-sm-3 col-md-2"
            label="نوع کنترل"
            sourceType="local"
          >
          </safa-combo>
        </div>
        <safa-datatable
          ref="grid2"
          v-model="results.Sh_WorkflowList"
          :allowMultipleSelection='true'
          cdcName="sendToBlackListCommission"
          class="q-mb-sm"
          fit
          helper="sendToBlackListCommission"
          title="درخواست های مجاز"
          @selectedChange="selectedChange"
        >
        </safa-datatable>
        <div>
          <text-template
            v-model="comments"
            :rows="3"
            cdcName="comments"
            formKey="d287d2bf-b033-404b-9ba6-60b8efaf14eb"
            label="توضیحات خروج از لیست سیاه"
          />
        </div>
      </fit>
      <template v-slot:footer>
        <!-- <FormActions> -->
        <div class="row q-gutter-sm">
          <btn-default
            label="ارسال"
            @click="accept"
          ></btn-default>
          <btn-delete @click="cancel">
          </btn-delete>
        </div>
        <!-- </FormActions> -->
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/commission77/send-blacklist-commission',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'ارسال به لیست سیاه کمیسیون 77',
      formKey: 'd287d2bf-b033-404b-9ba6-60b8efaf14eb',
      name: 'SendBlackListCommission',
      main: true,
      sidebarCompatible: true,
      entryCause: 0,
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
        Sh_RequestInfo: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      result: null,
      results: { Sh_WorkflowList: [] },
      selectedRow: {},
      selectedRows: [],
      validationResult: null,
      comments: '',
      exitBlacKListResult: null,
      exitBlackList: false,
      nosaziCodeResult: null,
      nosaziCodeResults: { NosaziCodeInBlackList: [] },
      sendResult: null,
      sendResults: {},
      statusList: [
        { ID: 0, Title: 'هشدار' },
        { ID: 1, Title: 'توقف' },
        { ID: 2, Title: 'توقف صدور' }
      ],
      selectedStatus: 0,
      isEditable: false
    }
  },
  methods: {
    fetchedData (value) {
      this.nosaziCode = value._NidNosaziCode
      this.loadWorkFlow()
    },

    loadWorkFlow () {
      let data = {}
      this.$services.SA.loadWorkflowList(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nosaziCode,
              bizCodeTitle: '_NidNosaziCode'
            })
          }
        })
        .catch((response) => {
          this.result = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getNosaziCodeInBlackList () {
      let data = { pNidNosaziCode: this.baseLibResults._NidNosaziCode }
      this.$services.SA.getaNosaziCodeInBlackList(data)
        .then(async ({ data }) => {
          this.nosaziCodeResult = this.getResponse(data)
          if (this.nosaziCodeResult.success) {
            this.nosaziCodeResults = this.nosaziCodeResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nosaziCode,
              bizCodeTitle: '_NidNosaziCode'
            })

            if (this.nosaziCodeResults.NosaziCodeInBlackList.length > 0) {
              this.showError('کد نوسازی وارد شده در لیست سیاه وجود دارد.')
            } else {
              this.sendToBlackList()
            }
          }
        })
        .catch((response) => {
          this.nosaziCodeResult = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToBlackList () {
      this.showLoading()
      this.selectedRows.forEach((x) => {
        x.NidBlackFlow = '00000000-0000-0000-0000-000000000000'
      })
      let data = {
        pBlack: {
          CI_BlackListCause: this.entryCause,
          Domain: 'Commission77',
          EnterComments: this.comments,
          EnterDate: '',
          EnterTime: '',
          EumBlackListControl: this.selectedStatus,
          EumBlackListStatus: 0,
          ExitComments: '',
          ExitDate: '',
          ExitTime: '',
          NidBlack: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: this.nosaziCode,
          NidUserEnter: this.getNidUser(),
          NidUserExit: '00000000-0000-0000-0000-000000000000',
          UserEnter: this.getUserDisplayName(),
          UserExit: ''
        },
        pBlackWorkflow: this.selectedRows
      }
      this.$services.SA.sendToBlackList(data)
        .then(async ({ data }) => {
          this.sendResult = this.getResponse(data)
          if (this.sendResult.success) {
            this.sendResults = this.sendResult.data
            this.showSuccess('کد نوسازی با موفقیت به لیست سیاه افزوده شد.')
            await this.log({
              action: this.logActions.send,
              bizCode: this.nosaziCode,
              bizCodeTitle: '_NidNosaziCode',
              saveDesc: 'ارسال به لیست سیاه'
            })
            this.redirectToKartable()
          }
        })
        .catch((response) => {
          this.sendResult = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    },

    accept () {
      this.getNosaziCodeInBlackList()
    },
    cancel () {
      this.entryCause = 0
      this.selectedStatus = 0
      this.comments = ''
    }
  },
  mounted () {
    this.baseNosaziCode = {
      District: 0,
      Region: 0,
      Block: 0,
      House: 0,
      Building: 0,
      Apartment: 0,
      Shop: 0
    }
  }
}
</script>
