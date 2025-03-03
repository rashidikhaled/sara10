<template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="Creditor" label="بستانکاری" />
          <tab-menu name="Indebtedness" label="بدهکاری" />
          <tab-menu name="PropertyTransferred" label="ملک معوض" />
          <tab-menu name="Score" label="امتیاز" />
          <tab-menu name="DebitCreditDescription" label="توضیحات" />
        </template>
        <tab-content name="Creditor">
          <fit>
            <Creditor
              v-model="value"
              :m="m"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </fit>
        </tab-content>
        <tab-content name="Indebtedness">
          <fit>
            <Indebtedness
              v-model="value"
              :m="m"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </fit>
        </tab-content>
        <tab-content name="PropertyTransferred">
          <fit>
            <PropertyTransferred
              v-model="value"
              :accessBuyOrSale="accessBuyOrSale"
              :m="m"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </fit>
        </tab-content>
        <tab-content name="Score">
          <fit>
            <Score
              v-model="value"
              :m="m"
              :accessBuyOrSale="accessBuyOrSale"
              :formKey="formKey"
              :title="title"
              :name="name"
            />
          </fit>
        </tab-content>
        <tab-content name="DebitCreditDescription">
          <DebitCreditDescription
            v-model="value"
            :accessBuyOrSale="accessBuyOrSale"
            :m="m"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
      </safa-tabs>
    </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Creditor from "./Creditor.vue"
import Indebtedness from "./Indebtedness.vue"
import PropertyTransferred from "./PropertyTransferred.vue"
import Score from "./Score.vue"
import DebitCreditDescription from "./DebitCreditDescription.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Creditor,
    PropertyTransferred,
    Score,
    Indebtedness,
    DebitCreditDescription
  },

  props: {
    value: Object,
    accessBuyOrSale: Boolean,
    m: String,
    formKey: String,
    title: String,
    name: String
  },
  data () {
    return {
      // name: "DebtOrCredit",
      // title: "بدهکاری / بستانکاری",

      // variables
      activeTab: "PropertyTransferred",
      ListItem: [],
      ListItemDetails: [],
      baseNosaziCode: {},

      // services
      preLoadObjRes: null,
      loadObjRes: null,
      saveObjRes: null,

      // grids
      // SessionDetailsModel: {
      //   CI_SessionCategory: 0,
      //   SessionDate: "",
      //   SessionStartTime: "",
      //   SessionDuration: "",
      //   SessionSubject: "",
      //   SessionPlace: "",
      //   SessionText: ""
      // },
      // PresentInSessionModel: {
      //   grid1: [],
      //   grid2: []
      // },
      // AgendasModel: [],
      ApprovalsModel: []
    }
  },
  created () {
    // if (this.selectedRequest) {
    //   this.NidProc = this.selectedRequest.NidProc
    // }
    // this.preLoadObj()
    // this.loadObj()
  },
  methods: {
    async preLoadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getSessionInfoMessage({
          pNidProc: this.NidProc
        })
        this.preLoadObjRes = this.getResponse(data)
        if (this.preLoadObjRes.success) {
          if (this.preLoadObjRes.data.GetSession_Info_MessageResult) {
            this.ListItemDetails =
              this.preLoadObjRes.data.GetSession_Info_MessageResult
                .ClsSessionMessage ?? []
            const help = []
            this.ListItemDetails.map((i) => {
              help.push(`${i.SessionDate} - ${i.SessionSubject}`)
            })
            this.ListItem = help
          }
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getSessionInfo({
          PNidSession: this.NIdSession
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: ""
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      this.showLoading()
      const payLoad = {}
      this.$services.ES.saveManagerConfirm(payLoad)
        .then(async ({ data }) => {
          this.saveOvjRes = this.getResponse(data)
          if (this.saveAssignRequestToUserRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
