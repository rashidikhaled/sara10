<template>
  <div>
    <safa-status class="col-12" :result="saveResult"></safa-status>
    <div class="row q-my-md">
      <safa-combo-enum
        label="دستگاه پوز"
        class="col-md-6"
        enum-name="EumPoseType"
        v-model="model.selectedPose"
        cdcName="selectedPose"
      ></safa-combo-enum>
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
        let data = {
          pNidFiche: this.nidFiche,
          pFicheNo: this.ficheNumber,
          pEumPoseType: this.model.selectedPose,
          pEumObjOnPrice: 2,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()

        }

        this.$services.SB.addLogPose(data, this.config)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
            if (this.saveResult.success) {
              this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.nidFiche,
                bizCodeTitle: 'NidFiche',
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `فیش انتخاب شده با شماره  ${this.ficheNumber} با موفقیت تأیید گردید.`
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
