<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <fit>
        <safa-grid
          v-model="listOfFiscalYear"
          cdcName="listOfFiscalYear"
          :columns="Columns"
          height="100%"
          fit
          :deleteRow="false"
          :allowCopy="false"
          :m="mode"
          paginate
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <!-- <btn-back label="خروج" v-if="!isEditable" /> -->
        </form-actions>
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
      title: "سال مالی",
      formKey: "8011A5B7-2263-45D5-B632-A9FB12FC2422",
      name: "UFiscalYear",
      main: true,

      // Var
      listOfFiscalYear: [],

      // Col
      Columns: [
        {
          title: "کد",
          field: "ID",
          width: "65px"
        },
        {
          title: "عنوان",
          field: "Title"
        },
        {
          title: "از تاریخ",
          field: "FromDate",
          editor: "date"
        },
        {
          title: "تا تاریخ",
          field: "ToDate",
          editor: "date"
        },
        {
          title: "فعال",
          field: "IsActive",
          editor: "checkbox",
          width: "65px"
        }
      ],

      isView: false,
      // Res
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
      const payload = {
        pId: "0"
      }
      this.$services.ES.getCIYear(payload)
        .then(({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.listOfFiscalYear =
              this.loadObjRes.data.GetCI_YearResult.CI_Year
            if (!this.isView) {
              this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `نمایش فرم سال مالی انجام گردید.`
              })
            }
            this.isView = true
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
      this.showLoading()
      const payload = {
        pCI_Year: {
          CI_Year: this.listOfFiscalYear
        },
        pUserID: this.getNidUser(),
        pUserName: this.getUserDisplayName()
      }
      this.$services.ES.saveCIYear(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره فرم سال مالی انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
