<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="6F4ED27E-1373-4928-8319-DBE6B274D2F5"
  >
    <form-wrapper :title="title" :padding="true">
      <fit>
        <form-control>
          <safa-text
            v-model="DeadlineDate"
            class="col-12 col-md-3 col-sm-4"
            label="مدت زمان اخطاریه به روز "
            :maxlength="10"
            :m="m"
          />
        </form-control>
        <safa-checkbox
          v-model="model.IsSingleRequest"
          :m="m"
          label="ثبت درخواست درامد بصورت تکی"
        />
        <safa-checkbox
          v-model="model.IsEnableVote"
          :m="m"
          label="امکان ویرایش رای بعد ذخیره رای"
        />
        <safa-checkbox
          v-model="model.IsMultiAlert"
          :m="m"
          label="امکان ثبت چند اخطار برای درخواست"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="m"
          @edit="(isEditable = true), (m = 'e')"
          @cancel="goToReadonlyMode, (m = 'r')"
          @save="saveFormSetting"
        />
      </template>
    </form-wrapper
    >
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تنظیمات',
      formKey: '6A8A605F-53B2-4BF8-9E4F-BD8EB1511A40',
      name: 'USetting',
      main: true,

      DeadlineDate: 10,

      model: {
        IsSingleRequest: false,
        IsEnableVote: true,
        IsMultiAlert: true
      },

      // formAction
      isGoToEdit: false,
      m: 'r',
      formActionEditMode: 'r',
      isEditMode: 'r'
    }
  },
  props: {
    editMode: {
      type: String,
      default: 'e'
    }
  },
  methods: {
    async loadFormSetting () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'commission77Settings',
            defaultValue: this.model,
            nidProc: GLOBAL_SETTINGS_GUID
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
      this.loading = false
      try {
        this.$stKartable
          .dispatch('formSettings/saveSettings', {
            key: 'commission77Settings',
            value: this.model,
            nidProc: GLOBAL_SETTINGS_GUID
          })
          .then((value) => {
            this.showSuccess('تنظیمات با موفقیت ذخیره شد.')
            this.isEditable = false
          })
          .catch((_) => {
            this.showError('خطا در سرویس توضیحات رخ داده است.')
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
