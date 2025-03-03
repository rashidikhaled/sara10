<template>
  <div>
    <safa-status :result="saveResult"></safa-status>
    <div class="row q-col-gutter-md q-mb-md">
      <safa-combo-enum
        label="دستگاه پوز"
        class="col-12 col-md-4 col-sm-auto"
        enum-name="EumPoseType"
        v-model="selectedPose"
        label-width="100px"
      ></safa-combo-enum>
      <div class=" col-auto ">
        <btn-default
          label="تأیید"
          @click="confirmClick"
          class="q-mr-sm"
        ></btn-default>
        <btn-cancel
          label="انصراف"
          @click="cencelClick"
        ></btn-cancel>
      </div>
    </div>
    <div class="row">
      <UPoseSettingBankShahr
        class="col-12"
        v-if="selectedPose === 1"
      />
      <UPoseSettingBankMeli
        class="col-12"
        v-if="selectedPose === 2"
      />
      <UPoseSettingBankTejarat
        class="col-12"
        v-if="selectedPose == 3"
      />
      <UPoseSettingBankAnsar
        class="col-12"
        v-if="selectedPose === 4"
      />
      <UPoseSettingAsanPardakht
        class="col-12"
        v-if="selectedPose === 5"
      />
      <UPoseSettingBankMelat
        class="col-12"
        v-if="selectedPose === 6"
      />
      <UPoseSettingSamanKish
        class="col-12"
        v-if="selectedPose === 7"
      />
      <UPoseSettingPostBank
        class="col-12"
        v-if="selectedPose === 9"
      />
    </div>
  </div>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import posMixin from 'src/mixins/posMixin'

import BtnDefault from '../../../../../components/common/buttons/BtnDefault.vue'
import BtnCancel from '../../../../../components/common/buttons/BtnCancel.vue'
// import ShowModal from 'src/components/ShowModal.vue'
import UPoseSettingBankShahr from './partials/UPoseSettingBankShahr.vue'
import UPoseSettingBankMeli from './partials/UPoseSettingBankMeli.vue'
import UPoseSettingBankTejarat from './partials/UPoseSettingBankTejarat.vue'
import UPoseSettingBankAnsar from './partials/UPoseSettingBankAnsar.vue'
import UPoseSettingAsanPardakht from './partials/UPoseSettingAsanPardakht.vue'
import UPoseSettingBankMelat from './partials/UPoseSettingBankMelat.vue'
import UPoseSettingSamanKish from './partials/UPoseSettingSamanKish.vue'
import UPoseSettingPostBank from './partials/UPoseSettingPostBank.vue'
export default {
  data: function () {
    return {
      saveResult: null,
      msg: '',
      // eslint-disable-next-line vue/no-reserved-keys
      _GIDPoseFicheHistory: '',
      selectedPose: null,
      showUserList: false,
      disableBtn: true,
      firstName: null
    }
  },
  components: {
    UPoseSettingBankShahr,
    UPoseSettingBankMeli,
    UPoseSettingBankTejarat,
    UPoseSettingBankAnsar,
    UPoseSettingAsanPardakht,
    UPoseSettingBankMelat,
    UPoseSettingSamanKish,
    UPoseSettingPostBank,
    BtnDefault,
    BtnCancel
  },
  props: {
    ficheNumber: String,
    nidFiche: String,
    title: String,
    formKey: String,
    main: String
  },
  mixins: [baseFormMixin, posMixin],
  mounted () {
    this.msg =
      ' آیا از تأیید فیش به شماره' +
      `${this.ficheNumber}` +
      'از طریق پوز اطمینان دارید؟ '
  },
  methods: {
    confirmClick () {
      this.showConfirm(this.msg).onOk(() => {
        this.showLoading()
        let data = {
          pNidFiche: this.nidFiche,
          pFicheNo: this.ficheNumber,
          pEumPoseType: this.poseType,
          pEumObjOnPrice: 2,
          pUserCode: 'cc0d4ce1-e78e-4a1e-9192-4c2ae25625b6',
          pUserName: 'مژگان طاهری (TaheriM)'
        }

        this.$services.SB.addLogPose(data)
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)
            this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
            if (this.saveResult.success) {
              await this.log({
                action: this.logActions.confirmFiche,
                bizCode: this.ficheNumber,
                bizCodeTitle: 'ficheNumber'
              })
              this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              this.$emit('reload')
            }
          })
          .catch((response) => {
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
