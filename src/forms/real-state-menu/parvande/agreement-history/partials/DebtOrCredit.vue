<template>
  <form-wrapper :title="title" :padding="false" :hideTitle="hideTitle">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
    </template>
    <fit>
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="Creditor" label="بستانکاری" />
          <tab-menu name="Indebtedness" label="بدهکاری" />
          <tab-menu name="PropertyTransferred" label="ملک معوض" />
          <tab-menu name="Score" label="امتیاز" />
          <tab-menu name="Description" label="توضیحات" />
        </template>
        <tab-content name="Creditor">
          <Creditor v-model="value" :m="m" />
        </tab-content>
        <tab-content name="Indebtedness">
          <Indebtedness v-model="value" :m="m" />
        </tab-content>
        <tab-content name="PropertyTransferred">
          <PropertyTransferred
            v-model="value"
            :m="m"
            :accessBuyOrSale="accessBuyOrSale"
          />
        </tab-content>
        <tab-content name="Score">
          <Score v-model="value" :m="m" :accessBuyOrSale="accessBuyOrSale" />
        </tab-content>
        <tab-content name="Description">
          <Description
            v-model="value"
            :accessBuyOrSale="accessBuyOrSale"
            :m="m"
          />
        </tab-content>
      </safa-tabs>
    </fit>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import Creditor from "./Creditor.vue"
import Indebtedness from "./Indebtedness.vue"
import Score from "./Score.vue"
import PropertyTransferred from "./PropertyTransferred.vue"
import Description from "./Description.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    Creditor,
    Indebtedness,
    PropertyTransferred,
    Score,
    Description
  },
  props: {
    value: { type: Object },
    accessBuyOrSale: { type: Boolean, default: () => true },
    m: { type: String },
    formKey: String,
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      name: "DebtOrCredit",
      title: "بدهکاری/بستانکاری",

      // variables
      activeTab: "Creditor",
      ListItem: [],
      ListItemDetails: [],
      baseNosaziCode: {},

      // services
      preLoadObjRes: null,
      loadObjRes: null,
      saveObjRes: null,
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
          this.saveObjRes = this.getResponse(data)
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
