<template>
  <div>
    <safa-status :result="saveResult"/>
    <div class="q-pa-md">
      <div class="row q-col-gutter-y-sm">
        <safa-text
          v-model="refundNo"
          cdcName="refundNo"
          ciName="CI_Bank"
          class="col-12"
          domainName="CI_SaraM1"
          label="شماره نامه استرداد"
          label-width="100px"
        />

        <safa-datepicker
          v-model="refundDate"
          cdcName="refundDate"
          class="col-12"
          label="تاریخ نامه استرداد"
          label-width="100px"
        />
      </div>
    </div>
    <div class="row justify-center q-gutter-sm">
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
  mixins: [baseFormMixin],
  name: 'DutyFicheRefundSpec',
  data: function () {
    return {
      refundNo: '',
      refundDate: '',
      saveResult: null
    }
  },
  props: {
    baseNosaziCode: Object,
    selectedRow: Object,
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
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        PDutyType: 1,
        IsRefund: true,
        pRefundLetterNo: this.refundNo,
        pRefundLetterDate: this.refundDate
      }

      this.$services.SB.cancelFiche(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess('فیش انتخاب شده با موفقیت استرداد شد.')
            await this.log({
              action: this.logActions.refund,
              bizCode: this.selectedRow.NidFiche,
              bizCodeTitle: 'NidFiche'
            })
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
