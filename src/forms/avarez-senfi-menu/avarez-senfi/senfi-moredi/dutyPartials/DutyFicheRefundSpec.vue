<template>
  <form-wrapper>
    <safa-status :result="saveResult"></safa-status>
    <div class="q-gutter-sm">
      <safa-text
        label="شماره نامه استرداد"
        ciName="CI_Bank"
        domainName="CI_SaraM1"
        v-model="refundNo"
      ></safa-text>
      <safa-datepicker
        label="تاریخ نامه استرداد"
        v-model="refundDate"
      ></safa-datepicker>
    </div>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save
          label="ذخیره"
          @click="save"
        ></btn-save>
        <btn-cancel
          label="انصراف"
          @click="cancel"
        ></btn-cancel>
      </div>
    </template>

  </form-wrapper>
</template>
<script>
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      refundNo: "",
      refundDate: "",
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

      this.$services.SB.cancelFiche(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.showSuccess("فیش انتخاب شده با موفقیت استرداد شد.")
            this.$emit("reloadDutyFiche")
            await this.log({
              action: this.logActions.cancel,
              bizCode: this.selectedRow?.NidFiche.toString(),
              bizCodeTitle: "شماره فیش",
              saveDesc: `استرداد فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
            })
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
      this.$emit("reloadDutyFiche")
    }
  }
}
</script>
