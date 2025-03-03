<template>
  <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="changeStatusOfFicheResult" />
    </template>
    <fit>
      <FormRow>
        <FormControl>
          <safa-text
            label="بانک"
            label-width="80px"
            v-model="paymentBank"
            cdcName="paymentBank"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع پرداخت فیش"
            label-width="80px"
            v-model="value.EumFicheConfirmMethode"
            cdcName="eumFicheConfirmMethode"
            source-type="local"
            :options="eumFicheConfirmMethodeOptions"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="وضعیت فعلی فیش درآمد"
            label-width="80px"
            v-model="eumIncomeFicheStatus"
            cdcName="eumFicheConfirmMethode"
            source-type="local"
            :options="eumIncomeFicheStatusOptions"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ پرداخت"
            label-width="80px"
            v-model="paymentDate"
            cdcName="paymentDate"
          />
        </FormControl>
      </FormRow>
    </fit>
    <form-actions :showEditButton="false">
      <template v-slot:before>
        <btn-save label="تایید" @click="changeStatusOfFiche" />
        <btn-cancel label="انصراف" @click="$emit('hide')" />
      </template>
    </form-actions>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
export default {
  mixins: [baseFormMixin],
  props: ["value", "title", "formKey"],
  data () {
    return {
      name: "ConfirmFiche",
      paymentBank: "",
      paymentDate: currentDate(),
      changeStatusOfFicheResult: null,
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
      eumIncomeFicheStatus: 1,
      eumIncomeFicheStatusOptions: [
        { ID: 0, Title: "صدور موقتی" }, // TemporaryExport
        { ID: 1, Title: "صدور قطعی" }, // PermanentExport
        { ID: 2, Title: "چاپ" }, // Print
        { ID: 3, Title: "تایید" }, // Confirm
        { ID: 4, Title: "ابطال" }, // Revoke
        { ID: 5, Title: "تایید بانک" }, // BankConfirm
        { ID: 6, Title: "استرداد" }, // Refund
        { ID: 7, Title: "در حال انتقال" } // TransferConfirm
      ]
    }
  },

  methods: {
    changeStatusOfFiche () {
      this.showLoading()
      this.$services.generalIncome
        .changeStatusOfFiche({
          pNidFiche: this.value.NidFiche,
          pFicheStatus: 3, // this.eumIncomeFicheStatus,
          pUser: this.currentUser,
          pPaymentBank: this.paymentBank,
          pPaymentDate: this.paymentDate,
          pFicheConfirmMethode: this.value.EumFicheConfirmMethode
        })
        .then(async ({ data }) => {
          this.changeStatusOfFicheResult = this.getResponse(data)
          if (this.changeStatusOfFicheResult.success) {
            this.showSuccess("تایید فیش با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.confirmFiche,
              bizCode: this.value.NidFiche,
              bizCodeTitle: "NidFiche"
            })
            this.$emit("confirm")
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
