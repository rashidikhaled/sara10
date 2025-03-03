<template>
  <safa-form :id="formKey" :caption="title" app-id="4e4c0133-a224-4e34-ab34-a27a464e51dc">
    <form-wrapper title="تنظیمات صنفی" :padding="false">
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="avarezSettings" label="تنظیمات عوارض" />
          <tab-menu name="userProfile" label="پروفایل کاربر" />
        </template>
        <tab-content name="avarezSettings" title="تنظیمات عوارض">
          <UAvarezSettings
            :formKey="formKey"
            :name="name"
            :title="title"
            :m="mode"
            v-model="model.SenfiSettingAvarez"
          />
        </tab-content>
        <tab-content name="userProfile" title="پروفایل کاربر">
          <UUserProfile
            :formKey="formKey"
            :name="name"
            :title="title"
            :m="mode"
            v-model="model.SenfiSettingUser"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="updateSettings"
          @cancel="isEditable = false"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UAvarezSettings from "./partials/UAvarezSettings"
import UUserProfile from "./partials/UUserProfile"
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: "avareze-senfi/senfi-settings",
  mixins: [baseFormMixin],
  components: {
    UAvarezSettings,
    UUserProfile
  },
  data () {
    return {
      activeTab: "avarezSettings",
      title: "تنظیمات صنفی",
      formKey: "ef0bd93b-78c0-4fd5-b7a8-758182ee8f97",
      name: "USenfiSettingsTabs",
      main: true,
      sidebarCompatible: true,
      model: {
        SenfiSettingAvarez: {
          startcalcYear: "",
          minPrice: 0,
          ChktotalPrice: false,
          noOfDay: "",
          paymentDate: "",
          ChkisSure: false,
          ChkrevokeFiche: false,
          ChkyearForConfirmedYearlyFiche: false,
          ChkyearForConfirmedAllFiche: false,
          ChkyearForConfirmedinstallmentFiche: false,
          ChkrevokeFicheWhenConfirm: false,
          ChkrightOfOpening: false,
          ChkcalculatingBasedOnRevisit: false,
          ChkotherAccountOfSenfi: false,
          ChkshowErrorOfFinancialSys: false,
          ChkrevokeConfirmedfiche: false
        },
        SenfiSettingUser: {
          ChkshowAvarezInNewWindow: false,
          ChkshowAllAvarezInNewWindow: false
        }
      }
    }
  },
  async created () {
    await this.reloadSettings()
  },
  methods: {
    async reloadSettings () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "SenfiSettings",
            defaultValue: this.model,
            nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.model = settings
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    updateSettings () {
      this.$stKartable
        .dispatch("formSettings/saveSettings", {
          key: "SenfiSettings",
          value: this.model,
          nidProc: GLOBAL_SETTINGS_GUID
        })
        .then(value => {
          this.isEditable = false
          this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
        })
        .catch(_ => {
          this.showError("خطا در سرویس توضیحات رخ داده است.")
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
