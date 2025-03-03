<template>
  <form-wrapper title="تایید فیش درآمد">
    <template #header>
      <safa-status :result="getIncomeFicheFromFicheNoRes" />
      <safa-status :result="getIncomeFicheFromBillIDRes" />
      <safa-status :result="ficheConfirmRes" />
      <safa-status :result="ficheRevokeRes" />
      <form-header-by-nosazi-code
        :actions="false"
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        m="r"
      />
    </template>
    <fit>
      <FormRow>
        <FormControl>
          <safa-text
            label-width="85px"
            label="شماره فیش"
            m="r"
            v-model="model.FicheNo"
            cdcName="FicheNo"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label-width="85px"
            m="r"
            label="شناسه قبض"
            v-model="model.BillID"
            cdcName="BillID"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شناسه پرداخت"
            v-model="model.PaymentID"
            cdcName="PaymentID"
            label-width="85px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره درخواست"
            v-model="selectedRequest.NidWorkItem"
            cdcName="nidWorkItem"
            label-width="85px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ درخواست"
            v-model="model.requestDate"
            cdcName="requestDate"
            label-width="85px"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نوع درخواست"
            v-model="model.workFlowTitle"
            cdcName="workFlowTitle"
            label-width="85px"
            m="r"
          />
        </FormControl>
      </FormRow>

      <FormRow>
        <div class="col-12 q-mt-md">
          <span>مشخصات فیش</span>
          <hr style="margin-bottom: 0 !important" />
        </div>
        <FormControl>
          <safa-combo
            ciName="CI_IncomeAccountGroup"
            domainName="CI_SaraM1"
            label="مالکیت حساب"
            label-width="85px"
            v-model="model.CI_IncomeAccountGroup"
            cdcName="CI_IncomeAccountGroup"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="money"
            label-width="85px"
            label="قابل پرداخت"
            v-model="model.Payable"
            cdcName="Payable"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="money"
            label="عوارض"
            label-width="85px"
            v-model="model.IncomeValue"
            cdcName="IncomeValue"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تقسیط"
            label-width="85px"
            v-model="model.InsatllmentValue"
            cdcName="InsatllmentValue"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تخفیف"
            label-width="85px"
            v-model="model.DiscountValue"
            cdcName="DiscountValue"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            type="money"
            label="بستانکاری"
            label-width="85px"
            v-model="model.OddmentValue"
            cdcName="OddmentValue"
            m="r"
          />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm">
        <div class="col-12 q-mt-md">
          <span>مشخصات پرداخت</span>
          <hr style="margin-bottom: 0 !important" />
        </div>
        <FormControl>
          <safa-combo
            label="نام بانک"
            v-model="model.PaymentBank"
            cdcName="CI_Bank"
            ciName="CI_Bank"
            m="e"
            label-width="85px"
          />
          <!-- <safa-text
            label="نام بانک"
            label-width="85px"
            v-model="model.PaymentBank"
            cdcName="PaymentBank"
            m="e"
          /> -->
        </FormControl>
        <FormControl>
          <safa-text
            label="شعبه"
            v-model="model.PaymentBranch"
            cdcName="PaymentBranch"
            m="e"
            label-width="85px"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            v-model="model.PaymentDate"
            cdcName="PaymentDate"
            label-width="85px"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد پیگیری"
            v-model="model.PaymentRahgiriCode"
            cdcName="PaymentRahgiriCode"
            label-width="85px"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            ciName="CI_IncomeFicheConfirmType"
            domainName="CI_SaraM1"
            v-model="model.CI_IncomeFicheConfirmType"
            cdcName="CI_IncomeFicheConfirmType"
            label="روش تایید"
            label-width="85px"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            v-model="model.PaymentReferenceNo"
            cdcName="PaymentReferenceNo"
            label-width="85px"
            m="e"
          />
        </FormControl>
      </FormRow>
      <div class="fit">
        <text-template
          :rows="2"
          formKey="f344fbfc-dddc-407b-9324-057bd8c7024c"
          label="توضیحات"
          label-width="85px"
          v-model="model.Comments"
          cdcName="Comments"
          m="e"
        />
      </div>
      <FormRow>
        <div class="col-12 q-mt-md">
          <span>مشخصات چک</span>
          <hr style="margin-bottom: 0 !important" />
        </div>
        <FormControl>
          <safa-text
            label="شماره چک بانکی"
            v-model="model.CheckNo"
            cdcName="checkNo"
            label-width="85px"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام بانک چک"
            label-width="85px"
            v-model="model.BankCheckName"
            cdcName="BankCheckName"
            m="e"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شعبه چک"
            label-width="85px"
            v-model="model.BankBranchCheckName"
            cdcName="BankBranchCheckName"
            m="e"
          />
        </FormControl>
      </FormRow>
    </fit>

    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default
          label="تأیید با Pose"
          :disable="lockPoseConfirmBTN"
          @click="showConfirmByPose = true"
        />
        <btn-default
          label="تأیید فیش"
          v-if="isShowConfirmBTN"
          @click="confirmFiche"
        />
        <btn-cancel
          label="ابطال فیش"
          v-if="isShowRevokeBTN"
          @click="revokeFiche"
        />
        <btn-default
          label="تاریخچه پوز"
          v-if="isShowPosHistoryBTN"
          @click="isShowHistoryModal = true"
        />
      </div>
    </template>

    <safa-popup v-model="isShowHistoryModal" title="تاریخچه ی پرداخت با پوز">
      <PosePaymentHistory
        :nidFiche="model.NidFiche"
        :ficheNo="model.FicheNo"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
    </safa-popup>
    <safa-popup
      v-model="showConfirmByPose"
      height="280px"
      width="300px"
      title="انتخاب کردن پوز"
    >
      <ConfirmWithPose
        :name="name"
        :title="title"
        :formKey="formKey"
        :selectedRow="selectedRow"
        @backToFicheTab="$emit('backToFicheTab')"
        ref="confirmFiche"
        :config="config"
      />
    </safa-popup>
  </form-wrapper>
</template>

<script>
import PosePaymentHistory from "./PosePaymentHistory.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import ConfirmWithPose from "./ConfirmWithPose.vue"

export default {
  mixins: [baseFormMixin],
  components: { PosePaymentHistory, ConfirmWithPose },
  props: {
    config: Object,
    selectedRow: Object,
    selectedCalculationRow: Object,
    formKey: String,
    title: String,
    name: String
  },

  data () {
    return {
      getIncomeFicheFromBillIDRes: null,
      getIncomeFicheFromFicheNoRes: null,
      ficheConfirmRes: null,
      ficheRevokeRes: null,

      incomeFicheObj: {
        Fiche: {
          Income_Fiche: []
        },
        Income: {}
      },

      model: {
        BankBranchCheckName: null,
        BankCheckName: null,
        BillID: "",
        CI_IncomeAccountGroup: 0,
        CI_IncomeFicheConfirmType: 0,
        CheckNo: null,
        Comments: "",
        DiscountValue: 0,
        EumFicheStatus: null,
        FicheNo: "",
        IncomeValue: 0,
        InsatllmentValue: 0,
        NidFiche: "",
        NidIncome: "",
        OddmentValue: 0,
        Payable: 0,
        PaymentBank: null,
        PaymentBranch: null,
        PaymentDate: null,
        PaymentID: null,
        PaymentRahgiriCode: null,
        PaymentReferenceNo: null,
        PaymentTime: null
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

      lockPoseConfirmBTN: true,
      isShowPosHistoryBTN: false,
      isShowConfirmBTN: false,
      isShowRevokeBTN: false,
      isShowHistoryModal: false,
      showConfirmByPose: false
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.isShowPosHistoryBTN = false
      this.isShowConfirmBTN = false
      this.isShowRevokeBTN = false
      const payload = {
        pFicheNo: this.selectedRow.FicheNo,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showLoading()
      this.$services.SD.getIncomeFicheFromFicheNo(payload, this.config)
        .then(async ({ data }) => {
          this.getIncomeFicheFromFicheNoRes = this.getResponse(data)
          if (this.getIncomeFicheFromFicheNoRes.success) {
            this.incomeFicheObj = this.getIncomeFicheFromFicheNoRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.FicheNo,
              bizCodeTitle: "FicheNo",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `نمایش اطلاعات فیش با شماره ${this.model.FicheNo} انجام گردید.`
            })
            if (this.incomeFicheObj.Fiche.Income_Fiche.length > 1) {
              this.showError("با این شماره بیش از یک فیش یافت شد.")
            } else if (this.incomeFicheObj.Fiche.Income_Fiche.length === 1) {
              const obj = this.incomeFicheObj.Fiche.Income_Fiche[0]
              this.model = {
                ...obj,
                CI_IncomeFicheConfirmType: obj.CI_IncomeFicheConfirmType ?? 0,
                PaymentDate:
                  obj.PaymentDate ??
                  new PersianDate().toLocale("en").format("L")
              }

              if (obj.EumFicheStatus === 0) {
                this.showError(
                  "فیش در وضعیت صدور موقت قرار دارد و نمی توان آن را تأیید کرد."
                )
              } else if (obj.EumFicheStatus === 1) {
                this.showError(
                  "فیش در وضعیت صدور قطعی است و نمی توان آن را تأیید کرد."
                )
              } else if (obj.EumFicheStatus === 2) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowConfirmBTN = true
              } else if (obj.EumFicheStatus === 3) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowRevokeBTN = true
              } else if (obj.EumFicheStatus === 4) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowConfirmBTN = true
              } else {
                this.showError(
                  "برای تأیید، فیش باید در وضعیت ابطال  شده یا چاپ شده باشد."
                )
              }
            } else {
              this.showError("فیشی با این شماره یافت نشد.")
            }
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
    normalizeModel (e) {
      return {
        // ...e,
        NidUser: this.getNidUser(),
        UserName: this.getUserDisplayName(),
        BankBranchCheckName: e.BankBranchCheckName ?? "",
        BankCheckName: e.BankCheckName ?? "",
        BillID: e.BillID ?? "",
        CI_IncomeAccountGroup: e.CI_IncomeAccountGroup ?? 0,
        CI_IncomeFicheConfirmType: e.CI_IncomeFicheConfirmType ?? 0,
        CheckNo: e.CheckNo ?? "",
        Comments: e.Comments ?? "",
        DiscountValue: e.DiscountValue ?? 0,
        EumFicheStatus: e.EumFicheStatus ?? "",
        FicheNo: e.FicheNo ?? "",
        IncomeValue: e.IncomeValue ?? 0,
        InsatllmentValue: e.InsatllmentValue ?? 0,
        NidFiche: e.NidFiche ?? "",
        NidIncome: e.NidIncome ?? "",
        OddmentValue: e.OddmentValue ?? 0,
        Payable: e.Payable ?? 0,
        PaymentBank: e.PaymentBank ?? "",
        PaymentBranch: e.PaymentBranch ?? "",
        PaymentDate: e.PaymentDate ?? "",
        PaymentID: e.PaymentID ?? "",
        PaymentRahgiriCode: e.PaymentRahgiriCode ?? "",
        PaymentReferenceNo: e.PaymentReferenceNo ?? "",
        PaymentTime: e.PaymentTime ?? "",
        EumFicheConfirmMethode: 1, // base on xaml,
        EumIncomePaymentType: 1, // base on xaml => Manual
        ConfirmTypeDetailes: e.ConfirmTypeDetailes ?? null
      }
    },
    confirmFiche () {
      this.showConfirm(`آیا از تأیید فیش با شماره ${this.model.FicheNo} اطمینان دارید؟`).onOk(async () => {
        try {
          this.showLoading()
          const { data } = await this.$services.SD.ficheConfirm(
            { pDto: this.normalizeModel(this.model) },
            this.config
          )
          this.ficheConfirmRes = this.getResponse(data)
          if (this.ficheConfirmRes.success) {
            this.showSuccess("تأیید فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.model.FicheNo,
              bizCodeTitle: "FicheNo",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `تأیید فیش با شماره ${this.model.FicheNo} انجام گردید.`
            })
            this.$emit("backToFicheTab")
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideSending()
        }
      })
    },
    revokeFiche () {
      this.showConfirm(`آیا از ابطال فیش با شماره ${this.model.FicheNo} اطمینان دارید؟`).onOk(async () => {
        try {
          const payload = {
            pNidFiche: this.model.NidFiche,
            pNidUser: this.getNidUser(),
            pUserName: this.getUserDisplayName()
          }
          const { data } = await this.$services.SD.ficheRevoke(
            payload,
            this.config
          )
          this.ficheRevokeRes = this.getResponse(data)
          if (this.ficheRevokeRes.success) {
            this.showSuccess("ابطال فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.model.FicheNo,
              bizCodeTitle: "FicheNo",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال فیش با شماره ${this.model.FicheNo} انجام گردید.`
            })
            this.$emit("backToFicheTab")
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideSending()
        }
      })
    },

    getIncomeFicheFromBillID () {
      this.isShowPosHistoryBTN = false
      this.isShowConfirmBTN = false
      this.isShowRevokeBTN = false
      const payload = {
        pBillID: this.billId,
        pPaymentID: this.paymentId
      }
      this.showLoading()
      this.$services.SD.getIncomeFicheFromBillID(payload, this.config)
        .then(async ({ data }) => {
          this.getIncomeFicheFromBillIDRes = this.getResponse(data)

          if (this.getIncomeFicheFromBillIDRes.success) {
            this.incomeFicheObj = this.getIncomeFicheFromBillIDRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRow.FicheNo,
              bizCodeTitle: "FicheNo",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              // this.billId === "" || this.paymentId === ""
              saveDesc: `نمایش اطلاعات فیش با شناسه قبض ${this.billId} و شناسه پرداخت ${this.paymentId} انجام گردید.`
            })
            if (this.incomeFicheObj.Fiche.Income_Fiche.length > 1) {
              this.showError("با این شماره بیش از یک فیش یافت شد.")
            } else if (this.incomeFicheObj.Fiche.Income_Fiche.length === 1) {
              const obj = this.incomeFicheObj.Fiche.Income_Fiche[0]
              this.model = {
                ...obj,
                CI_IncomeFicheConfirmType: obj.CI_IncomeFicheConfirmType ?? 0,
                PaymentDate:
                  obj.PaymentDate ??
                  new PersianDate().toLocale("en").format("L")
              }

              if (obj.EumFicheStatus === 0) {
                this.showError(
                  "فیش در وضعیت صدور موقت قرار دارد و نمی توان آن را تأیید کرد."
                )
              } else if (obj.EumFicheStatus === 1) {
                this.showError(
                  "فیش در وضعیت صدور قطعی است و نمی توان آن را تأیید کرد."
                )
              } else if (obj.EumFicheStatus === 2) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowConfirmBTN = true
              } else if (obj.EumFicheStatus === 3) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowRevokeBTN = true
              } else if (obj.EumFicheStatus === 4) {
                this.lockPoseConfirmBTN = false
                this.isShowPosHistoryBTN = true
                this.isShowConfirmBTN = true
              } else {
                this.showError(
                  "برای تأیید، فیش باید در وضعیت ابطال  شده یا چاپ شده باشد."
                )
              }
            } else {
              this.showError("فیشی با این شماره یافت نشد.")
            }
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
    searchByBillId () {
      if (this.billId === "" || this.paymentId === "") {
        this.showError("لطفا شناسه قبض و شناسه پرداخت را وارد کنید.")
      } else {
        this.getIncomeFicheFromBillID()
      }
    }
  }
}
</script>
