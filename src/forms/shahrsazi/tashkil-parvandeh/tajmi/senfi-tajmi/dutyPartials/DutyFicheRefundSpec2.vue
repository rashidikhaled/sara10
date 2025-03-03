<template>
  <div class="q-pa-md">
    <safa-status class="col-12" :result="saveResult"></safa-status>
    <div class="row full-width  q-mb-md">
      <div class="col-md-6">
        <safa-text
          label="شماره نامه استرداد"
          ciName="CI_Bank"
          domainName="CI_SaraM1"
          v-model="refundNo"
        ></safa-text>
      </div>
      <div class="col-md-6">
        <safa-datepicker label="تاریخ نامه استرداد"
         v-model="refundDate"></safa-datepicker>
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
export default {
  data: function () {
    return {
      refundNo: '',
      refundDate: '',
      saveResult: null
    }
  },
  props: {
    selectedRow: Object,
    isRefund: Boolean
  },
  methods: {
    save () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche,
        pNidConfirmFiche: '00000000-0000-0000-0000-000000000000',
        pUserCode: 'cc0d4ce1-e78e-4a1e-9192-4c2ae25625b6',
        pUserName: 'مژگان طاهری (TaheriM)',
        PDutyType: 1,
        IsRefund: this.isRefund,
        pRefundLetterNo: this.refundNo,
        pRefundLetterDate: this.refundDate
      }

      this.$services.SB.cancelFicheMultiPayment(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            if (this.isRefund) {
              this.showSuccess('فیش انتخاب شده با موفقیت استرداد شد.')
            } else {
              this.showSuccess('فیش انتخاب شده با موفقیت باطل شد.')
            }
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
