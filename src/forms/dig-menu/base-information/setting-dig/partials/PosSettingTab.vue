<template>
  <form-wrapper>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="کاربر"
          :m="mode"
          v-model="fullName"
          cdcName="fullName"
          label-width="95px"
        >
          <template v-slot:append>
            <q-icon
              :disable="disableBtn"
              @click="showUserListHander"
              style="position: relative; right: 5px; font-size: 18px"
              color="more_horiz"
              name="clear"
              class="cursor-pointer"
            />
          </template>
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo-enum
          enum-name="EumPoseType"
          label="نوع دستگاه پوز"
          :m="mode"
          v-model="model.selectedPose"
          cdcName="selectedPose"
          label-width="95px"
        />
      </FormControl>
    </FormRow>
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
      :m="mode"
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
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-edit v-if="!isEditable" @click="isEditable = true" />
        <btn-save v-if="isEditable" @click="saveSettings" />
        <btn-cancel v-if="isEditable" @click="cancel" />
      </div>
    </template>
  </form-wrapper>
</template>

<script>
import UPoseSettingBankShahr from "./UPoseSettingBankShahr"
import UPoseSettingBankMeli from "./UPoseSettingBankMeli"
import UPoseSettingBankTejarat from "./UPoseSettingBankTejarat"
import UPoseSettingBankAnsar from "./UPoseSettingBankAnsar.vue"
import UPoseSettingAsanPardakht from "./UPoseSettingAsanPardakht"
import UPoseSettingBankMelat from "./UPoseSettingBankMelat"
import UPoseSettingSamanKish from "./UPoseSettingSamanKish"
import UPoseSettingIranKish from "./UPoseSettingIranKish"
import UPoseSettingPostBank from "./UPoseSettingPostBank"
import UUserList from "./UUserList"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    Editable: Boolean,
    title: String,
    formKey: String,
    name: String
  },
  data () {
    return {
      // #value
      showUserList: false,
      disableBtn: true,
      firstName: null,
      fullName: null,

      // #model
      model: {
        selectedPose: 0,
        AsanPardakht: {
          port: 0,
          poseAddress: "",
          serviceAddress: "",
          fichePayment: true
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
          fichePayment: true
        },
        BankTejarat: {
          TerminalId: '',
          TransactionType: 0,
          IBN: ''
        },
        BankMelat: {
          serviceAddress: "",
          depositId: "",
          fichePayment: true
        },
        IranKish: {
          receptive: "",
          terminalCode: "",
          port: "",
          serialNo: ""
        },
        SamanKish: {
          serviceAddress: "",
          terminalNo: "",
          transactionType: 0,
          posMethod: 1,
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          poseAddress: ""
        }
      },

      // #services
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
    UPoseSettingIranKish,
    UUserList
  },

  methods: {
    showUserListHander () {
      if (!this.disableBtn) {
        this.showUserList = true
      }
    },
    returnToMainform (value) {
      this.selectedUser = value
      this.fullName = value.firstName + " " + value.lastName
      this.showUserList = false
      this.reloadPoseSettings()
    },
    async reloadPoseSettings () {
      try {
        this.loading = true
        let options = {}
        if (this.selectedUser) {
          options = {
            key: "UserPosSettingTab",
            defaultValue: this.model,
            nidProc: this.selectedUser.NidUser
          }
        } else {
          options = {
            key: "UserPosSettingTab",
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

    async saveSettings () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "UserPosSettingTab",
          value: this.model,
          // nidProc: this.getNidUser()
          nidProc: this.selectedUser && this.selectedUser.NidUser
        })
        .then((model) => {
          this.isEditable = false
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
        })
        .catch((ex) => {
          this.showError("خطا در سرویس تنظیمات رخ داده است.")
        })
        .finally(() => {})
    },
    cancel () {
      this.fullName = null
      this.model.selectedPose = 0
      this.disableBtn = true
      this.isEditable = false
    }
  },
  watch: {
    mode () {
      if (this.mode === "e") {
        this.disableBtn = false
        this.isEditable = true
      } else {
        this.firstName = null
        this.model.selectedPose = null
        this.disableBtn = true
        this.isEditable = false
      }
    }
  }
}
</script>
