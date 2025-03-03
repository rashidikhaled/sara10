<template>
    <safa-form :id="formKey" :caption="title" app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902">
      <form-wrapper title="تنظیمات پوز">
        <fit>
            <form-row class="q-mb-sm">

                <form-control>
          <safa-text
            v-model="username"
            m="r"
            cdcName="UserName"
            label="کاربر"
            label-width="100px"
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
        <form-control>
          <safa-combo-enum
            enum-name="EumPoseType"
            label="نوع دستگاه پوز"
            v-model="model.selectedPose"
            label-width="100px"
            :m="mode"
            cdcName="selectedPose"
            class="q-mb-sm"
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
            v-if="model.selectedPose === 5"
            v-model="model.PoseSettings"
            :title="title"
            :formKey="formKey"
            :name="name"
            :m="mode"
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
        </fit>
        <template v-slot:footer>
          <FormActions
            :m="mode"
            @edit="isEditable = true"
            @save="saveFormSetting"
            @cancel="isEditable = false"
          />
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
import baseFormMixin from "src/mixins/baseFormMixin"
import UPoseSettingBankShahr from "./partials/UPoseSettingBankShahr.vue"
import UPoseSettingBankMeli from "./partials/UPoseSettingBankMeli.vue"
import UPoseSettingBankTejarat from "./partials/UPoseSettingBankTejarat.vue"
import UPoseSettingBankAnsar from "./partials/UPoseSettingBankAnsar.vue"
import UPoseSettingAsanPardakht from "./partials/UPoseSettingAsanPardakht.vue"
import UPoseSettingBankMelat from "./partials/UPoseSettingBankMelat.vue"
import UPoseSettingSamanKish from "./partials/UPoseSettingSamanKish.vue"
import UPoseSettingIranKish from "./partials/UPoseSettingIranKish.vue"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank.vue"
import UUserList from './partials/UUserList.vue'
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات پوز",
      formKey: "EB9A5DE3-EAF5-4252-BF75-E6BC4D365085",
      name: "UDigPosSettings",
      main: true,
      sidebarCompatible: true,
      showUserList: false,
      disableBtn: true,
      firstName: null,
      username: null,
      selectedUser: null,
      model: {
        selectedPose: 0,
        PoseSettings: {
          port: 0,
          poseAddress: "",
          serviceAddress: "",
          fichePayment: true,
          purchase: false,
          IP: ""
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
          poseAddress: "",
          terminalId: "",
          serviceAddress: "",
          merchantId: "",
          fichePayment: true,
          purchase: false
        },
        BankTejarat: {
          port: 0,
          terminalCode: "",
          receptiveNo: "",
          serialNo: ""
        },
        BankMelat: {
          serviceAddress: "",
          depositId: "",
          fichePayment: true,
          purchase: false
        },
        IranKish: {
          receptive: "",
          terminal: "",
          port: "",
          serialNo: "",
          poseAddress: ""
        },
        SamanKish: {
          serviceAddress: "",
          transactionType: 0,
          terminalNo: "",
          posMethod: 1,
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          poseAddress: ""
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
    UPoseSettingIranKish,
    UUserList
  },
  props: {},
  methods: {
    cancel () {
      this.firstName = null
      this.model.selectedPose = null
      this.disableBtn = true
      this.isEditable = false
    },
    returnToMainform (value) {
      this.showUserList = false
      this.selectedUser = value
      this.username = value.firstName + " " + value.lastName
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
    saveFormSetting () {
      debugger
      if (!this.selectedUser) return this.showError("کاربری انتخاب نشده است")
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "UPosDigSetting",
          value: this.model,
          // nidProc: GLOBAL_SETTINGS_GUID
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
  },
  async created () {
    await this.reloadSettings()
  }
}
</script>
