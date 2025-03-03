<template>
  <safa-form :id="formKey" :caption="title" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper :padding="false" :title="title">
      <fit>
        <safa-tabs v-model="activeTab" fit>
          <template v-slot:tabs>
            <tab-menu label="تنظیمات" name="settings" />
            <tab-menu label="تنظیمات درآمد" name="incomeSettings" />
          </template>
          <tab-content name="settings" title="تنظیمات">
            <USettings
              v-model="model.ShahrsaziSettings"
              :chkIsCheckSabtServType="chkIsCheckSabtServType"
              :formKey="formKey"
              :m="mode"
              :name="name"
              :title="title"
            />
          </tab-content>
          <tab-content
            :padding="false"
            name="incomeSettings"
            title="تنظیمات درآمد"
          >
            <UIncomeSettings
              v-model="model.ShahrsaziSettingsIncome"
              :formKey="formKey"
              :m="mode"
              :name="name"
              :title="title"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveFormSetting"
        >
          <btn-default label="بازآوری" @click="loadFormSetting" />
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UIncomeSettings from "./partials/UIncomeSettings"
import USettings from "./partials/USettings"
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  route: "settings/building-city-settings",
  components: {
    UIncomeSettings,
    USettings
  },
  data () {
    return {
      title: "تنظیمات شهرسازی",
      formKey: "43422777-FE8B-438D-94BF-88EB48815030",
      name: "UBuildingSettingsTabs",
      main: true,
      sidebarCompatible: true,

      activeTab: "settings",
      loading: false,
      chkIsCheckSabtServType: "Chk_IsCheckSabtWCF",
      model: {
        ShahrsaziSettingsIncome: {
          Chk_CalculateIncomeFromSettings: true,
          Chk_HasDailyDeadlineType: false,
          Chk_DonotShowUserpriceColum: false,
          Chk_MablagheSystemWithDecimal: false,
          Chk_SeparatlyIntallment: false,
          Chk_JustIncomeCalculated: false,
          Dta_DeadlineDate: "",
          DayCount: 0
        },
        ShahrsaziSettings: {
          Chk_SendSMSInBlacklist: false,
          Chk_SendSMSExitFromBlacklist: false,
          Chk_SendSMSInTemporaryArchives: false,
          Chk_SendSMSInPermanentArchives: false,
          Chk_SendSMSRegisterRequest: false,
          SMSSignature: "",
          RevisitTimeFrom: "",
          RevisitTimeTo: "",
          RevisitDuration: 30,
          Chk_PreventRevisitInHolidays: false,
          Chk_CalculateZabeteh: false,
          Chk_SetMaoCode: false,
          Chk_FillUnregisteredCode: false,
          Chk_MissFoulUserChecking: false,
          Chk_RevisitAgentCopyChecking: false,
          Chk_CommissionFine: false,
          Chk_CommisionVoteChecking: false,
          Chk_IsComboRequesterName: false,
          Chk_IsMultipleSendToBlackList: false,
          Chk_IsCopyShArchiveFromParvandeh: false,
          Chk_IsCurrentDateForConfirmLicence: false,
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtWCF: false,
          Chk_IsCheckSabtJson: false,
          Chk_IsCheckMapInfo: false,
          Chk_IsChecExistBlock: false,
          Chk_IsChecUserInDutyCodes: false,
          Chk_PreventCancelRequest: false,
          LayerIdCommision5: "",
          UsingCount: 1,
          ArchiveParvanehEntityId: 1,
          ArchiveAnswerEstelamEntityId: 1,
          ArchivePayankarEntityId: 1,
          ArchiveMapCommandEntityId: 1,
          ArchiveCertificateOfContraryEntityId: 1,
          ArchivePrincipalAgreementEntityId: 1,
          Chk_IsCheckCommissionInExitTemporary: false,
          Chk_IsShowBaseDig: false,
          Chk_IsChangeNosaziCodeInSubSystems: false,
          Chk_DontCheckCroquisInRevisit: false,
          Chk_DontCheckPreCommissionInfo: false,
          Chk_IsSelectOnObjTypeInRevisit: false,
          Chk_AllowExitFromBlackListWithSameGroups: false,
          Chk_DontCheckRequestInConvertBuildingToHousSharing: false,
          Chk_DontCheckRequestInConvertHousSharingToBuilding: false,
          Chk_DontShowMomayeziGroup: false,
          Chk_DontValidationInBlackList: false,
          Chk_BackToStartInConvert: false,
          Chk_DontShowPenaltyGroup: false,
          Chk_GenerateDateAndConversionDateToYear: false,
          Chk_GenerateDateAndConversionDateToDate: false,
          Chk_GenerateYear: false,
          DontAddShopToHouse: false,
          DontCheckDiscountNationalCode: false,
          EditableRequesterDecimalCheck: false,
          smsInManagementConfirm: false,
          IgonreRegionForAgent: false,
          StopNosaziCodeTransferIfCommission: false,
          CanChangeDistrict: false,
          ControlBlackListForRemovingNosaziCode: false
        }
      }
    }
  },
  mixins: [baseFormMixin],
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
            key: "BuildingSettings",
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
          bizCode: "BuildingSettings",
          bizCodeTitle: "تنظیمات شهرسازی"
        })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    async saveFormSetting () {
      if (!this.isValidForm()) return
      try {
        this.loading = true
        await this.$stKartable.dispatch("formSettings/saveSettings", {
          key: "BuildingSettings",
          value: this.model,
          nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
        })
        this.showSuccess("اطلاعات با موفقیت ذخیره شد.")
        this.isEditable = false
        await this.log({
          action: this.logActions.save,
          bizCode: "BuildingSettings",
          bizCodeTitle: "تنظیمات شهرسازی"
        })
      } catch (e) {
        console.log("errorrrr", e)
        this.showError("خطا در سرویس  رخ داده است.")
      } finally {
        this.loading = false
      }
    }
  },
  watch: {
    "model.ShahrsaziSettings": {
      handler () {
        if (
          this.model.ShahrsaziSettings.Chk_IsCheckSabtWCF === false &&
          this.model.ShahrsaziSettings.Chk_IsCheckSabtJson === true
        ) {
          this.chkIsCheckSabtServType = "Chk_IsCheckSabtJson"
        } else if (
          this.model.ShahrsaziSettings.Chk_IsCheckSabtWCF === true &&
          this.model.ShahrsaziSettings.Chk_IsCheckSabtJson === false
        ) {
          this.chkIsCheckSabtServType = "Chk_IsCheckSabtWCF"
        } else {
          this.chkIsCheckSabtServType = "Chk_IsCheckSabtJson"
        }
      },
      deep: true
    }
  }
}
</script>
