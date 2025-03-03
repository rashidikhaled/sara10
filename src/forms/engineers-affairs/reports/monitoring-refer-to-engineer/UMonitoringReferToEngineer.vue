<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="referToEngineer_InDateFilterRes" />
      </template>
      <fit>
        <safa-datatable
          v-model="model.ReferToEngineer_InDateFilter"
          helper="referToEngineerInDateFilter"
          mode="r"
          fit
          paginate
          min-height="150px"
          height="100%"
          max-height="100%"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :showRowNumber="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
        />
        <FormRow class="q-pt-sm">
          <FormControl>
            <safa-text
              label="زمان بازآوری به دقیقه"
              v-model="refreshTime"
            />
          </FormControl>
          <FormControl>
            <btn-default label="شروع" @click="startTimer" />
          </FormControl>
        </FormRow>
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
      title: "مانیتور مهندسین ارجاع شده",
      formKey: "f3f15ef8-64aa-48ff-80fb-cbaf9055ba0f",
      name: "UMonitoringReferToEngineer",
      main: true,

      model: {
        ReferToEngineer_InDateFilter: []
      },
      referToEngineer_InDateFilterRes: null,

      // convert Ms to Minute
      REFRESH_DURATION: 1000 * 60,

      dispatcherTimer: null,
      refreshTime: 10
    }
  },

  mounted () {
    this.loadObj()
    this.RunTimer()
  },

  // Destory timer before destory
  beforeDestroy () {
    this.StopTimer()
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.engineers
        .getReferToEngineerInDateFilter()
        .then(async ({ data }) => {
          this.referToEngineer_InDateFilterRes = this.getResponse(data)

          if (this.referToEngineer_InDateFilterRes.success) {
            this.model.ReferToEngineer_InDateFilter = this.referToEngineer_InDateFilterRes.data.GetReferToEngineer_InDateFilterResult

            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch(error => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    RunTimer () {
      this.dispatcherTimer = setInterval(() => {
        this.loadObj()
      }, parseInt(this.refreshTime * this.REFRESH_DURATION))
    },

    StopTimer () {
      clearInterval(this.dispatcherTimer)
    },

    startTimer () {
      this.StopTimer()
      this.RunTimer()
    }
  }
}
</script>
