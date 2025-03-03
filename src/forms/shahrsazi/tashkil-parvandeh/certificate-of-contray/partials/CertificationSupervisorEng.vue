<template>
  <fit>
    <safa-status  :result="result"/>
    <div class="row q-col-gutter-sm">
      <safa-text
        label="کد شهرداری"
        class="col-12 col-sm-6 col-md-4"
        v-model="code"
        @keyup.enter="search"
      />
      <safa-text
        label="نام و نام خانوادگی"
        class="col-12 col-sm-6 col-md-4"
        v-model="engName"
        @keyup.enter="search"
     />
      <div class="col-auto">
        <btn-search label="جستجو" @click="search"/>
      </div>
    </div>
    <!-- <fit> -->
      <safa-datatable
        v-model="results.EngInfo"
        ref="grid2"
        helper="payankarSupervisorEng"
        :showSelectedCheckbox="isSelected"
        :allowMultipleSelection ="true"
        @selectedChange="selectedChange"
        fit
        height="100%"
        max-height="100%"
        class="q-mt-sm"
        title="اطلاعات مهندس"
      />
    <!-- </fit> -->
  </fit>
</template>
<script>
import loadSupervisorEngineersListPrequest from 'src/models/loadSupervisorEngineersListPrequest.js'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      isSelected: true,
      result: null,
      results: { EngInfo: [] },
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      engName: '',
      code: '',
      selectedRows: []
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String
  },
  methods: {
    search () {
      let data = this.loadPrequest.loadSupervisorEngineersListPrequest
      data.pRequest.ClsEngInfoReport_ForEsup = {
        EngInfo: null,
        EngengName: this.engName,
        IdentityCode: this.code,
        StudyField: '0',
        University: '0'
      }

      this.$services.eng
        .getEngInfoReportForEsup(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup
            await this.log({
              action: this.logActions.view,
              bizCode: this.code.toString(),
              bizCodeTitle: 'IdentityCode',
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch(response => {
          this.serverError()
          console.log('search error', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    },
    select () {
      this.$emit('getSupervisorEng', this.selectedRows)
    }
  }
}
</script>
