<template>
  <form-wrapper title="تقسیط فیش">
    <template #header>
      <safa-status :result="saveResult" />
      <safa-status :result="installmentPerformanceResult" />
    </template>

    <fit>
      <div class="row q-mb-sm items-center">
        <safa-custom-text
          label="مبلغ فیش"
          type="money"
          class="col-md-3"
          m="r"
          v-model="installmentResults.PriceForInstallment"
          cdcName="PriceForInstallment"
          label-width="80px"
        />
        <div class="col-md-9 q-gutter-sm q-px-sm">
          <button-group>
            <btn-default
              label="اجرای عملیات تقسیط"
              @click="installmentPerformance"
              :disable="!isEditable"
            />
            <btn-default
              label="بارگذاری تصاویر چک ها"
              @click="showArchiveModal = true"
              :disable="!isEditable"
            />
            <btn-default
              label="اطلاعات از تصویر چک"
              @click="isShowChequeInfoModal = true"
              :disable="!isEditable"
            />
            <btn-default label="استعلام چک" @click="inquiry" />
            <btn-default
              label="ارسال به سیستم مالی"
              @click="sendToFinancialSys"
            />
            <btn-default
              label="اضافه کردن چک بین بانکی"
              @click="isShowAddChequeModal = true"
              :disable="!isEditable"
            />
          </button-group>
        </div>
      </div>
      <internal-section title="اطلاعات تقسیط">
        <div class="row q-col-gutter-sm">
          <form-control>
          <safa-text
            label="تعداد قسط ها"
            :m="mode"
            v-model="installmentResults.Installment.InstallmentCount"
            cdcName="InstallmentCount"
            label-width="80px"
          />
        </form-control>
         <!-- شرط ویرایش طبق سرا8 ست شده و کارشناسان مشهد بررسی و تایید نمودند.
         این مورد بسیار حساس و مهم است لطفا تغییری اعمال نشود. -->
         <form-control>
          <safa-custom-text
            label="مبلغ نقد"
            type="money"
            :m="selectedRow.EumFicheStatus===1 ? 'e':'r'"
            v-model="installmentResults.Installment.CashPayment"
            cdcName="CashPayment"
            label-width="80px"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ شروع"
            :m="mode"
            v-model="installmentResults.Installment.FirstDate"
            cdcName="FirstDate"
            label-width="80px"
          />
        </form-control>
          <!-- <safa-custom-text
          type="money"
          label=" مبلغ اصلی"
          class="col-12 col-sm-6 col-md-3"
          :m="mode"
          v-model="installmentResults.Installment.MainPrice"
          cdcName="MainPrice"
          label-width="80px"
        /> -->
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6 col-md-3 q-mt-sm">
            <div class="q-gutter-x-lg q-mt-sm">
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
          </div>
          <form-row>
            <form-control>
          <safa-custom-text
            type="money"
            label="تعداد ماه دوره"
            :m="mountCycleNo"
            v-model="installmentResults.Installment.InstallmentCycle"
            cdcName="InstallmentCycle"
            label-width="80px"
          />
        </form-control>
        </form-row>
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
          <form-row>
            <form-control>
          <safa-combo
            label="وضعیت"
            ciName="CI_InstallmentStatus"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_InstallmentStatus"
            cdcName="CI_InstallmentStatus"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-combo
            label="نوع سند صادر شده"
            ciName="CI_InstallmentDocType"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_InstallmentDocType"
            cdcName="CI_InstallmentDocType"
            label-width="80px"
          />
        </form-control>
          <form-control>
          <safa-combo
            label="نام بانک صادر کننده"
            ciName="CI_Bank"
            domainName="CI_SaraM1"
            :m="mode"
            v-model="installmentInfo.CI_Bank"
            cdcName="CI_Bank"
            label-width="80px"
          />
        </form-control>
        </form-row>
        <form-row>
          <form-control>
          <safa-text
            label="کد شعبه بانک صادر کننده"
            :m="mode"
            v-model="installmentInfo.BankBranchCode"
            cdcName="BankBranchCode"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="شماره حساب"
            :m="mode"
            v-model="installmentInfo.AccountNo"
            cdcName="AccountNo"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام صاحب حساب"
            :m="mode"
            v-model="installmentInfo.AccountOwner"
            cdcName="AccountOwner"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام شعبه بانک صادر کننده"
            :m="mode"
            v-model="installmentInfo.BankBranchName"
            cdcName="BankBranchName"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="نام و نام خانوادگی ضامن"
            :m="mode"
            v-model="installmentInfo.SponsorName"
            cdcName="SponsorName"
            label-width="80px"
          />
        </form-control>
      <form-control>
          <safa-text
            label="تلفن ضامن"

            :m="mode"
            v-model="installmentInfo.SponsorTel"
            cdcName="SponsorTel"
            label-width="80px"
          />
        </form-control>
        </form-row>
          <safa-text
            label="آدرس ضامن"
            class="col-12 col-sm"
            :m="mode"
            v-model="installmentInfo.SponsorAddress"
            cdcName="SponsorAddress"
            label-width="80px"
          />
        </div>
      </internal-section>

      <div style="min-height: 200px; flex-grow: 1" class="q-mb-sm">
        <safa-grid
        :columns="agInstallmentgrid"
          v-model="installmentResults.Installment_List"
          cdcName="Installment_List"
          :m="mode"
          @row-click="click"
          title="تقسیط"
          height="100%"
          max-height="100%"
        />
        <safa-grid
          v-if="showAddedCheck"
          v-model="incomeFicheSubResults"
          cdcName="incomeFicheSubResults"
          ref="grid"
          name="grid"
          helper="addCheque"
          title="چک بین بانکی"
          height="100%"
          max-height="100%"
        />
      </div>
    </fit>
    <template #footer>
      <div class="row q-col-gutter-sm ">
        <safa-text
          label="تعداد"
          :m="mode"
          class="col-12 col-sm-6 col-md-3"
          v-model="copyCount"
          cdcName="copyCount"
        />
        <div class="flex items-center">
          <btn-default
            label="کپی ردیف های مشابه"
            :disable="disableBtn"
            @click="copySimilarRow"
          />
        </div>
      </div>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="save"
        @cancel="cancel"
      >
        <template #after>
          <btn-default  label="خرید دین" @click="guaranteeInstallment" />
          <btn-default  label="گزارش تقسیط" @click="installmentReport" />
        </template>
      </form-actions>
    </template>

    <safa-popup v-model="isShowChequeInfoModal" title="اطلاعات چک">
      <ChequeInfo />
    </safa-popup>
    <safa-popup v-model="isShowAddChequeModal" title="اطلاعات چک بین بانکی">
      <AddCheque @reloadInstallmentform="reloadInstallmentform" />
    </safa-popup>
    <safa-popup v-model="showArchiveModal" title="بارگذاری تصاویر چک ها">
      <ArchiveWrap
      :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :bizCode="archiveBizCode"
      />
    </safa-popup>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import ChequeInfo from "./ChequeInfo.vue"
import AddCheque from "./AddCheque.vue"

export default {
  name: "Installment",
  title: "تقسیط",
  data: function () {
    return {
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
      disableBtn: true,
      saveResult: null,
      nidInstallArray: [],
      installmentInfo: {},
      installmentPerformanceResult: null,
      performance: false,
      isShowChequeInfoModal: false,
      isShowAddChequeModal: false,
      showArchiveModal: false,
      copyCount: 0,
      selectedInstallment: null,
      dayCycle: false,
      mountCycle: false,
      showAddedCheck: false,
      incomeFicheSubResults: [],
      allowedAccessID: [],
      hideEndStateDesColumn: true,
      isView: false,
      archiveBizCode: ""
    }
  },
  mixins: [baseFormMixin],
  components: { ChequeInfo, AddCheque },
  props: {
    selectedRow: Object,
    config: Object,
    selectedCalculationRow: Object,
    isSelectFromResponder: Boolean,
    formKey: String,
    title: String,
    name: String,
    loadFromMenu: Boolean
  },
  mounted () {
    this.getInstallment()
    this.addResources()
    if (this.isSelectedRequest()) {
      this.archiveBizCode = this.selectedRequest.BizCode
    } else {
      this.hideSidebar(this.name)
    }
  },
  methods: {
    async installmentReport () {
      if (!this.selectedRow) {
        return this.showError("لطفا یک فیش انتخاب نمایید.")
      }
      const reportPath =
        "/Sara8Reports/RptInstallment_Income"
      const queryParams = {
        NidFiche: this.selectedRow.NidFiche,
        District: this.convertToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@99@80",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRow.NidFiche,
        bizCodeTitle: "NidFiche",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ فیش درآمد با شماره فیش ${this.selectedRow.FicheNo} انجام گردید.`
      })
    },
    getInstallment () {
      const payload = {
        pNidFiche: this.selectedRow.NidFiche,
        pNidIncomeCalculation: "00000000-0000-0000-0000-000000000000",
        pEumObjOnPrice: 1,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadFromMenu: this.loadFromMenu
      }
      this.showLoading()
      this.$services.SD.getInstallment(payload, this.config)
        .then(async ({ data }) => {
          this.installmentResult = this.getResponse(data)
          if (this.installmentResult.success) {
            this.installmentResults = this.installmentResult.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRow.NidFiche,
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                bizCodeTitle: "NidFiche",
                saveDesc: `نمایش اطلاعات فرم قسط فیش با شماره ${this.selectedRow.NidFich} انجام گردید.`
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
            this.$emit("reloadMainForm")
          }
        })
        .catch((e) => {
          console.error(e)
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
        this.incomeFicheSubResults.forEach((x) => {
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
      this.$services.SD.saveInstallment(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("ویرایش اطلاعات با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.installmentResults.Installment.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ویرایش اطلاعات فیش با شماره ${this.selectedRow.FicheNo} انجام گردید. `
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
      this.$services.SD.getCheckStatus(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false

            await this.log({
              action: this.logActions.view,
              bizCode: this.installmentResults.Installment.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `استعلام چک با شماره ${this.installmentResults.Installment.NidFiche} انجام گردید. `
            })

            this.getInstallment()
          }
        })
        .catch((response) => {
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
      this.$services.SD.sentCheckToRayvarz(data, this.config)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("ارسال فیش به رایورز انجام شد.")

            await this.log({
              action: this.logActions.send,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ارسال فیش با شماره به رایورز ${this.selectedRow.NidFich} انجام گردید.`
            })

            this.getInstallment()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
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
          pNidFiche: this.selectedRow.NidFiche,
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
          pIsLoadFromMenu: this.loadFromMenu,
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
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `اجرای عملیات تقسیط فیش با شماره ${this.selectedRow.NidFich} انجام گردید.`
              })
              this.$emit("reloadMainForm")
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      }
    },
    guaranteeInstallment () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche
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
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: "NidFiche",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `خرید دین در فیش با شماره ${this.selectedRow.NidFich} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideSending()
        })
    },
    click (dataItem) {
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
    cancel () {
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
    },
    async addResources () {
      const appId = this.$stSecurity.getters["config/appId"] // NidWorkspace
      const appTitle = this.$stSecurity.getters["config/appTitle"] // workspace title
      const appName = this.$stSecurity.getters["config/appName"] // workspace name

      let resources = []
      resources.push({
        NidResource: "570e23cd-ffd1-499e-8843-a30cd80177c3".toUpperCase(),
        NidParent: this.formKey,
        field: "EndStateDesc",
        title: "لیست اقساط با ویرایش وضعیت چک",
        type: "sp"
      })

      const payload = {
        NidWorkspace: appId,
        workspaceName: appName,
        workspaceTitle: appTitle,
        newAdd: true,
        resources
      }
      const result = await this.$services.security.resourceAddFetch(payload)
      // const result = await post('/v2/permission-forms/resource-add-fetch', payload, {})
      if (result.data.success) {
        this.allAccessSecurity = result.data.data
        this.checkSecurity(
          "570e23cd-ffd1-499e-8843-a30cd80177c3"
        )
      }
    },
    checkSecurity (e) {
      let help = this.allAccessSecurity.filter(
        (i) => i.NidResource.toUpperCase() === e.toUpperCase()
      )
      if (help) {
        help.forEach((permission) => {
          if (permission.allowed === true) {
            this.hideEndStateDesColumn = false
          } else {
            this.hideEndStateDesColumn = true
          }
        })
      }
    }
  },
  computed: {
    agInstallmentgrid () {
      let list = [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: 'EumChequeType',
          title: 'نوع چک',
          editor: 'combo',
          source: [{ ID: 1, Title: 'چک' },
            { ID: 2, Title: 'چک بین بانکی' }],
          width: '100px'
        },
        { field: 'MoadiCode', title: 'کد مرکز 1', width: '100px' },
        {
          field: 'CI_InstallmentStatus',
          title: 'نوع سند',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '110px'
        },
        {
          field: 'CI_InstallmentDocType',
          title: 'نوع تقسیط',
          editor: 'combo',
          domain: 'CI_SaraM1',
          width: '110px'
        },
        {
          field: 'PaymentDate',
          title: 'تاریخ سر رسید پرداخت',
          editable: this.selectedRow.EumFicheStatus === 1,
          editor: 'date',
          width: '170px'
        },
        { field: 'PaymentCost',
          title: 'مبلغ قابل پرداخت',
          editable: this.selectedRow.EumFicheStatus === 1,
          width: '160px',
          editor: 'numeric'
        },
        { field: 'NoDocument', title: 'شماره سند صادر شده', width: '160px' },
        { field: 'AccountNo', title: 'شماره حساب', width: '150px' },
        {
          field: 'DocumentCost',
          title: 'مبلغ سند صادر شده',
          editor: 'money',
          editable: this.selectedRow.EumFicheStatus === 1,
          width: '160px'
        },
        {
          field: 'DateDocument',
          title: 'تاریخ سند صادر شده',
          editor: 'date',
          width: '160px'
        },
        { field: 'DatePass', title: 'تاریخ وصول', editor: 'date', width: '100px' },
        {
          field: 'EndStateDesc',
          title: 'وضعیت چک',
          editable: this.selectedRow.EumFicheStatus === 1,
          hide: this.hideEndStateDesColumn,
          width: '120px'
        },
        { field: 'CI_Bank', title: 'نام بانک صادر کننده', editor: "combo", domain: "CI_SaraM1", width: '170px' },
        { field: 'BankBranchCode', title: 'کد شعبه بانک صادر کننده', width: '180px' },
        { field: 'BankBranchName', title: 'نام شعبه ی بانک صادر کننده', width: '190px' },
        { field: 'AccountOwner', title: 'نام صاحب حساب', width: '120px' },
        { field: 'BankConfirmCheque', title: 'بانک چک تأیید شده', width: '120px' },
        { field: 'BankBranchConfirmCheque', title: 'شعبه ی چک تأیید شده', width: '130px' },
        { field: 'SponsorName', title: 'نام و نام خانوادگی ضامن', width: '150px' },
        { field: 'SponsorAddress', title: 'آدرس ضامن', width: '90px' },
        { field: 'SponsorTel', title: 'تلفن ضامن', width: '90px' },
        {
          "field": "EumOwnerCharacter",
          "title": "شخصیت",
          "editor": "combo",
          "source": [
            {
              "ID": 1,
              "Title": "حقیقی"
            },
            {
              "ID": 2,
              "Title": "حقوقی"
            },
            {
              "ID": 3,
              "Title": "اتباع خارجی"
            }
          ],
          "width": "116px"
        },
        { field: 'NationalCode', title: 'کد ملی / شناسه ی ملی', width: '150px' },
        { field: 'Letter', title: 'سری حرفی', width: '100px' },
        { field: 'Series', title: 'سری عددی', width: '100px' },
        { field: 'Serial', title: 'سریال', width: '100px' },
        { field: 'Comments', title: 'توضیحات', width: '100px' },
        { field: 'UserName', title: 'کاربر ثبت کننده', width: '100px' },
        { field: 'CreateDate', title: 'تاریخ ثبت اطلاعات', width: '100px' },
        { field: 'ChequeAmount', title: 'مبلغ بانک', width: '150px', editor: 'money' },
        { field: 'ChequeSheetDate', title: 'تاریخ سر رسید بانک', width: '140px' },
        { field: 'EpayCode', title: 'شماره ارجاع سامانه پرداخت', width: '150px' },
        { field: 'TrackingNo', title: 'شماره پیگیری بانک', width: '150px' },
        { field: 'EndEffectiveDate', title: 'تاریخ آخرین عملیات', width: '150px' },
        { field: 'IsOk', title: 'تأیید چک', editor: 'checkbox', width: '100px' }
      ]
      return list.filter(x => !x?.hide)
    },
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    },
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
<style>
.grid-wrapper .k-grid {
  min-height: 10vh;
}
</style>
