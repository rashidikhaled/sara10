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
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      refundNo: '',
      refundDate: '',
      saveResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    save () {
      this.showLoading()
      let data = {
        pNidFiche: this.selectedRow.NidFiche,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 2,
        IsRefund: true,
        pRefundLetterNo: this.refundNo,
        pRefundLetterDate: this.refundDate
      }

      this.$services.SB.cancelFiche(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess('فیش انتخاب شده با موفقیت استرداد شد.')
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
