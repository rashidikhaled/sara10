<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="5FB05A4F-DA31-4202-83D1-D7558D5E965A"
  >
    <form-wrapper :title="title">
      <fit>
        <FormRow>
          <FormControl>
            <safa-combo
              label="سال پیش فرض"
              label-width="100px"
              :m="mode"
              v-model="model.CI_Year"
              domainName="Fire"
              ciName="CI_Year"
              cdcName="CI_Year"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="اندازه نمایش فرمها"
              label-width="100px"
              :m="mode"
              v-model="model.formSize"
              sourceType="local"
              :options="formSizeOptions"
              cdcName="formSize"
            />
          </FormControl>
          <FormControl class="flex items-center">
            <safa-label style="width: 100px">باز شدن منوی</safa-label>
            <div class="q-gutter-x-lg">
              <safa-radio
                label="Single"
                :m="mode"
                v-model="model.openMenu"
                cdcName="Single"
                val="Single"
              />
              <safa-radio
                label="Multiple"
                :m="mode"
                v-model="model.openMenu"
                cdcName="Multiple"
                val="Multiple"
              />
            </div>
          </FormControl>
          <FormControl class="flex items-center">
            <safa-checkbox
              label="بازآوری پیش فرض تنظیمات"
              label-width="100px"
              :m="mode"
              v-model="model.goToDefaultSetting"
              cdcName="goToDefaultSetting"
            />
          </FormControl>
        </FormRow>
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
      title: "تنظیمات",
      formKey: "2de28764-d1fb-45f3-a622-221be6304219",
      name: "UFireSetting",
      main: true,

      model: {
        CI_Year: 0,
        goToDefaultSetting: false,
        openMenu: "Single",
        formSize: 0
      },

      formSizeOptions: [
        { ID: 0, Title: "کوچک" },
        { ID: 1, Title: "متوسط" },
        { ID: 2, Title: "بزرگ" }
      ]
    }
  },

  methods: {
    async saveData () {
      //   try {
      //     this.showLoading();
      //     const payload = {}
      //     const { data } = await this.$services.FireService.saveSettingRevisit(payload);
      //     const res = this.getResponse(data);
      //     if (res.success) {
      //       this.showSuccess('ذخیره اطلاعات با موفقیت انجام شد.')
      this.isEditable = false
      //     }
      //   } catch (err) {
      //     console.error("error", err);
      //     this.serverError();
      //   } finally {
      //     this.hideLoading();
      //   }
    }
  }
}
</script>
