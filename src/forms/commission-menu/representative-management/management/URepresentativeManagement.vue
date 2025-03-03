<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            label="نماینده ها"
            label-width="80px"
            sourceType="local"
            :options="agentsOptions"
            v-model="selectedAgent"
            cdcName="selectedAgent"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع نماینده"
            label-width="80px"
            ciName="CI_AgentType"
            domainName="Commission100"
            v-model="CI_AgentType"
            cdcName="CI_AgentType"
            :m="mode"
          />
        </FormControl>
      </FormRow>
      <safa-splitter v-model="splitterModel" vertical fit margin="0">
        <template v-slot:before>
          <safa-datatable
            title="کمیسیون ها"
            helper="adpCommissionColumns"
            fit
            height="100%"
            max-height="100%"
            min-height="200px"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            paginate
            :m="mode"
            v-model="adpCommission"
            cdcName="adpCommission"
          />
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              title="قفل های الکترونیک"
              helper="tokenColumns"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              paginate
              :m="mode"
              v-model="selectedToken"
              cdcName="selectedToken"
            />
            <ImageUploader
              title="نمونه امضاء"
              class="q-mt-sm"
              v-if="selectedAgent !== null"
              v-model="handySignature"
              cdcName="handySignature"
              :m="mode"
            />
          </fit>
        </template>
      </safa-splitter>
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveData"
      >
        <btn-delete label="حذف" @click="deleteAgent" />
        <btn-default
          v-if="!isEditable"
          label="بازآوری نماینده ها"
          @click="getAgents"
        />
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
      title: "مدیریت نماینده ها",
      name: "URepresentativeManagement",
      formKey: "8a758820-0b54-413e-b70e-ffbfa6aed2b5",
      main: true,

      splitterModel: 50,
      selectedAgent: null,
      agentsOptions: [],
      CI_AgentType: 0,
      handySignature: null,
      allAgents: {},
      model: {
        ADP_Commission: [],
        Tokens: [],
        Agents: []
      },
      adpCommission: [],
      selectedToken: [],
      selectedAgentList: []
    }
  },

  created () {
    this.$nextTick(async () => {
      await this.getAgents()
    })
  },
  methods: {
    getAgents () {
      this.showLoading()
      this.$services.commissions
        .getAgents()
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetAgentsResult
            console.log("model:******", res.data.GetAgentsResult)
            const list = []
            list.push(
              ...res.data.GetAgentsResult.Agents.map((item) => {
                let r = {}
                r.ID = item.NidAgent
                r.Title = item.Name || "(بدون نام)"
                return r
              })
            )
            this.agentsOptions = list
            this.isEditable = false
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    changeAgent () {
      if (this.selectedAgent !== null) {
        this.adpCommission = this.model.ADP_Commission.filter(
          (x) => x.NidAgent === this.selectedAgent
        )
        this.selectedToken = this.model.Tokens.filter(
          (x) => x.NidAgent === this.selectedAgent
        )
        this.selectedAgentList = this.model.Agents.filter(
          (x) => x.NidAgent === this.selectedAgent
        )
        this.CI_AgentType = this.selectedAgentList[0].CI_AgentType
        this.getAgentByNidAgent(this.selectedAgent)
      }
    },

    getAgentByNidAgent (pNidAgent) {
      this.$services.commissions
        .getAgentByNidAgent({ pNidAgent: pNidAgent })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.handySignature =
              res.data.GetAgentByNidAgentResult.HandySignature

            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `بارگذاری اطلاعات در ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveData () {
      this.showLoading()
      const payload = {
        PRequest: {
          ADP_Commission: this.adpCommission,
          Tokens: this.selectedToken,
          Agent: {
            CI_AgentType: this.CI_AgentType, // .toString()
            HandySignature: this.handySignature,
            MobailNo: this.selectedAgentList[0].MobailNo,
            Name: this.selectedAgentList[0].Name || null,
            NidAgent: this.selectedAgentList[0].NidAgent,
            SerialNo: this.selectedAgentList[0].SerialNo || 0,
            TmpAgentID: this.selectedAgentList[0].TmpAgentID || 0
          }
        }
      }
      this.$services.commissions
        .saveAgent(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات در ${this.title} انجام گردید.`
            })
            this.getAgents()
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    deleteAgent () {
      this.showConfirm("آیا برای حذف اطمینان دارید؟").onOk(() => {
        const payload = {
          PRequest: {
            IsActive: false,
            NIDCommission: "00000000-0000-0000-0000-000000000000",
            NIDVote: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",
            ISRelapse: false,
            IsRegion: false,
            IsdeleteArchive: false,
            NidAgent: this.selectedAgent,
            NidTaskState: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000"
          }
        }
        this.$services.commissions
          .deleteAgent(payload)
          .then(async ({ data }) => {
            const res = this.getResponse(data)
            if (res.success) {
              this.showSuccess("عملیات با موفقیت انجام شد")

              this.selectedAgent = null
              this.handySignature = null
              this.adpCommission = []
              this.selectedToken = []
              this.selectedAgentList = []

              await this.log({
                action: this.logActions.delete,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `حذف اطلاعات در ${this.title} انجام گردید.`
              })
              this.getAgents()
            }
          })
          .catch((error) => {
            console.error(error)
            // this.serverError() // test serverError
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  },

  watch: {
    selectedAgent () {
      this.changeAgent()
    },
    adpCommission: {
      handler () {
        for (let i = 0; i < this.adpCommission.length; i++) {
          if (this.adpCommission[i].IsActive === "") {
            this.adpCommission[i].IsActive = null
          }
          if (this.adpCommission[i].IDCommission === "") {
            this.adpCommission[i].IDCommission = null
          }
          if (this.adpCommission[i].TmpAgentID === "") {
            this.adpCommission[i].TmpAgentID = null
          }
        }
      },
      deep: true
    }
  }
}
</script>
