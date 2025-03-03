<template>
  <safa-form
    :id="formKey"
    caption="لیست مهندسین دارای بالاترین امتیاز"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical :padding="false">
      <safa-status :result="result" />
      <fit>
        <safa-datatable
          helper="topEngineersInValueList"
          height="100%"
          max-height="100%"
          fit
          :bordered="false"
          paginate
          v-model="TopEngineersInValueList"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :addRow="false"
          class="q-mb-sm"
        />
        <div class="row q-mb-sm q-pl-sm q-gutter-sm">
          <div class="col-12 col-md-4 col-sm-3 col-lg-4">
            <safa-text
              label="زمان بازآوری به دقیقه"
              v-model="refreshTime"
            ></safa-text>
          </div>
          <div class="col-auto">
            <btn-default label="شروع" />
          </div>
        </div>
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
      title: "امور مهندسین ناظر- لیست مهندسین دارای بالاترین امتیاز",
      formKey: "63fc5b29-2efd-4abd-badf-b0118d68455b",
      name: "UTopRateEngs",
      main: true,
      TopEngineersInValueList: [],
      refreshTime: 10,
      result: null
    }
  },
  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = {
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } =
          await this.$services.engineers.getTopEngineersInValueList(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.TopEngineersInValueList =
            this.result.data.GetTopEngineersInValueListResult
        }
      } catch (err) {
        console.error("error", err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
