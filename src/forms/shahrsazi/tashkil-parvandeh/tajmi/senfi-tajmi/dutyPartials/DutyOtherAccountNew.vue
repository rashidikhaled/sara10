<template>
<fit>
      <safa-datatable
        m="e"
        helper="dutyOtherAccountNewColumns"
        v-model="results"
        fit
        max-height="100%"
        height="100%"
      />
</fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  // components: { BtnCancel },
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      results: [],
      saveResult: null
    }
  },
  props: { nidFk: String },
  methods: {
    save () {
      this.showLoading()
      let data = {
        pDutyOddment: {
          DutyOddmentAccount: this.results,
          NidFk: this.nidFk,
          SysCiDutyType: 2
        },
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }

      this.$services.SB.saveDutyOddmnetAccount(data)
        .then(({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.$emit('reloadDutyOtherAccount')
            // this.ShowSuccess('ذخیره با موفقیت انجام شد')
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.$emit('reloadDutyOtherAccount')
    }
  }
}
</script>
