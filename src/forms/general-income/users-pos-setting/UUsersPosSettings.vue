<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="a5ed30b3-5e71-444e-b4fd-6e5fdf9356b1"
  >
    <form-wrapper title="تنظیمات پوز کاربران">
      <form-row class="q-mb-sm">
        <form-control>
          <safa-combo-enum
            enum-name="EumPoseType"
            label="نوع دستگاه پوز"
            :m="mode"
            v-model="model.selectedPose"
            cdcName="selectedPose"
            label-width="100px"
          ></safa-combo-enum>
        </form-control>
        <form-control>
          <safa-text
            label="کاربر"
            m="r"
            v-model="firstName"
            cdcName="firstName"
            label-width="100px"
          >
            <template v-slot:append>
              <q-icon
                name="search"
                :disable="disableBtn"
                @click="showUserList = true"
              />
            </template>
          </safa-text>
        </form-control>
      </form-row>

      <UPoseSettingBankShahr
        v-if="model.selectedPose === 1"
        :m="mode"
        v-model="model.BankShahr"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingBankMeli
        v-if="model.selectedPose === 2"
        :m="mode"
        v-model="model.BankMelli"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingBankTejarat
        v-if="model.selectedPose === 3"
        :m="mode"
        v-model="model.BankTejarat"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingBankAnsar
        v-if="model.selectedPose === 4"
        :m="mode"
        v-model="model.BankAnsar"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingAsanPardakht
        v-if="model.selectedPose === 5"
        :m="mode"
        v-model="model.PoseSettings"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingBankMelat
        v-if="model.selectedPose === 6"
        :m="mode"
        v-model="model.BankMelat"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingSamanKish
        v-if="model.selectedPose === 7"
        :m="mode"
        v-model="model.SamanKish"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingIranKish
        v-if="model.selectedPose === 8"
        :m="mode"
        v-model="model.IranKish"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingPostBank
        v-if="model.selectedPose === 9"
        :m="mode"
        v-model="model.PostBank"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="edit"
          @save="saveFormSetting"
          @cancel="cancel"
        ></form-actions>
      </template>
    </form-wrapper>
    <safa-popup
      v-model="showUserList"
      title="لیست کاربران"
      width="700px"
      height="600px"
    >
      <UUserList
        @returnToMainform="returnToMainform"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UPoseSettingAsanPardakht from "./partials/UPoseSettingAsanPardakht"
import UPoseSettingBankAnsar from "./partials/UPoseSettingBankAnsar.vue"
import UPoseSettingBankMelat from "./partials/UPoseSettingBankMelat"
import UPoseSettingBankMeli from "./partials/UPoseSettingBankMeli"
import UPoseSettingBankShahr from "./partials/UPoseSettingBankShahr"
import UPoseSettingBankTejarat from "./partials/UPoseSettingBankTejarat"
import UPoseSettingIranKish from "./partials/UPoseSettingIranKish"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank"
import UPoseSettingSamanKish from "./partials/UPoseSettingSamanKish"
import UUserList from "./partials/UUserList"
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
export default {

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات پوز کاربران",
      formKey: "a5ed30b3-5e71-444e-b4fd-6e5fdf9356b1",
      name: "UUsersPosSettings",
      main: true,
      sidebarCompatible: true,
      showUserList: false,
      disableBtn: true,
      firstName: null,
      model: {
        selectedPose: 0,
        PoseSettings: {
          port: 0,
          terminalNo: "",
          serverAddress: ""
        },
        BankAnsar: {
          port: 0,
          terminalNo: "",
          serverAddress: ""
        },
        BankShahr: {
          terminalNo: "",
          port: 0,
          ip: "",
          portSerial: true,
          fichePayment: "",
          isS380: ""
        },
        BankMelli: {
          port: 0,
          poseAddress: "",
          terminalId: "",
          serviceAddress: "",
          merchantId: "",
          fichePayment: true
        },
        BankTejarat: {
          TerminalId: '',
          TransactionType: 0,
          IBN: ''
        },
        BankMelat: {
          port: 0,
          poseAddress: "",
          serviceAddress: ""
        },
        IranKish: {
          serviceAddress: "",
          poseAddress: "",
          port: 0
        },
        SamanKish: {
          serviceAddress: '',
          transactionType: 0,
          terminalNo: '',
          posMethod: 1,
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          port: 0,
          poseAddress: "",
          serviceAddress: ""
        }
      },
      selectedUser: null
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
    UUserList,
    UPoseSettingIranKish
  },
  props: {},
  methods: {
    edit () {
      this.disableBtn = false
      this.isEditable = true
    },
    cancel () {
      this.firstName = null
      this.model.selectedPose = null
      this.disableBtn = true
      this.isEditable = false
    },
    returnToMainform (value) {
      this.selectedUser = value
      this.showUserList = false
      this.firstName = value.firstName
      this.loadFormSetting()
    },
    async loadFormSetting () {
      try {
        this.loading = true
        let options = {}
        if (this.selectedUser) {
          options = {
            key: "PosUserSettingsForIncome",
            defaultValue: this.model,
            nidProc: this.selectedUser.NidUser
          }
        } else {
          options = {
            key: "PosUserSettingsForIncome",
            defaultValue: this.model
          }
        }
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          options
        )
        this.model = require('src/utils/mergeSettings').default(this.model, settings)
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    saveFormSetting () {
      debugger
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "PosUserSettingsForIncome",
          // nidProc: GLOBAL_SETTINGS_GUID,
          value: this.model,
          nidProc: this.selectedUser && this.selectedUser.NidUser

        })
        .then(value => {
          this.isEditable = false
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
        })
        .catch(ex => {
          this.showError("خطا در سرویس تنظیمات رخ داده است.")
        })
        .finally(() => {})
    }
  }
}
</script>
