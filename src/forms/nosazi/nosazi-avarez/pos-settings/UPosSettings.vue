<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تنظیمات پوز">
      <fit>
        <form-row>
          <div class="col-12 q-mb-sm">
            <safa-combo-enum
              v-model="model.selectedPose"
              :m="mode"
              cdcName="selectedPose"
              enum-name="EumPoseType"
              label="نوع دستگاه پوز"
              label-width="100px"
            />
          </div>
        </form-row>
        <UPoseSettingBankShahr
          v-if="model.selectedPose === 1"
          v-model="model.BankShahr"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingBankMeli
          v-if="model.selectedPose === 2"
          v-model="model.BankMelli"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingBankTejarat
          v-if="model.selectedPose === 3"
          v-model="model.BankTejarat"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingBankAnsar
          v-if="model.selectedPose === 4"
          v-model="model.BankAnsar"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingAsanPardakht
          v-if="model.selectedPose === 5"
          v-model="model.PoseSettings"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingBankMelat
          v-if="model.selectedPose === 6"
          v-model="model.BankMelat"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingSamanKish
          v-if="model.selectedPose === 7"
          v-model="model.SamanKish"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingIranKish
          v-if="model.selectedPose === 8"
          v-model="model.IranKish"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
        <UPoseSettingPostBank
          v-if="model.selectedPose === 9"
          v-model="model.PostBank"
          :formKey="formKey"
          :m="mode"
          :name="name"
          :title="title"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="updateSettings"
        />
      </template>
    </form-wrapper>
    <!-- <safa-popup v-model="showUserList" title="لیست کاربران">
      <UUserList @returnToMainform="returnToMainform" />
    </safa-popup> -->
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
// import userListModal from './partials/userListModal.vue'
import UPoseSettingBankShahr from './partials/partials/UPoseSettingBankShahr.vue'
import UPoseSettingBankMeli from './partials/partials/UPoseSettingBankMeli.vue'
import UPoseSettingBankTejarat from './partials/partials/UPoseSettingBankTejarat.vue'
import UPoseSettingBankAnsar from './partials/partials/UPoseSettingBankAnsar.vue'
import UPoseSettingAsanPardakht from './partials/partials/UPoseSettingAsanPardakht.vue'
import UPoseSettingBankMelat from './partials/partials/UPoseSettingBankMelat.vue'
import UPoseSettingSamanKish from './partials/partials/UPoseSettingSamanKish.vue'
import UPoseSettingIranKish from './partials/partials/UPoseSettingIranKish.vue'
import UPoseSettingPostBank from './partials/partials/UPoseSettingPostBank.vue'
// import UUserList from "./partials/partials/UUserList.vue"
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs";

export default {
  route: 'nosazi-avarez/pos-settings',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تنظیمات پوز',
      formKey: '4e7c1043-7df3-4045-965e-43c156ff52a2',
      name: 'UPosSettings',
      main: true,
      sidebarCompatible: true,
      showUserList: false,
      disableBtn: true,
      firstName: null,
      model: {
        selectedPose: 0,
        PoseSettings: {
          port: 0,
          poseAddress: '',
          serviceAddress: '',
          fichePayment: true,
          purchase: false,
          IP: ''
        },
        BankAnsar: {
          port: 0,
          terminalNo: '',
          serverAddress: ''
        },
        BankShahr: {
          terminalNo: '',
          port: 0,
          ip: '',
          portSerial: true,
          fichePayment: true,
          isS380: true
        },
        BankMelli: {
          port: 0,
          poseAddress: '',
          terminalId: '',
          serviceAddress: '',
          merchantId: '',
          fichePayment: true,
          purchase: false
        },
        BankTejarat: {
          TerminalId: '',
          TransactionType: 0,
          IBN: ''
        },
        BankMelat: {
          serviceAddress: '',
          depositId: '',
          fichePayment: '',
          purchase: false
        },
        IranKish: {
          receptive: '',
          terminal: '',
          port: '',
          serialNo: '',
          poseAddress: ''
        },
        SamanKish: {
          serviceAddress: '',
          transactionType: 0,
          posMethod: 1,
          terminalNo: '',
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          poseAddress: ''
        }
      }
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
    UPoseSettingIranKish
    // UUserList
  },
  props: {},
  methods: {
    cancel () {
      this.firstName = null
      this.model.selectedPose = null
      this.disableBtn = true
      this.isEditable = false
    },
    // returnToMainform(value) {
    //   this.showUserList = false;

    //   this.firstName = value.FirstName + " " + value.LastName;
    // },
    async reloadSettings () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'PosUserSettings',
            defaultValue: this.model,
            nidProc: this.getNidUser()
            // nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.model = require('src/utils/mergeSettings').default(this.model, settings)
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.loading = false
      }
    },
    updateSettings () {
      this.$stKartable
        .dispatch('formSettings/saveSettings', {
          key: 'PosUserSettings',
          value: this.model,
          nidProc: this.getNidUser()
          // nidProc: GLOBAL_SETTINGS_GUID
        })
        .then(value => {
          this.isEditable = false
          this.showSuccess('تنظیمات با موفقیت ذخیره شد.')
        })
        .catch(ex => {
          this.showError('خطا در سرویس تنظیمات رخ داده است.')
        })
        .finally(() => {
        })
    }
  },
  async created () {
    await this.reloadSettings()
  }
}
</script>
