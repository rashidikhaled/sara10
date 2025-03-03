<template>
  <safa-form
    appId="c254f209-304e-41f0-a95a-174cf1279618"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template>
        <safa-status :result="loadRes" />
        <safa-status :result="saveRes" />
      </template>

      <FormRow class="q-mb-sm">
        <FormControl class="flex items-center">
          <safa-radio
            label="جستجو بر اساس شماره فیش"
            v-model="searchBy"
            cdcName="searchBy"
            :val="0"
          />
        </FormControl>
        <FormControl class="flex items-center">
          <safa-radio
            label="جستجو بر اساس شناسه"
            v-model="searchBy"
            cdcName="searchBy"
            :val="1"
          />
        </FormControl>
      </FormRow>

      <FormRow class="q-mb-sm" v-if="searchBy === 0">
        <FormControl>
          <safa-text
            label="شماره فیش"
            v-model="ficheNo"
            cdcName="ficheNo"
            label-width="100px"
            dir="ltr"
            @keyup.enter="loadObj"
            :required="searchBy === 0 ? true : false"
            :validations="searchBy === 0 ? ['required', 'number'] : ''"
          />
        </FormControl>
        <FormControl>
          <btn-search label="جستجو" @click="loadObj" />
        </FormControl>
      </FormRow>
      <FormRow class="q-mb-sm" v-else>
        <FormControl>
          <safa-text
            label="شناسه قبض"
            v-model="billID"
            cdcName="billID"
            label-width="100px"
            dir="ltr"
            @keyup.enter="loadObj"
            :required="searchBy === 1 ? true : false"
            :validations="searchBy === 1 ? ['required', 'number'] : ''"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شناسه پرداخت"
            v-model="paymentID"
            cdcName="paymentID"
            label-width="100px"
            dir="ltr"
            @keyup.enter="loadObj"
            :required="searchBy === 1 ? true : false"
            :validations="searchBy === 1 ? ['required', 'number'] : ''"
          />
        </FormControl>
        <div>
          <btn-search label="جستجو" @click="loadObj" />
        </div>
      </FormRow>
      <q-separator class="q-my-sm" />
      <FormRow>
        <FormControl>
          <safa-text
            label="بانک"
            label-width="100px"
            v-model="model.PaymentBank"
            cdcName="PaymentBank"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع پرداخت فیش"
            label-width="100px"
            v-model="eumFicheConfirmMethode"
            cdcName="eumFicheConfirmMethode"
            source-type="local"
            :options="eumFicheConfirmMethodeOptions"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            label-width="100px"
            v-model="paymentDate"
            cdcName="PaymentDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره فیش"
            label-width="100px"
            v-model="model.FicheNo"
            cdcName="FicheNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شناسه قبض"
            label-width="100px"
            v-model="model.BillID"
            cdcName="BillID"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شناسه پرداخت"
            label-width="100px"
            v-model="model.PaymentID"
            cdcName="PaymentID"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت فعلی فیش درآمد"
            label-width="100px"
            v-model="model.EumFicheStatus"
            cdcName="EumFicheStatus"
            source-type="local"
            :options="eumIncomeFicheStatusOptions"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-custom-text
            label="مبلغ فیش"
            label-width="100px"
            v-model="model.FicheAmount"
            cdcName="FicheAmount"
            type="money"
            m="r"
          />
        </FormControl>
        <text-template
          label="توضیحات"
          label-width="100px"
          v-model="model.Comments"
          cdcName="Comments"
          class="col-12"
          :rows="3"
          m="r"
        />
      </FormRow>

      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default
            label="تأیید فیش"
            :disable="lockConfirmBtn"
            @click="saveObj"
          />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UConfirmFiche",
      title: "تایید فیش درآمدهای عمومی",
      formKey: "1DB1D2A9-B53D-4F96-93FB-EB139BFB7F4D",
      main: true,
      sidebarCompatible: true,

      loadRes: null,
      saveRes: null,
      searchBy: 0,
      ficheNo: "",
      billID: "",
      paymentID: "",

      incomeFicheResult: null,

      eumIncomeFicheStatusOptions: [
        { ID: 0, Title: "صدور موقتی" }, // TemporaryExport
        { ID: 1, Title: "صدور قطعی" }, // PermanentExport
        { ID: 2, Title: "چاپ" }, // Print
        { ID: 3, Title: "تایید" }, // Confirm
        { ID: 4, Title: "ابطال" }, // Revoke
        { ID: 5, Title: "تایید بانک" }, // BankConfirm
        { ID: 6, Title: "استرداد" }, // Refund
        { ID: 7, Title: "در حال انتقال" } // TransferConfirm
      ],
      eumFicheConfirmMethode: 1,
      eumFicheConfirmMethodeOptions: [
        { ID: 1, Title: "نامشخص" }, // UnTitle
        { ID: 2, Title: "ATM" }, // ATM
        { ID: 3, Title: "شعبه" }, // Branch
        { ID: 5, Title: "اينترانت" }, // Intranet
        { ID: 6, Title: "SMS" }, // SMS
        { ID: 7, Title: "تلفن بانک" }, // BankTel
        { ID: 8, Title: "خود دريافت" }, // SelfReceive
        { ID: 9, Title: "بانک پرداخت" }, // BankPayment
        { ID: 13, Title: "Web Kiosk" }, // WebKiosk
        { ID: 14, Title: "پوز" }, // POS
        { ID: 15, Title: "تهاتر" }, // Tahator
        { ID: 16, Title: "چک مدت دار" }, // DatedCheck
        { ID: 17, Title: "چک بین بانکی" }, // InterBankCheck
        { ID: 59, Title: "اينترنت" } // Internet
      ],
      paymentDate: currentDate(),
      model: {
        BillID: null,
        Comments: null,
        EumFicheConfirmMethode: null,
        EumFicheStatus: null,
        FicheAmount: null,
        FicheNo: null,
        IsDeleted: false,
        NidFiche: null,
        PaymentBank: null,
        PaymentDate: null,
        PaymentID: null
      }
    }
  },

  computed: {
    lockConfirmBtn () {
      return !this.model.NidFiche
    }
  },

  methods: {
    loadObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {}
      if (this.searchBy === 0) {
        payload.FicheNo = this.ficheNo
      } else {
        payload.PaymentID = this.paymentID
        payload.BillID = this.billID
      }
      this.$services.generalIncome
        .getGeneralIncomeFicheInfo(payload)
        .then(async ({ data }) => {
          this.loadRes = this.getResponse(data)
          if (this.loadRes.success) {
            this.model = this.loadRes.data.generalIncomeFicheSingle
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.FicheNo,
              bizCodeTitle: "FicheNo"
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

    saveObj () {
      if (!this.isValidForm()) return
      this.showConfirm(
        `آیا از تأیید فیش ${this.model.FicheNo} اطمینان دارید؟`
      ).onOk(() => {
        this.ficheConfirm()
      })
    },

    ficheConfirm () {
      this.showLoading()
      this.$services.generalIncome
        .changeStatusOfFiche({
          pNidFiche: this.model.NidFiche,
          pFicheStatus: 3, // this.model.EumFicheStatus,
          pUser: this.currentUser,
          pPaymentBank: this.model.PaymentBank,
          pPaymentDate: this.paymentDate,
          pFicheConfirmMethode: this.eumFicheConfirmMethode
        })
        .then(async ({ data }) => {
          this.changeStatusOfFicheResult = this.getResponse(data)
          if (this.changeStatusOfFicheResult.success) {
            this.showSuccess("تایید فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.model.NidFiche,
              bizCodeTitle: "NidFiche",
              saveDesc: `تایید فیش ${this.model.FicheNo} انجام شد.`
            })
            this.reset()
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
    reset () {
      this.resetValidation()
      this.ficheNo = ""
      this.billID = ""
      this.paymentID = ""
      this.model.NidFiche = null
    }
  },

  watch: {
    searchBy: {
      handler () {
        this.reset()
      },
      immediate: true
    }
  }
}
</script>
