<template>
<safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
  <FormWrapper :title="title">
    <template #hedaer>
      <safa-status :result="settingsRes"/>
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="comboValue"
            sourceType="local"
            :options="options"
            :m="mode"
            label="کاربران گروه مهندسین ناظر"
            label-width="130px"
          />
        </FormControl>
        <div>
          <btn-new label="اضافه" @click="addHandler"/>
        </div>
      </FormRow>

      <safa-datatable
        title="عنوان جدول"
        v-model="model.ClsWFSettings.WFSettings"
        fit
        :columns="clsWFSettingsColumns"
        :selectable="true"
        :allowMultipleSelection="true"
        :m="mode"
        min-height="100px"
        height="100%"
        max-height="100%"
        paginate
      />
    </fit>
    <template #footer>
      <FormActions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      />
    </template>
  </FormWrapper>
</safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'تنظیمات گردش کار',
      formKey: 'a8a0bb2a-8742-4246-8898-b5f982fb307b',
      name: 'UreportSetting',
      main: true,

      model: {
        ClsWFSettings: {
          WFSettings: []
        }
      },
      comboValue: 0,
      settingsRes: null,
      options: [],
      clsWFSettingsColumns: [
        {
          field: 'CI_Region',
          title: 'منطقه',
          domain: 'engineer',
          editor: 'combo',
          width: '150px'
        },

        {
          field: 'CI_RequestType',
          domain: 'engineer',
          editor: 'combo',
          title: 'نوع درخواست',
          width: '200px'
        },
        {
          field: 'UserName',
          title: 'نام کاربری',
          width: '200px'
        }
      ]
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.showLoading()
      this.$services.engineers
        .getWFSettings()
        .then(({ data }) => {
          this.settingsRes = this.getResponse(data)
          if (this.settingsRes.success) {
            this.model = this.settingsRes.data.GetWFSettingsResult
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    addHandler () {
      this.showError('لطفا کاربر مورد نظر را انتخاب نمایید.')
    },

    saveData () {
    }
  }
}
</script>
