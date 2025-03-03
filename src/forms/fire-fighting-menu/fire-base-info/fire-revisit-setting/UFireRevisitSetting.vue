<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title" :padding="false">
      <fit>
        <safa-grid
          v-model="model.Setting_Revisit"
          :columns="settingRevisitColumns"
          :show-selected-checkbox="true"
          :allowMultipleSelection="false"
          fit
          paginate
          :m="mode"
          :suppressRowClickSelection="false"
          :insertNewRowBefore="false"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تنظیمات بازدید",
      formKey: "1bf04b5c-8a20-4f11-9469-449184a790e4",
      name: "UFireRevisitSetting",
      main: true,

      model: {
        Setting_Revisit: []
      },
      settingRevisitColumns: [
        {
          field: "CI_Year",
          title: "سال",
          width: "100px",
          editor: "combo",
          domain: "Fire"
        },
        {
          field: "FromMeter",
          title: "از متراژ",
          width: "100px",
          editor: "number"
        },
        {
          field: "ToMeter",
          title: "تا متراژ",
          width: "100px",
          editor: "number"
        },
        {
          field: "LimitDay",
          title: "تعداد روز",
          width: "100px",
          editor: "number"
        }
      ]
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.loadData()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      this.hideSidebar("UFireRevisitSetting")
    }
  },

  methods: {
    async loadData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.getSettingRevisit()
        const res = this.getResponse(data)
        if (res.success) {
          if (res.data && res.data.Setting_Revisit) {
            this.model = res.data
          }
        } else {
          const err = data.ErrorResult.BizErrors
          for (let i = 0; i < err.length; i++) {
            this.showError(err[i].ErrorTitel)
          }
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveData () {
      try {
        this.showLoading()
        const { data } = await this.$services.FireService.saveSettingRevisit({
          PObj: this.model
        })
        const res = this.getResponse(data)
        if (res.success) {
          // this.model = res.data;
          // this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
          this.isEditable = false
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
