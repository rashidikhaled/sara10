<template>
  <form-wrapper
    :id="formKey"
    :caption="title"
    vertical
    :title="title"
  >
    <div class="q-gutter-sm">
      <safa-combo
        domainName="engineer"
        ciName="CI_Years"
        v-model="model.CI_Years_Eng"
        label="سال پیش فرض امور"
        label-width="120px"
        :m="mode"
      />
      <safa-combo
        domainName="engineer"
        ciName="CI_Years"
        v-model="model.CI_Years_Income"
        label="سال پیش فرض درآمد"
        label-width="120px"
        :m="mode"
      />
      <safa-checkbox
        :m="mode"
        label="باز شدن پیش فرض جزئیات مهندس"
        v-model="model.IsOpenPopup"
      />
      <safa-checkbox
        :m="mode"
        v-model="model.IsEditSecrfromResponseKartabl"
        label="ویرایش ارجاع به مهندس از کارتابل پاسخگو"
      />
      <!-- <safa-checkbox
        :m="mode"
        v-model="model.IsSendSms"
        label="ارسال پیامک برای تایید مهندس در عملکرد"
      /> -->
    </div>
    <template v-slot:footer>
      <FormActions
        @edit="isEditable = true"
        :m="mode"
        @save="saveData"
        @cancel="isEditable = false"
      ></FormActions>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تنظیمات",
      formKey: "7e609374-9521-40d0-aa98-88ea58280f7a",
      name: "EngSetting",
      main: true,
      model: {
        CI_Years_Eng: 1399,
        CI_Years_Income: 1399,
        IsOpenPopup: false,
        IsEditSecrfromResponseKartabl: false
        // IsSendSms: false
      }
    }
  },
  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "EngSetting",
            defaultValue: this.model
          }
        )
        this.model = settings
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },

    saveData () {
      this.loading = false
      try {
        this.$stKartable
          .dispatch("formSettings/saveSettings", {
            key: "EngSetting",
            value: this.model
          })
          .then(async (value) => {
            this.showSuccess("تنظیمات با موفقیت ذخیره شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات  ${this.title} انجام گردید.`
            })
          })
          .catch(_ => {
            this.showError("خطا در سرویس توضیحات رخ داده است.")
          })
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
