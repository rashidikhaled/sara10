<template>
  <safa-form
    appId="7EDDCC78-5BF6-412A-8C2C-8B13CC51F975"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template>
        <safa-status :result="getTabletSettingsRes" />
        <safa-status :result="saveTabletSettings" />
      </template>
      <fit>
        <expantion-section v-model="es1" default-opened title="تنظیمات نقشه">
          <div class="row q-col-gutter-sm">
            <safa-text
              label="آدرس سرور نقشه"
              label-width="110px"
              v-model="tabletSettings.UrlMapTile"
              cdcName="UrlMapTile"
              :m="mode"
              class="col-12"
              maxlength="25"
              :validations="['number']"
            />
            <safa-text
              label="کد لایه موجود"
              label-width="110px"
              v-model="tabletSettings.CurrentMapLayer"
              cdcName="CurrentMapLayer"
              :m="mode"
              class="col-12"
              maxlength="25"
              :validations="['number']"
            />
            <safa-text
              label="کد لایه معابر"
              label-width="110px"
              v-model="tabletSettings.StreetMapLayer"
              cdcName="StreetMapLayer"
              :m="mode"
              class="col-12"
              maxlength="25"
              :validations="['number']"
            />
          </div>
        </expantion-section>
        <expantion-section
          v-model="es2"
          default-opened
          title="تنظیمات اعتبارسنجی"
        >
          <div class="row q-col-gutter-sm">
            <safa-checkbox
              label="آیا تکراری نبودن شماره پروانه ساختمانی چک شود؟"
              v-model="tabletSettings.ParvanehNo"
              cdcName="ParvanehNo"
              :m="mode"
              class="col-12"
            />
            <safa-checkbox
              label="آیا تکراری نبودن شماره پایانکار ساختمانی چک شود؟"
              v-model="tabletSettings.PayankarNo"
              cdcName="PayankarNo"
              :m="mode"
              class="col-12"
            />
          </div>
        </expantion-section>
        <expantion-section v-model="es3" default-opened title="تنظیمات نمایشی">
          <div class="row q-col-gutter-sm">
            <safa-checkbox
              label="آیا کد نوسازی در یک ردیف نمایش داده شود؟"
              v-model="tabletSettings.ShowHorizontalNosaziCode"
              cdcName="ShowHorizontalNosaziCode"
              :m="mode"
              class="col-12"
            />
            <safa-text
              label="کد ابتدای کد پستی"
              label-width="110px"
              v-model="tabletSettings.StarterPostCode"
              cdcName="StarterPostCode"
              :m="mode"
              class="col-12"
              maxlength="25"
              :validations="['number']"
            />
          </div>
        </expantion-section>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @cancel="cancelObj"
          @edit="isEditable = true"
          @save="saveObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import { EumTabletSettings } from "src/forms/audit/config/enums";

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "تنظیمات دستگاه همراه",
      formKey: "A8023CE7-1CF9-4210-B73E-5CD47E86433F",
      name: "UTabletSettings",
      main: true,

      isView: false,
      es1: true,
      es2: true,
      es3: true,
      getTabletSettingsRes: null,
      saveTabletSettings: null,
      model: {
        Sys_TabletSettings: {}
      },
      tabletSettings: {
        UrlMapTile: "",
        CurrentMapLayer: "",
        StreetMapLayer: "",
        ParvanehNo: false,
        PayankarNo: false,
        ShowHorizontalNosaziCode: false,
        StarterPostCode: ""
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
        const { data } = await this.$services.SO.getTabletSettings()
        this.getTabletSettingsRes = this.getResponse(data)
        if (this.getTabletSettingsRes.success) {
          this.model = this.getTabletSettingsRes.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `نمایش تنظیمات دستگاه همراه توسط کاربر ${this.getUserDisplayName()} انجام گردید`
            })
          }
          this.isView = false
          if (
            this.model &&
            Array.isArray(this.model.Sys_TabletSettings) &&
            this.model.Sys_TabletSettings.length > 0
          ) {
            this.normalizeLoadModel(this.model.Sys_TabletSettings)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveObj () {
      if (
        this.model &&
        Array.isArray(this.model.Sys_TabletSettings) &&
        this.model.Sys_TabletSettings.length === 0
      ) {
        return
      }
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        const { data } = await this.$services.SO.saveTabletSettings({
          pObj: {
            Sys_TabletSettings: this.normalizeSaveModel(
              this.model.Sys_TabletSettings
            )
          }
        })
        this.saveTabletSettingsRes = this.getResponse(data)
        if (this.saveTabletSettingsRes.success) {
          this.showSuccess(
            "عملیات ذخیره تنظیمات دستگاه همراه، با موفقیت انجام گردید."
          )
          await this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `ذخیره تنظیمات دستگاه همراه توسط کاربر ${this.getUserDisplayName()} انجام گردید`
          })
          this.cancelObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    cancelObj () {
      this.isEditable = false
      this.loadObj()
    },
    normalizeLoadModel (arr) {
      // console.log("EumTabletSettings :>> ", EumTabletSettings);
      // console.log("arr :>> ", arr);
      this.tabletSettings = {
        UrlMapTile: "",
        CurrentMapLayer: "",
        StreetMapLayer: "",
        ParvanehNo: false,
        PayankarNo: false,
        ShowHorizontalNosaziCode: false,
        StarterPostCode: ""
      }
      arr.forEach((element) => {
        switch (element.NidTaletSetting) {
          case 1: // UrlTileServer "آدرس تایل سرور"
            this.tabletSettings.UrlMapTile = element.TabletSettingValue
            break
          case 2: // CurrentMapCodeLayer "کد لایه وضع موجود"
            this.tabletSettings.CurrentMapLayer = element.TabletSettingValue
            break
          case 3: // StreetMapCodeLayer "کد لایه معابر"
            this.tabletSettings.StreetMapLayer = element.TabletSettingValue
            break
          case 4: // CheckValidationPayankarNo "آیا شماره پایانکار اعتبار سنجی شود"
            if (element.TabletSettingValue === "1") {
              this.tabletSettings.PayankarNo = true
            } else {
              this.tabletSettings.PayankarNo = false
            }
            break
          case 5: // CheckValidationParvanehNo "آیا شماره پروانه اعتبار سنجی شود"
            if (element.TabletSettingValue === "1") {
              this.tabletSettings.ParvanehNo = true
            } else {
              this.tabletSettings.ParvanehNo = false
            }
            break
          case 6: // StarterPostCode "کد ابتدای کد پستی"
            this.tabletSettings.StarterPostCode = element.TabletSettingValue
            break
          case 7: // IsNosaziCodeInOneLine "آیا کد نوسازی در یک ردیف نمایش داده شود
            if (element.TabletSettingValue === "1") {
              this.tabletSettings.ShowHorizontalNosaziCode = true
            } else this.tabletSettings.ShowHorizontalNosaziCode = false
            break
        }
      })
    },
    normalizeSaveModel (arr) {
      arr.forEach((element) => {
        switch (element.NidTaletSetting) {
          case 1: // UrlTileServer "آدرس تایل سرور"
            element.TabletSettingValue = this.tabletSettings.UrlMapTile
            break
          case 2: // CurrentMapCodeLayer "کد لایه وضع موجود"
            element.TabletSettingValue = this.tabletSettings.CurrentMapLayer
            break
          case 3: // StreetMapCodeLayer "کد لایه معابر"
            element.TabletSettingValue = this.tabletSettings.StreetMapLayer
            break
          case 4: // CheckValidationPayankarNo "آیا شماره پایانکار اعتبار سنجی شود"
            if (this.tabletSettings.PayankarNo === true) {
              element.TabletSettingValue = "1"
            } else element.TabletSettingValue = "0"
            break
          case 5: // CheckValidationParvanehNo "آیا شماره پروانه اعتبار سنجی شود"
            if (this.tabletSettings.ParvanehNo === true) {
              element.TabletSettingValue = "1"
            } else element.TabletSettingValue = "0"
            break
          case 6: // StarterPostCode "کد ابتدای کد پستی"
            element.TabletSettingValue = this.tabletSettings.StarterPostCode
            break
          case 7: // IsNosaziCodeInOneLine "آیا کد نوسازی در یک ردیف نمایش داده شود
            if (this.tabletSettings.ShowHorizontalNosaziCode === true) {
              element.TabletSettingValue = "1"
            } else element.TabletSettingValue = "0"
            break
        }
      })
      return arr
    }
  }
}
</script>
