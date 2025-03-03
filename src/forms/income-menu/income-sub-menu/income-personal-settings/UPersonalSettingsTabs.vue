<template>
<safa-form
    :id="formKey"
    :caption="title"
    app-id="714C366C-1705-433D-970C-E04F6D62BD7D"
  >
  <form-wrapper :padding="false" vertical title="تنظیمات شخصی درآمد">
    <safa-tabs v-model="activeTab" class="fit" height="100%" :bordered="false">
      <template v-slot:tabs>
        <tab-menu name="settings" label="تنظیمات درآمد" />
        <tab-menu name="nosazi" label="دستگاه پوز" />
      </template>
      <tab-content name="settings" title="تنظیمات درآمد">
        <USettings :m="mode" v-model="model" />
      </tab-content>
      <tab-content name="nosazi" title="دستگاه پوز">
        <UPoseSetting :m="mode" v-model="model" />
      </tab-content>
    </safa-tabs>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveFormSetting"
        @cancel="isEditable = false"
      />
    </template>
  </form-wrapper>
  </safa-form>
</template>
<script>
import UPoseSetting from "./partials/UPoseSetting"
import USettings from "./partials/USettings"
import baseFormMixin from "src/mixins/baseFormMixin"
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  components: { UPoseSetting, USettings },
  data () {
    return {
      name: "UPersonalSettings",
      title: "تنظیمات شخصی درآمد",
      formKey: "4c168adf-7b85-472e-bbe0-7811808360cb",
      activeTab: "settings",
      main: true,
      sidebarCompatible: true,
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
          terminal: "",
          terminalId: "",
          merchantId: "",
          serviceAddress: "",
          receptive: "",
          fichePayment: true,
          purchase: false
        },
        BankTejarat: {
          TerminalId: '',
          TransactionType: 0,
          IBN: ''
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
          serviceAddress: '',
          transactionType: 0,
          terminalNo: '',
          posMethod: 1,
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          poseAddress: ""
        },
        automationFicheProcess: false
      }
    }
  },
  async created () {
    await this.loadFormSetting()
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
        this.model = require("src/utils/mergeSettings").default(
          this.model,
          settings
        )
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.hideLoading()
      }
    },
    saveFormSetting () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "PosUserSettingsForIncome",
          value: this.model,
          nidProc: this.getNidUser()
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
