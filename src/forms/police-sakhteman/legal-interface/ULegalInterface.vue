<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :title="title" :padding="false">
      <template>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <safa-grid
          fit
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="gvList"
          cdcName="legalInterface"
          helper="legalInterface"
          paginate
          :take="20"
          :m="mode"
          :addRow="true"
          :allowCopy="true"
          :isEditable="true"
          :isDeleteabl="true"
          :hideHeader="true"
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
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
      title: "رابط های حقوقی مناطق",
      formKey: "725B7570-00C3-40CE-A5E1-1113A07106D1",
      name: "ULegalInterface",
      main: true,
      sidebarCompatible: true,

      gvList: [],
      loadObjRes: null,
      saveObjRes: null
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.SH.GetLegalInterfaceList()
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.gvList =
              this.loadObjRes.data?.GetLegalInterfaceListResult
                ?.LegalInterfaceList ?? []
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "نمایش لیست رابط های حقوقی مناطق انجام گردید."
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

    saveObj () {
      try {
        if (this.gvList.length === 0) {
          return this.showError("موردی برای ذخیره وجود ندارد")
        }
        this.showLoading()
        this.$services.SH.SaveLegalInterface({
          LegalInterfaceList: this.gvList,
          NIdUser: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }).then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: "ذخیره لیست رابط های حقوقی مناطق انجام گردید."
            })
            this.showSuccess("با موفقیت انجام شد")
            this.isEditable = false
            this.loadObj()
          }
        })
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
