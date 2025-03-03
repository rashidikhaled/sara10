<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
     <template #header>
      <safa-status :result="result" />
     </template>
      <fit>
        <safa-datatable
          helper="ReservedEngList"
          height="100%"
          max-height="100%"
          fit
          paginate
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :deleteRow="false"
          :addRow="false"
          title="مهندسین رزرو شده"
          m="r"
          class="q-mb-sm"
          v-model="model.ReservedEngineer_InDateFilter"
        />
        <div class="row q-gutter-sm">
          <div class="col-12 col-md-4 col-sm-3 col-lg-4">
            <safa-text
              label="زمان بازآوری به دقیقه"
              v-model="refreshTime"
            />
          </div>
          <div class="col-auto">
            <btn-default label="شروع" @click="loadObj" />
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
      title: "امور مهندسین ناظر- مانیتور مهندسین رزرو شده",
      formKey: "3e02511b-490c-489a-8e48-ea2e1ab9f7df",
      name: "UMonitoringReservedEngineer",
      main: true,
      model: {
        ReservedEngineer_InDateFilter: []
      },
      refreshTime: 10,
      result: null
    }
  },
  created () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.engineers.getReservedEngineerInDateFilter()
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.model.ReservedEngineer_InDateFilter =
            this.result.data.GetReservedEngineer_InDateFilterResult
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
