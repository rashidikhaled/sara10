<template>
  <safa-form
    id="9642845a-769f-4fda-8bab-71c6651f9bb7"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="ارسال پیامک"
  >
    <form-wrapper :padding="false" title="ارسال پیامک" vertical>
      <template #header>
        <formHeaderByNosaziCode
          v-model="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :taskInfo="taskInfo"
          :title="title"
          class="col-12"
          @enter="loadByEnterHandler"
          @fetched="fetched"
        />
      </template>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu label="اطلاعات پیامک /متقاضی و مالکین" name="smsInfo"/>
          <tab-menu label="تاریخچه ارسال پیامک" name="history"/>
        </template>
        <tab-content name="smsInfo">
          <fit>
            <div class="row q-mb-sm">
              <text-template
                v-model="smsText"
                class="col-12"
                formKey="43422777-FE8B-438D-94BF-88EB48815030"
                label="متن پیامک"
              />
            </div>
            <safa-datatable
              ref="grid"
              v-model="getSmsNumberValue.NumbersList"
              :allowMultipleSelection="true"
              :allowNewRow="false"
              :selectable="true"
              fit
              height="100%"
              helper="requestedOwners"
              m="r"
              max-height="100%"
              min-height="100%"
              name="grid"
              title="متقاضی و مالکین"
              @selectedChange="selectedChange"
            />
          </fit>
        </tab-content>
        <tab-content :padding="false" name="history">
          <UHistory
            :formKey="formKey"
            :getSmsNumberValue="getSmsNumberValue"
            :name="name"
            :title="title"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <div>
          <!-- <safa-securityPanel
            id="3da5808e-5724-4fb9-9d1c-35766f6635f2"
            caption="ارسال"
          > -->
          <btn-default label="ارسال" @click="sendSms"/>
          <!-- </safa-securityPanel> -->
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UHistory from './partials/UHistory'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import PersianDate from 'persian-date'

export default {
  route: 'settings/send-sms-settings',

  components: { UHistory },
  computed: {
    config () {
      return {
        config: { District: this.baseNosaziCode.District } }
    }
  },
  mounted () {
    if (!this.selectedRequest) this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید.')
  },

  data () {
    return {
      title: 'ارسال پیامک',
      formKey: '9642845a-769f-4fda-8bab-71c6651f9bb7',
      name: 'USendSmsTabs',
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      loadByEnter: false,
      activeTab: 'smsInfo',
      items: [],
      ShowModal: false,
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",
      loadPrequest: {
        pNidProc: '269df9f0-5348-4466-903f-2cb17025ab8f',
        // 'pNidProc': '00000000-0000-0000-0000-000000000000',
        pIsLoadDeletedNosaziCode: 'false'
      },
      results: {},
      calculateAndSaveResult: {},
      copyResult: {},
      saveResult: {},
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      getSmsNumberValue: { Schedule_SMSList: [], NumbersList: [] },

      smsText: '',
      RequestInfo: {},
      allNumberStr: '',
      selectedNumbers: []
    }
  },
  mixins: [baseFormMixin],

  methods: {
    fetched ({ _NidNosaziCode }) {
      this.nidNosaziCode = _NidNosaziCode ?? "00000000-0000-0000-0000-000000000000"
      this.loadObj()
    },
    loadByEnterHandler () {
      this.loadByEnter = true
    },
    async loadObj () {
      // در سرا 8 عملکرد فرم در لحظه لود فرم به صورت شرط زیر میباشد. با توجه به تغییر در سر10 این فرم در هر صورت خروجی خود را براساس مقادیری نمایش میدهد که از کامپوننت کد نوسازی دربافت کرده.
      // let payLoad = this.loadByEnter === true ? {
      //   pNidProc: "00000000-0000-0000-0000-000000000000",
      //   pNidNosaziCode: this.nidNosaziCode
      // } : {
      //   pNidProc: this.selectedRequest.NidProc,
      //   pNidNosaziCode: "00000000-0000-0000-0000-000000000000"
      // }
      let payLoad = {
        pNidProc: "00000000-0000-0000-0000-000000000000", // این مقدار باید به همینصورت باشد طبق توضیح بالا
        pNidNosaziCode: this.nidNosaziCode
      }

      try {
        const { data } = await this.$services.SC.getSMSNumber(payLoad, this.config)
        this.getSmsNumberValue = this.getResponse(data).data
        if (this.getSmsNumberValue.NumbersList.length === 0) {
          this.showError('شماره ای برای ارسال پیامک موجود نمی باشد')
          return
        }

        const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
        await this.log({
          action: this.logActions.view,
          bizCode: NosaziCode,
          bizCodeTitle: 'NosaziCode',
          saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
        })
      } catch (e) {
        console.erroe(e)
        this.serverError()
      }
    },
    selectedChange (e) {
      this.selectedNumbers = e.selectedItems
    },
    async sendSms () {
      if (this.getSmsNumberValue.NumbersList.length === 0) {
        this.showError('شماره ای برای ارسال پیامک موجود نمی باشد')
        return
      } else if (this.selectedNumbers.length === 0) {
        this.showError('لطفا یک شماره برای ارسال پیامک انتخاب نمایید.')
        return
      } else {
        this.allNumberStr = this.selectedNumbers
          .map((x) => x.PhoneNumber)
          .join('#')
      }
      if (this.smsText === '') {
        this.showError('لظفا متن پیام را وارد کنید.')
        return
      }

      try {
        this.showLoading()
        let payLoad = {
          pParameter: {
            AppName: 'Sara10',
            BizCode: this.convertToNosaziCodeString(this.baseNosaziCode),
            Number: this.allNumberStr,
            SMSType: 'ارسال پیامک از منو',
            ScheduleSendDate: new PersianDate().toLocale('en').format('L'),
            Text: this.smsText,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad, this.config)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess('پیامک با موفقیت ارسال شد.')

        const NosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
        await this.log({
          action: this.logActions.view,
          bizCode: NosaziCode,
          bizCodeTitle: 'NosaziCode'
        })
      } catch (error) {
        console.log('save error...', error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
