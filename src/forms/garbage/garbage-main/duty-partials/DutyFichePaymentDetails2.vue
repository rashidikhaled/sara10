<template>
  <div>
    <safa-status :result="saveResult"/>
    <safa-combo
      v-model="confirmBankCode"
      cdcName="confirmBankCode"
      ciName="CI_Bank"
      class="pa-md"
      domainName="CI_SaraM1"
      label="کد بانک"
    />
    <div class="row justify-center q-gutter-sm q-mt-sm ">
      <btn-save
        label="ذخیره"
        @click="save"
      />
      <btn-cancel
        label="انصراف"
        @click="cancel"
      />
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'

export default {
  name: 'DutyFichePaymentDetails2',
  mixins: [baseFormMixin],
  data: function () {
    return {
      confirmBankCode: 0,
      paymentRahgiriCode: '',
      PaymentReferenceNo: '',
      paymentDate: '',
      bankConfirmPrice: '',
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      saveResult: null
    }
  },
  props: {
    selectedRow: Object,
    baseNosaziCode: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    save () {
      if (this.showConfirmBankCode !== 0) {
        this.showLoading()
        let data = {
          pDutyFiche: this.selectedRow,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName(),
          PDutyType: this.getClsEnumEumDutyType.Garbage.value,
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
              await this.log({
                action: this.logActions.save,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: 'NidFiche'
              })

              this.$emit('reloadDutyFiche2', this.saveResult)
            }
          })

          .catch(err => {
            console.error(err)
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
