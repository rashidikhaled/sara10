<template>
  <fit>
    <safa-datatable
      helper="officeList"
      fit
      height="100%"
      v-model="results.AllOffices"
      @dbclick="handelDbClick"
      cdcName="AllOffices"
    />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      requestResults: null,
      results: { AllOffices: [] }
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
          CI_RequestType: 0,
          CI_Years: 0,

          NidCheckerGroup: '00000000-0000-0000-0000-000000000000',
          NidEng: '00000000-0000-0000-0000-000000000000',

          NidFil: '00000000-0000-0000-0000-000000000000',

          NidWorkitem: 0,

          CI_CancelType: 0,
          CI_ExecFloor: 0,
          CI_ExecLevel: 0,
          CI_SazeType: 0,
          CI_Year: 0,

          Floor: 0,

          Height: 0,
          Infrastructure: 0,

          IsConfirm: false,
          IsRefreshOnly: false,
          IsSendToSaraRequest: 'false',
          NIdBuildingGroup: '00000000-0000-0000-0000-000000000000',
          NIdDetail: '00000000-0000-0000-0000-000000000000',
          NIdRealPerson: '00000000-0000-0000-0000-000000000000',
          NidBlackList: '00000000-0000-0000-0000-000000000000',

          NidProc: '00000000-0000-0000-0000-000000000000',
          NidRefer: '00000000-0000-0000-0000-000000000000',
          NidTask: '00000000-0000-0000-0000-000000000000',
          NidWorkFlowDeff: '00000000-0000-0000-0000-000000000000',

          OtherFileType: 0,

          PredicateCondition: null,

          Sara_WorkflowID: 0,

          SecretariatNo: 0,
          Skip: 0,

          StudyFiled: 0,
          SysCI_RequestStatus: 0,
          Take: 100,

          UserGUID: '00000000-0000-0000-0000-000000000000'
        }
      }

      this.$services.engineers
        .getOffices(payLoad)
        .then(({ data }) => {
          this.requestResults = this.getResponse(data)
          if (this.requestResults.success) {
            this.results = this.requestResults.data.GetOfficesResult
          }
        })
        .catch(response => {
          this.serverError()
          // console.log('load error .....', response)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handelDbClick (e) {
      this.$emit('selectedOffice', e.row)
    }
  }
}
</script>
