<template>
  <form-wrapper>
    <safa-status  :result="saveResult"/>
    <div class="row full-width  q-mb-md">
      <div class="col-md-6">
        <safa-combo
          label="کد بانک"
          ciName="CI_Bank"
          domainName="CI_SaraM1"
          v-model="confirmBankCode"
        />
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
  </form-wrapper>
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
    formKey: String,
    title: String,
    name: String,
    selectedRow: Object,
    baseNosaziCode: Object
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

        this.$services.SB.estelamBank(data, { config: { District: this.baseNosaziCode.District } })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            if (this.saveResult.success) {
              this.$emit('reloadDutyFiche2', this.saveResult)
              await this.log({
                action: this.logActions.view,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `استعلام بانک در فرم ${this.title} انجام گردید.`
              })
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
