<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id='3C1CAD2C-BC81-4568-B146-501ED62FFA23'
  >
    <FormWrapper :title="title" :padding="false">
      <!-- <template #header> </template> -->
      <fit>
        <safa-tabs fit v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="تنظیمات عوارض" name="dutySetting" />
            <tab-menu label="پروفایل کاربر" name="userProfile" />
          </template>
          <tab-content name="dutySetting">
            <form-row>
              <form-control>
                <safa-text
                  label="سال شروع محاسبه"
                  label-width="100px"
                  v-model="model.StartYear"
                  :m="mode"
                  :maxlength="4"
                />
              </form-control>
              <form-control>
                <safa-text
                  label="حداقل قیمت"
                  label-width="80px"
                  v-model="model.LeastPrice"
                  :m="mode"
                  :maxlength="25"

                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="مهلت پرداخت به صورت تعداد روز"
                  label-width="100px"
                  v-model="model.IsBreakInDay"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-text
                  label="تعداد روز"
                  label-width="80px"
                  v-model="model.BreakDay"
                  :m="mode"
                  :maxlength="10"

                />
              </form-control>
              <form-control>
                <safa-datepicker
                  label="مهلت پرداخت"
                  label-width="100px"
                  v-model="model.BreakDate"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="قطعیت در هنگام محاسبات"
                  label-width="80px"
                  v-model="model.DoFinal"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="ابطال فیش ها هنگام صدور فیش"
                  label-width="100px"
                  v-model="model.IsCanceldFiches"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="تنظیم سال تسویه در تایید فیش سالیانه"
                  label-width="80px"
                  v-model="model.SetPayOffForConfirmYearly"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="تنظیم سال تسویه در تایید فیش جمعی"
                  label-width="100px"
                  v-model="model.SetPayOffForConfirmCollective"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="تنظیم سال تسویه در تایید فیش تقسط"
                  label-width="80px"
                  v-model="model.SetPayOffForConfirmTaghsit"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="ابطال فیش های هنگام تایید فیش"
                  label-width="80px"
                  v-model="model.IsCanceldFichesInConfirm"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="صنفی در پسماند"
                  label-width="80px"
                  v-model="model.IncludeShop"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="ملک در نوسازی"
                  label-width="80px"
                  v-model="model.IncludeHouse"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="محاسبه بر اساس بازدید"
                  label-width="80px"
                  v-model="model.CalcInRevisit"
                  :m="mode"
                />
              </form-control>
              <form-control>
                <safa-checkbox
                  label="نمایش خطای سیستم مالی"
                  label-width="80px"
                  v-model="model.IsShowAccountingSystemError"
                  :m="mode"
                />
              </form-control>
            </form-row>
          </tab-content>
          <tab-content name="userProfile">
            <form-row>
              <form-control>
                <safa-checkbox
                  label="نشان دادن عوارض پسماند در پنجره جدید"
                  label-width="100px"
                  v-model="model.ShowPopupGarbage"
                  :m="mode"
                />
              </form-control>
              <form-control> </form-control>
            </form-row>
          </tab-content>
        </safa-tabs>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="savePasmandFormSetting"
        >
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات پسماند",
      formKey: "4e01f517-3240-4570-9fa3-7b6cf6485de0",
      name: "UDutySetting",
      main: true,
      sidebarCompatible: true,

      activeTab: "dutySetting",

      model: {
        StartYear: "1398",
        LeastPrice: "",
        IsBreakInDay: true,
        BreakDay: "360",
        BreakDate: "",
        DoFinal: true,
        IsCanceldFiches: false,
        SetPayOffForConfirmYearly: true,
        SetPayOffForConfirmCollective: false,
        SetPayOffForConfirmTaghsit: true,
        IsCanceldFichesInConfirm: true,
        IncludeShop: true,
        IncludeHouse: true,
        CalcInRevisit: false,
        IsShowAccountingSystemError: false,
        ShowPopupGarbage: true
      }
    }
  },
  created () {
    this.loadPasmandFormSetting()
  },
  methods: {
    async loadPasmandFormSetting () {
      try {
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "pasmandSettings",
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
          bizCode: "PasmandSettings",
          bizCodeTitle: "تنظیمات پسماند"
        })
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async savePasmandFormSetting () {
      if (!this.isValidForm()) return
      try {
        await this.$stKartable.dispatch("formSettings/saveSettings", {
          key: "PasmandSettings",
          value: this.model,
          nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
        })
        this.showSuccess("اطلاعات با موفقیت ذخیره شد.")
        this.isEditable = false
        await this.log({
          action: this.logActions.save,
          bizCode: "PasmandSettings",
          bizCodeTitle: "تنظیمات پسماند"
        })
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
