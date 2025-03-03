<template>
  <safa-form :id="formKey" :caption="title" app-id="92404D00-D287-4A09-9596-29FCC9BC9DB9">
    <form-wrapper :title="title" :padding="false">
      <fit>
        <template #header>
          <safa-status :result="response" />
        </template>
        <safa-datatable
          fit
          :bordered="false"
          v-model="getEngHolidaysListResul.ADPstudyFieldRelList"
          helper="studyFieldRelList"
          title="پایه"
          max-height="100%"
          height="100%"
        />
      </fit>
      <template v-slot:footer>
        <btn-default label="تایید" :disable="lockConfirmBtn" />
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
      title: "تعطیلات مهندس",
      formKey: "dc398a15-679c-4c33-aa38-ad0509565131",
      name: "UEngineerHolidays",
      main: true,
      getEngHolidaysListResul: {
        ADPstudyFieldRelList: []
      },
      lockConfirmBtn: true,
      response: null
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          pCI_Years: this.pCI_Years
        }
      }

      this.$services.engineers
        .getEngHolidaysList(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getEngHolidaysListResponse =
              response.data.GetEng_Holidays_ListResponse
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((res) => {
          console.error(res)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
