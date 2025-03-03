<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper :padding="false" :title="title">
      <fit>
        <safa-tabs v-model="activeTab" class="fit">
          <template v-slot:tabs>
            <tab-menu label="تنظیمات عوارض" name="avarezSettings"/>
            <tab-menu label="پروفایل کاربر" name="userProfile"/>
          </template>
          <tab-content name="avarezSettings" title="تنظیمات عوارض">
            <UAvarezSettings
              v-model="dataContext.AvarezSettings"
              :isEditable="isEditable"
              :m="mode"
            />
          </tab-content>
          <tab-content name="userProfile" title="پروفایل کاربر">
            <UUserProfile
              v-model="dataContext.UserProfile"
              :isEditable="isEditable"
              :m="mode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="btnCancelClick"
          @edit="isEditable = true"
          @save="btnSaveClick"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UAvarezSettings from './partials/UAvarezSettings'
import UUserProfile from './partials/UUserProfile'
import baseFormMixin from 'src/mixins/baseFormMixin'
import FormActions from 'src/components/FormActions'

import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'

export default {
  route: '/nosazi-avarez/nosazi-settings',

  mixins: [baseFormMixin],
  components: {
    UAvarezSettings,
    UUserProfile,
    FormActions
  },
  data () {
    return {
      title: 'تنظیمات نوسازی',
      formKey: '96506bab-b1f1-4325-b162-8da4a7a083a3',
      name: 'UNosaziSettingsTabs',
      main: true,
      sidebarCompatible: true,

      // Tab
      activeTab: 'avarezSettings',

      // Models
      dataContext: {
        AvarezSettings: {
          startYear: '',
          leastPrice: '',
          isBreakInDay: false,
          breakDay: '',
          breakDate: '',
          doFinal: false,
          isCanceldFiches: false,
          setPayOffForConfirmYearly: false,
          setPayOffForConfirmCollective: false,
          setPayOffForConfirmTaghsit: false,
          isCanceldFichesInConfirm: false,
          includeShop: false,
          includeHouse: false,
          toCurrentObject: false,
          exportFicheOnHouse: false,
          groupType: 0,
          isShowAccountingSystemError: false,
          isCancelBankConfirmFiches: false,
          isShowRevisitByLastRevisitDate: false
        },
        UserProfile: {
          showPopupDuty: false,
          showPopupCollectiveDuty: false
        }
      }
    }
  },
  async created () {
    await this.loadSettings()
  },
  methods: {
    async loadSettings () {
      this.dataContext = await this.loadFormSetting('nosaziSettings', {
        defaultValue: this.dataContext,
        nidProc: GLOBAL_SETTINGS_GUID
      })
      await this.log({
        action: this.logActions.view,
        bizCode: GLOBAL_SETTINGS_GUID,
        bizCodeTitle: 'NidProc',
        saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
      })
    },

    async saveSettings () {
      if (
        await this.saveFormSetting('nosaziSettings', this.dataContext, {
          nidProc: GLOBAL_SETTINGS_GUID
        })
      ) {
        this.showSuccess('تنظمیات با موفقیت ذخیره شد.')
        this.isEditable = false
        await this.log({
          action: this.logActions.save,
          bizCode: GLOBAL_SETTINGS_GUID,
          bizCodeTitle: 'NidProc',
          saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
        })
      }
    },

    btnCancelClick () {
      this.isEditable = false
      this.loadSettings()
    },

    btnSaveClick () {
      this.saveSettings()
    }
  }
}
</script>
