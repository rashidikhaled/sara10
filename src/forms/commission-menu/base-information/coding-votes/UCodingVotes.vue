<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title" :padding="false">
    <fit>
      <safa-grid
        v-model="model.ADP_VoteTypeDetail"
        cdcName="ADP_VoteTypeDetail"
        helper="VoteTypeDetailColumns"
        :m="mode"
        :paginate="true"
        :pageSize="20"
        fit
        height="100%"
        max-height="100%"
        min-height="200px"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
      >
        <!-- <template #cell-UsingGroupID="{ row, col, onChangeCellValue }">
          <safa-combo

            :value="row[col.field]"
            @input="
              onChangeCellValue({
                field: col.field,
                dataItem: row,
                value: parseInt($event),
              })
            "
            ref="usingGroupRef"
            ciName="CI_UsingGroup"
            :m="mode"
            domainName="Commission100"
          />

        </template> -->
      </safa-grid>
    </fit>
    <template #footer>
      <form-actions
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
      title: "کدینگ رای",
      name: "UCodingVotes",
      formKey: "1cf53820-677d-433c-9343-17c2d1cee9c6",
      main: true,
      model: {
        ADP_VoteTypeDetail: []
        // UsingGroupID: "1",
      },
      isView: false,
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
      this.isEditable = false
      this.$services.commissions
        .getADPVoteTypeDetail()
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetADP_VoteTypeDetailResult
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          console.error(e)
          // this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      this.showLoading()
      this.$services.commissions
        .saveADPVoteTypeDetail({
          pClsCoding: { ...this.model }
        })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((e) => {
          console.error(e)
          // this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
