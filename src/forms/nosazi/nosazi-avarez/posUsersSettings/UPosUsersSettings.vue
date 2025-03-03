<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper title="تنظیمات پوز کاربران">
      <form-row class="q-mb-sm">
        <form-control>
          <safa-combo-enum
            v-model="model.selectedPose"
            :m="mode"
            cdcName="selectedPose"
            enum-name="EumPoseType"
            label="نوع دستگاه پوز"
            label-width="80px"
          ></safa-combo-enum>
        </form-control>
        <form-control>
          <safa-text
            v-model="username"
            m="r"
            cdcName="UserName"
            label="کاربر"
            label-width="80px"
          >
            <template v-slot:append>
              <q-icon
                :disable="!isEditable"
                class="cursor-pointer"
                color="primary"
                name="search"
                size="xs"
                style="position: relative; right: 5px"
                @click="showUserList = true"
              />
            </template>
          </safa-text>
        </form-control>
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
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @cancel="cancel"
          @edit="isEditable = true"
          @save="updateSettings"
        ></form-actions>
      </template>
    </form-wrapper>
    <safa-popup
      v-model="showUserList"
      height="600px"
      title="لیست کاربران"
      width="700px"
    >
      <UUserList
        :formKey="formKey"
        :name="name"
        :title="title"
        @returnToMainform="returnToMainform"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'
// import userListModal from './partials/userListModal.vue'
// import ShowModal from 'src/components/ShowModal.vue'
import UPoseSettingBankShahr from './partials/partials/UPoseSettingBankShahr.vue'
import UPoseSettingBankMeli from './partials/partials/UPoseSettingBankMeli.vue'
import UPoseSettingBankTejarat from './partials/partials/UPoseSettingBankTejarat.vue'
import UPoseSettingBankAnsar from './partials/partials/UPoseSettingBankAnsar.vue'
import UPoseSettingAsanPardakht from './partials/partials/UPoseSettingAsanPardakht.vue'
import UPoseSettingBankMelat from './partials/partials/UPoseSettingBankMelat.vue'
import UPoseSettingSamanKish from './partials/partials/UPoseSettingSamanKish.vue'
import UPoseSettingIranKish from './partials/partials/UPoseSettingIranKish.vue'
import UPoseSettingPostBank from './partials/partials/UPoseSettingPostBank.vue'
import UUserList from './partials/partials/UUserList.vue'

export default {
  route: 'nosazi-avarez/pos-users-settings',

  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تنظیمات پوز کاربران',
      formKey: 'a93633b9-3883-4a10-8f30-95edf13e8dfd',
      name: 'UPosUsersSettings',
      main: true,
      sidebarCompatible: true,
      // selectedPose: null,
      showUserList: false,
      username: null,
      model: {
        selectedPose: 0,
        PoseSettings: {
          port: 0,
          poseAddress: '',
          serviceAddress: ''
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
          purchase: false,
          code: ''
        },
        BankTejarat: {
          TerminalId: '',
          TransactionType: 0,
          IBN: ''
        },
        BankMelat: {
          serviceAddress: '',
          depositId: '',
          fichePayment: true,
          purchase: false
        },
        IranKish: {
          receptive: '',
          terminal: '',
          port: '',
          serialNo: '',
          poseAddress: '',
          apiUrl: ''
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
      },
      selectedUser: null
    }
  },
  components: {
    FormActions,
    UPoseSettingBankShahr,
    UPoseSettingBankMeli,
    UPoseSettingBankTejarat,
    UPoseSettingBankAnsar,
    UPoseSettingAsanPardakht,
    UPoseSettingBankMelat,
    UPoseSettingSamanKish,
    UPoseSettingPostBank,
    UPoseSettingIranKish,
    UUserList
  },
  props: {},
  methods: {
    cancel () {
      this.username = null
      this.model.selectedPose = null
      this.isEditable = false
    },
    returnToMainform (value) {
      this.selectedUser = value
      this.showUserList = false
      this.username = value.firstName + ' ' + value.lastName
      this.reloadSettings()
    },
    // save() {
    //   this.isEditable = false;
    //   this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.");
    // },
    async reloadSettings () {
      try {
        this.loading = true
        let options = {}
        if (this.selectedUser) {
          options = {
            key: 'PosUserSettings',
            defaultValue: this.model,
            nidProc: this.selectedUser.NidUser
          }
        } else {
          options = {
            key: 'PosUserSettings',
            defaultValue: this.model
          }
        }
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          options
        )
        // this.model = settings
        // console.log('this.model :>> ', this.model)
        this.model = require('src/utils/mergeSettings').default(
          this.model,
          settings
        )
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
          nidProc: this.selectedUser && this.selectedUser.NidUser
        })
        .then((value) => {
          this.isEditable = false
          this.showSuccess('تنظیمات با موفقیت ذخیره شد.')
        })
        .catch((ex) => {
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
