<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تنظیمات پوز کاربران">
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
                name="search"
                :disable="disableBtn"
                @click="showUserList = true"
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
          ></safa-combo-enum>
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
import UPoseSettingIranKish from "./partials/UPoseSettingIranKish"
import UPoseSettingPostBank from "./partials/UPoseSettingPostBank"
import UUserList from "./partials/UUserList"
import baseFormMixin from "src/mixins/baseFormMixin"
// import converter from 'xml-js'

export default {
  route: "avareze-senfi/pos-users-settings-for-senfi",

  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات پوز کاربران",
      formKey: "ce8289a9-caae-4d33-b0e8-e203aa1710ba",
      name: "UUserPosSettingsForSenfi",
      main: true,
      sidebarCompatible: true,
      showUserList: false,
      disableBtn: true,
      firstName: null,
      fullName: null,
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
            key: "UserPosSettingsForSenfi",
            defaultValue: this.model,
            nidProc: this.selectedUser.NidUser
          }
        } else {
          options = {
            key: "UserPosSettingsForSenfi",
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
    updateSettings () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "UserPosSettingsForSenfi",
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

    // save() {
    //   let data = {
    //     SaveLayout: {
    //       _attributes: {
    //         xmlns: "http://tempuri.org/",
    //       },
    //       PSetting: {
    //         NidSetting: "0",
    //         StrKey: "PoseSetting",
    //         StrValue: lawSuit
    //           .converterjsToXml({
    //             ClsPoseSetting: {
    //               EumPoseType: "2",
    //               MeliComPort: "0",
    //               CityComPort: "565",
    //               CityTerminalNo: "1256",
    //               CityIP: "192.168.1.1",
    //               CityBankPoseModel: "S380",
    //               CityBankUsingType: "Port",
    //               CityBankPaymentType: "Bill",
    //               TejaratComPort: "0",
    //               AnsarComPort: "0",
    //               CityAsanPardakhtComPort: "0",
    //               CityAsanPardakhtIPServerLan: "cccccc",
    //               AsanPardakhtPaymentType: "BillAsanPardakht",
    //               MellatPosPaymentType: "Bill",
    //               MelliPort: "3000",
    //               MelliIPServerLan: "test",
    //               MelliService: null,
    //               MeliPaymentType: "Purchase",
    //               MeliBillPaymentType: "Normal",
    //             },
    //           })
    //           .toString(),
    //         UserId: "e4f32c98-cb86-4907-9c7b-b0a26a5d827a",
    //       },
    //     },
    //   };
    //   const json1 = JSON.stringify(data);
    //   lawSuit.callServiceJson2Xml(
    //     json1,
    //     "http://192.168.100.170:7000/Esup/EsupService.svc/json/SaveLayout"
    //   );
    //   this.isEditable = false;
    //   this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد.");
    // },
  }
}
</script>
