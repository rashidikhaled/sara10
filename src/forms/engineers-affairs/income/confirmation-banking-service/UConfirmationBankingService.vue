<template>
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="model.pRegion"
            label="منطقه"
            label-width="70px"
            class="col-md-2"
            ciName="CI_Region"
            domainName="engineer"
            required
            :validations="['required', 'number']"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="model.pStartDate"
            label="از تاریخ"
            label-width="70px"
            class="col-md-2"
            required
            :validations="['required', 'number']"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            v-model="model.pEndDate"
            label="تا تاریخ"
            label-width="70px"
            class="col-md-2"
            required
            :validations="['required', 'number']"
          />
        </FormControl>
        <FormControl>
          <btn-search @click="loadData"/>
        </FormControl>
      </FormRow>
      <safa-datatable
        :columns="columns"
        title=""
        v-model="list"
        m="r"
        fit
        paginate
        height="100%"
        max-height="100%"
        min-height="100px"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :showEditButton="false"
        :showNewButton="false"
      >
        <btn-save
          label="تایید"
          @click="confirmFicheIncomePayment"
        />
        <btn-cancel
          label="خروج"
          @click="exit"
        />
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تأیید فیش از طریق وب سرویس بانک',
      name: 'UConfirmationBankingService',
      formKey: '30ad827d-13a3-403f-91e5-6b9dd6c8f1b7',
      main: true,

      model: {
        pRegion: null,
        pStartDate: null,
        pEndDate: null
      },

      identityCode: null,
      CI_Years: 0,
      list: [],

      columns: [
        { field: '', title: 'شماره ارجاع', width: '100px' },
        { field: '', title: 'شناسه قبض', width: '150px' },
        { field: '', title: 'شناسه پرداخت', width: '150px' },
        { field: '', title: 'بانک', width: '100px' },
        { field: '', title: 'تاریخ فایل', width: '100px' },
        { field: '', title: 'عنوان فایل', width: '100px' },
        { field: '', title: 'رکورد فایل', width: '100px' },
        { field: '', title: 'کد منطقه', width: '100px' },
        { field: '', title: 'عنوان منطقه', width: '150px' },
        { field: '', title: 'تاریخ پرداخت', width: '100px' },
        { field: '', title: 'پیغام ارسالی از رایورز', width: '200px' }
      ]
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadData()
    }
  },
  methods: {
    loadData () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: this.CI_Years,
          EngineerCode: this.identityCode
        }
      }
      this.$services.engActivity
        .DecodeAndConfirmViaWebService(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            // this.model = res.data.GetFilIncomeReportResult;
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: 'کد عضویت'
            })
          }
        })
        .catch((error) => {
          console.error('load error', error)
          //   this.serverError();
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    confirmFicheIncomePayment () {
      if (!this.isValidForm()) return
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: '0',
          CI_Years: '0',
          NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
          NidEng: '00000000-0000-0000-0000-000000000000',
          NidFil: '00000000-0000-0000-0000-000000000000',
          NidWorkitem: '0',
          CI_CancelType: '0',
          CI_ExecFloor: '0',
          CI_ExecLevel: '0',
          CI_SazeType: '0',
          CI_Year: '0',
          ClsBankWebService: {
            NotConfirmedFiche: '0',
            PreviousConfirmedFiche: '0',
            TotalFiche: '0'
          },
          IsConfirm: 'false',
          IsRefreshOnly: 'false',
          IsSendToSaraRequest: 'false',
          NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
          NIdDetail: '00000000-0000-0000-0000-000000000000',
          NIdRealPerson: '00000000-0000-0000-0000-000000000000',
          NidBlackList: '00000000-0000-0000-0000-000000000000',
          NidProc: '00000000-0000-0000-0000-000000000000',
          NidRefer: '00000000-0000-0000-0000-000000000000',
          NidTask: '00000000-0000-0000-0000-000000000000',
          NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.engActivity
        .SaveConfirmFicheIncomePayment(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            // this.model = res.data.GetFilIncomeReportResult;
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: 'کد عضویت'
            })
          }
        })
        .catch((error) => {
          console.error('load error', error)
          //   this.serverError();
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exit () {
      this.hideSidebar('UConfirmationBankingService')
      this.redirectToKartable()
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  }
}
</script>
