<template>
  <form-wrapper>
    <div class="q-gutter-y-sm">
      <safa-text
        label="کد بانک"
        v-model="ConfirmBankCode"
        cdcName="ConfirmBankCode"
        label-width="110px"
      />
      <safa-text
        label="کد رهگیری پرداخت"
        v-model="paymentRahgiriCode"
        cdcName="paymentRahgiriCode"
        label-width="110px"
      />
      <safa-text
        label="شماره ارجاع پرداخت"
        v-model="PaymentReferenceNo"
        cdcName="PaymentReferenceNo"
        label-width="110px"
      />
      <safa-datepicker
        label="تاریخ پرداخت"
        v-model="paymentDate"
        cdcName="paymentDate"
        label-width="110px"
      />
      <safa-custom-text
        type="money"
        label="مبلغ تأیید بانک"
        v-model="bankConfirmPrice"
        cdcName="bankConfirmPrice"
        label-width="110px"
      />
    </div>
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <btn-save
          label="ذخیره"
          @click="save"
       />
        <btn-cancel
          label="انصراف"
          @click="cancel"
        />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin/"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      ConfirmBankCode: "",
      paymentRahgiriCode: "",
      PaymentReferenceNo: "",
      paymentDate: "",
      bankConfirmPrice: ""
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String,
    selectedRow: Object,
    baseNosaziCode: Object

  },
  methods: {
    async save () {
      this.showLoading()
      const payload = {
        pNidProc: "00000000-0000-0000-0000-000000000000",
        pDutyFiche: this.selectedRow,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 2,
        pConfirmBankCode: this.ConfirmBankCode || null,
        pPaymentRahgiriCode: parseInt(this.paymentRahgiriCode) || 0,
        pPaymentReferenceNo: this.PaymentReferenceNo || null,
        pPaymentDate: this.paymentDate,
        pBankConfirmPrice: parseInt(this.bankConfirmPrice) || 0,
        pEumDutyPaymentType: 1,
        pEumFicheConfirmMethode: 1,
        pSetPayOffForConfirmYearly: true,
        pSetPayOffForConfirmCollective: false,
        pSetPayOffForConfirmTaghsit: false,
        pIsCancelOtherFiche: false,
        pIsShowAccountingError: false
      }
      try {
        const { data } = await this.$services.SB.confirmFiche(payload, { config: { District: this.baseNosaziCode.District } })
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.showSuccess("فیش انتخاب شده با موفقیت تأیید شد.")
          this.$emit("reloadDutyFiche")
          await this.log({
            action: this.logActions.confirm,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `تایید فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    cancel () {
      this.$emit("reloadDutyFiche")
    }
  }
}
</script>
