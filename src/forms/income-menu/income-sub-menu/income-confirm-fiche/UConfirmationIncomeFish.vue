<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
    <form-wrapper title="فرم تایید فیش درآمد">
      <safa-status :result="confirmResult"/>
      <safa-status :result="incomeFicheResult"/>
      <safa-status :result="showConfirmResult"/>
      <safa-status :result="permanentExportResult"/>
      <internal-section class="q-mb-md">
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm q-mb-sm">
          <safa-combo
            source-type="local"
            :options="districts"
            label="منطقه"
            v-model="selectedRegion"
            cdcName="selectedRegion"
            label-width="80px"
            :use-input="false"
            class="col-12 col-sm-4 col-md-3"
          />

          <safa-text
            label="شماره فیش"
            v-model="ficheNumber"
            cdcName="ficheNumber"
            :label-shrink="false"
            @keyup.enter="searchByFicheNo"
            label-width="80px"
            class="col-12 col-sm-4 col-md-3"
            dir="ltr"
          />

          <div class="col-12 col-sm-auto col-md-4">
            <btn-search
              label="جستجو"
              @click="searchByFicheNo"
            />
          </div>
        </div>
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm q-mb-sm">
          <safa-text
            label="شناسه قبض"
            v-model="billId"
            cdcName="billId"
            :label-shrink="false"
            label-width="80px"
            class="col-12 col-sm-4 col-md-3"
            dir="ltr"
          />
          <safa-text
            label="شناسه پرداخت"
            v-model="paymentId"
            cdcName="paymentId"
            :label-shrink="false"
            @keyup.enter="searchByBillId"
            label-width="80px"
            class="col-12 col-sm-4 col-md-3"
            dir="ltr"
          />
          <div class="col-12 col-sm-auto col-md-4">
            <btn-search
              label="جستجو"
              @click="searchByBillId"
            />
          </div>
        </div>
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <safa-text
            label="نام مالک"
            v-model="ownerName"
            cdcName="ownerName"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-6"
          />
          <div class="col-12 col-sm-6 col-md-6">
            <nosazi-code-input v-model="baseNosaziCode"/>
          </div>
          <safa-text
            label="آدرس"
            v-model="address"
            cdcName="address"
            type="textarea"
            m="r"
            label-width="80px"
            class="col-12 col-sm-12 col-md-12"
          />
          <safa-text
            label="شماره درخواست"
            v-model="nidWorkItem"
            cdcName="nidWorkItem"
            m="r"
            label-width="80px"
            class="col-12 col-sm-4 col-md-4"
            dir="ltr"
          />
          <safa-datepicker
            label="تاریخ درخواست"
            v-model="requestDate"
            cdcName="requestDate"
            m="r"
            label-width="80px"
            class="col-12 col-sm-4 col-md-4"
          />
          <safa-text
            label="نوع درخواست"
            v-model="workFlowTitle"
            cdcName="workFlowTitle"
            m="r"
            label-width="80px"
            class="col-12 col-sm-4 col-md-4"
          />
        </div>
      </internal-section>

      <internal-section
        title="مشخصات فیش"
        class="q-mb-md"
      >
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <safa-combo
            ciName="CI_IncomeAccountGroup"
            domainName="CI_SaraM1"
            label="مالکیت حساب"
            v-model="incomeAccountGroup"
            cdcName="incomeAccountGroup"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-custom-text
            class="col-12 col-sm-6 col-md-4"
            :type="'money'"
            :m="'r'"
            label="قابل پرداخت"
            label-width="80px"
            v-model="payable"
            cdcName="payable"
          />
          <safa-custom-text
            :type="'money'"
            label="عوارض"
            v-model="incomeValue"
            cdcName="incomeValue"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="تقسیط"
            v-model="insatllmentValue"
            cdcName="insatllmentValue"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-custom-text
            :type="'decimal'"
            label="تخفیف"
            :m="'r'"
            v-model="discountValue"
            cdcName="discountValue"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-custom-text
            :type="'money'"
            label="بستانکاری"
            :m="'r'"
            v-model="oddmentValue"
            cdcName="oddmentValue"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
        </div>
      </internal-section>

      <internal-section title="مشخصات پرداخت">
        <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
          <!-- <safa-text
            label="نام بانک"
            v-model="paymentBank"
            cdcName="paymentBank"
            :m="m"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          /> -->
          <safa-combo
            label="نام بانک"
            v-model="paymentBank"
            cdcName="CI_Bank"
            ciName="CI_Bank"
            m="e"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="شعبه"
            v-model="paymentBranch"
            cdcName="paymentBranch"
            :m="m"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-datepicker
            label="تاریخ پرداخت"
            v-model="paymentDate"
            cdcName="paymentDate"
            :m="paymentDateMode"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="کد پیگیری"
            v-model="paymentRahgiriCode"
            cdcName="paymentRahgiriCode"
            :m="m"
            label-width="80px"
            dir="ltr"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="شماره ارجاع"
            v-model="paymentReferenceNo"
            cdcName="paymentReferenceNo"
            :m="m"
            label-width="80px"
            dir="ltr"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-combo
            ciName="CI_IncomeFicheConfirmType"
            domainName="CI_SaraM1"
            v-model="incomeFicheConfirmType"
            cdcName="incomeFicheConfirmType"
            label="روش تایید"
            :m="m"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <text-template
            type="textarea"
            formKey="47e11665-5b86-4e33-a0df-50b8b7e7cfe7"
            label="توضیحات"
            v-model="confirmTypeDetailes"
            cdcName="confirmTypeDetailes"
            :m="m"
            row="5"
            label-width="80px"
            class="col-12 col-sm-12 col-md-12"
          />
        </div>
      </internal-section>

      <internal-section
        title="مشخصات چک"
        class="q-mt-md"
      >
        <div class="row q-col-gutter-lg items-end">
          <safa-text
            label="شماره چک بانکی"
            v-model="checkNo"
            cdcName="checkNo"
            m="r"
            label-width="80px"
            dir="ltr"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="نام بانک چک"
            v-model="bankCheckName"
            cdcName="bankCheckName"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
          <safa-text
            label="شعبه چک"
            v-model="bankBranchCheckName"
            cdcName="bankBranchCheckName"
            m="r"
            label-width="80px"
            class="col-12 col-sm-6 col-md-4"
          />
        </div>
      </internal-section>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default
            label="تأیید با Pose"
            @click="isShowConfirmModal = true"
            :disable="disableConfirmBtm"
            spId="2204c389-30ef-4802-b4ad-4d000cb010df"
            spCaption="تایید با پوز"
          />
          <btn-default
            label="تأیید فیش"
            v-if="isShowConfirm"
            @click="confirmFiche(false)"
            spId="ad6b9639-a6d4-49e3-96cf-c34aca73fc8a"
            spCaption="تایید فیش"
          />
          <btn-default
            label="ابطال فیش"
            v-if="isShowRevoke"
            @click="revokeFiche"
            spId="5b38e403-eb79-4357-90ab-b3704f9e55c6"
            spCaption="ابطال فیش"
          />
          <btn-default
            v-if="isShow"
            label="تاریخچه پوز"
            @click="isShowHistoryModal = true"
          ></btn-default>
          <btn-default
            label="تغییر وضعیت"
            spId="34def2c6-47c4-450f-9563-83140adc0035"
            spCaption="تغییر وضعیت"
            @click="changeStatus()"
            v-if="isShowChangeStatus"
          />
        </div>
      </template>
    </form-wrapper>
    <ShowModal
      v-model="isShowHistoryModal"
      title="تاریخچه ی  پرداخت با پوز"
    >
      <PosePaymentHistory
        :nidFiche="nidFiche"
        :title="title"
        :formKey="formKey"
        :main="main"
      />
    </ShowModal>
    <ShowModal
      v-model="isShowConfirmModal"
      title="انتخاب کردن پوز"
      :height="500"
      :width="900"
    >
      <ConfirmByPose
        :nidFiche="nidFiche"
        :ficheNumber="ficheNumber"
        @reload="reload"
        :title="title"
        :formKey="formKey"
        :main="main"
      />
    </ShowModal>
  </safa-form>
</template>

<script>
import PosePaymentHistory from './partials/PosePaymentHistory.vue'
import ConfirmByPose from './partials/ConfirmByPose.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'
// import PersianDate from 'persian-date'
// import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/income/confirmation-income-fish',

  mixins: [baseFormMixin],

  data () {
    return {
      name: 'UConfirmationIncomeFish',
      title: 'فرم تایید فیش درآمد',
      formKey: '4997583a-4c9f-491e-bc27-ffa7f4d67c79',
      main: true,
      sidebarCompatible: true,
      showConfirmResult: null,
      permanentExportResult: null,
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1,
      ficheNumber: '',
      billId: '',
      paymentId: '',
      incomeFicheResult: null,
      incomeFicheResults: { Income: {}, Fiche: { Income_Fiche: [] } },
      incomeAccountGroup: '',
      payable: '',
      incomeValue: '',
      insatllmentValue: '',
      discountValue: '',
      oddmentValue: '',
      paymentBank: '',
      paymentBranch: '',
      paymentDate: '',
      paymentRahgiriCode: '',
      paymentReferenceNo: '',
      incomeFicheConfirmType: 0,
      confirmTypeDetailes: '',
      checkNo: '',
      bankCheckName: '',
      bankBranchCheckName: '',
      bankFilePath: '',
      nidProc: '00000000-0000-0000-0000-000000000000',
      nidFiche: '00000000-0000-0000-0000-000000000000',
      ownerName: '',
      address: '',
      workFlowTitle: '',
      requestDate: '',
      nidWorkItem: '',
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {},
        MainObj: {}
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
      disableConfirmBtm: true,
      isShow: false,
      isShowConfirm: false,
      isShowRevoke: false,
      isShowHistoryModal: false,
      isShowConfirmModal: false,
      confirmResult: null,
      m: 'r',
      paymentInfoMode: 'e',
      paymentDateMode: 'r',
      isView: false,
      isShowChangeStatus: false
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  },
  components: { PosePaymentHistory, ConfirmByPose },
  mounted () {
  },
  methods: {
    loadRequestHeader () {
      // loadRequestHeader method
      this.ownerName = ''
      let self = this
      let data = {
        pNidProc: this.nidProc,
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.loadRequestHeader(data, {
        config: {
          District: this.selectedRegion
        }
      })
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
                this.ownerName = this.ownerName
              }
            }
            if (self.baseLibResults.Sh_RequestInfo !== null) {
              this.nidWorkItem = self.baseLibResults.Sh_RequestInfo.NidWorkItem
              this.requestDate = self.baseLibResults.Sh_RequestInfo.RequestDate
              this.workFlowTitle =
                self.baseLibResults.Sh_RequestInfo.WorkflowTitel
              this.address = this.baseLibResults.Sh_RequestInfo.RequesterAddress
            }
            if (this.baseLibResults.MainObj !== null) {
              this.baseNosaziCode = {
                ...this.baseNosaziCode,
                District: this.baseLibResults.MainObj.District,
                Region: this.baseLibResults.MainObj.Region,
                Block: this.baseLibResults.MainObj.Block,
                House: this.baseLibResults.MainObj.House,
                Building: this.baseLibResults.MainObj.Building,
                Shop: this.baseLibResults.MainObj.Shop,
                Apartment: this.baseLibResults.MainObj.Apartment
              }
            }
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.nidProc,
                bizCodeTitle: 'NidProc'
              })
            }
            this.isView = true
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    getIncomeFicheFromFicheNo () {
      this.isShow = false
      this.isShowConfirm = false
      this.isShowRevoke = false
      this.m = 'e'
      this.showLoading()
      const payload = {
        pFicheNo: this.ficheNumber,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.SD.getIncomeFicheFromFicheNo(payload, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.incomeFicheResult = this.getResponse(data)

          if (this.incomeFicheResult.success) {
            this.incomeFicheResults = this.incomeFicheResult.data
            if (this.incomeFicheResults.Income !== null) {
              this.nidProc = this.incomeFicheResults.Income ? this.incomeFicheResults.Income.NidProc : '00000000-0000-0000-0000-000000000000'

              if (!this.isView) {
                await this.log({
                  action: this.logActions.view,
                  bizCode: this.nidProc,
                  bizCodeTitle: 'nidProc'
                })
              }
              this.isView = true
              if (this.incomeFicheResults.Fiche.Income_Fiche.length > 1) {
                this.showError('با این شماره بیش از یک فیش یافت شد.')
              } else if (
                this.incomeFicheResults.Fiche.Income_Fiche.length === 1
              ) {
                this.loadRequestHeader()
                const incomeFiche = this.incomeFicheResults.Fiche.Income_Fiche
                this.nidFiche = incomeFiche[0].NidFiche
                this.incomeAccountGroup = incomeFiche[0].CI_IncomeAccountGroup
                this.payable = incomeFiche[0].Payable
                this.incomeValue = incomeFiche[0].IncomeValue
                this.insatllmentValue = incomeFiche[0].InsatllmentValue
                this.discountValue = incomeFiche[0].DiscountValue
                this.oddmentValue = incomeFiche[0].OddmentValue
                this.paymentBank = incomeFiche[0].PaymentBank
                this.paymentBranch = incomeFiche[0].PaymentBranch
                this.paymentDate = incomeFiche[0].PaymentDate
                this.paymentRahgiriCode = incomeFiche[0].PaymentRahgiriCode
                this.paymentReferenceNo = incomeFiche[0].PaymentReferenceNo
                // this.incomeFicheConfirmType =
                //   incomeFiche[0].CI_IncomeFicheConfirmType
                this.showConfirmTypeDetailes =
                  incomeFiche[0].ConfirmTypeDetailes
                this.checkNo = incomeFiche[0].CheckNo
                this.bankCheckName = incomeFiche[0].BankCheckName
                this.bankBranchCheckName = incomeFiche[0].BankBranchCheckName
                this.billId = incomeFiche[0].BillID
                this.paymentId = incomeFiche[0].PaymentID
                this.bankFilePath = incomeFiche[0].BankFilePath
                if (incomeFiche[0].EumFicheStatus === 0) {
                  this.showError(
                    'فیش در وضعیت صدور موقت قرار دارد و نمی توان آن را تأیید کرد.'
                  )
                } else if (incomeFiche[0].EumFicheStatus === 1) {
                  this.showError(
                    'فیش در وضعیت صدور قطعی است و نمی توان آن را تأیید کرد.'
                  )
                } else if (incomeFiche[0].EumFicheStatus === 2) {
                  this.disableConfirmBtm = false
                  this.paymentDateMode = 'e'
                  this.m = 'e'
                  this.isShow = true
                  this.isShowConfirm = true
                } else if (incomeFiche[0].EumFicheStatus === 3) {
                  this.disableConfirmBtm = false
                  this.paymentDateMode = 'r'
                  this.m = 'r'
                  this.isShow = true
                  this.isShowRevoke = true
                } else if (incomeFiche[0].EumFicheStatus === 4) {
                  this.disableConfirmBtm = false
                  this.paymentDateMode = 'e'
                  this.m = 'e'
                  this.isShow = true
                  this.isShowConfirm = true
                } else {
                  this.showError(
                    'برای تأیید، فیش باید در وضعیت ابطال  شده یا چاپ شده باشد.'
                  )
                }
                if (
                  this.incomeFicheResults.Fiche.Income_Fiche[0]
                    .EumFicheStatus === 5 ||
                  this.incomeFicheResults.Fiche.Income_Fiche[0]
                    .EumFicheStatus === 3
                ) {
                  this.isShowChangeStatus = true
                }
              } else {
                this.showError('فیشی با این شماره یافت نشد.')
              }
            } else {
              this.showError('فیشی با این شماره یافت نشد.')
            }
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    searchByFicheNo () {
      this.getIncomeFicheFromFicheNo()
    },
    getIncomeFicheFromBillID () {
      this.showLoading()
      this.isShow = false
      this.isShowConfirm = false
      this.isShowRevoke = false
      this.m = 'e'
      let data = {
        pBillID: this.billId,
        pPaymentID: this.paymentId
      }
      this.$services.SD.getIncomeFicheFromBillID(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(({ data }) => {
          this.incomeFicheResult = this.getResponse(data)

          if (this.incomeFicheResult.success) {
            this.incomeFicheResults = this.incomeFicheResult.data
            this.nidProc = this.incomeFicheResults.Income ? this.incomeFicheResults.Income.NidProc : '00000000-0000-0000-0000-000000000000'
            if (this.incomeFicheResults.Fiche.Income_Fiche.length > 1) {
              this.showError('با این شماره بیش از یک فیش یافت شد.')
            } else if (
              this.incomeFicheResults.Fiche.Income_Fiche.length === 1
            ) {
              this.loadRequestHeader()
              this.nidFiche = this.incomeFicheResults.Fiche.Income_Fiche[0].NidFiche
              this.incomeAccountGroup = this.incomeFicheResults.Fiche.Income_Fiche[0].CI_IncomeAccountGroup
              this.payable = this.incomeFicheResults.Fiche.Income_Fiche[0].Payable
              this.incomeValue = this.incomeFicheResults.Fiche.Income_Fiche[0].IncomeValue
              this.insatllmentValue = this.incomeFicheResults.Fiche.Income_Fiche[0].InsatllmentValue
              this.discountValue = this.incomeFicheResults.Fiche.Income_Fiche[0].DiscountValue
              this.oddmentValue = this.incomeFicheResults.Fiche.Income_Fiche[0].OddmentValue
              this.paymentBank = this.incomeFicheResults.Fiche.Income_Fiche[0].PaymentBank
              this.paymentBranch = this.incomeFicheResults.Fiche.Income_Fiche[0].PaymentBranch
              // this.paymentDate = this.incomeFicheResults.Fiche.Income_Fiche[0].PaymentDate
              this.paymentRahgiriCode = this.incomeFicheResults.Fiche.Income_Fiche[0].PaymentRahgiriCode
              this.paymentReferenceNo = this.incomeFicheResults.Fiche.Income_Fiche[0].PaymentReferenceNo
              // this.incomeFicheConfirmType = this.incomeFicheResults.Fiche.Income_Fiche[0].CI_IncomeFicheConfirmType
              this.showConfirmTypeDetailes = this.incomeFicheResults.Fiche.Income_Fiche[0].ConfirmTypeDetailes
              this.checkNo = this.incomeFicheResults.Fiche.Income_Fiche[0].CheckNo
              this.bankCheckName = this.incomeFicheResults.Fiche.Income_Fiche[0].BankCheckName
              this.bankBranchCheckName = this.incomeFicheResults.Fiche.Income_Fiche[0].BankBranchCheckName
              this.ficheNumber = this.incomeFicheResults.Fiche.Income_Fiche[0].FicheNo
              this.bankFilePath = this.incomeFicheResults.Fiche.Income_Fiche[0].BankFilePath
              if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                0
              ) {
                this.showError(
                  'فیش در وضعیت صدور موقت قرار دارد و نمی توان آن را تأیید کرد.'
                )
              } else if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                1
              ) {
                this.showError(
                  'فیش در وضعیت صدور قطعی است و نمی توان آن را تأیید کرد.'
                )
              } else if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                2
              ) {
                this.disableConfirmBtm = false
                this.paymentDateMode = 'e'
                this.m = 'e'
                this.isShow = true
                this.isShowConfirm = true
              } else if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                3
              ) {
                this.disableConfirmBtm = false
                this.isShow = true
                this.isShowRevoke = true
                this.paymentDateMode = 'r'
                this.m = 'r'
              } else if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                4
              ) {
                this.disableConfirmBtm = false
                this.isShow = true
                this.isShowConfirm = true
                this.paymentDateMode = 'e'
                this.m = 'e'
              } else {
                this.showError(
                  'برای تأیید، فیش باید در وضعیت ابطال  شده یا چاپ شده باشد.'
                )
              }
              if (
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                5 ||
                this.incomeFicheResults.Fiche.Income_Fiche[0].EumFicheStatus ===
                3
              ) {
                this.isShowChangeStatus = true
              }
            } else {
              this.showError('فیشی با این شماره یافت نشد.')
            }
          }
        })
        .catch(response => {
          this.serverError()
          console.log('response', response)
        })
        .finally(() => {
          this.hideSending()
        })
    },
    searchByBillId () {
      if (this.billId === '' || this.paymentId === '') {
        this.showError('لطفا شناسه قبض و شناسه پرداخت را وارد کنید.')
      } else {
        this.getIncomeFicheFromBillID()
      }
    },
    reload () {
      this.isShowConfirmModal = false
    },
    ficheConfirm (ChangeOwnerValue) {
      this.showLoading()
      let data = {
        pDto: {
          BankFilePath: this.bankFilePath,
          CI_IncomeFicheConfirmType: this.incomeFicheConfirmType,
          ConfirmTypeDetailes: this.showConfirmTypeDetailes,
          EumFicheConfirmMethode: 1,
          EumIncomePaymentType: 1,
          NidFiche: this.nidFiche,
          NidUser: this.getNidUser(),
          PaymentBank: this.paymentBank,
          PaymentBranch: this.paymentBranch,
          PaymentDate: this.paymentDate,
          PaymentRahgiriCode: this.paymentRahgiriCode,
          PaymentReferenceNo: this.paymentReferenceNo,
          UserName: this.getUserDisplayName(),
          ChangeOwner: ChangeOwnerValue
        }
      }
      this.$services.SD.ficheConfirm(data, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.showConfirmResult = this.getResponse(data)
          if (this.showConfirmResult.success) {
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.nidProc,
              bizCodeTitle: 'nidProc'
            })
            this.isView = true
            this.isShowConfirm = false
            this.isShowRevoke = true
            this.paymentDateMode = 'r'
            this.m = 'r'
            this.showSuccess('تأیید فیش با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    confirmFiche (ChangeOwnerValue) {
      this.showConfirm('آیا از تأیید فیش  اطمینان دارید؟').onOk(() => {
        this.ficheConfirm(ChangeOwnerValue)
      })
    },
    revokeFiche () {
      this.showConfirm('آیا از ابطال فیش اطمینان دارید؟').onOk(() => {
        let data = {
          pNidFiche: this.nidFiche,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.$services.SD.ficheRevoke(data, {
          config: {
            District: this.selectedRegion
          }
        })
          .then(async ({ data }) => {
            this.permanentExportResult = this.getResponse(data)
            // if (this.showConfirmResult.success) {
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.nidProc,
              bizCodeTitle: 'nidProc'
            })
            this.isShowRevoke = false
            this.isShowConfirm = true
            this.showSuccess('ابطال فیش با موفقیت انجام شد.')
            // }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      })
    },
    changeStatus () {
      this.showLoading()
      let payLoad = {
        nidFiche: this.nidFiche,
        pUser: {
          UserGuid: this.getNidUser(),
          UserName: this.UserName
        }
      }
      this.$services.SD.changeFicheOwner(payLoad, {
        config: {
          District: this.selectedRegion
        }
      })
        .then(async ({ data }) => {
          this.showConfirmResult = this.getResponse(data)
          if (this.showConfirmResult.success) {
            await this.log({
              action: this.logActions.confirm,
              bizCode: this.nidFiche,
              bizCodeTitle: 'nidFiche'
            })

            this.showSuccess('تغییر وضعیت فیش با موفقیت انجام شد.')
          }
        })
        .catch(response => {
          this.serverError()
          console.error('error', response)
        })
        .finally(() => {
          this.hideSending()
        })
    }
  }
}
</script>
