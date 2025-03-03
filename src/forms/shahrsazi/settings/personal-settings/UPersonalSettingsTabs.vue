<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :padding="false" title="تنظیمات شخصی" vertical>
      <safa-tabs v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu label="تنظیمات" name="settings"/>
          <tab-menu label="نوسازی" name="nosazi"/>
        </template>
        <tab-content name="settings">
          <USettings
            v-model="model.PersonalSettingMain"
            :formKey="formKey"
            :isEditable="isEditable"
            :m="mode"
            :name="name"
            :title="title"
          />
        </tab-content>
        <tab-content name="nosazi">
          <UNosazi
            v-model="model.PersonalSettingNosazi"
            :formKey="formKey"
            :isEditable="isEditable"
            :m="mode"
            :name="name"
            :title="title"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @save="saveFormSetting"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UNosazi from './partials/UNosazi'
import USettings from './partials/USettings'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: 'settings/personal-settings',

  components: {
    UNosazi,
    USettings
  },
  data () {
    return {
      title: 'شهرسازی- تنظیمات شخصی',
      formKey: 'eae85bb1-1b54-4233-b58c-330278d0d052',
      name: 'UPersonalSettingsTabs',
      main: true,
      model: {
        PersonalSettingMain: {
          ChkShowPopupBlackList: false,
          ChkShowPopupTemporaryArchives: false,
          ChkShowPopupPermanentArchives: false,
          ChkShowRevokedRequest: false,
          ChkShowPopupResponder: false,
          ChkShowPopupArchive: false,
          ChkShowPopupLettersKartabl: false
        },
        PersonalSettingNosazi: {
          DefaultDistrict: 0,
          DefaultRegion: 0,
          ChkCalculateNosazi: false
        }
      },
      PersonalSetting: {
        ChkShowPopupBlackList: false,
        ChkShowPopupTemporaryArchives: false,
        ChkShowPopupPermanentArchives: false,
        ChkShowRevokedRequest: false,
        ChkShowPopupResponder: false,
        ChkShowPopupArchive: false,
        ChkShowPopupLettersKartabl: false,
        DefaultDistrict: 0,
        DefaultRegion: 0,
        IsCalculateNosazi: false
      },
      PersonalSettingMain: {
        ChkShowPopupBlackList: false,
        ChkShowPopupTemporaryArchives: false,
        ChkShowPopupPermanentArchives: false,
        ChkShowRevokedRequest: false,
        ChkShowPopupResponder: false,
        ChkShowPopupArchive: false,
        ChkShowPopupLettersKartabl: false
      },
      Base_settingNosazi: {
        DefaultDistrict: 0,
        DefaultRegion: 0,
        IsCalculateNosazi: false
      },
      // results: [],
      activeTab: 'settings',
      editMode: 'r'
    }
  },
  mixins: [baseFormMixin],
  async created () {
    await this.loadFormSetting()
  },
  methods: {
    async loadFormSetting () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'Sharsazi-PersonalSetting',
            defaultValue: this.model
          }
        )
        this.model = settings
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.loading = false
      }
    },
    async saveFormSetting () {
      if (!this.isValidForm()) return
      try {
        this.loading = true
        await this.$stKartable.dispatch('formSettings/saveSettings', {
          key: 'Sharsazi-PersonalSetting',
          value: this.model
        })
        this.isEditable = false
        this.showSuccess('تنظیمات با موفقیت ذخیره شد.')
        await this.log({
          action: this.logActions.save,
          bizCode: 'Sharsazi-PersonalSetting',
          bizCodeTitle: 'تنظیمات شخصی'
        })
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
