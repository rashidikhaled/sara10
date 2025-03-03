<template>
  <fit>
    <safa-status :result="cancelOddmentAccountRes" />
    <div class="fit q-pa-sm">
      <safa-combo
        label="علت ابطال"
        label-width="70px"
        v-model="ciDutyOddmentCancelDes"
        cdcName="CI_DutyOddmentCancelDes"
        ciName="CI_DutyOddmentCancelDes"
        domainName="CI_SaraM1"
        validations="required"
      />
    </div>
    <q-separator />
    <form-actions class="q-pa-sm" m="e" @save="save" @cancel="cancel" />
  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "DutyOtherAccountRevoke",
  mixins: [baseFormMixin],
  data: function () {
    return {
      ciDutyOddmentCancelDes: 0,
      cancelOddmentAccountRes: null
    }
  },
  props: {
    baseNosaziCode: Object,
    formKey: String,
    title: String,
    name: String,
    selectedRow: Object
  },
  methods: {
    async save () {
      if (!this.isValidForm()) return
      try {
        const payload = {
          pNidOddment: this.selectedRow.NidOddment,
          pCI_DutyOddmentCancelDes: this.ciDutyOddmentCancelDes,
          pNidUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.showLoading()
        const { data } = await this.$services.SB.cancelOddmentAccount(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.cancelOddmentAccountRes = this.getResponse(data)
        if (this.cancelOddmentAccountRes.success) {
          this.showSuccess("حساب انتخاب شده با موفقیت باطل شد.")
          await this.log({
            action: this.logActions.cancel,
            bizCode: this.selectedRow.NidOddment,
            bizCodeTitle: "NidOddment",
            nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
          })
          this.$emit("reloadOtherAccount")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    cancel () {
      this.$emit("reloadOtherAccount")
    }
  }
}
</script>
