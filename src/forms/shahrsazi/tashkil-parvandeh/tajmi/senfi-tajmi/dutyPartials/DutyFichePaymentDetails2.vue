<template>
  <div class="q-pa-md">
    <safa-status class="col-12" :result="saveResult"></safa-status>
    <div class="row full-width  q-mb-md">
      <div class="col-md-6">
        <safa-combo
          label="کد بانک"
          ciName="CI_Bank"
          domainName="CI_SaraM1"
          v-model="confirmBankCode"
        ></safa-combo>
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
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      confirmBankCode: 0,
      paymentRahgiriCode: '',
      PaymentReferenceNo: '',
      paymentDate: '',
      bankConfirmPrice: '',
      saveResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    save () {
      if (this.showConfirmBankCode !== 0) {
        this.showLoading()
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: 2,
          pSetPayOffForConfirmYearly: true,
          pSetPayOffForConfirmCollective: false,
          pSetPayOffForConfirmTaghsit: false,
          pIsCancelOtherFiche: false,
          pIsShowAccountingError: false,
          pCI_Bank: this.showConfirmBankCode
        }

        this.$services.SB.estelamBank(data)
          .then(({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              this.$emit('reloadDutyFiche2', this.saveResult)
            }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError('لطفا کد بانک را انتخاب نمایید.')
      }
    },
    cancel () {
      this.$emit('reloadDutyFiche2')
    }
  }
}
</script>
