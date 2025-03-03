<template>
  <fit>
    <safa-status :result="result" />
    <div class="q-mb-sm">
      <div class="row q-col-gutter-md">
        <safa-text
          label="کد شهرداری"
          class="col-md-3 dcol-sm-6"
          v-model="code"
          @keyup.enter="search"
        ></safa-text>
        <safa-text
          label="نام و نام خانوادگی"
          class="col-md-3 dcol-sm-6"
          v-model="userName"
          @keyup.enter="search"
        ></safa-text>
        <div class="col-auto">
          <btn-search @click="search" />
        </div>
      </div>
    </div>
    <fit>
      <safa-datatable
        v-model="results.EngInfo"
        ref="grid2"
        fit
        height="100%"
        max-height="100%"
        helper="payankarSupervisorEng"
        :showSelectedCheckbox="isSelected"
        :allowMultipleSelection="true"
        @selectedChange="selectedChange"
        title="اطلاعات مهندس"
      ></safa-datatable>
    </fit>

  </fit>
</template>
<script>
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loadSupervisorEngineersListPrequest from 'src/models/loadSupervisorEngineersListPrequest.js'
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      isSelected: true,
      results: { EngInfo: [] },
      result: null,
      loadPrequest: {
        loadSupervisorEngineersListPrequest
      },
      userName: '',
      code: '',
      selectedRows: []
    }
  },
  props: {
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    search () {
      // let self = this

      let data = this.loadPrequest.loadSupervisorEngineersListPrequest
      data.pRequest.ClsEngInfoReport_ForEsup = {
        EngInfo: null,
        EngName: this.userName,
        IdentityCode: this.code,
        StudyField: '0',
        University: '0'
      }

      this.$services.eng
        .getEngInfoReportForEsup(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data.GetEngInfoReport_ForEsupResult.ClsEngInfoReport_ForEsup
          }
        })
        .catch(response => {
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
      this.$emit('getSupervisorEng', this.selectedRows)
    }
  }
}
</script>
