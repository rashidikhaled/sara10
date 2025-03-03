<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="true">
      <safa-status :result="preLoadObjRes" />
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <fit>
        <safa-splitter v-model="spliterModel" class="fit">
          <template v-slot:before>
            <q-list bordered>
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in treeView"
                :key="index"
                @click="selectItem(item)"
              >
                <q-item-section avatar>
                  <q-avatar color="primary" icon="mark_chat_read" />
                </q-item-section>
                <q-item-section>
                  {{ getName(item) }}
                </q-item-section>
              </q-item>
            </q-list>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu name="SessionDetails" label="مشخصات جلسه" />
                  <tab-menu name="PresentInSession" label="حاضران در جلسه" />
                  <tab-menu name="Agendas" label="دستورکارها" />
                  <tab-menu name="Approvals" label="مصوبات" />
                </template>
                <tab-content name="SessionDetails">
                  <fit>
                    <SessionDetails v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="PresentInSession">
                  <fit>
                    <PresentSession v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="Agendas">
                  <fit>
                    <Agendas v-model="model" :m="mode" />
                  </fit>
                </tab-content>
                <tab-content name="Approvals">
                  <fit>
                    <Approvals v-model="model" :m="mode" />
                  </fit>
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import SessionDetails from "./partials/SessionDetails.vue"
import PresentSession from "./partials/PresentSession.vue"
import Agendas from "./partials/Agendas.vue"
import Approvals from "./partials/Approvals.vue"

export default {
  mixins: [baseFormMixin],
  components: {
    SessionDetails,
    Agendas,
    Approvals,
    PresentSession
  },
  data () {
    return {
      name: "USessionList",
      title: "جلسات",
      formKey: "E81F0800-0844-4E7B-BABC-C210CC6D6607",
      main: true,

      // variables
      activeTab: "SessionDetails",
      spliterModel: 15,
      NIdSession: "00000000-0000-0000-0000-000000000000", // "e99c5cbb-b620-42a0-98fb-1181914fc174",
      PNIdRequest: "00000000-0000-0000-0000-000000000000",
      NidProc: "00000000-0000-0000-0000-000000000000",
      treeView: [],

      // services
      preLoadObjRes: null,
      loadObjRes: null,
      saveObjRes: null,

      // model
      model: {
        IsConfirmContractBuy: false,
        Session_Decision: [],
        Session_DecisionPursuit: [],
        Session_Info: {
          CI_SessionCategory: 0,
          NIdRequest: null,
          NIdSession: "00000000-0000-0000-0000-000000000000",
          NIdSession_tmp: 0,
          SessionDate: null,
          SessionDuration: null,
          SessionNo: null,
          SessionPlace: null,
          SessionStartTime: null,
          SessionSubject: null,
          SessionText: null
        },
        Session_InnerPerson: [],
        Session_Person: [],
        Session_WorkItem: [],
        _NIdSession: "00000000-0000-0000-0000-000000000000"
      }
    }
  },
  created () {
    if (this.selectedRequest) {
      this.NidProc = this.selectedRequest.NidProc // "b8ff9426-31d7-4f95-a746-2ac81e90f7ec"
    }
    this.preLoadObj()
  },
  methods: {
    async preLoadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.ES.getSessionInfoMessage({
          pNIdProc: this.NidProc
        })
        this.preLoadObjRes = this.getResponse(data)
        if (this.preLoadObjRes.success) {
          if (this.preLoadObjRes.data.GetSession_Info_MessageResult) {
            const res =
              this.preLoadObjRes.data.GetSession_Info_MessageResult ?? []
            if (res && res.length > 0) {
              this.treeView = res.filter(
                (f) => f.NIdSession !== "00000000-0000-0000-0000-000000000000"
              )
              this.NIdSession =
                this.treeView[0].NIdSession ??
                "00000000-0000-0000-0000-000000000000"
            }
          }
          this.loadObj()
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest?.NidWorkItem ?? "",
            bizCodeTitle: "NidWorkItem",
            saveDesc: `لیست جلسات دریافت شد با  NidWorkItem: ${
              this.selectedRequest?.NidWorkItem ?? ""
            }`
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
          PGuid: this.NIdSession
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data.GetSession_InfoResult
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest?.NidWorkItem ?? "",
            bizCodeTitle: "NidWorkItem",
            saveDesc: `جزییات جلسه دریافت شد، با  NidWorkItem: ${
              this.selectedRequest?.NidWorkItem ?? ""
            }`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    getName (item) {
      return `${item.SessionDate ?? ""} _ ${item.SessionSubject ?? ""}`
    },
    selectItem (item) {
      this.NIdSession = item.NIdSession
      this.PNIdRequest = item.NIdRequest
      this.loadObj()
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payLoad = {
        PObj: {
          ...this.model,
          _NIdSession: this.NIdSession ?? "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.ES.saveSessionInfo(payLoad)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest?.NidWorkItem ?? "",
              bizCodeTitle: "NidWorkItem",
              saveDesc: `ذخیره تغییرات اطلاعات جلسه با NidWorkItem: ${
                this.selectedRequest?.NidWorkItem ?? ""
              } انجام شد`
            })
            this.loadObj()
            this.isEditable = false
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
