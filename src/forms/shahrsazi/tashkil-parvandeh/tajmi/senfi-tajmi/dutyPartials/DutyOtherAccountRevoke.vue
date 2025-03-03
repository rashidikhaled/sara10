<template>
   <div class="q-pa-lg">
    <div class="form-row">
      <safa-combo
        label="علت ابطال"
        ciName="CI_DutyOddmentCancelDes"
         domainName="CI_SaraM1"
        v-model="revokeCause"
      />
    </div>
    <div class="row q-gutter-md q-mt-md ">
      <q-btn label="ذخیره" color="green" @click="save" icon="done"></q-btn>
      <q-btn
        label="انصراف"
        color="grey-13"
        @click="cancel"
        icon="arrow_right_alt"
      />
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
      revokeCause: 0,
      saveResult: null
    }
  },
  props: {
    selectedRow: Object
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

        this.$services.SB.cancelOddmentAccount(data)
          .then(({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this.showSuccess('حساب انتخاب شده با موفقیت باطل شد')
              this.$emit('reloadOtherAccount')
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
