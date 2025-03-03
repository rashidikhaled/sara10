<template>
  <fit>
    <safa-datatable
      v-model="dutyOtherAccountNewList"
      cdcName="dutyOtherAccountNew"
      fit
      height="100%"
      helper="dutyOtherAccountNewColumns"
      m="e"
      title="لیست حساب های جدید"
    />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'DutyOtherAccountNew',
  mixins: [baseFormMixin],
  data: function () {
    return {
      dutyOtherAccountNewList: [],
      saveResult: null
    }
  },
  props: {
    nidFk: String,
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
      debugger
      const payload = {
        pDutyOddment: {
          DutyOddmentAccount: this.dutyOtherAccountNewList,
          NidFk: this.nidFk,
          SysCiDutyType: 1
        },
        pNidUser: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      this.showLoading()
      this.$services.SB.saveDutyOddmnetAccount(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            this.showSuccess('عملیات اضافه کردن حساب های متفرقه با موفقیت انجام شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidFk,
              bizCodeTitle: 'NidFk'
            })
            this.cancel()
          }
        })
        .catch((err) => {
          console.error(err)
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
