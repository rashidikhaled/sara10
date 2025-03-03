<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :padding="false" :title="title">
      <fit>
        <safa-tabs v-model="activeTab" class="fit">
          <template v-slot:tabs>
            <tab-menu label="تنظیمات حفاری" name="DigSettingTab" />
            <!-- <tab-menu label="تنظیمات پوز حفاری" name="PosSettingTab" /> -->
          </template>
          <tab-content name="DigSettingTab" title="تنظیمات حفاری">
            <DigSettingTab
              v-model="model.Settings"
              :m="mode"
              @schedulerHandler="schedulerHandler"
            />
          </tab-content>
          <!-- <tab-content name="PosSettingTab" title="تنظیمات پوز">
            <PosSettingTab v-model="model" :m="mode" />
          </tab-content> -->
        </safa-tabs>
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
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import DigSettingTab from "./partials/DigSettingTab"
// import PosSettingTab from "./partials/PosSettingTab"

export default {
  mixins: [baseFormMixin],
  components: {
    DigSettingTab
    // PosSettingTab
  },
  data () {
    return {
      title: "تنظیمات حفاری",
      formKey: "A4911D38-EBC9-44AF-B2E1-11D891978BE5",
      name: "USettingDig",
      main: true,
      sidebarCompatible: true,

      activeTab: "DigSettingTab",
      model: {
        Settings: {
          CI_Years: 0,
          IsLoadDefaults: false,
          IsExpandTypes: false,
          IsReadRegionOnMaps: false,
          IsReadAreaOnMaps: false,
          IsOpenExportReportOnWondows: false,
          CheckApprovalDates: false,
          ShowCodeOnMaps: false,
          ISCheckEmptyBoulevardRequestEvent: false,
          ISReadInfoMapForRequestEvent: false,
          IsEnabledItemInRequestEvent: false,
          NoSelectinCI_RequesterType: false,
          CancelFichesInZeroCalc: false,
          NoFicheInCalc: false,
          ConfirmWithRequesterType: false,
          CancelFicheManual: false,
          TimePicker1: "",
          TimePicker2: "",
          InquiryDays: "",
          BufferDistance: "",
          PaymentDates: "",
          PaymentCompanyDates: "",
          ShahrdariTexts: "",
          MessageBargh: "",
          MessageObligation: "",
          UrlObligation: ""
        },
        UserProfile: {
          showPopupDuty: false,
          showPopupCollectiveDuty: false
        }
      }
    }
  },

  created () {
    this.loadFormSetting()
  },

  methods: {
    async loadFormSetting () {
      try {
        this.loading = true
        this.isEditable = false
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "SettingDig",
            defaultValue: this.model,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
            // useCache: false,
          }
        )

        this.model = require("src/utils/mergeSettings").default(
          this.model,
          settings
        )
        await this.log({
          action: this.logActions.view,
          bizCode: "",
          bizCodeTitle: "",
          saveDesc: "بارگذاری اطلاعات در تنظیمات حفاری انجام گردید."
        })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    async saveFormSetting () {
      try {
        this.loading = true
        await this.$stKartable.dispatch("formSettings/saveSettings", {
          key: "SettingDig",
          value: this.model,
          nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
        })
        this.showSuccess("اطلاعات با موفقیت ذخیره شد.")
        this.isEditable = false
        await this.log({
          action: this.logActions.save,
          bizCode: "",
          bizCodeTitle: "",
          saveDesc: "ذخیره اطلاعات در تنظیمات حفاری انجام گردید."
        })
      } catch (e) {
        console.log(e)
        this.showError("خطا در سرویس  رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    schedulerHandler () {
      // این دکمه در سرا8 عملکردی نداشت
    }
  }
}
</script>
