<template>
  <fit>
    <safa-status :result="saveResult" />
    <safa-status :result="installmentPerformanceResult" />
    <FormRow class="q-mb-sm">
          <FormControl>
      <safa-custom-text
        type="money"
        label="مبلغ فیش"
        class="col-md-2"
        m="r"
        v-model="installmentResults.PriceForInstallment"
        cdcName="PriceForInstallment"
        label-width="85px"
      />
    </FormControl>
    <FormControl>

      <safa-text
        label="تعداد قسط ها"
        :m="m"
        v-model="installmentResults.Installment.InstallmentCount"
        cdcName="InstallmentCount"
        label-width="85px"
      />
    </FormControl>
    <FormControl>
      <safa-custom-text
        type="money"
        label="مبلع نقد"
        m="r"
        v-model="installmentResults.Installment.CashPayment"
        cdcName="CashPayment"
        label-width="85px"
      />
    </FormControl>
    <FormControl>
     <safa-datepicker
        label="تاریخ شروع"
        :m="m"
        v-model="installmentResults.Installment.FirstDate"
        cdcName="FirstDate"
                label-width="85px"
      />
    </FormControl>
    <FormControl>
      <safa-custom-text
        type="money"
        label=" مبلغ اصلی"
        :m="m"
        label-width="85px"
        v-model="installmentResults.Installment.MainPrice"
        cdcName="MainPrice"
      />
    </FormControl>
      <safa-checkbox
        label="دوره روزانه"
        :m="m"
        class="col-auto"
        v-model="dayCycle"
        cdcName="dayCycle"
      />
      <safa-checkbox
        label="دوره ماهانه"
        :m="m"
        class="col-auto"
        v-model="mountCycle"
        cdcName="mountCycle"
      />
    <text-template
      label="توضیحات تقسیط"
      formKey="2d74ba0a-e1e3-4fa0-bd1b-1047ed0f6db5"
      v-model="installmentResults.Installment.Comments"
      cdcName="InstallmentComment"
      label-width="85px"
      class="q-mb-sm"
      :m="m"
    />
  </FormRow>
    <FormRow class="q-mb-sm">
      <FormControl>
      <safa-combo
        label="وضعیت"
        ciName="CI_InstallmentStatus"
        domainName="CI_SaraM1"
        :m="m"
        v-model="installmentInfo.CI_InstallmentStatus"
        cdcName="CI_InstallmentStatus"
        label-width="85px"
      />
    </FormControl>
    <FormControl>
      <safa-combo
        label="نوع سند صادر شده"
        ciName="CI_InstallmentDocType"
        domainName="CI_SaraM1"
        :m="m"
        v-model="installmentInfo.CI_InstallmentDocType"
        cdcName="CI_InstallmentDocType"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-combo
        label="نام بانک صادر کننده"
        ciName="CI_Bank"
        domainName="CI_SaraM1"
        :m="m"
        v-model="installmentInfo.CI_Bank"
        cdcName="CI_Bank"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="کد شعبه بانک صادر کننده"
        :m="m"
        v-model="installmentInfo.BankBranchCode"
        cdcName="BankBranchCode"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="نام شعبه بانک صادر کننده"
        :m="m"
        v-model="installmentInfo.BankBranchName"
        cdcName="BankBranchName"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="نام صاحب حساب"
        :m="m"
        v-model="installmentInfo.AccountOwner"
        cdcName="AccountOwner"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="شماره حساب"
        :m="m"
        v-model="installmentInfo.AccountNo"
        cdcName="AccountNo"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="نام و نام خانوادگی ضامن"
        :m="m"
        v-model="installmentInfo.SponsorName"
        cdcName="SponsorName"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="آدرس ضامن"
        :m="m"
        v-model="installmentInfo.SponsorAddress"
        cdcName="SponsorAddress"
        label-width="85px"
      />
    </FormControl>
          <FormControl>
      <safa-text
        label="تلفن ضامن"
        :m="m"
        v-model="installmentInfo.SponsorTel"
        cdcName="SponsorTel"
        label-width="85px"
      />
    </FormControl>

    </FormRow>
    <FormRow class="q-mb-sm">

      <!-- <btn-default
        label="اجرای عملیات تقسیط"
        class="btn-default"
        :disable="disableBtn"
        @click="installmentPerformance"
      ></btn-default> -->
      <btn-default
        label="اطلاعات از تصویر چک"
        @click="isShowChequeInfoModal = true"
        spCaption="اطلاعات از تصویر چک"
        spId="46c1a5ca-9b92-49ba-a3f7-4a139092a3c8"
     />
      <btn-default
        label="استعلام چک"
        @click="inquiry"
        spId="e0f4bf4e-e5b8-4074-b031-3757fc207d19"
        spCaption="استعلام چک"
     />
      <btn-default
        label="ارسال به سیستم مالی"
        @click="sendToFinancialSys"
        spId="0afa6077-4483-4443-a5e3-b8d7fedaa5ae"
        spCaption="ارسال به سیستم مالی"
      />
      <btn-default
        label="اضافه کردن چک بین بانکی"
        @click="isShowAddChequeModal=true"
        spId="78d0c31d-b90a-411e-89c4-a1b377419926"
        spCaption="اضافه کردن چک بین بانکی"
     />
    </FormRow>
      <safa-splitter
      v-model="splitterModel"
      horizontal
      fit
      margin="0"
    >
      <template v-slot:before>
        <fit>
      <safa-datatable
      helper="newInstallmentgrid"
        v-model="installmentResults.Installment_List"
        cdcName="Installment_List"
        :m="m"
        height="100%"
            max-height="100%"
        @click="click"
        title="تقسیط"
      />
    </fit>
      </template>
      <template v-slot:after>
        <fit>
    <safa-datatable
      v-model="incomeFicheSubResults"
      cdcName="incomeFicheSubResults"
      ref="grid"
      name="grid"
      fit        :m="m"

            height="100%"
            max-height="100%"
      helper="addCheque"
      title="چک بین بانکی"
   />
  </fit>
      </template>
   </safa-splitter>

    <!-- <div class="row items-center q-my-md">
      <safa-text
        label="تعداد"
        class="col-md-2"
        :m="mode"
        v-model="copyCount"
        cdcName="copyCount"
      ></safa-text>
      <btn-default
        label="کپی ردیف های مشابه"
        class="btn-default"
        :disable="disableBtn"
        @click="copySimilarRow"
      ></btn-default>
    </div> -->
    <!-- <form-actions
      :m="mode"
      class="col-12 q-mt-md"
      @edit="editForm"
      @save="save"
      @cancel="cancelInstallment"
    >
      <template #after>
        <btn-default
          label="خرید دین"
          class="btn-default"
          @click="createShahrBankIncomeGuaranteeInstallment"
        ></btn-default>
      </template>
    </form-actions> -->
    <ShowModal
      :show="isShowChequeInfoModal"
      @hide="isShowChequeInfoModal = false"
      title="اطلاعات چک"
      @onCloseModal="isShowChequeInfoModal = false"
    >
      <ChequeInfo />
    </ShowModal>
    <ShowModal
      :show="isShowAddChequeModal"
      @hide="isShowAddChequeModal = false"
      title="اطلاعات چک بین بانکی22222"
      @onCloseModal="isShowAddChequeModal = false"
    >
      <AddCheque @reloadInstallmentform="reloadInstallmentform" />
    </ShowModal>
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ChequeInfo from "./ChequeInfo.vue"
import AddCheque from "./AddCheque.vue"
export default {
  name: "Installment",
  data () {
    return {
      installmentResult: null,
      splitterModel: 50,
      installmentResults: {
        Installment: {},
        Installment_List: []
      },
      installmentPerformanceResults: {
        Installment: {},
        Installment_List: []
      },

      disableBtn: true,
      saveResult: null,
      nidInstallArray: [],
      installmentInfo: {},
      installmentPerformanceResult: null,
      performance: false,
      isShowChequeInfoModal: false,
      isShowAddChequeModal: false,
      copyCount: 0,
      selectedInstallment: null,
      dayCycle: false,
      mountCycle: false,
      showAddedCheck: false,
      incomeFicheSubResults: []
    }
  },
  mixins: [baseFormMixin],
  components: { ChequeInfo, AddCheque },
  props: {
    selectedRow: Object,
    nidIncome: String,
    selectedCalculationRow: Object,
    title: String,
    formKey: String,
    main: String,
    m: String,
    loadFromMenu: Boolean
  },
  mounted () {
    this.getInstallment()
  },
  methods: {
    getInstallment () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche,
        pNidIncomeCalculation: "00000000-0000-0000-0000-000000000000",
        pEumObjOnPrice: 1,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.$services.SD.getInstallment(data)
        .then(({ data }) => {
          this.installmentResult = this.getResponse(data)
          if (this.installmentResult.success) {
            this.installmentResults = this.installmentResult.data
            if (this.installmentResults.Installment_List.length !== 0) {
              this.installmentResults.Installment_List.forEach(x => {
                this.nidInstallArray.push(x.NidInsList)
              })
              this.installmentInfo = this.installmentResults.Installment_List[0]
            }
            if (this.installmentResults.Installment.InstallmentCycle === 0) {
              this.dayCycle = false
              this.mountCycle = true
            } else if (
              this.installmentResults.Installment.InstallmentCycle === 1
            ) {
              this.dayCycle = true
              this.mountCycle = false
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

    save () {
      this.showLoading()
      let obj = {
        AccountNo: "",
        AccountOwner: "",
        BankBranchCode: null,
        BankBranchConfirmCheque: null,
        BankBranchName: "",
        BankConfirmCheque: null,
        BankName: null,
        CI_Bank: null,
        CI_InstallmentDocType: 0,
        CI_InstallmentStatus: 1,
        CheckRahgiriCode: null,
        ChequeAmount: null,
        ChequeSheetDate: null,
        Comments: null,
        CreateDate: "",
        CreateTime: "",
        CreditorPapers: null,
        DateDocument: null,
        DatePass: null,
        DocumentCost: null,
        EndEffectiveDate: null,
        EndStateCode: null,
        EndStateDesc: null,
        EpayCode: null,
        EumCheckStatus: 0,
        EumChequeType: null,
        EumOwnerCharacter: null,
        IsOk: null,
        Letter: null,
        MoadiCode: null,
        NationalCode: null,
        NidInsList: "00000000-0000-0000-0000-000000000000",
        NidInstallment: "00000000-0000-0000-0000-000000000000",
        NidUser: "00000000-0000-0000-0000-000000000000",
        NoDocument: "-",
        PaymentCost: 0,
        PaymentDate: "",
        Serial: null,
        Series: null,
        ShahrBankAmount: null,
        ShahrBankChecqueSerialNumber: null,
        ShahrBankChequeBank: null,
        ShahrBankChequeBankBranch: null,
        ShahrBankMaturityDate: null,
        ShahrBankVerifiedDateTime: null,
        SponsorAddress: null,
        SponsorName: "",
        SponsorTel: null,
        SponsorTelephon: null,
        TrackingNo: null,
        UserName: this.getUserDisplayName()
      }
      this.currentUser.UserImage = null
      this.installmentResults.Installment.NidFiche = this.selectedRow.NidFiche
      this.installmentResults.Installment.NidUser = this.getNidUser()
      this.installmentResults.Installment.UserName = this.getUserDisplayName()
      this.installmentResults.Installment.EumObjOnPrice = 1
      this.installmentResults.pUser = this.currentUser
      if (this.incomeFicheSubResults.length > 0) {
        this.incomeFicheSubResults.forEach(x => {
          this.installmentResults.Installment_List.push({ ...obj, ...x })
        })
      }
      let data = {
        pInstallment: this.installmentResults,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SD.saveInstallment(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.")
            this.isEditable = false
            // message
            this.getInstallment()
            if (this.performance) {
              this.performance = false
            }
          }
        })
        .catch(response => {
          this.serverError()
          // console.log(response)
        })
        .finally(() => {
          this.hideSending()
        })
    },
    inquiry () {
      this.showLoading()
      // pNidIncome is hard code
      let data = {
        pNidInstallmentList: this.nidInstallArray,
        pNidProc: "00000000-0000-0000-0000-000000000000",
        pNidIncome: "00000000-0000-0000-0000-000000000000"
      }
      this.$services.SD.getCheckStatus(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            // message
            this.getInstallment()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    sendToFinancialSys () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche,
        pUser: this.currentUser
      }
      this.$services.SD.sentCheckToRayvarz(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("ارسال فیش به رایورز انجام شد.")
            this.getInstallment()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    // installmentPerformance () {
    //   if (this.installmentResults.Installment.InstallmentCount === null ||
    //   this.installmentResults.Installment.CashPayment === null ||
    //   this.installmentResults.Installment.FirstDate === null) {
    //     this.showSuccess('لطفا اطلاعات تقسیط را وارد نمایید.')
    //   } else {
    //     this.performance = true
    //     this.showLoading()
    //     this.installmentInfo.NidInsList = '00000000-0000-0000-0000-000000000000'
    //     this.installmentInfo.NidInstallment =
    //     '00000000-0000-0000-0000-000000000000'
    //     this.installmentInfo.PaymentCost = 0
    //     this.installmentInfo.PaymentDate = ''
    //     let tmpInstallmentList = {
    //       CI_InstallmentStatus: this.installmentInfo.CI_InstallmentStatus || 0,
    //       CI_InstallmentDocType: this.installmentInfo.CI_InstallmentDocType || 0,
    //       CI_Bank: this.installmentInfo.CI_Bank || 0,
    //       BankBranchName: this.installmentInfo.BankBranchName,
    //       AccountNo: this.installmentInfo.AccountNo,
    //       AccountOwner: this.installmentInfo.AccountOwner,
    //       SponsorName: this.installmentInfo.SponsorName,
    //       SponsorAddress: this.installmentInfo.SponsorAddress,
    //       SponsorTel: this.installmentInfo.SponsorTel,
    //       BankBranchCode: this.installmentInfo.BankBranchCode,
    //       Comments: this.installmentInfo.Comments,
    //       NidInstallment: '00000000-0000-0000-0000-000000000000',
    //       NidInsList: '00000000-0000-0000-0000-000000000000'
    //     }
    //     let data = {
    //       pNidProc: this.selectedRequest.NidProc,
    //       pNidFiche: this.selectedRow.NidFiche,
    //       pNidIncome: this.selectedCalculationRow.NidIncome,
    //       pInstallment_List: tmpInstallmentList,
    //       pMainPrice: this.installmentResults.PriceForInstallment,
    //       pInstallmentCount: this.installmentResults.Installment.InstallmentCount,
    //       pInstallmentCycle: this.installmentResults.Installment.InstallmentCycle,
    //       pIsInstallmentCycleInDay: this.installmentResults.Installment
    //         .IsInstallmentCycleInDay || false,
    //       pCashPayment: this.installmentResults.Installment.CashPayment,
    //       pFirstDate: this.installmentResults.Installment.FirstDate,
    //       pComments: this.installmentResults.Installment.Comments,
    //       pIsLoadFromMenu: false
    //     }
    //     this.$services.SD.installmentPerformance(data)
    //       .then(({ data }) => {
    //         this.installmentPerformanceResult = this.getResponse(data)
    //         if (this.installmentPerformanceResult.success) {
    //           this.installmentPerformanceResults = this.installmentPerformanceResult.data
    //           this.installmentResults = this.installmentPerformanceResults
    //           this.showSuccess('اجرای عملیات تقسیط با موفقیت انجام شد.')
    //         }
    //       })
    //       .catch(response => {
    //         this.serverError()
    //       })
    //       .finally(() => {
    //         this.hideSending()
    //       })
    //   }
    // },
    createShahrBankIncomeGuaranteeInstallment () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche
      }
      this.$services.SD.createShahrBankIncomeGuaranteeInstallment(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    click (event, dataItem, target) {
      this.selectedInstallment = dataItem
      if (this.incomeFicheSubResults.length > 0) {
        this.showAddedCheck = true
      }
    },
    copySimilarRow () {
      if (this.selectedInstallment === null) {
        this.showError("لطفا یک ردیف تقسیط را برای کپی انتخاب نمایید.")
      }
      if (this.selectedInstallment !== null && this.copyCount > 0) {
        for (var i = 0; i < this.copyCount; i++) {
          this.installmentResults.Installment_List.push(
            this.selectedInstallment
          )
        }
      }
    },
    cancelInstallment () {
      this.isEditable = false
      this.getInstallment()
      this.$emit("backToFicheTab")
    },
    reloadInstallmentform (val) {
      this.isShowAddChequeModal = false
      this.incomeFicheSubResults = val
      // this.getInstallment()
    }
  }
}
</script>
<style>
.grid-wrapper .k-grid {
  min-height: 10vh;
}
</style>
