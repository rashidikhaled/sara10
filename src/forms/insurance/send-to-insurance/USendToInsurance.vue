<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="ae980dcf-08ef-4ff0-be47-30e18a8dcb6e"
  >
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="requestResult"/>
      <safa-status :result="result"/>
      <safa-status :result="submitResult"/>
    </template>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzFoundationResidental"
          label="عوارض زیر بنای مسکونی(اعم از مسکونی، اداری،صنعتی)"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzPostulate"
          label="عوارض پذیره تجاری هتلها،گردشگری و مسافرخانه "
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzFoundation"
          label="عوارض زیربنا (آموزشی، ورزشی،فرهنگی،هنری،بهداشتی،درمانی)"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzFoundationBase"
          label="عوارض مربوط به زیر بنای پایه، تراکم پایه، ترکم مجاز و مازاد بر تراکم"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzFront"
          label="عوارض پیشامدگی و بالکن"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzAddtionHieght"
          label="عوارض اضافه ارتفاع بنا"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <FormRow class="q-mb-sm">
      <Form-Control>
        <safa-text
          v-model="formModel.GetConfirmeAvz.AvzSum"
          label="جمع کل"
          label-width="300px"
          m="r"
        />
      </Form-Control>
    </FormRow>
    <template #footer>
      <form-actions :showEditButton="false" m="r">
        <btn-save :disable="lockConformBtn" label="تایید" @click="confirm"/>
        <btn-default label="انصراف" @click="cancel"/>
      </form-actions>
    </template>
    <safa-popup
      v-model="showConfirmDialog"
      :closable="false"
      :maximizeButton="false"
      :minimizeButton="false"
      :resizable="false"
      height="300px"
      width="300px"
    >
      <ConfirmSend
        :RequestSecResult="RequestSecResult"
        @cancel="cancel"
        @hide="showConfirmDialog = false"
        @submit="sendToInsurance"
      />
    </safa-popup>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import ConfirmSend from './partials/ConfirmSend'
import PersianDate from 'persian-date'
import { currentTime } from 'src/utils/index'

export default {
  mixins: [baseFormMixin],
  components: { ConfirmSend },

  data () {
    return {
      title: 'ارسال به بیمه',
      formKey: '9a0639df-95e0-466e-8a84-5f7a925185dc',
      name: 'USendToInsurance',
      main: true,

      // lockConformBtn: true,
      lockConformBtn: false,
      showConfirmDialog: false,
      requestResult: null,
      submitResult: null,
      result: null,
      formModel: {
        GetConfirmeAvz: {
          AvzFoundationResidental: 0,
          AvzPostulate: 0,
          AvzFoundation: 0,
          AvzFoundationBase: 0,
          AvzFront: 0,
          AvzAddtionHieght: 0,
          AvzSum: 0,
          NidInsuranceFiche: '00000000-0000-0000-0000-000000000000',
          EumIncomeInsuranceState: null
        }
      },
      RequestSecResult: {}
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.$nextTick(async () => {
        await this.loadData()
      })
    } else {
      this.showError('لطفا یک ردیف از کارتابل انتخاب نمایید')
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    }
  },

  methods: {
    async loadData () {
      this.showConfirmDialog = false
      try {
        debugger
        this.showLoading()
        const payload = { pNidPrc: this.selectedRequest.NidProc }
        const { data } = await this.$services.SQ.loadConfirmeAvarez(
          payload,
          this.config
        )
        this.result = this.getResponse(data)
        if (this.result.shouldStop) {
          return this.hideSidebar(this.name)
        }
        this.formModel = this.result.data
        if (this.result.success) {
          // if (this.formModel.GetConfirmeAvz.EumIncomeInsuranceState === 0) { //https://trello.com/c/8SXxeUq2 چنین شرطی اصلا سمت سرا8 نیست کامنت شدن این مورد با آقای صفری هماهنگ شد تسک
          //   this.lockConformBtn = false
          // }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.BizCode,
            bizCodeTitle: 'bizCode'
          })
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async confirm () {
      try {
        this.showLoading()
        const payload = {
          pNidProce: this.selectedRequest.NidProc,
          pReportPath: '/Sara8Reports/RptBimeTaminEjtemaei'
        }
        const { data } = await this.$services.SQ.getRequestSec(
          payload,
          this.config
        )
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.showConfirmDialog = true
          this.RequestSecResult = this.requestResult.data
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async sendToInsurance ({ letterNumber, letterDate }) {
      try {
        this.showLoading()
        const payload = {
          pNidPrc: this.selectedRequest.NidProc,
          NidProc: this.selectedRequest.NidProc,
          pNidProc: this.selectedRequest.NidProc,
          pNidProce: this.selectedRequest.NidProc,
          pNidInsurance: this.formModel.GetConfirmeAvz.NidInsuranceFiche,
          pNosaziCode: this.selectedRequest.BizCode || '0-0-0-0-0-0-0',
          pUsernameSender: this.getUserDisplayName(),
          pWorkFlowCode: this.selectedRequest.NidWorkItem,
          pWorkFlowTitle: this.selectedRequest.WorkflowTitel,
          pStartDate: new PersianDate().toLocale('en').format('L'),
          pStartTime: currentTime(),
          pNiduser: this.getNidUser(),
          pLetterNo: letterNumber,
          pLetterdate: letterDate
        }
        const { data } = await this.$services.SQ.sendToInsuranceCartabl(
          payload,
          { config: { District: this.selectedDistrict } }
        )
        this.submitResult = this.getResponse(data)
        console.log(this.submitResult)
        if (this.submitResult.shouldStop) {
          await this.cancel()
        } else if (this.submitResult.success) {
          this.showSuccess('عملیات با موفقیت انجام شد.')
          this.showConfirmDialog = false
          this.hideSidebar('USendToInsurance')
        }
      } catch (response) {
        console.error(response)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async cancel () {
      this.showConfirmDialog = false
      if (
        this.formModel.GetConfirmeAvz &&
        this.formModel.GetConfirmeAvz.NidInsuranceFiche &&
        this.formModel.GetConfirmeAvz.NidInsuranceFiche !==
        '00000000-0000-0000-0000-000000000000'
      ) {
        try {
          this.showLoading()
          const { data } = await this.$services.SQ.deleteFromInsurance(
            { pNidInsurance: this.formModel.GetConfirmeAvz.NidInsuranceFiche },
            this.config
          )
          const res = this.getResponse(data)
          if (res.success) {
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: 'bizCode'
            })
            this.hideSidebar('USendToInsurance')
          }
        } catch (response) {
          console.error(response)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      } else {
        this.hideSidebar('USendToInsurance')
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedDistrict
        }
      }
    }
  }
}
</script>
