<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="کاربر"
            m="r"
            v-model="fullName"
            cdcName="fullName"
            label-width="95px"
          >
            <template v-slot:append>
              <q-icon
                style="position: relative; right: 5px; font-size: 18px"
                @click="showUserList = true"
                color="primary"
                name="search"
                class="cursor-pointer"
                :disable="disableBtn"
              />
            </template>
          </safa-text>
        </form-control>
        <form-control>
          <safa-combo-enum
            enum-name="EumPoseType"
            label="نوع دستگاه پوز"
            :m="mode"
            v-model="model.selectedPose"
            cdcName="selectedPose"
            label-width="95px"
          />
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
        class="col-12"
        v-if="model.selectedPose === 5"
        v-model="model.AsanPardakht"
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
      <UPoseSettingPostBank
        v-if="model.selectedPose === 8"
        :m="mode"
        v-model="model.PostBank"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingFanAva
        v-if="model.selectedPose === 9"
        :m="mode"
        v-model="model.FanAva"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <UPoseSettingSaderat
        v-if="model.selectedPose === 10"
        :m="mode"
        v-model="model.Saderat"
        :title="title"
        :formKey="formKey"
        :name="name"
      />
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="edit"
          @save="updateSettings"
          @cancel="cancel"
        />
      </template>
    </form-wrapper>
    <safa-popup
      v-model="showUserList"
      title="لیست کاربران"
      width="800px"
      height="500px"
    >
      <UUserList
        :title="title"
        :formKey="formKey"
        :name="name"
        @returnToMainform="returnToMainform"
      />
    </safa-popup>
  </safa-form>
</template>

<script>
import UPoseSettingBankShahr from "./partials/UPoseSettingBankShahr"
import UPoseSettingBankMeli from "./partials/UPoseSettingBankMeli"
import UPoseSettingBankTejarat from "./partials/UPoseSettingBankTejarat"
import UPoseSettingBankAnsar from "./partials/UPoseSettingBankAnsar.vue"
import UPoseSettingAsanPardakht from "./partials/UPoseSettingAsanPardakht"
import UPoseSettingBankMelat from "./partials/UPoseSettingBankMelat"
import UPoseSettingSamanKish from "./partials/UPoseSettingSamanKish"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank"
import UPoseSettingFanAva from "./partials/UPoseSettingFanAva"
import UPoseSettingSaderat from "./partials/UPoseSettingSaderat"
import UUserList from "src/forms/dig-menu/base-information/setting-dig/partials/UUserList.vue"

import baseFormMixin from "src/mixins/baseFormMixin"
// import converter from 'xml-js'

export default {
  route: "avareze-senfi/pos-users-settings-for-senfi",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات پوز",
      formKey: "dde84faf-cbef-4a3d-a3cc-1b668a9c0da8",
      name: "UPosSetting",
      main: true,
      showUserList: false,
      disableBtn: true,
      firstName: null,
      fullName: null,
      model: {
        selectedPose: 0,
        AsanPardakht: {
          port: 0,
          poseAddress: "",
          serviceAddress: ""
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
          TerminalId: 0,
          TransactionType: 0,
          IBN: ''
        },
        BankMelat: {},
        IranKish: {},
        SamanKish: {
          serviceAddress: '',
          transactionType: 0,
          terminalNo: '',
          posMethod: 1,
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {},
        FanAva: {},
        Saderat: {}
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
    UPoseSettingFanAva,
    UPoseSettingSaderat,
    UUserList
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
      this.fullName = value.firstName + " " + value.lastName
      this.showUserList = false
      this.reloadSettings()
    },
    async reloadSettings () {
      try {
        this.loading = true
        let options = {}
        if (this.selectedUser) {
          options = {
            key: "UPosDigSetting",
            defaultValue: this.model,
            nidProc: this.selectedUser.NidUser
          }
        } else {
          options = {
            key: "UPosDigSetting",
            defaultValue: this.model
          }
        }
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          options
        )
        this.model = require("src/utils/mergeSettings").default(
          this.model,
          settings
        )
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    updateSettings () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "UPosDigSetting",
          value: this.model,
          nidProc: this.selectedUser && this.selectedUser.NidUser
        })
        .then((value) => {
          this.isEditable = false
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
        })
        .catch((ex) => {
          this.showError("خطا در سرویس تنظیمات رخ داده است.")
        })
        .finally(() => {})
    }
  }
}
</script>
