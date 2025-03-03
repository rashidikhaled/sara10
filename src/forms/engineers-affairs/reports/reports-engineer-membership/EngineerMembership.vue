<template>
<safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
  <form-wrapper :title="title">
   <template #header>
        <safa-status :result="res" />
      </template>
    <fit>
      <div class="row q-col-gutter-sm items-center">
        <engineer-info-box
          label="کد عضویت"
          label-width="60px"
          class="col-md-4 col-12"
          v-model="identityCode"
          @fetched="loadData"
        />
        <engineer-actions
          v-model="identityCode"
          :disable="disableEngineerActions"
          class="col-md-8 col-12"
        />
      </div>
      <safa-datatable
        title="سوابق"
        helper="engineerMemOffHistory"
        v-model="getEngineerMemOffHistoryResult.EngineerMemOffHistory"
        m="r"
        fit
        height="100%"
        max-height="100%"
        min-height="100px"
        class="q-mt-sm"
        :show-selected-checkbox="true"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
      />
    </fit>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    value: [Number, String]
  },
  data () {
    return {
      title: "سابقه عضویت مهندس در دفتر",
      name: "EngineerMembership",
      formKey: "2724d945-240a-4628-840f-46e9220fd0da",
      main: true,
      disableEngineerActions: true,
      identityCode: null,
      getEngineerMemOffHistoryResult: {
        EngineerMemOffHistory: []
      }
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadData()
    }
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode
        }
      }
      this.$services.engineers
        .getEngineerMemOffHistory(payLoad)
        .then(async (response) => {
          let res = this.getResponse(response.data)
          if (res.success) {
            this.getEngineerMemOffHistoryResult =
              res.data.GetEngineerMemOffHistoryResult
            this.disableEngineerActions = false
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
