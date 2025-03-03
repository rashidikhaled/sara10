<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9"
  >
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="changeIdentityCodeRes" />
    </template>
    <FormRow>
      <FormControl class="q-mt-sm">
        <engineer-info-box
          label="کد عضویت"
          label-width="66px"
          v-model="identityCodeOld"
          cdcName="identityCodeOld"
          hideSearchBtn
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد عضویت جدید"
          label-width="90px"
          v-model="identityCodeNew"
          cdcName="identityCodeNew"
        />
      </FormControl>
    </FormRow>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-save label="تایید" @click="changeIdentityCode" />
        <btn-default label="انصراف" @click="resetObj" />
      </div>
    </template>
  </form-wrapper>
 </safa-form>
</template>

<script>
import { currentDate, currentTime } from "src/utils/index"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تغییر کد عضویت",
      formKey: "dc398a15-679c-4c33-aa38-ad0509565131",
      name: "ChangeEngCode",
      main: true,
      sidebarCompatible: true,

      identityCodeNew: "",
      identityCodeOld: "",
      changeIdentityCodeRes: null
    }
  },
  methods: {
    changeIdentityCode () {
      if (this.identityCodeOld === "") {
        return this.showError("لطفا کدعضویت فعلی را وارد نمایید ")
      }
      if (this.identityCodeNew === "") {
        return this.showError("لطفا کدعضویت جدید را وارد نمایید ")
      }
      this.showLoading()
      this.$services.engineers
        .changeIdentityCode({
          pEng_ChangeIdentityCode: {
            ChangeDate: currentDate(),
            ChangeTime: currentTime(),
            IdentityCode_New: this.identityCodeNew,
            IdentityCode_Old: this.identityCodeOld,
            NId: "00000000-0000-0000-0000-000000000000",
            NIdEng: "00000000-0000-0000-0000-000000000000",
            NIdUser: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        })
        .then(async (data) => {
          this.changeIdentityCodeRes = this.getResponse(data)
          if (this.changeIdentityCodeRes.success) {
            this.showSuccess("تغییر کدعضویت با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.identityCodeOld,
              bizCodeTitle: "کدعضویت"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    resetObj () {
      this.hideSidebar(this.name)
    }
  }
}
</script>
