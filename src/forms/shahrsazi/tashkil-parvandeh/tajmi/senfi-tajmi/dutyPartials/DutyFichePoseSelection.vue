<template>
  <div class="q-pa-md">
    <div class="form-row">
       <safa-combo-enum
      class="col-12"
      enum-name="EumPoseType"
      v-model="poseType"
    />
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
import posMixin from 'src/mixins/posMixin'

export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin, posMixin],
  data: function () {
    return {
      poseType: 1,
      // eslint-disable-next-line vue/no-reserved-keys
      _GIDPoseFicheHistory: ''
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    save () {
      this.showConfirm(
        'آیا از تأیید فیش انتخاب شده از طریق پوز اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        let data = {
          pNidFiche: this.selectedRow.NidFiche,
          pFicheNo: this.selectedRow.FicheNo,
          pEumPoseType: this.poseType,
          pEumObjOnPrice: 2,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()

        }

        this.$services.SB.addLogPose(data)
          .then(({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
              this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              this.$emit('reloadDutyFiche')
            }
          })
          .catch(response => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },
    cancel () {
      this.$emit('reloadDutyFiche')
    }
  }
}
</script>
