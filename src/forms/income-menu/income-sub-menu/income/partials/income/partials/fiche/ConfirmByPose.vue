<template>
  <div>
    <safa-status :result="saveResult"></safa-status>
    <div class="row q-my-md">
      <safa-combo-enum
        label="دستگاه پوز"
        class="col-md-6"
        enum-name="EumPoseType"
        v-model="model.selectedPose"
        cdcName="selectedPose"
      />
    </div>
    <div class="row q-gutter-md">
      <q-btn label="تأیید" class="btn-confirm" @click="confirmClick"></q-btn>
      <q-btn label="انصراف" class="btn-cancel" @click="cencelClick"></q-btn>
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import posMixin from 'src/mixins/posMixin'

// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
export default {
  data: function () {
    return {
      model: {
        selectedPose: 0
      },
      saveResult: null,
      msg: '',
      // eslint-disable-next-line vue/no-reserved-keys
      _GIDPoseFicheHistory: ''
    }
  },
  props: {
    config: Object,
    ficheNumber: String,
    nidFiche: String,
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
  mixins: [baseFormMixin, posMixin],
  mounted () {
    this.loadFormSetting()
    this.msg = 'آیا از تأیید فیش به شماره' + `${this.ficheNumber}` + 'از طریق پوز اطمینان دارید؟'
  },
  methods: {
    async loadFormSetting () {
      try {
        this.showLoading()
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "PosUserSettingsForIncome",
            defaultValue: this.model,
            nidProc: this.getNidUser()
          }
        )
        this.model = require('src/utils/mergeSettings').default(this.model, settings)
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.hideLoading()
      }
    },
    confirmClick () {
      this.showConfirm(this.msg
      ).onOk(() => {
        this.showLoading()
        const payload = {
          pNidFiche: this.nidFiche,
          pFicheNo: this.ficheNumber,
          pEumPoseType: this.model.selectedPose,
          pEumObjOnPrice: 2,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.$services.SB.addLogPose(payload, this.config)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.nidFiche,
                bizCodeTitle: 'NidFiche',
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `فیش با شماره ${this.ficheNumber} تأیید شد.`
              })
              this.$emit('reload')
            }
          })
          .catch(e => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideSending()
          })
      })
    },
    cencelClick () {
      this.$emit('reload')
    }
  }
}
</script>
