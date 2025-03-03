<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تنظیمات پوز عوارض صنفی" vertical>
      <fit>
        <div class="row q-mb-sm">
          <safa-combo-enum
            enum-name="EumPoseType"
            label="نوع دستگاه پوز"
            :m="mode"
            v-model="model.selectedPose"
            cdcName="selectedRegion"
            label-width="95px"
            class="col-12"
          />
        </div>
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
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveFormSetting"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UPoseSettingBankShahr from "./partials/UPoseSettingBankShahr"
import UPoseSettingBankMeli from "./partials/UPoseSettingBankMeli"
import UPoseSettingBankTejarat from "./partials/UPoseSettingBankTejarat"
import UPoseSettingBankAnsar from "./partials/UPoseSettingBankAnsar"
import UPoseSettingAsanPardakht from "./partials/UPoseSettingAsanPardakht.vue"
import UPoseSettingBankMelat from "./partials/UPoseSettingBankMelat"
import UPoseSettingSamanKish from "./partials/UPoseSettingSamanKish"
import UPoseSettingIranKish from "./partials/UPoseSettingIranKish"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank"
import baseFormMixin from "src/mixins/baseFormMixin"
import messageMixin from "src/mixins/messageMixin"
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
export default {
  route: "avareze-senfi/pos-settings-for-senfi",
  mixins: [baseFormMixin, messageMixin],
  data () {
    return {
      title: "تنظیمات پوز",
      formKey: "b9c47ab4-dcd1-4b24-8365-310ad3cec73c",
      name: "UPosSettingsForSenfi",
      main: true,
      sidebarCompatible: true,
      model: {
        selectedPose: 0,
        AsanPardakht: {
          port: 0,
          poseAddress: "",
          serviceAddress: "",
          fichePayment: true,
          purchase: false
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
          terminal: "",
          port: "",
          serialNo: "",
          poseAddress: ""
        },
        SamanKish: {
          serviceAddress: "",
          transactionType: 0,
          posMethod: 1,
          terminalNo: "",
          iPAddress: "",
          serverPort: ""
        },
        PostBank: {
          poseAddress: ""
        }
      }
    }
  },
  props: {
    m: String
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
  },
  methods: {
    async loadFormSetting () {
      try {
        debugger
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "UserPosSettingsForSenfi",
            defaultValue: this.model,
            nidProc: this.getNidUser()
            // nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.model = require('src/utils/mergeSettings').default(this.model, settings)
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    saveFormSetting () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "UserPosSettingsForSenfi",
          value: this.model,
          nidProc: this.getNidUser()
          // nidProc: GLOBAL_SETTINGS_GUID
        })
        .then((value) => {
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
          this.isEditable = false
        })
        .catch((ex) => {
          this.showError("خطا در سرویس تنظیمات رخ داده است.")
        })
        .finally(() => {})
    }
    // saveInfo() {
    //   // this.isEditable = false
    //   // this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
    //   this.showLoading();
    //   let payLoad = {
    //     pSetting: this.PSetting,
    //   };
    //   this.$services.esup
    //     .saveLayout(payLoad)
    //     .then((response) => {
    //       this.requestResult = this.getResponse(response);
    //       if (this.requestResult.success) {
    //         this.PSetting = this.getResponse(response).saveLayout;
    //         this.showSuccess("ذخیره با موفقیت انجام شد");
    //       }
    //     })
    //     .catch((err) => {
    //       this.serverError();
    //       console.error(err);
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
  },
  async created () {
    await this.loadFormSetting()
  }
}
</script>
