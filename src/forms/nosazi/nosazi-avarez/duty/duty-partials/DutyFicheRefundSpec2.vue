<template>
  <div>
    <safa-status :result="saveResult"></safa-status>
    <div class="row q-col-gutter-lg">
      <div class="col-md-6">
        <safa-text
          v-model="refundNo"
          cdcName="refundNo"
          ciName="CI_Bank"
          domainName="CI_SaraM1"
          label="شماره نامه استرداد"
        ></safa-text>
      </div>
      <div class="col-md-6">
        <safa-datepicker
          v-model="refundDate"
          cdcName="refundDate"
          label="تاریخ نامه استرداد"
        ></safa-datepicker>
      </div>
    </div>
    <div class="row q-gutter-md q-mt-md ">
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

export default {
  name: 'DutyFicheRefundSpec2',
  mixins: [baseFormMixin],
  data: function () {
    return {
      refundNo: '',
      refundDate: '',
      saveResult: null
    }
  },
  props: {
    selectedRow: Object,
    isRefund: Boolean,
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
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche,
        pNidConfirmFiche: '00000000-0000-0000-0000-000000000000',
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 1,
        IsRefund: this.isRefund,
        pRefundLetterNo: this.refundNo,
        pRefundLetterDate: this.refundDate
      }

      this.$services.SB.cancelFicheMultiPayment(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            if (this.isRefund) {
              this.showSuccess('فیش انتخاب شده با موفقیت استرداد شد.')
              await this.log({
                action: this.logActions.refund,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: 'NidFiche'
              })
            } else {
              this.showSuccess('فیش انتخاب شده با موفقیت باطل شد.')
              await this.log({
                action: this.logActions.cancel,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: 'NidFiche'
              })
            }
            this.$emit('reloadDutyFiche')
          }
        })

        .catch(err => {
          console.error(err)
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
