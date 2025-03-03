<template>
  <div class="q-pa-md">
    <div class="row full-width q-col-gutter-md q-mb-md">
      <div class="col-md-6">
        <safa-text label="کد بانک" v-model="confirmBankCode"></safa-text>
      </div>
      <div class="col-md-6">
        <safa-text label="کد رهگیری پرداخت" v-model="paymentRahgiriCode"></safa-text>
      </div>
    </div>
    <div class="row full-width q-col-gutter-md q-mb-md">
      <div class="col-md-6">
        <safa-text label="شماره ارجاع پرداخت" v-model="PaymentReferenceNo"></safa-text>
      </div>
      <div class="col-md-6">
        <safa-datepicker label="تاریخ پرداخت" v-model="paymentDate"></safa-datepicker>
      </div>
    </div>
    <div class="row full-width q-col-gutter-md">
      <div class="col-md-6">
        <safa-custom-text type="money" label="مبلغ تأیید بانک" v-model="bankConfirmPrice"/>
      </div>
    </div>
      <div class="row q-gutter-md q-mt-md ">
      <q-btn label="ذخیره" color="green" @click="save" icon="done"></q-btn>
      <q-btn
        label="انصراف"
        color="grey-13"
        @click="cancel"
        icon="arrow_right_alt"
      ></q-btn>
    </div>
  </div>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin/'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      confirmBankCode: '',
      paymentRahgiriCode: '',
      PaymentReferenceNo: '',
      paymentDate: '',
      bankConfirmPrice: ''
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    save () {
      this.showLoading()
      let data = {
        pNidProc: '00000000-0000-0000-0000-000000000000',
        pDutyFiche: this.selectedRow,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 2,
        pConfirmBankCode: this.showConfirmBankCode,
        pPaymentRahgiriCode: parseInt(this.paymentRahgiriCode) || 0,
        pPaymentReferenceNo: parseInt(this.paymentReferenceNo) || 0,
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

      this.$services.SB.confirmFiche(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
            this.$emit('reloadDutyFiche')
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('reloadDutyFiche')
    }
  }
}
</script>
