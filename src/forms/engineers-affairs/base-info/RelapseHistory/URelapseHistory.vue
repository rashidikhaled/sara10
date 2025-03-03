<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
  <form-wrapper :title="title" vertical :padding="false" >
  <template #header>
   <safa-status :result="result" />
  </template>
    <fit>
      <safa-datatable
        helper="RelapseHistory"
        height="100%"
        max-height="100%"
        fit
        :bordered="false"
        paginate
        v-model="Fil_Relapse"
        :show-selected-checkbox="false"
        :allowMultipleSelection="false"
        :addRow="false"
        :deleteRow="false"
        cdcName="RelapseHistory"
      />
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
      title: "تاریخچه عودت",
      formKey: "b5906c1e-1b07-47cf-aeef-c2933a952cc1",
      name: "URelapseHistory",
      main: true,
      model: {
        CI_RequestType: "0",
        CI_Years: "0",
        NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidWorkitem: "0",
        CI_CancelType: "0",
        CI_ExecFloor: "0",
        CI_ExecLevel: "0",
        CI_SazeType: "0",
        CI_Year: "0",
        Floor: "0",
        Height: "0",
        Infrastructure: "0",
        IsConfirm: "false",
        IsRefreshOnly: "false",
        IsSendToSaraRequest: "false",
        NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
        NIdDetail: "00000000-0000-0000-0000-000000000000",
        NIdRealPerson: "00000000-0000-0000-0000-000000000000",
        NidBlackList: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRefer: "00000000-0000-0000-0000-000000000000",
        NidTask: "00000000-0000-0000-0000-000000000000",
        NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
        OtherFileType: "0",
        PredicateCondition: null,
        SecretariatNo: "0",
        Skip: "0",
        StudyFiled: "0",
        SysCI_RequestStatus: "0",
        Take: "100",
        UserGUID: "00000000-0000-0000-0000-000000000000"
      },
      Fil_Relapse: [],
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
          pRequest: { ...this.model }
        }
        const { data } = await this.$services.engineers.getFilRelapse(payload)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.Fil_Relapse = this.result.data.GetFil_RelapseResult.Fil_Relapse
          await this.log({
            action: this.logActions.view,
            bizCode: this.model.NidFil,
            bizCodeTitle: "NidFil"
          })
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
