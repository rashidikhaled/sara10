<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="getListAgentRes" />
        <safa-status :result="saveAgentRes" />
      </template>
      <fit>
        <form-row>
          <form-control>
            <safa-text
              label="نام نماینده"
              label-width="90px"
              v-model="model.ClsAgent.Agent.Name"
              cdcName="Name"
              :m="mode"
              validations="required"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="گروه کمیسیون"
              label-width="90px"
              v-model="model.ClsAgent.Agent.CI_CommissionType"
              cdcName="CI_Commission"
              domainName="Commission77"
              ciName="CI_Commission"
              :m="mode"
              validations="required"
            />
          </form-control>
          <form-control>
            <safa-text
              label="تعداد پرونده قابل بررسی"
              label-width="90px"
              v-model="model.ClsAgent.Agent.FileCount"
              cdcName="FileCount"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ شروع کمیسیون"
              label-width="90px"
              v-model="model.ClsAgent.Agent.StartDateCommission"
              cdcName="StartDateCommission"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ پایان کمیسیون"
              label-width="90px"
              v-model="model.ClsAgent.Agent.EndDateCommission"
              cdcName="EndDateCommission"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ شروع شناسه"
              v-model="model.ClsAgent.Agent.StartDateSerial"
              cdcName="StartDateSerial"
              label-width="90px"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-datepicker
              label="تاریخ پایان شناسه"
              v-model="model.ClsAgent.Agent.EndDateSerial"
              cdcName="EndDateSerial"
              label-width="90px"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="نوع نماینده"
              label-width="90px"
              domainName="Commission77"
              ciName="CI_AgentType"
              v-model="model.ClsAgent.Agent.CI_AgentType"
              cdcName="CI_AgentType"
              validations="required"
              :m="mode"
            />
          </form-control>
          <form-control>
            <safa-combo
              label="قفل الکترونیک"
              v-model="model.ClsAgent.Agent.SerialNo"
              cdcName="SerialNo"
              label-width="90px"
              :m="mode"
            />
          </form-control>
          <form-control className="q-mt-sm col-8 offset-md-2">
            <ImageUploader
              title="امضاء"
              type=".png"
              v-model="model.ClsAgent.Agent.HandySignature"
              cdcName="HandySignature"
              :maxFileSize="1"
              :m="mode"
            />
          </form-control>
        </form-row>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          showNewButton
          @edit="isEditable = true"
          @cancel="cancel"
          @save="saveObj"
          @newInfo="isEditable = true"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"
import FormRow from '../../../../components/common/FormRow.vue'

const defualtModel = {
  CI_AgentType: 0,
  CI_CommissionType: 0,
  StartDateCommission: "",
  EndDateCommission: "",
  StartDateSerial: "",
  EndDateSerial: "",
  FileCount: 0,
  Name: "",
  NidAgent: "00000000-0000-0000-0000-000000000000",
  SerialNo: "",
  HandySignature: ""
}

export default {
  components: { FormRow },
  mixins: [baseFormMixin, fileHelper],
  data () {
    return {
      title: "اطلاعات نماینده ها",
      formKey: "C95DAF7C-F927-4FA9-B3EF-AE29850813EA",
      name: "URepresentative",
      main: true,

      model: { ClsAgent: { Agent: { ...defualtModel } } },
      getListAgentRes: null,
      saveAgentRes: null,
      listAgent: [],
      HandySignature: null

    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    async loadObj () {
      this.showLoading()
      try {
        const { data } = await this.$services.commission77.getListAgent({
          pRequest: {
            ...this.model
          }
        })
        this.getListAgentRes = this.getResponse(data)
        if (this.getListAgentRes.success) {
          this.listAgent = this.getListAgentRes?.data?.GetListAgentResult?.ClsAgent?.ListAgent ?? []

          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
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
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pRequest: {
          ...this.model
        }
      }
      this.$services.commission77
        .saveAgent(payload)
        .then(async ({ data }) => {
          this.saveAgentRes = this.getResponse(data)
          if (this.saveAgentRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")

            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.isEditable = false
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.resetValidation()
      this.isEditable = false
    },

    reset () {
      this.model = { ...defualtModel }
      this.isEditable = true
      this.resetValidation()
    }
  }
}
</script>
