<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="bea0de7d-9883-48e2-8a7b-9a30d8525255"
  >
    <form-wrapper :title="title">
        <safa-status :result="loadObjRes" />
      <fit>
        <form-row class="q-mb-sm">
          <form-control>
            <safa-text
              label="کد ارجاع"
              v-model="this.txtNIdWorkItem"
              cdcName="txtNIdWorkItem"
              label-width="70px"
              m="r"
            />
          </form-control>
        </form-row>
        <safa-grid
          v-model="relapseList"
          cdcName="relapseList"
          title="لیست عودت"
          helper="agRelapseListColumns"
          height="100%"
          fit
          m="r"
        />
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تاریخچه عودت",
      formKey: "15379A00-A473-4177-8FA3-1FEBFC8A63E9",
      name: "UShowRelapse",
      main: true,

      // Var
      txtNIdWorkItem: "",
      relapseList: [],

      // Res
      loadObjRes: null
    }
  },
  created () {
    this.txtNIdWorkItem = this.selectedRequest ? this.selectedRequest.NidWorkItem : "0"
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      const payload = {
        PNIdWorkItem: this.txtNIdWorkItem
      }

      this.showLoading()
      this.$services.ES.getRelapseLogByNIdWorkItem(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.relapseList =
              this.loadObjRes.data.GetRelapseLog_ByNIdWorkItemResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.txtNIdWorkItem,
              bizCodeTitle: "NidWorkItem",
              saveDesc: `نمایش اطلاعات تاریخچه عودت برای شماره درخواست ${this.txtNIdWorkItem} انجام گردید.`
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
    }
  }
}
</script>
