<template>
  <safa-form
    id="79692b1d-0ac2-48af-805b-e062d884b5f7"
    caption="شهرسازی- اعلام ضابطه"
  >
    <safa-status :result="deleteRow" />
    <safa-status :result="newResult" />
    <safa-datatable
      v-model="results.ZabetehList"
      cdcName="ZabetehList"
      m="r"
      helper="zabete"
      @dbclick="dbclick"
      @row-click="click"
      class="fit"
      height="100%"
      max-height="100%"
      min-height="100%"
      margin="0"
      :bordered="false"
      title="ضابطه"
    />
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin.js"
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      newResult: null,
      newResults: {},
      selectedRow: null,
      showDeleteBtn: false,
      deleteRow: null,
      deleteRows: {}
    }
  },
  props: {
    results: Object,
    nidNosaziCode: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  methods: {
    createNewRecord () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SC.createNewZabeteh(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          this.newResult = this.getResponse(data)
          if (this.newResult.success) {
            this.newResults = this.newResult.data
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidNosaziCode,
              bizCodeTitle: "NidNosaziCode",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ایجاد ردیف ضابطه انجام گردید.`
            })
            this.$emit("reload")
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
    dbclick (e) {
      this.selectedRow = e.row
      this.$emit("showZabeteDetailes", this.selectedRow)
    },
    click (dataItem) {
      this.$emit("clickZabeteh")
      this.selectedRow = dataItem
    },
    deleteRecord () {
      this.showConfirm("آیا از حذف ردیف ضابطه اطمینان دارید؟").onOk(() => {
        this.showLoading()
        let data = {
          pNidZabeteh: this.selectedRow.NidZabeteh,
          pNidUser: this.getNidUser()
        }
        this.$services.SC.deleteZabeteh(data, {
          config: { District: this.selectedDistrict }
        })
          .then(async ({ data }) => {
            this.deleteRow = this.getResponse(data)
            if (this.deleteRow.success) {
              this.deleteRows = this.deleteRow.data
              this.showDeleteBtn = false

              await this.log({
                action: this.logActions.delete,
                bizCode: this.selectedRow.NidZabeteh,
                bizCodeTitle: "NidZabeteh",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `حذف ردیف ضابطه انجام گردید.`
              })

              this.$emit("reload")
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
