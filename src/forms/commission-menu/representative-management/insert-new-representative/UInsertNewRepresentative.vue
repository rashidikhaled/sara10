<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl class="col-12">
          <UUserList @returnToMainform="reciveUser"/>
        </FormControl>
        <FormControl>
          <safa-combo
            :m="mode"
            label="نوع نماینده"
            label-width="80px"
            ciName="CI_AgentType"
            domainName="Commission100"
            labelShrink
            v-model="model.Agent.CI_AgentType"
            cdcName="CI_AgentType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            :m="mode"
            label="نوع کمیسیون"
            label-width="80px"
            ciName="CI_Commission"
            domainName="Commission100"
            labelShrink
            v-model="model.ADP_Commission[0].CI_Commission"
            cdcName="CI_Commission"
            />
            <!-- @input="testToken" -->
        </FormControl>
        <FormControl>
          <!-- ciName="CI_CommissionType"
            domainName="Commission100" -->
          <safa-combo
          :options="alltokenList"
          v-model="model.Agent.SerialNo"
          source-type="local"
          :m="mode"
          labelShrink
          label="قفل الکترونیک"
          label-width="80px" />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label-width="80px"
            :m="mode"
            labelShrink
            label="تاریخ شروع کمیسیون"
            v-model="model.ADP_Commission[0].StartDate"
            cdcName="StartDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label-width="80px"
            :m="mode"
            label="تاریخ پایان کمیسیون"
            labelShrink
            v-model="model.ADP_Commission[0].EndDate"
            cdcName="EndDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label-width="80px"
            :m="mode"
            label="تاریخ شروع شناسه"
            labelShrink
            v-model="sTTokenDate"
            cdcName="STComDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label-width="80px"
            :m="mode"
            label="تاریخ پایان شناسه"
            v-model="eNTokenDate"
            labelShrink
            cdcName="ENComDate"
          />
        </FormControl>
        <FormControl>
          <safa-text
            :m="mode"
            labelShrink
            label="شماره موبایل"
            label-width="80px"
            v-model="model.Agent.MobailNo"
            cdcName="MobailNo"
          />
        </FormControl>
      </FormRow>
      <q-separator inset/>
          <ImageUploader
            title="نمونه امضاء"
            v-model="model.Agent.HandySignature"
            cdcName="HandySignature"
            accept=".jpg"
            extension="jpg"
            :m="mode"
            :maxFileSize="0.5"
          />

    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        :showEditButton="false"
        showNewButton
        @save="saveObj"
        @newInfo="isEditable = true"
        @cancel="cancel"
        saveButtonTitle="ایجاد نماینده"
      >
        <btn-delete label="حذف" @click="reset" v-if="isEditable" />
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import loginTokenMixin from "src/mixins/loginTokenMixin"
import UUserList from "./partials/UUserList.vue"

export default {
  mixins: [baseFormMixin, loginTokenMixin],
  components: { UUserList },
  data () {
    return {
      title: "درج نماینده جدید",
      name: "UInsertNewRepresentative",
      formKey: "8a758820-0b54-413e-b70e-ffbfa6aed2b5",
      main: true,
      sTTokenDate: '',
      eNTokenDate: '',
      alltokenList: [],
      userNidSelect: null,
      model: {
        ADP_Commission: [
          {
            CI_Commission: 0,
            IDCommission: 0,
            EndDate: "",
            IsActive: null,
            NidAgent: "00000000-0000-0000-0000-000000000000",
            StartDate: "",
            TmpAgentID: null
          }
        ],
        Agent: {
          CI_AgentType: 0,
          DigitalSignature: null,
          HandySignature: null,
          MobailNo: "",
          Name: "",
          NidAgent: "00000000-0000-0000-0000-000000000000",
          SerialNo: null,
          TmpAgentID: null
        },
        NIDCommission: "00000000-0000-0000-0000-000000000000",
        NIDVote: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidAgent: "00000000-0000-0000-0000-000000000000",
        NidTaskState: "00000000-0000-0000-0000-000000000000",
        NidUser: "00000000-0000-0000-0000-000000000000",
        CheckExistVoteToArchiveByNidCommission: false,
        CheckExistVoteToArchiveByReportName: false,
        IsActive: false,
        ISRelapse: true,
        IsRegion: true,
        IsdeleteArchive: true,
        SelectedDate: 0
      }
    }
  },
  async created () {
    await this.detectToken()
    console.log(this.getNidUser())
  },
  watch: {
    certificateList: {
      handler () {
        this.alltokenList = this.certificateList.map(x => { return {
          ID: x.keyId,
          Title: x.certCN
        } })
      },
      deep: true
    }
  },
  methods: {
    testToken () {
      let payload = { CI_Commission: this.model.ADP_Commission[0].CI_Commission }
      console.log("getTokenByCICommission payload", payload)
      this.$services.commissions
        .getTokenByCICommission(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success && res.data.GetTokenByCI_CommissionResult) {
            console.log("getTokenByCICommission", res)
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      let isActiveToken = this.getApplicationParam.hasOwnProperty('IsActiveToken') && this.getApplicationParam.IsActiveToken
      if (isActiveToken && this.model.Agent.SerialNo === null) {
        this.showError("لطفا شماره شناسه را انتخاب نمایید")
        return
      }
      this.model.Agent.NidAgent = this.userNidSelect
      const adpCommission = this.model.ADP_Commission[0]
      const agent = this.model.Agent
      let tmpTokens = []
      if (isActiveToken) {
        tmpTokens.push(
          {
            TokenID: agent.SerialNo,
            NidAgent: this.model.Agent.NidAgent,
            StartDate: this.sTTokenDate,
            EndDate: this.eNTokenDate,
            IsActive: true
          }
        )
      }
      const payload = {
        PRequest: {
          ADP_Commission: [
            {
              CI_Commission: adpCommission.CI_Commission,
              IDCommission: adpCommission.IDCommission,
              IsActive: true,
              NidAgent: agent.NidAgent,
              StartDate: adpCommission.StartDate,
              EndDate: adpCommission.EndDate,
              TmpAgentID: null
            }
          ],
          Agent: {
            CI_AgentType: agent.CI_AgentType,
            DigitalSignature: null,
            HandySignature: agent.HandySignature,
            MobailNo: agent.MobailNo,
            Name: agent.Name,
            NidAgent: agent.NidAgent,
            SerialNo: agent.SerialNo,
            TmpAgentID: null
          },
          Tokens: tmpTokens,
          NIDCommission: "00000000-0000-0000-0000-000000000000",
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          CheckExistVoteToArchiveByNidCommission: false,
          CheckExistVoteToArchiveByReportName: false,
          IsActive: false,
          ISRelapse: true,
          IsRegion: true,
          IsdeleteArchive: true,
          SelectedDate: 0
        }
      }
      this.$services.commissions
        .saveAgent(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success && res.data.SaveAgentResult) {
            this.showSuccess("عملیات درج نماینده جدید با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: res.data.SaveAgentResult.Agent.NidAgent,
              bizCodeTitle: "NidAgent",
              saveDesc: "عملیات درج نماینده جدید با موفقیت انجام شد."
            })
            this.cancel()
          } else {
            this.showError("متاسفانه عملیات درج نماینده جدید با خطا مواجه شد.")
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.reset()
      this.isEditable = false
    },
    reciveUser (obj) {
      console.log("reciveUser,", obj)
      this.userNidSelect = obj
    },
    reset () {
      this.resetValidation()
      this.model = {
        ADP_Commission: [
          {
            CI_Commission: 0,
            IDCommission: 0,
            EndDate: "",
            IsActive: null,
            NidAgent: "00000000-0000-0000-0000-000000000000",
            StartDate: "",
            TmpAgentID: null
          }
        ],
        Agent: {
          CI_AgentType: 0,
          DigitalSignature: null,
          HandySignature: null,
          MobailNo: "",
          Name: "",
          NidAgent: "00000000-0000-0000-0000-000000000000",
          SerialNo: null,
          TmpAgentID: null
        },
        NIDCommission: "00000000-0000-0000-0000-000000000000",
        NIDVote: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidAgent: "00000000-0000-0000-0000-000000000000",
        NidTaskState: "00000000-0000-0000-0000-000000000000",
        NidUser: "00000000-0000-0000-0000-000000000000",
        CheckExistVoteToArchiveByNidCommission: false,
        CheckExistVoteToArchiveByReportName: false,
        IsActive: false,
        ISRelapse: true,
        IsRegion: true,
        IsdeleteArchive: true,
        SelectedDate: 0
      }
    }
  }
}
</script>
