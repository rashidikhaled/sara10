<template>
  <form-wrapper title="تقسیط فیش">
    <template #header>
      <safa-status :result="saveResult" />
      <safa-status :result="installmentPerformanceResult" />
    </template>

    <fit>
      <FormRow class="q-mb-sm">
        <formControl>
          <safa-custom-text
            label="مبلغ فیش"
            type="money"
            m="r"
            v-model="installmentResults.PriceForInstallment"
            cdcName="PriceForInstallment"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="تعداد قسط ها"
            :m="mode"
            v-model="installmentResults.Installment.InstallmentCount"
            cdcName="InstallmentCount"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-custom-text
            label="مبلغ نقد"
            type="money"
            :m="mode"
            v-model="installmentResults.Installment.CashPayment"
            cdcName="CashPayment"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-datepicker
            label="تاریخ شروع"
            :m="mode"
            v-model="installmentResults.Installment.FirstDate"
            cdcName="FirstDate"
            label-width="80px"
          />
        </formControl>
        <!-- <formControl>
          <safa-custom-text
            type="money"
            label=" مبلغ اصلی"
            :m="mode"
            v-model="installmentResults.Installment.MainPrice"
            cdcName="MainPrice"
            label-width="80px"
          />
        </formControl> -->
        <formControl class="flex items-center">
          <div class="q-gutter-x-lg">
            <safa-radio
              label="دوره روزانه"
              :m="mode"
              v-model="cycleType"
              val="dayCycle"
              cdcName="dayCycle"
            />
            <safa-radio
              label="دوره ماهانه"
              :m="mode"
              v-model="cycleType"
              val="mountCycle"
              cdcName="mountCycle"
            />
          </div>
        </formControl>
        <formControl>
          <safa-custom-text
            type="money"
            label="تعداد ماه دوره"
            :m="mountCycleNo"
            v-model="installmentResults.Installment.InstallmentCycle"
            cdcName="InstallmentCycle"
            label-width="80px"
          />
        </formControl>
        <text-template
          label="توضیحات تقسیط"
          class="col-12"
          type="textarea"
          formKey="237ac2fc-8ebe-4bc3-9257-67e0152242fd"
          v-model="installmentResults.Installment.Comments"
          cdcName="InstallmentComments"
          :m="mode"
          label-width="80px"
          :rows="1"
        />
        <formControl>
          <safa-combo
            label="وضعیت"
            ciName="CI_InstallmentStatus"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_InstallmentStatus"
            cdcName="CI_InstallmentStatus"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-combo
            label="نوع سند صادر شده"
            ciName="CI_InstallmentDocType"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_InstallmentDocType"
            cdcName="CI_InstallmentDocType"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-combo
            label="نام بانک صادر کننده"
            ciName="CI_Bank"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_Bank"
            cdcName="CI_Bank"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="کد شعبه بانک صادر کننده"
            :m="mode"
            v-model="installmentInfo.BankBranchCode"
            cdcName="BankBranchCode"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="شماره حساب"
            :m="mode"
            v-model="installmentInfo.AccountNo"
            cdcName="AccountNo"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="نام صاحب حساب"
            :m="mode"
            v-model="installmentInfo.AccountOwner"
            cdcName="AccountOwner"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="نام شعبه بانک صادر کننده"
            :m="mode"
            v-model="installmentInfo.BankBranchName"
            cdcName="BankBranchName"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="نام و نام خانوادگی ضامن"
            :m="mode"
            v-model="installmentInfo.SponsorName"
            cdcName="SponsorName"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="تلفن ضامن"
            :m="mode"
            v-model="installmentInfo.SponsorTel"
            cdcName="SponsorTel"
            label-width="80px"
          />
        </formControl>
        <formControl>
          <safa-text
            label="آدرس ضامن"
            :m="mode"
            v-model="installmentInfo.SponsorAddress"
            cdcName="SponsorAddress"
            label-width="80px"
          />
        </formControl>
      </FormRow>
      <safa-grid
        helper="installmentgrid"
        v-model="installmentResults.Installment_List"
        cdcName="Installment_List"
        :m="mode"
        fit
        @row-click="selectedInstallmentFromList"
        title="تقسیط"
        height="100%"
        max-height="100%"
        class="q-mb-sm"
        :deleteRow="false"
        :allowCopy="false"
      />
      <!-- :addRow="false" -->
      <safa-grid
        v-if="showAddedCheck"
        v-model="incomeFicheSubResults"
        cdcName="incomeFicheSubResults"
        fit
        m="r"
        helper="addCheque"
        title="چک بین بانکی"
        height="100%"
        max-height="100%"
        class="q-mb-sm"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
      <FormRow>
        <formControl>
          <safa-text
            label="تعداد"
            label-width="80px"
            :m="mode"
            v-model="copyCount"
            cdcName="copyCount"
          >
            <template v-slot:append>
              <q-icon
                style="position: relative; right: 2px"
                title="کپی ردیف های مشابه"
                :disabled="!isEditable"
                @click="copySimilarRow"
                color="primary"
                name="file_copy"
                size="16px"
                class="cursor-pointer"
              />
            </template>
          </safa-text>
        </formControl>
      </FormRow>
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveObj"
        @cancel="cancelInstallment"
      >
        <template #after>
          <btn-default
            label="خرید دین"
            @click="createShahrBankIncomeGuaranteeInstallment"
          />
          <btn-default
            label="اجرای عملیات تقسیط"
            :disable="!isEditable"
            @click="installmentPerformance"
          />
          <btn-default
            label="اطلاعات از تصویر چک"
            :disable="!isEditable"
            @click="isShowChequeInfoModal = true"
          />
          <btn-default label="استعلام چک" @click="inquiry" />
          <btn-default
            label="ارسال به سیستم مالی"
            @click="sendToFinancialSys"
          />
          <btn-default
            label="اضافه کردن چک بین بانکی"
            :disable="!isEditable"
            @click="isShowAddChequeModal = true"
          />
        </template>
      </form-actions>
    </template>
    <!-- <safa-popup
      v-model="isShowChequeInfoModal"
      @hide="isShowChequeInfoModal = false"
      title="اطلاعات چک"
      @onCloseModal="isShowChequeInfoModal = false"
      width="900px"
      height="700px"
    >
      <ChequeInfo :formKey="formKey" :title="title" :name="name" />
    </safa-popup> -->
    <safa-popup
      v-model="isShowAddChequeModal"
      title="اطلاعات چک بین بانکی"
      width="800px"
      height="900px"
    >
      <AddCheque
        :incomeFicheSubResults="incomeFicheSubResults"
        @reloadInstallmentform="reloadInstallmentform"
        :m="mode"
      />
    </safa-popup>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import AddCheque from "./AddCheque.vue"
export default {
  mixins: [baseFormMixin],
  components: { AddCheque },
  data () {
    return {
      name: "InstallmentFiche",
      // title: "تقسیط فیش",
      cycleType: "mountCycle",
      installmentResult: null,
      installmentResults: {
        Installment: {},
        Installment_List: []
      },
      installmentPerformanceResults: {
        Installment: {},
        Installment_List: []
      },
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
      incomeFicheSubResults: [],
      isView: false
    }
  },
  props: {
    selectedFiche: Object,
    config: Object,
    selectedCalculationRow: Object,
    formKey: String,
    title: String
  },
  mounted () {
    if (this.selectedFiche) {
      this.getInstallment()
    }
  },
  methods: {
    getInstallment () {
      debugger
      this.showLoading()
      const payload = {
        pNidFiche: this.selectedFiche.NidFiche,
        pNidIncomeCalculation: "00000000-0000-0000-0000-000000000000",
        pEumObjOnPrice: 7,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.isSelectFromMenu
      }
      this.$services.SD.getInstallment(payload, this.config)
        .then(async ({ data }) => {
          this.installmentResult = this.getResponse(data)
          if (this.installmentResult.success) {
            this.installmentResults = this.installmentResult.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedFiche.NidFiche,
                bizCodeTitle: "NidFiche"
              })
            }
            this.isView = true
            if (this.installmentResults.Installment_List.length !== 0) {
              this.installmentResults.Installment_List.forEach((x) => {
                this.nidInstallArray.push(x.NidInsList)
              })
              this.installmentInfo =
                this.installmentResults.Installment_List[0]
            }
            if (this.installmentResults.Installment.InstallmentCycle === 0) {
              this.dayCycle = false
              this.mountCycle = true
              this.cycleType = "mountCycle"
            } else if (
              this.installmentResults.Installment.InstallmentCycle === 1
            ) {
              this.dayCycle = true
              this.mountCycle = false
              this.cycleType = "dayCycle"
            }
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      this.showLoading()
      debugger
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
      this.installmentResults.Installment.NidFiche =
        this.selectedFiche.NidFiche
      this.installmentResults.Installment.NidUser = this.getNidUser()
      this.installmentResults.Installment.UserName = this.getUserDisplayName()
      this.installmentResults.Installment.EumObjOnPrice = 1
      this.installmentResults.pUser = this.currentUser
      if (this.incomeFicheSubResults.length > 0) {
        this.incomeFicheSubResults.forEach((x) => {
          this.installmentResults.Installment_List.push({ ...obj, ...x })
        })
      }
      const payload = {
        pInstallment: this.installmentResults,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SD.saveInstallment(payload, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("ویرایش اطلاعات با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.installmentResults.Installment.NidFiche,
              bizCodeTitle: "NidFiche"
            })
            // message
            this.getInstallment()
            if (this.performance) {
              this.performance = false
            }
          }
        })
        .catch((response) => {
          this.serverError()
          // console.log(response)
        })
        .finally(() => {
          this.hideLoading()
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
      this.$services.SD.getCheckStatus(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.view,
              bizCode: this.installmentResults.Installment.NidFiche,
              bizCodeTitle: "NidFiche"
            })

            this.getInstallment()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToFinancialSys () {
      this.showLoading()
      const data = {
        pNidFiche: this.selectedFiche.NidFiche,
        pUser: this.currentUser
      }
      this.$services.SD.sentCheckToRayvarz(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("ارسال فیش به رایورز انجام شد.")

            await this.log({
              action: this.logActions.send,
              bizCode: this.selectedFiche.NidFiche,
              bizCodeTitle: "NidFiche"
            })

            this.getInstallment()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    installmentPerformance () {
      if (
        this.installmentResults.Installment.InstallmentCount === null ||
        this.installmentResults.Installment.CashPayment === null ||
        this.installmentResults.Installment.FirstDate === null
      ) {
        this.showSuccess("لطفا اطلاعات تقسیط را وارد نمایید.")
      } else {
        this.performance = true
        this.showLoading()
        this.installmentInfo.NidInsList =
          "00000000-0000-0000-0000-000000000000"
        this.installmentInfo.NidInstallment =
          "00000000-0000-0000-0000-000000000000"
        this.installmentInfo.PaymentCost = 0
        this.installmentInfo.PaymentDate = ""
        let tmpInstallmentList = {
          CI_InstallmentStatus: this.installmentInfo.CI_InstallmentStatus || 0,
          CI_InstallmentDocType:
            this.installmentInfo.CI_InstallmentDocType || 0,
          CI_Bank: this.installmentInfo.CI_Bank || 0,
          BankBranchName: this.installmentInfo.BankBranchName,
          AccountNo: this.installmentInfo.AccountNo,
          AccountOwner: this.installmentInfo.AccountOwner,
          SponsorName: this.installmentInfo.SponsorName,
          SponsorAddress: this.installmentInfo.SponsorAddress,
          SponsorTel: this.installmentInfo.SponsorTel,
          BankBranchCode: this.installmentInfo.BankBranchCode,
          Comments: this.installmentInfo.Comments,
          NidInstallment: "00000000-0000-0000-0000-000000000000",
          NidInsList: "00000000-0000-0000-0000-000000000000"
        }
        let data = {
          pNidProc: this.selectedRequest.NidProc,
          pNidFiche: this.selectedFiche.NidFiche,
          pNidIncome: this.selectedCalculationRow.NidIncome,
          pInstallment_List: tmpInstallmentList,
          pMainPrice: this.installmentResults.PriceForInstallment,
          pInstallmentCount:
            this.installmentResults.Installment.InstallmentCount,
          pInstallmentCycle:
            this.installmentResults.Installment.InstallmentCycle,
          pIsInstallmentCycleInDay:
            this.installmentResults.Installment.IsInstallmentCycleInDay ||
            false,
          pCashPayment: this.installmentResults.Installment.CashPayment,
          pFirstDate: this.installmentResults.Installment.FirstDate,
          pComments: this.installmentResults.Installment.Comments,
          pIsLoadFromMenu: false,
          pUser: this.currentUser
        }
        this.$services.SD.installmentPerformance(data, this.config)
          .then(async ({ data }) => {
            this.installmentPerformanceResult = this.getResponse(data)
            if (this.installmentPerformanceResult.success) {
              this.installmentPerformanceResults =
                this.installmentPerformanceResult.data
              this.installmentResults = this.installmentPerformanceResults
              this.showSuccess("اجرای عملیات تقسیط با موفقیت انجام شد.")

              await this.log({
                action: this.logActions.save,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc"
              })
            }
          })
          .catch((error) => {
            console.log(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    createShahrBankIncomeGuaranteeInstallment () {
      this.showLoading()
      const data = {
        pNidFiche: this.selectedFiche.NidFiche
      }
      this.$services.SD.createShahrBankIncomeGuaranteeInstallment(
        data,
        this.config
      )
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedFiche.NidFiche,
              bizCodeTitle: "NidFiche"
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedInstallmentFromList (dataItem) {
      this.selectedInstallment = dataItem
      if (this.incomeFicheSubResults.length > 0) {
        this.showAddedCheck = true
      }
    },
    copySimilarRow () {
      if (this.isEditable) {
        if (this.selectedInstallment !== null && this.copyCount > 0) {
          for (var i = 0; i < this.copyCount; i++) {
            this.installmentResults.Installment_List.push(
              this.selectedInstallment
            )
          }
        } else {
          this.showError("لطفا یک ردیف تقسیط را برای کپی انتخاب نمایید.")
        }
      }
    },
    cancelInstallment () {
      this.isEditable = false
      this.getInstallment()
      this.$emit("backToFicheTab")
    },
    reloadInstallmentform (val) {
      if (val.length > 0) {
        this.showAddedCheck = true
      }
      this.isShowAddChequeModal = false
      this.incomeFicheSubResults = val
    }
  },
  computed: {
    mountCycleNo () {
      if (this.cycleType === "dayCycle") {
        return false
      } else {
        return this.mode
      }
    }
  }
}
</script>
