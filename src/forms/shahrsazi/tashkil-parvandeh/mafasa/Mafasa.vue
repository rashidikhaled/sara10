<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical :padding="false" title="مفاصا">
      <safa-status :result="result" />
      <safa-status :result="saveResult" />
      <safa-status :result="exportResult" />
      <safa-tabs
        height="100%"
        class="fit"
        v-model="activeTab"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu name="showInfoTab" label="اطلاعات مفاصا" />
          <tab-menu name="showMalekTab" label="مالکین و پلاک ثبتی" />
        </template>
        <tab-content name="showInfoTab">
          <MafasaInfo :results="results" :m="mode" />
        </tab-content>
        <tab-content name="showMalekTab" :padding="false">
          <MafasaMalekin :results="results" :m="mode" />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="save"
          @cancel="isEditable = false"
        >
          <template #after>
            <btn-default
              @click="exportMafasa"
              spCaption="صدور مفاصا"
              spId="08f3226d-fa77-4e94-84c4-e03bce59a49c"
              label="صدور مفاصا"
            ></btn-default>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import MafasaInfo from "./partials/MafasaInfo.vue"
import MafasaMalekin from "./partials/MafasaMalekin.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  route: "/mafasa",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "شهرسازی- مفاصا",
      formKey: "d6cacb18-a9d8-4a83-b074-e36726ebf948",
      name: "Mafasa",
      main: true,
      isEditable: false,
      activeTab: "showInfoTab",
      result: null,
      OtherResult: null,
      results: {
        Sh_MafasaComments: {},
        Sh_RequestInfo: {},
        Base_HouseInfo: {},
        IncomeFiche: { FicheNo: "", Payable: "" },
        NosaziFiche: { FicheNo: "", TotalPrice: "" },
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_RegisterPlack: [],
        Base_Installation: []
      },
      updateLastRequestResult: null,
      saveResult: null,
      exportResult: null
    }
  },
  computed: {},
  props: {},
  methods: {
    load () {
      this.showLoading()
      let data = {
        pNidProc: this.selectedRequest.NidProc,
        pIncludeShop: false
      }

      this.$services.SC.loadMafasaComments(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)

          if (this.result.success) {
            this.results = this.result.data
            if (this.results.IncomeFiche === null) {
              this.results.IncomeFiche = { FicheNo: "", Payable: "" }
            }
            if (this.results.NosaziFiche === null) {
              this.results.NosaziFiche = { FicheNo: "", TotalPrice: "" }
            }

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    save () {
      this.showLoading()
      this.results.IncomeFiche = { FicheNo: 0, Payable: 0 }
      this.results.NosaziFiche = { FicheNo: 0, TotalPrice: 0 }
      let data = {
        pMafasaComments: this.results,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        }
      }

      this.$services.SC.saveMafasaComments(data)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)

          if (this.saveResult.success) {
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد.")

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode
            })

            this.load()
            this.updaterequestState()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    updaterequestState () {
      this.showLoading()
      let updateLastRequestData = {
        pNidProc: this.selectedRequest.NidProc,
        pLastRequestState: " ذخیره مفاصا انجام شد"
      }

      this.$services.SC.updateLastRequestState(updateLastRequestData)
        .then(async ({ data }) => {
          this.updateLastRequestResult = this.getResponse(data)

          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode
          })
        })
        .catch((response) => {
          this.updateLastRequestResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    exportMafasa () {
      this.showLoading()
      let data = {
        pNidProc: this.selectedRequest.NidProc
      }

      this.$services.SC.exportMafasa(data)
        .then(async ({ data }) => {
          this.exportResult = this.getResponse(data)

          await this.log({
            action: this.logActions.confirmOutput,
            bizCode: this.selectedRequest.NidWorkItem,
            bizCodeTitle: "شماره درخواست",
            nosaziCode: this.selectedRequest.BizCode
          })
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  components: {
    MafasaInfo,
    MafasaMalekin
  },
  mounted () {
    if (this.selectedRequest) {
      this.load()
    } else {
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
    }
  }
}
</script>
