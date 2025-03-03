<template>
  <fit>
    <safa-status :result="result"></safa-status>
    <div class="row q-col-gutter-x-md q-gutter-y-sm">
      <safa-text
        label="کد شهرداری"
        class="col-md-3"
        v-model="code"
        @keyup.enter="search"
      ></safa-text>
      <safa-text
        label="نام و نام خانوادگی"
        class="col-md-3"
        v-model="engName"
        @keyup.enter="search"
      ></safa-text>
      <div class="col-md-2">
        <btn-default label="جستجو" @click="search" />
      </div>
    </div>
    <div class="full-height">
      <safa-datatable
        v-model="results.EngInfo"
        ref="grid2"
        helper="payankarSupervisorEng"
        :showSelectedCheckbox="isSelected"
        :allowMultipleSelection="true"
        @selectedChange="selectedChange"
        title="اطلاعات مهندس"
        height="100%"
        fit
        class="q-mt-sm"
      />
    </div>
  </fit>
</template>
<script>
import loadSupervisorEngineersListPrequest from "src/models/loadSupervisorEngineersListPrequest.js"
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  data: function () {
    return {
      isSelected: true,
      result: null,
      results: { EngInfo: [] },
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      engName: "",
      code: "",
      selectedRows: []
    }
  },
  mixins: [baseFormMixin],
  props: {
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
    search () {
      // let self = this
      let data = this.loadPrequest.loadSupervisorEngineersListPrequest
      data.pRequest.ClsEngInfoReport_ForEsup = {
        EngInfo: null,
        EngName: this.engName,
        IdentityCode: this.code,
        StudyField: "0",
        University: "0"
      }

      this.$services.eng
        .getEngInfoReportForEsup(data, {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results =
              this.result.data.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((response) => {
          console.log("search error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    },
    select () {
      this.$emit("getSupervisorEng", this.selectedRows)
    }
  }
}
</script>
