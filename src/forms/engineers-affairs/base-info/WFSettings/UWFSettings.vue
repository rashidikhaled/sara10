<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="resLoadObj" />
        <safa-status :result="resSaveObj" />
      </template>
      <fit>
        <div class="row q-mb-sm q-pl-sm q-gutter-sm">
          <div class="col-12 col-md-4 col-sm-3 col-lg-4">
            <safa-combo
              label="کاربران گروه مهندسین ناظر"
              :m="mode"
              v-model="engineerUsers"
            />
          </div>
          <div class="col-auto">
            <btn-default label="اضافه" @click="addUser" />
          </div>
        </div>

        <safa-grid
          helper="wfSettings"
          height="100%"
          max-height="100%"
          fit
          paginate
          :perPage="[20]"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :m="mode"
          v-model="model.ClsWFSettings.WFSettings"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        </FormActions>
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
      title: "تنظیمات گردش کار",
      formKey: "A8A0BB2A-8742-4246-8898-B5F982FB307B",
      name: "UWFSettings",
      main: true,
      engineerUsers: null,

      // services
      resLoadObj: null,
      resSaveObj: null,
      model: {
        ClsWFSettings: {
          WFSettings: []
        }
      }
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.engineers.GetWFSettings({})
        this.resLoadObj = this.getResponse(data)
        if (this.resLoadObj.success) {
          this.model.ClsWFSettings.WFSettings =
            this.resLoadObj.data.GetWFSettingsResult.ClsWFSettings.WFSettings
          this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const payload = {
          pRequest: { ...this.model }
        }
        const { data } = await this.$services.engineers.SaveWFSettings(payload)
        this.resSaveObj = this.getResponse(data)
        if (this.resSaveObj.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    addUser () {
      if (this.engineerUsers === null) {
        this.showError("لطفا کاربر مورد نظر را انتخاب نمایید")
      }
    }
  }
}
</script>
