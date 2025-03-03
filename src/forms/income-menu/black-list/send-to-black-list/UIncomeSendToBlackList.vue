<template>
  <!-- No form key -->
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper
      :title="title"
      vertical
    >
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetchedData"
        />
        <safa-status :result="baseLibResult" />
        <safa-status :result="result" />
        <safa-status :result="sendResult"></safa-status>
      </template>
      <fit>
        <div class="row q-col-gutter-md q-mb-sm">
          <safa-combo
            label="علت ورود به لیست سیاه"
            v-model="entryCause"
            cdcName="entryCause"
            ciName="CI_BlackListCause"
            domainName="CI_SaraM1"
            class="col-12 col-sm-3"
          />
          <safa-combo-enum
            label="نوع کنترل"
            enum-name="EumBlackListControl"
            v-model="selectedStatus"
            cdcName="selectedStatus"
            class="col-12 col-sm-3"
          ></safa-combo-enum>
        </div>
        <safa-datatable
          @selectedChange="selectedChange"
          :allowMultipleSelection="true"
          :selectable='true'
          v-model="results.Sh_WorkflowList"
          cdcName="Sh_WorkflowList"
          ref="grid2"
          helper="sendToBlackList"
          title="درخواست های مجاز"
          fit
          height="100%"
          max-height="100%"
          min-height="300px"
        />
      </fit>
      <div>
        <text-template
          label="توضیحات ورود به لیست سیاه"
          class="q-mt-sm"
          v-model="comments"
          cdcName="comments"
          formKey="D3094A31-E79B-4185-80E9-F83286236295"
          :rows=3
        />
      </div>
      <template v-slot:footer>
        <div class="row q-gutter-sm ">
          <btn-default
            @click="accept"
            label="ارسال"
          ></btn-default>
          <btn-cancel @click="cancle"></btn-cancel>
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  components: {},
  route: '/income-black-list/UIncomeSendToBlackList',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'لیست سیاه - ارسال به لیست سیاه',
      formKey: '4b0b954c-f2ac-4c88-85d2-47e4d23caac5',
      name: 'UIncomeSendToBlackList',
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
    getNosaziCodeInBlackList () {
      let data = { pNidNosaziCode: this.baseLibResults._NidNosaziCode }
      this.$services.SA.getaNosaziCodeInBlackList(data)
        .then(({ data }) => {
          this.nosaziCodeResult = this.getResponse(data)
          if (this.nosaziCodeResult.success) {
            this.nosaziCodeResults = this.nosaziCodeResult.data
            if (this.nosaziCodeResults.NosaziCodeInBlackList.length > 0) {
              this.showError('کد نوسازی وارد شده در لیست سیاه وجود دارد.')
            } else {
              this.sendToBlackList()
            }
          }
        })
        .catch(response => {
          this.nosaziCodeResult = this.getResponse(response)
          this.showError(' انجام نشد')
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToBlackList () {
      let data = {
        pBlack: {
          CI_BlackListCause: this.entryCause,
          Domain: 'Sara8',
          EnterComments: this.comments,
          EnterDate: '',
          EnterTime: '',
          EumBlackListControl: this.selectedStatus,
          EumBlackListStatus: 0,
          ExitComments: '',
          ExitDate: '',
          ExitTime: '',
          NidBlack: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: this.baseLibResults._NidNosaziCode,
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
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.transfer,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              saveDesc: 'افزودن کد نوسازی به لیست سیاه'
            })
            this.showSuccess('کد نوسازی با موفقیت به لیست سیاه افزوده شد.')
            this.redirectToKartable()
          }
        })
        .catch(response => {
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
    cancle () {
      this.exitBlackList = true
      this.$emit('backToBlackListForm', this.exitBlackList)
    }
  },
  mounted () {}
}
</script>
