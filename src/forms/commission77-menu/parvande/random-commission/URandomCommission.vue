<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="CC2A08D5-54F3-4FA9-8571-619629BAE8BF"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="saveRandomCommissionRes" />
        <safa-status :result="getListRequestRes" />
      </template>
      <fit>
        <safa-grid
          v-model="requestList"
          fit
          m="r"
          ref="grid"
          height="100%"
          min-height="200px"
          max-height="100%"
          rowSelection="multiple"
          :title="title"
          helper="requestsColumns"
          :checkboxSelection="true"
          :suppressRowClickSelection="false"
          id="requestList"
        />
      </fit>
      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <btn-default label="تعیین کمیسیون" @click="saveObj" />
        </form-actions>
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
      title: "کمیسیون بندی تصادفی",
      formKey: "9BC34F2B-F8CB-4336-A5E5-F8D40AF62D88",
      name: "URandomCommission",
      main: true,

      // Reponses
      saveRandomCommissionRes: null,
      getListRequestRes: null,

      // Context
      requestList: []
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      this.showLoading()
      const payload = {
        pRequest: {
          ClsAgent: null,
          ClsBaygani: null,
          ClsComplaint: null,
          ClsDecision: null,
          ClsDelivery: null,
          ClsExpert: null,
          ClsOtherRequestInfo: null,
          ClsOtherVote: null,
          ClsProclamation: null,
          ClsPublicIncome: null,
          ClsRandomCommission: null,
          ClsRequest_Info: null,
          ClsRequest_Notice: null,
          ClsRequest_Vote: null,
          ClsSearchRequest_info: null,
          ListClsRequest_Info: null,
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidDecision: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRequest: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          NidVote: "00000000-0000-0000-0000-000000000000",
          NidWorkItem: "0",
          NosaziCode: null,
          SelectItemsRequestInfo: null,
          UserName: null,
          Agent: null,
          District: null,
          From: 0,
          Request_Info: null,
          Request_Notice: null,
          Request_Vote: null,
          To: 0
        }
      }
      try {
      // this.$services.commission77
      //   .getListRequestInfoByRandomCommission({})
      //   .then(({ data }) => {
      //     this.getListRequestRes = this.getResponse(data)
        const { data } = await this.$services.commission77
          .getListRequestInfoByRandomCommission(payload)
        this.getListRequestRes = this.getResponse(data)
        if (this.getListRequestRes.success) {
          this.requestList =
              this.getListRequestRes.data.GetListRequestInfoByRandomCommissionResult.ClsRandomCommission.ListRequest_Info

          this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    saveObj () {
      this.showLoading()

      const payload = {
        pRequest: {
          SelectItemsRequestInfo:
            this.$refs.grid.gridApi.getSelectedRows() || []
        }
      }
      this.$services.commission77
        .saveRandomCommission(payload)
        .then(({ data }) => {
          this.saveRandomCommissionRes = this.getResponse(data)
          if (this.saveRandomCommissionRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
          }

          this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: ""
          })
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
