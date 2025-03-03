<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <fit>
      <safa-grid
        helper="referencesColumns"
        v-model="references"
        cdcName="references"
        title="لیست ارجاعات"
        fit
        height="100%"
        min-height="200px"
        max-height="100%"
        :m="mode"
        class="q-mb-sm"
      />
    </fit>

    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @save="saveData"
        @cancel="isEditable = false"
      >
        <template v-slot:after>
          <btn-delete label="حذف" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "ارجاعات",
      name: "UReferences",
      formKey: "39f9fee2-ee37-4f8d-b903-1a09f6066489",
      main: true,
      // referencesColumns: [
      //   {
      //     field: "CI_Inquiry",
      //     title: "نوع پرونده",
      //     width: "150px",
      //     editor: "combo",
      //     domain: "Commission100"
      //   },
      //   {
      //     field: "Num",
      //     title: "شماره",
      //     width: "150px"
      //   },
      //   {
      //     field: "InquiryDate",
      //     title: "تاریخ",
      //     width: "150px",
      //     editor: "date"
      //   },
      //   {
      //     field: "Comment",
      //     title: "توضیحات",
      //     width: "400px"
      //   }
      // ],
      model: {
        IsActive: false,
        NIDCommission: "00000000-0000-0000-0000-000000000000",
        NIDVote: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        ISRelapse: false,
        IsRegion: false,
        IsdeleteArchive: false,
        NidAgent: "00000000-0000-0000-0000-000000000000",
        NidTaskState: "00000000-0000-0000-0000-000000000000",
        NidUser: "00000000-0000-0000-0000-000000000000",
        SelectedDate: 0
      },
      references: []
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.showLoading()
      const payload = {
        PRequest: { ...this.model }
      }
      this.$services.commissions
        .getCommissionInquiry(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.references =
              res.data.GetCommission_InquiryResult.Commission_Inquirys
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.NIDCommission,
              bizCodeTitle: "NIDCommission",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      this.showLoading()
      const payload = {
        PRequest: {
          Commission_Inquirys: {
            Commission_Inquiry: this.references
          },
          NidCommission: this.selectedNidCommission
            ? this.selectedNidCommission
            : "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.commissions
        .saveCommissionInquiry(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            if (
              res.data.Save_Commission_InquiryResult.Commission_Inquirys
                .length === 0
            ) {
              this.showError(
                "مقدار بازگشتی متد null است . لطفا به مدیر سیستم اطلاع دهید."
              )
            }

            await this.log({
              action: this.logActions.save,
              bizCode: this.model.NIDCommission,
              bizCodeTitle: "NIDCommission",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
