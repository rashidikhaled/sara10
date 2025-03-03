<template>
  <form-wrapper hideTitle>
    <fit>
      <safa-status :result="saveCommissionRes" />
      <safa-status :result="loadCommissionRes" />
      <safa-status :result="getCIResultRes" />
      <safa-status :result="updateRes" />
      <FormRow>
        <FormControl>
          <safa-combo
            label="نوع کمیسیون"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CI_CommissionType"
            ciName="CI_CommissionType"
            domain="CI_SaraM1"
            cdcName="CI_CommissionType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="پیوست"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CI_CommissionAttachment"
            source-type="local"
            :options="commissionAttachList"
            cdcName="commissionAttachment"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره کمیسیون"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CommissionNo"
            cdcName="CommissionNo"
          />
          <!-- required
            validations="required" -->
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ارسال"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CommissionDate"
            cdcName="CommissionDate"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ابلاغ اخطاریه"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.DefenceBreakDate"
            cdcName="DefenceBreakDate"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نحوه اصلاح رأی"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CI_VoteCorrection"
            ciName="CI_VoteCorrection"
            domain="CI_SaraM1"
            cdcName="CI_VoteCorrection"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع پرونده"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CI_CommissionFileType"
            ciName="CI_CommissionFileType"
            domain="CI_SaraM1"
            cdcName="CI_CommissionFileType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نحوه ارسال"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.CI_CommissionSendType"
            ciName="CI_CommissionSendType"
            domain="CI_SaraM1"
            cdcName="CI_CommissionSendType"
          />
        </FormControl>
        <div class="flex items-center q-gutter-lg">
          <safa-checkbox
            label="اخطار ده روزه"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.TenDaysWarning"
            cdcName="TenDaysWarning"
          />
          <safa-checkbox
            label="دفاعیه"
            label-width="100px"
            :m="mode"
            v-model="model.Commission_Info.Defense"
            cdcName="Defense"
          />
        </div>
      </FormRow>
      <text-template
        label="متن ارسالی"
        class="q-my-sm"
        label-width="100px"
        :m="mode"
        v-model="model.Commission_Info.Comments"
        formKey="0219bc6f-b8e0-4005-a8a7-805301981a80"
        cdcName="Comments"
      />
      <text-template
        label="توضیحات کاربر برای کمیسیون"
        label-width="100px"
        :m="mode"
        v-model="model.Commission_Info.UserCommentsForSubSysCom"
        formKey="ca129330-4cf3-4e02-ae1e-29ca7a1b9696"
        cdcName="UserCommentsForSubSysCom"
        class="q-mb-sm"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @cancel="isEditable = false"
        @save="save"
        @edit="isEditable = true"
        :editFormId="formKey"
        editSPId="96ede875-16b4-4ae9-b72a-6e9eabb28c2b"
      >
        <div
          class="flex no-wrap q-gutter-sm"
          v-if="nidCommission !== '00000000-0000-0000-0000-000000000000'"
        >
          <btn-default
            label="گزارش"
            spCaption="گزارش"
            spId="d6f7125d-63c0-42db-aa94-e14396844706"
            @click="onReport"
          />
          <btn-default label="سوابق" @click="$emit('showHistory', true)" />
        </div>
      </form-actions>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    name: String,
    selectedCom: Object,
    newCommission: Boolean
  },
  data () {
    return {
      loadCommissionRes: null,
      getCIResultRes: null,
      updateRes: null,

      model: {
        Base_Owner: null,
        CommissionExecVote: null,
        CommissionList_InNidNosaziCode: null,
        CommissionList_InNidProc: null,
        CommissionVoteList_InNidNosaziCode: null,
        Commission_Appose: [],
        Commission_ArchiveDomain: "",
        Commission_ArchiveRoot: "",
        Commission_Info: {
          CI_CommissionAttachment: null,
          CI_CommissionBroken: null,
          CI_CommissionFileType: null,
          CI_CommissionSendType: null,
          CI_CommissionTechnicalType: null,
          CI_CommissionType: null,
          CI_VoteCorrection: null,
          Comments: "",
          CommissionDate: null,
          CommissionNo: null,
          CreateDate: "",
          CreateNidUser: "00000000-0000-0000-0000-000000000000",
          CreateTime: "",
          CreateUserName: "",
          DefenceBreakDate: "",
          Defense: false,
          EnterDate: null,
          EnterSecretariatNo: null,
          ExitDate: null,
          ExitSecretariatNo: null,
          ExpertComments: null,
          ExpertDate: null,
          GIDCommissionSubSys: "00000000-0000-0000-0000-000000000000",
          IdOrder: 0,
          IsCancel: null,
          NidCommission: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          RevokeDate: null,
          RevokeNidUser: null,
          RevokeTime: null,
          RevokeUserName: null,
          TechnicalComments: null,
          TechnicalDate: null,
          TenDaysWarning: false,
          UserCommentsForSubSysCom: ""
        },
        Commission_Members: [],
        Commission_Status: "",
        Commission_Status_English: "",
        Commission_Trepass: [],
        Commission_Trepass_All: null,
        Commission_Vote: [],
        Commission_Vote_All: null,
        FormulaErrorCode: 0,
        IsAnyCommisionInNosaziCode_: "",
        _NidCommission: "00000000-0000-0000-0000-000000000000",
        _NidProc: "00000000-0000-0000-0000-000000000000"
      },
      saveCommissionRes: null,
      nidCommission: "00000000-0000-0000-0000-000000000000",
      commissionAttachList: [],
      showBtn: true,
      commissionAttachment: null
    }
  },
  computed: {
    config () {
      return {
        config: {
          District: this.selectedDistrict
        }
      }
    }
  },

  watch: {
    "model.Commission_Info.CI_CommissionType" () {
      this.getCommissionAttachment()
    },
    selectedCom: {
      handler () {
        this.nidCommission = this.selectedCom.NidCommission
        this.loadObj(this.selectedCom)
      },
      deep: true
    }
  },

  methods: {
    loadObj (selectedCom) {
      this.resetValidation()
      this.showLoading()
      let payLoad = { pNidCommission: selectedCom.NidCommission }
      this.$services.SC.loadCommission(payLoad, this.config)
        .then(async ({ data }) => {
          this.loadCommissionRes = this.getResponse(data)
          if (this.loadCommissionRes.success) {
            this.model = this.loadCommissionRes.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات پیش نویس کمیسیون با شماره  ${
                this.selectedCom.CommissionNo ?? "---"
              } انجام گردید.`
            })
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
    async getCommissionAttachment () {
      try {
        this.showLoading()
        const payload = {
          CI_CommissionType: this.model.Commission_Info.CI_CommissionType
        }
        const { data } =
          await this.$services.SC.getCICommissionAttachmentFromCICommissionType(
            payload,
            this.config
          )
        this.getCIResultRes = this.getResponse(data)
        if (this.getCIResultRes.success) {
          this.commissionAttachList =
            this.getCIResultRes?.data
              ?.CI_CommissionAttachment_FromCI_CommissionType ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async saveData () {
      if (!this.isValidForm()) return
      try {
        if (this.newCommission) {
          this.model.Commission_Info.CI_CommissionAttachment =
            this.commissionAttachment
        } else {
          this.commissionAttachment =
            this.model.Commission_Info.CI_CommissionAttachment
        }
        this.model.Commission_Info.NidProc = this.selectedRequest.NidProc
        const payload = {
          pCommission: this.model,
          pNidProc: this.selectedRequest.NidProc,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName:
              this.selectedRequest?.TaskTitel ||
              "00000000-0000-0000-0000-000000000000",
            WorkflowGuid:
              this.selectedRequest.NidWorkflowDeff ||
              "00000000-0000-0000-0000-000000000000"
          },
          pIsDraft: true
        }
        this.showLoading()
        const { data } = await this.$services.SC.saveCommission(
          payload,
          this.config
        )
        this.saveCommissionRes = this.getResponse(data)
        if (this.saveCommissionRes.success) {
          this.showSuccess("پیش نویس کمیسیون با موفقیت ذخیره شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات پیش نویس کمیسیون با شماره  ${this.selectedCom?.CommissionNo ?? "---"} انجام گردید.`
          })
          this.nidCommission =
            this.saveCommissionRes.data.Commission_Info.NidCommission
          this.isEditable = false
          this.loadObj(this.saveCommissionRes.data.Commission_Info)
          this.update()
          this.$emit("saveCommission")
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async onReport () {
      const reportPath = "/Sara8Reports/RptCommissionDraft"
      const queryParams = {
        District: this.selectedDistrict,
        NidProc: this.selectedRequest.NidProc,
        NidCommission: this.nidCommission,
        RptDomain: "1@2@3",
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NidProc,
        bizCodeTitle: "NidProc",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش ${this.title} برای درخواست شماره ${this.selectedRequest.NidWorkItem} انجام گردید.`
      })
    },
    update () {
      this.$services.SC.updateLastRequestState(
        {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: "پیشنویس کمیسیون انجام شد"
        },
        this.config
      )
        .then(async ({ data }) => {
          this.updateRes = this.getResponse(data)
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
          this.hideLoading()
        })
    },
    save () {
      this.$emit("save")
    }
  },

  mounted () {
    if (this.selectedCom) {
      this.nidCommission = this.selectedCom.NidCommission
      this.loadObj(this.selectedCom)
    }
  }
}
</script>
