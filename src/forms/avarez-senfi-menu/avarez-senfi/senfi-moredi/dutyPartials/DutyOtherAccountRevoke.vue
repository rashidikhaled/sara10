<template>
   <div>
      <safa-combo
        label="علت ابطال"
        ciName="CI_DutyOddmentCancelDes"
         domainName="CI_SaraM1"
        v-model="revokeCause"
      />

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
      revokeCause: 0,
      saveResult: null
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String,
    selectedRow: Object,
    district: Number
  },
  methods: {
    save () {
      if (this.revokeCause === 0) {
        this.showError('لطفا علت ابطال را مشخص کنید.')
      } else {
        this.showLoading()
        let data = {
          pNidOddment: this.selectedRow.NidOddment,
          pCI_DutyOddmentCancelDes: this.revokeCause,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }

        this.$services.SB.cancelOddmentAccount(data, { config: { District: this.district } })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this.showSuccess('حساب انتخاب شده با موفقیت باطل شد')
              this.$emit('reloadOtherAccount')

              await this.log({
                action: this.logActions.cancel,
                bizCode: '',
                bizCodeTitle: '',
                saveDesc: `ابطال فیش ${this.selectedRow?.FicheNo ?? ''} در فرم ${this.title} انجام گردید.`
              })
            }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    cancel () {
      this.$emit('reloadOtherAccount')
    }
  }
}
</script>
