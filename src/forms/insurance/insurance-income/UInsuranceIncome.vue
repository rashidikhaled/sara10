<template>
  <safa-form
    :id="formKey"
    appId="ae980dcf-08ef-4ff0-be47-30e18a8dcb6e"
    caption="گردش کار - بیمه درآمد"
  >
    <form-wrapper :title="title">
      <safa-status :result="saveResult"/>
      <safa-status :result="saveBayganiResult"/>
      <safa-status :result="loadRes"/>
      <fit>
        <FormRow :lg="3" :md="2" :sm="1" :xl="4" class="q-mb-sm">
          <Form-Control>
            <safa-combo
              v-model="insuranceState"
              :options="insuranceStateOptions"
              label="مرحله درخواست"
              label-width="80px"
              source-type="local"
            />
          </Form-Control>
          <Form-Control>
            <safa-text
              v-model="model.insurance.WorkFlowCode"
              label="کد درخواست"
              label-width="80px"
              @keyup.enter="loadData"
            />
          </Form-Control>
          <Form-Control>
            <safa-datepicker
              v-model="model.insurance.CreateDate"
              label="از تاریخ"
              label-width="80px"
            />
          </Form-Control>
          <Form-Control>
            <safa-datepicker
              v-model="model.insurance.Todate"
              label="تا تاریخ"
              label-width="80px"
            />
          </Form-Control>
          <Form-Control>
            <safa-text
              v-model="model.insurance.WorkshopCode"
              label="کد کارگاه"
              label-width="80px"
              @keyup.enter="loadData"
            />
          </Form-Control>
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="80px"
            @enter="loadData"
          />
          <div class="flex justify-end q-gutter-sm items-center">
            <btn-search @click="loadData"/>
            <btn-delete label="پاک کردن" @click="reset"/>
            <btn-default label="بازآوری" @click="loadData"/>
          </div>
        </FormRow>
        <div class="flex items-center">
          <safa-stepper
            v-model="step"
            :steps="insuranceStateOptions"
            class="q-mb-sm"
          />
          <div class="flex items-center q-ml-xs q-mb-sm">
            <btn-save
              v-if="selectedRow && selectedRow.EumIncomeInsuranceState === 0"
              label="نامه بیمه"
              spCaption="بیمه- نامه بیمه"
              spId="42442a23-7fe4-4168-a0e4-0509a23447b0"
              @click="editInsurranceInfo"
            />

            <btn-save
              v-if="selectedRow && selectedRow.EumIncomeInsuranceState === 1"
              label="صدور شناسه پرداخت"
              spCaption="بیمه-صدور شناسه پرداخت"
              spId="ae7b9149-64a3-426d-adc7-19fb5d2bb5dc"
              @click="sodorHandler"
            />

            <btn-save
              v-if="selectedRow && selectedRow.EumIncomeInsuranceState === 2"
              label="تایید اولیه پرداخت"
              spCaption="بیمه-تایید اولیه پرداخت"
              spId="30706600-3f07-45cc-806e-33c532fa4ce4"
              @click="firstConfirmHandler"
            />

            <btn-save
              v-if="selectedRow && selectedRow.EumIncomeInsuranceState === 3"
              label="تایید نهایی پرداخت"
              spCaption="بیمه-تایید نهایی"
              spId="7cd0079c-fb22-480b-bee5-82318a58e7bf"
              @click="finalConfirmePayment"
            />
          </div>
        </div>
        <safa-datatable
          v-model="allInsuranceList"
          :addRow="false"
          :allowCopy="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :paginate="true"
          :show-selected-checkbox="false"
          fit
          height="100%"
          helper="allInsuranceList"
          m="r"
          maxHeight="100%"
          minHeight="100px"
          title="کارتابل بیمه درآمد"
          @selectedChange="selectedChange"
        />
      </fit>
      <template #footer>
        <form-actions :showEditButton="false" m="r">
          <btn-default
            v-if="selectedRow"
            label="گزارشات"
            spCaption="بیمه-دکمه گزارشات"
            spId="1ca7ae40-a8d4-47d8-9b56-282e2d79d8ba"
            @click="iSShowReports = true"
          />

          <btn-default
            label="برگشت به مرحله قبل"
            spCaption="بیمه-برگشت به مرحله قبلی"
            spId="7f0488ef-9b9c-417b-99fd-9b7dfb74aab3"
            @click="BackPreviousState"
          />

          <btn-default
            label="ابطال درخواست"
            spCaption="بیمه-ابطال درخواست"
            spId="80a1e41f-3ec1-4300-8bcc-7016613d8a97"
            @click="RevokeRequest"
          />

          <btn-default
            label="حذف درخواست از بیمه"
            spCaption="بیمه-حذف درخواست از بیمه"
            spId="005ea1cc-ef6a-4ebd-99af-145547983e14"
            @click="deleteInsurance"
          />
        </form-actions>
      </template>
      <safa-popup
        v-model="isEditInsuranceData"
        height="400px"
        title="تغییر یا تخصیص اطلاعات فیش"
        width="600px"
      >
        <EditInsuranceData
          v-model="loadInsuranceResult"
          @saveInsuranceIncome="saveInsuranceIncome"
          @iSShowReports="iSShowReports = true"
        />
      </safa-popup>

      <safa-popup
        v-model="isRevokeRequest"
        height="300px"
        title="علت ابطال درخواست بیمه"
        width="600px"
      >
        <form-wrapper title="علت ابطال درخواست بیمه">
          <RevokeReason
            :RevokeModel="RevokeModel"
            :formKey="formKey"
            :model="loadInsuranceResult"
            :name="name"
            :title="title"
          />
          <template v-slot:footer>
            <FormActions :m="mode" :showEditButton="false">
              <template v-slot:after>
                <btn-default label="تایید" @click="saveRevoke"/>
                <btn-default label="انصراف" @click="backToMainForm"/>
              </template>
            </FormActions>
          </template>
        </form-wrapper>
      </safa-popup>

      <safa-popup
        v-model="sodorModal"
        height="400px"
        title="تایید اولیه فیش"
        width="400px"
      >
        <form-wrapper :padding="false" title="تایید اولیه فیش">
          <FirstConfirmePayment
            :m="mode"
            :model="loadInsuranceResult"
            isSodorModal
            @hide="hideSodorModal"
          />
          <template v-slot:footer>
            <FormActions
              :m="mode"
              @cancel="isEditable = false"
              @edit="isEditable = true"
              @save="saveInsuranceIncome"
            >
              <template v-slot:after>
                <btn-default label="گزارشات" @click="iSShowReports = true"/>
              </template>
            </FormActions>
          </template>
        </form-wrapper>
      </safa-popup>

      <safa-popup
        v-model="firstConfirmModal"
        height="400px"
        title="تایید اولیه پرداخت"
        width="400px"
      >
        <form-wrapper :padding="false" title="تایید اولیه پرداخت">
          <FirstConfirmePayment :m="mode" :model="loadInsuranceResult"/>
          <template v-slot:footer>
            <FormActions :showEditButton="false">
              <template v-slot:after>
                <btn-default label="تایید" @click="saveInsuranceIncome"/>
                <btn-cancel label="انصراف" @click="firstConfirmModal = false"/>
                <btn-default label="گزارشات" @click="iSShowReports = true"/>
              </template>
            </FormActions>
          </template>
        </form-wrapper>
      </safa-popup>

      <safa-popup
        v-model="iSShowReports"
        height="240px"
        title="گزارشات بیمه"
        width="240px"
      >
        <div class="q-pa-md flex items-center">
          <div class="row q-mb-sm">
            <btn-default
              label="گزارش نامه بیمه"
              style="width: 200px"
              @click="InsuraceLetterReport"
            />
          </div>
          <div class="row q-mb-sm">
            <btn-default
              label="گزارش ریز محاسبات"
              style="width: 200px"
              @click="TinyCalculateReport"
            />
          </div>
          <div
            v-if="selectedRow && selectedRow.EumIncomeInsuranceState !== 0"
            class="row q-mb-sm"
          >
            <btn-default
              label="گزارش مفاصا"
              style="width: 200px"
              @click="MafasaBimehReport"
            />
          </div>
          <div
            v-if="selectedRow && selectedRow.EumIncomeInsuranceState !== 0"
            class="row q-mb-sm"
          >
            <btn-default
              label="گزارش برگ پرداخت حق بیمه"
              style="width: 200px"
              @click="PremiumPagePaymentReport"
            />
          </div>
        </div>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
const defaultModel = {
  WorkshopCode: '',
  CreateDate: '',
  WorkFlowCode: '',
  Todate: ''
}

import baseFormMixin from 'src/mixins/baseFormMixin'
import PersianDate from 'persian-date'
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import EditInsuranceData from './partials/EditInsuranceData'
import FirstConfirmePayment from './partials/FirstConfirmePayment'
import RevokeReason from './partials/RevokeReason'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'بیمه درآمد',
      // formKey: "75d42712-be17-45c1-9e32-e3738014a868",
      formKey: '637f1c59-e379-4a83-8445-cca303ae9ad9',
      name: 'UInsuranceIncome',
      main: true,
      expansionState: true,
      insuranceState: null,
      step: -1,
      insuranceStateOptions: [
        {
          ID: 0,
          Title: 'نامه بیمه'
        },
        {
          ID: 1,
          Title: 'صدور شناسنامه پرداخت'
        },
        {
          ID: 2,
          Title: 'تایید اولیه پرداخت'
        },
        {
          ID: 3,
          Title: 'تایید نهایی پرداخت'
        }
      ],
      allInsuranceList: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        insurance: { ...defaultModel }
      },
      loadRes: null,
      selectedRow: {
        EumIncomeInsuranceState: null
      },
      isEditInsuranceData: false,
      NidInsurance: '00000000-0000-0000-0000-000000000000',
      loadInsuranceResult: {
        AvzSum: 0,
        ShahrdariLetterNo: '',
        WorkshopCode: '',
        DebtNo: '',
        PaymentPageNo: '',
        InsuranceDebtMablagh: '',
        OtherBankPaymentID: '',
        MellatBankPaymentID: '',
        PaymentPageExportDate: ''
      },
      StartDate: '',
      StartTime: '',
      Niduser: '00000000-0000-0000-0000-000000000000',
      UsernameSender: '',
      EumIncomeInsuranceState: {
        InsuraceLetter: 0,
        PaymentID: 1,
        ConfimeFirst: 2,
        ConfimeFinal: 3,
        Baygani: 4,
        IsDeleted: 5
      },
      isRevokeRequest: false,
      RevokeModel: {
        Description: '',
        revokeReasons: 0
      },
      saveBayganiResult: null,
      sodorModal: false,
      firstConfirmModal: false,
      saveResult: null,
      InsuranceState: null,
      InsuranceStatus: null,
      iSShowReports: false
    }
  },
  components: {
    EditInsuranceData,
    FirstConfirmePayment,
    RevokeReason
  },
  mounted () {
    this.loadData()
  },
  methods: {
    hideSodorModal () {
      this.sodorModal = false
      this.loadData()
    },
    getDistricts () {
      if (this.currentUser.isSysAdmin) {
        return window.getConfigValue("InsuranceDistricts").map((x) => Number(x)) ?? [1, 2, 3]
      } else {
        let allowDomains = []
        if (this.currentUser.jobLocation?.allowDomains ?? false) {
          allowDomains = this.currentUser.jobLocation.allowDomains.split(",")
        } else if (this.currentUser.domain) {
          allowDomains = this.currentUser.domain
        } else {
          allowDomains = []
        }
        if (allowDomains.length > 0) {
          return allowDomains.map(x => Number(x)) ?? [1, 2, 3]
        } else {
          this.showError("برای کاربر منطقه ای تعریف نشده است.")
          return []
        }
      }
    },
    async loadData () {
      try {
        this.showLoading()
        this.allInsuranceList = []
        let NosaziCodeStr = convertNosaziCodeObjectToString(this.baseNosaziCode)
        let conditionStr = ''
        if (this.insuranceState === null) {
          let InsuranceState = `EumIncomeInsuranceState BETWEEN '0'AND '3 '`
          conditionStr += ' AND  ' + InsuranceState
        } else {
          conditionStr +=
          ' AND  ' + `EumIncomeInsuranceState = ${this.insuranceState}`
        }
        if (NosaziCodeStr !== '0-0-0-0-0-0-0') {
          NosaziCodeStr = `NosaziCodeStr = '${NosaziCodeStr}'`
          conditionStr += ' AND ' + NosaziCodeStr
        }
        if (this.model.insurance.WorkFlowCode !== '') {
          let WorkFlowCode = 'WorkFlowCode = ' + this.model.insurance.WorkFlowCode
          conditionStr += ' AND ' + WorkFlowCode
        } else {
          this.model.insurance.WorkFlowCode = ''
        }
        if (this.model.insurance.WorkshopCode !== '') {
          let WorkshopCode =
          'WorkshopCode = ' + `'${this.model.insurance.WorkshopCode}'`
          conditionStr += ' AND  ' + WorkshopCode
        } else {
          this.model.insurance.WorkshopCode = ''
        }
        if (this.model.insurance.CreateDate !== '') {
          let CreateDate = `CreateDate BETWEEN '${this.model.insurance.CreateDate}' AND '${this.model.insurance.Todate}'`
          conditionStr += '  AND  ' + CreateDate
        } else {
          this.model.insurance.CreateDate = ''
        }
        const insuranceDistricts = this.getDistricts()
        // const insuranceDistricts = this.currentUser.JobLocation?.allowDomains
        const payload = {
          pFrom: 0,
          pTo: 50,
          pWhereCondition:
                  `Where substring(NosaziCodeStr, 0, charindex('-', NosaziCodeStr)) in (${insuranceDistricts}) ` +
          conditionStr
        }
        const { data } = await this.$services.SQ.getAllInsurance(payload)
        this.loadRes = this.getResponse(data)
        if (this.loadRes.success) {
          this.allInsuranceList = this.loadRes.data?.GetAllInsuranceList
          // this.firstConfirmModal = false;
          this.selectedRow = { EumIncomeInsuranceState: null }
          this.step = -1
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    selectedChange (e) {
      this.selectedRow = e.dataItem
      this.step = e.dataItem.EumIncomeInsuranceState
      this.NidInsurance = e.dataItem.NidInsuranceFiche
      this.StartDate = e.dataItem.CreateDate
      this.StartTime = e.dataItem.CreateTime
      this.Niduser = e.dataItem.CreateNidUser
      this.UsernameSender = e.dataItem.CreateUserName
      this.RevokeReason = e.dataItem.RevokeReason
    },
    editInsurranceInfo () {
      this.showConfirm('آیا تمایل به تغییر یا تخصیص اطلاعات فیش دارید؟').onOk(
        () => {
          this.isEditInsuranceData = true
          this.loadInsurance()
        }
      )
    },
    async reset () {
      this.model = { insurance: { ...defaultModel } }
      this.baseNosaziCode.District = 0
      this.baseNosaziCode.Region = 0
      this.baseNosaziCode.Block = 0
      this.baseNosaziCode.Building = 0
      this.baseNosaziCode.Apartment = 0
      this.baseNosaziCode.Shop = 0
      this.baseNosaziCode.House = 0
      this.insuranceState = null
      await this.loadData()
    },
    loadInsurance () {
      this.showLoading()
      this.$services.SQ.loadInsurance({ pNidInsurance: this.NidInsurance }, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.loadInsuranceResult = {
              AvzSum: 0,
              ShahrdariLetterNo: '',
              WorkshopCode: '',
              DebtNo: '',
              PaymentPageNo: '',
              InsuranceDebtMablagh: '',
              OtherBankPaymentID: '',
              MellatBankPaymentID: '',
              PaymentPageExportDate: ''
            }
            this.loadInsuranceResult = res.data.LoadInsuranceObj
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveInsuranceIncome () {
      if (!this.isValidForm('common')) return
      if (this.selectedRow && this.selectedRow.EumIncomeInsuranceState === 0) {
        this.InsuranceState = this.EumIncomeInsuranceState.PaymentID
      } else if (
        this.selectedRow &&
        this.selectedRow.EumIncomeInsuranceState === 1
      ) {
        this.InsuranceState = this.EumIncomeInsuranceState.ConfimeFirst
      } else if (
        this.selectedRow &&
        this.selectedRow.EumIncomeInsuranceState === 2
      ) {
        this.InsuranceState = this.EumIncomeInsuranceState.ConfimeFinal
      }
      this.showLoading()
      const payload = {
        pIncomeInsuranceObj: this.loadInsuranceResult,
        pEumIncomeInsurance: this.InsuranceState,
        pUser: this.currentUser
      }
      this.$services.SQ.saveInsuranceIncome(payload, this.config)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess('اطلاعات با موفقیت ذخیره و به مرحله بعد منتقل شد.')
            if (
              this.selectedRow &&
              this.selectedRow.EumIncomeInsuranceState === 0
            ) {
              this.sendSMS('Nameh')
            }
            this.loadData()
            this.isEditInsuranceData = false
            this.sodorModal = false
            this.firstConfirmModal = false
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async sendSMS (step) {
      try {
        const namehStep = `شهروند گرامی
          آقای/خانم ${this.loadInsuranceResult.Owner} قبض بیمه شما با اطلاعات زیر صادر گردیده است. ,
          مبلغ قابل پرداخت: ${this.loadInsuranceResult.InsuranceDebtMablagh} ریال ,
          شناسه پرداخت بانک ملت: ${this.loadInsuranceResult.MellatBankPaymentID} ,
          شناسه پرداخت سایر بانک ها: ${this.loadInsuranceResult.OtherBankPaymentID} ,
          کد نوسازی: ${this.loadInsuranceResult.NosaziCodeStr} ,
          شماره کارگاه: ${this.loadInsuranceResult.WorkshopCode} ,
          حداکثر مهلت پرداخت: ,
          *سیستم یکپارچه شهرسازی و درآمد*`
        // حداکثر مهلت پرداخت: ${this.loadInsuranceResult.Owner}

        const bayganiStep = `شهروند گرامی
          آقای/خانم ${this.loadInsuranceResult.Owner} پرداخت شما مورد تایید بیمه است.
          در صورت تمایل میتوانید جهت ادامه روند اداری به شهرداری مراجعه نمایید.
          کد نوسازی: ${this.loadInsuranceResult.NosaziCodeStr} ,
          *سیستم یکپارچه شهرسازی و درآمد*`

        const payLoad = {
          pParameter: {
            AppName: 'Sara10',
            BizCode: this.loadInsuranceResult.NosaziCodeStr || '',
            Number: this.loadInsuranceResult.TelOwner,
            SMSType: 'ارسال پیامک در بیمه',
            ScheduleSendDate: new PersianDate().toLocale('en').format('L'),
            Text: step === 'Nameh' ? namehStep : bayganiStep,
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        const res = this.getResponse(data)
        if (res.success) this.showSuccess('پیامک با موفقیت ارسال شد.')
      } catch (err) {
        this.serverError()
        console.log('err', err)
      }
    },

    BackPreviousState () {
      this.showConfirm(
        'آیا تمایل به برگشت این درخواست به مرحله قبل دارید؟'
      ).onOk(() => {
        this.changeStatusRequestInInsurance()
      })
    },
    deleteInsurance () {
      this.showConfirm('آیا تمایل به حذف کامل درخواست در بیمه را دارید؟').onOk(
        () => {
          this.deleteFromInsurance()
        }
      )
    },
    RevokeRequest () {
      this.showConfirm('آیا تمایل به ابطال درخواست در بیمه دارید؟').onOk(() => {
        this.isRevokeRequest = true
      })
    },
    changeStatusRequestInInsurance () {
      if (this.selectedRow && this.selectedRow.EumIncomeInsuranceState === 1) {
        this.InsuranceStatus = this.EumIncomeInsuranceState.InsuraceLetter
      } else if (
        this.selectedRow &&
        this.selectedRow.EumIncomeInsuranceState === 2
      ) {
        this.InsuranceStatus = this.EumIncomeInsuranceState.PaymentID
      } else if (
        this.selectedRow &&
        this.selectedRow.EumIncomeInsuranceState === 3
      ) {
        this.InsuranceStatus = this.EumIncomeInsuranceState.ConfimeFirst
      }
      this.showLoading()
      const payload = {
        pNidInsurance: this.NidInsurance,
        pInsuranceStatus: this.InsuranceStatus,
        pStartDate: this.StartDate,
        pStartTime: this.StartTime,
        pNiduser: this.Niduser,
        pUsernameSender: this.UsernameSender
      }
      this.$services.SQ.changeStatusRequestInInsurance(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('اطلاعات با موفقیت ذخیره شد.')
            this.loadData()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    deleteFromInsurance () {
      this.showLoading()
      const payload = {
        pNidInsurance: this.NidInsurance
      }
      this.$services.SQ.deleteFromInsurance(payload, this.config)
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('حذف با موفقیت انجام شد.')
            this.loadData()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveBayganiAndRemoved (pEumIncomeInsurance) {
      this.showLoading()
      const payload = {
        pNidInsurance: this.NidInsurance,
        pEumIncomeInsurance: pEumIncomeInsurance,
        RevokeReason: this.RevokeModel.Description,
        CI_InsuranceRevokeReason: this.RevokeModel.revokeReasons,
        UserInfo: this.currentUser
      }
      this.$services.SQ.saveBayganiAndRemoved(payload, this.config)
        .then(({ data }) => {
          this.saveBayganiResult = this.getResponse(data)
          if (this.saveBayganiResult.success) {
            this.showSuccess('با موفقیت انجام شد.')
            this.loadData()
            this.backToMainForm()
          }
        })
        .catch((err) => {
          console.log(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    backToMainForm () {
      this.isRevokeRequest = false
    },
    sodorHandler () {
      if (this.selectedRow && this.selectedRow.EumIncomeInsuranceState === 1) {
        this.showConfirm('آیا تمایل به تایید اولیه پرداخت دارید؟').onOk(() => {
          this.isEditable = false
          this.sodorModal = true
          this.loadInsurance()
        })
      } else {
        this.sodorModal = false
        this.loadInsurance()
      }
    },
    firstConfirmHandler () {
      if (this.selectedRow && this.selectedRow.EumIncomeInsuranceState === 2) {
        this.firstConfirmModal = true
        this.loadInsurance()
      }
    },
    finalConfirmePayment () {
      this.showConfirm('آیا از تایید نهایی پرداخت مطمئن هستید؟').onOk(
        async () => {
          await this.saveBayganiAndRemoved(this.EumIncomeInsuranceState.Baygani)
          await this.sendSMS('Baygani')
        }
      )
    },
    saveRevoke () {
      this.saveBayganiAndRemoved(this.EumIncomeInsuranceState.IsDeleted)
    },
    async InsuraceLetterReport () {
      const reportPath =
        '/Sara8Reports/RptBimeTaminEjtemaei'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRow.NidProc,
        TokenKey: 'HTTP/1.1',
        District: convertStringToNosaziCodeObject(
          this.selectedRow.NosaziCodeStr
        ).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptBimeTaminEjtemaei',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRow.NosaziCodeStr
      })
    },
    async TinyCalculateReport () {
      const reportPath =
        '/Sara8Reports/RptTinyCalculate'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRow.NidProc,
        TokenKey: 'HTTP/1.1',
        District: convertStringToNosaziCodeObject(
          this.selectedRow.NosaziCodeStr
        ).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptTinyCalculate',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRow.NosaziCodeStr
      })
    },
    async MafasaBimehReport () {
      const reportPath =
        '/Sara8Reports/MafasaBimeh'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRow.NidProc,
        TokenKey: 'HTTP/1.1',
        District: convertStringToNosaziCodeObject(
          this.selectedRow.NosaziCodeStr
        ).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'MafasaBimeh',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRow.NosaziCodeStr
      })
    },
    async PremiumPagePaymentReport () {
      const reportPath =
        '/Sara8Reports/RptPremiumPagePayment'
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRow.NidProc,
        TokenKey: 'HTTP/1.1',
        District: convertStringToNosaziCodeObject(
          this.selectedRow.NosaziCodeStr
        ).District
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: 'RptPremiumPagePayment',
        bizCodeTitle: 'گزارش',
        nosaziCode: this.selectedRow.NosaziCodeStr
      })
    }
  },
  watch: {
    async insuranceState () {
      await this.loadData()
    }
  },
  computed: {
    config () {
      return {
        config: {
          District:
            convertStringToNosaziCodeObject(this.selectedRow.NosaziCodeStr)
              .District || 1
        }
      }
    }
  }
}
</script>
