<template>
  <safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper vertical title="مشخصات کمیسیون" :padding="false">
      <template #header>
        <safa-status :result="getCommissionListInNidProcRes"/>
        <safa-status :result="loadCommissionRes"/>
        <safa-status :result="saveCommissionRes"/>
      </template>
      <fit>
        <safa-tabs v-model="activeTab" class="fit">
          <template v-slot:tabs>
            <tab-menu name="sendList" label="لیست ارسال ها "/>
            <tab-menu
              name="commissiomExpert"
              label="کارشناس کمیسیون"
              v-if="showExpertTab"
            />
            <tab-menu
              name="commissiomVote"
              label="دریافت رأی"
              v-if="showVoteTab"
            />
            <tab-menu
              name="commissiomProtestVote"
              label="اعتراض به رأی"
              v-if="showProtestTab"
            />
            <tab-menu
              name="commissiomOwner"
              label="اظهار نظر مالک"
              v-if="showOwnerTab"
            />
            <tab-menu
              name="commissiomArchive"
              label="سوابق کمیسیون"
              v-if="showArchiveTab"
            />
          </template>

          <tab-content name="sendList" title="لیست ارسال ها" :padding="false">
            <fit>
              <div class="q-gutter-sm q-pa-sm">
                <btn-default
                  label="کارشناس کمیسیون"
                  :disable="lockBTN"
                  alwaysShow
                  @click="handleCommissionExpert"
                />
                <btn-default
                  label="دریافت رای"
                  :disable="lockBTN"
                  alwaysShow
                  @click="handleCommissionVote"
                />
                <btn-default
                  label="اعتراض به رای"
                  :disable="lockBTN"
                  alwaysShow
                  @click="handleProtestVote"
                />
                <btn-default
                  label="اظهارنظر مالک"
                  :disable="lockBTN"
                  alwaysShow
                  showInResponderForm
                  @click="handleOwnerVote"
                />
                <btn-default
                  label="آرشیو"
                  :disable="lockBTN"
                  alwaysShow
                  @click="handleArchive"
                />
                <btn-default
                  label="وضعیت پرونده"
                  :disable="lockBTN"
                  alwaysShow
                  @click="handleCommissionStatus"
                />
              </div>
              <safa-datatable
                title=""
                helper="moshakhasatcommission"
                v-model="commissionList"
                fit
                :m="mode"
                height="100%"
                max-height="100%"
                min-height="300px"
                :take="20"
                :show-selected-checkbox="true"
                :allowMultipleSelection="false"
                :addRow="false"
                :deleteRow="false"
                :allowCopy="false"
                paginate
                @selectedChange="selectedChange"
              />
            </fit>
          </tab-content>

          <tab-content name="commissiomExpert" title="کارشناس کمیسیون">
            <div class="row q-gutter-sm">
              <safa-datepicker
                label="تاریخ کارشناسی"
                label-width="110px"
                class="col-md-3"
                v-model="model.commissionData.Commission_Info.TechnicalDate"
              />
              <safa-combo
                label="نظریه کارشناس"
                label-width="110px"
                class="col-md-3"
                ci-name="CI_CommissionTechnicalType"
                domain-name="CI_SaraM1"
                v-model="
                  model.commissionData.Commission_Info
                    .CI_CommissionTechnicalType
                "
              />
              <text-template
                label="توضیحات کارشناس"
                label-width="110px"
                class="col-12"
                :rows="8"
                v-model="model.commissionData.Commission_Info.TechnicalComments"
              />
            </div>
          </tab-content>

          <tab-content
            name="commissiomVote"
            title="دریافت رأی"
            :padding="false"
          >
            <commissionVote v-model="model.commissionData" :m="mode"/>
          </tab-content>

          <tab-content
            name="commissiomProtestVote"
            title="اعتراض به رأی"
            :padding="false"
          >
            <fit>
              <safa-datatable
                title=""
                helper="commissionApposeVoteColumns"
                v-model="model.commissionData.Commission_Appose"
                :m="mode"
                fit
                height="100%"
                max-height="100%"
                min-height="300px"
              />
            </fit>
          </tab-content>

          <tab-content name="commissiomOwner" title="اظهار نظر مالک">
            <div class="row q-gutter-sm">
              <safa-datepicker
                label="تاریخ اظهارات"
                label-width="110px"
                class="col-md-3"
                :m="mode"
                v-model="model.commissionData.Commission_Info.TechnicalDate"
              />
              <text-template
                label="متن ارسالی"
                label-width="110px"
                class="col-12"
                :m="mode"
                :rows="8"
                v-model="model.commissionData.Commission_Info.TechnicalComments"
              />
            </div>
          </tab-content>

          <tab-content name="commissiomArchive" title="سوابق کمیسیون">
            <ArchiveWrap
              v-if="selectedRow !== null && activeTab === 'commissiomArchive'"
              :name="archiveConfig.username"
              :pass="archiveConfig.password"
              :biz-code="archiveBizCode"
            />
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer v-if="activeTab === 'commissiomVote' || activeTab === 'commissiomProtestVote' || activeTab ==='commissiomOwner'">
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        />
      </template>

    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import commissionVote from './partials/commissionVote'

const defaultModel = {
  Base_Owner: null,
  CommissionExecVote: null,
  CommissionList_InNidNosaziCode: null,
  CommissionList_InNidProc: null,
  CommissionVoteList_InNidNosaziCode: null,
  Commission_Appose: [],
  Commission_ArchiveDomain: '',
  Commission_ArchiveRoot: '',
  Commission_Info: {
    CI_CommissionAttachment: 0,
    CI_CommissionBroken: null,
    CI_CommissionFileType: 0,
    CI_CommissionSendType: 0,
    CI_CommissionTechnicalType: 0,
    CI_CommissionType: 0,
    CI_VoteCorrection: null,
    Comments: '',
    CommissionDate: '',
    CommissionNo: null,
    CreateDate: '',
    CreateNidUser: '00000000-0000-0000-0000-000000000000',
    CreateTime: '',
    CreateUserName: '',
    DefenceBreakDate: '',
    Defense: false,
    EnterDate: null,
    EnterSecretariatNo: null,
    ExitDate: null,
    ExitSecretariatNo: null,
    ExpertComments: null,
    ExpertDate: null,
    GIDCommissionSubSys: '00000000-0000-0000-0000-000000000000',
    IdOrder: 0,
    IsCancel: null,
    NidCommission: '00000000-0000-0000-0000-000000000000',
    NidProc: '00000000-0000-0000-0000-000000000000',
    RevokeDate: null,
    RevokeNidUser: null,
    RevokeTime: null,
    RevokeUserName: null,
    TechnicalComments: '',
    TechnicalDate: '',
    TenDaysWarning: false,
    UserCommentsForSubSysCom: null
  },
  Commission_Members: [],
  Commission_Status: '',
  Commission_Status_English: '',
  Commission_Trepass: [],
  Commission_Trepass_All: null,
  Commission_Vote: [],
  Commission_Vote_All: null,
  FormulaErrorCode: 0
}

export default {
  mixins: [baseFormMixin],
  components: { commissionVote },
  data () {
    return {
      title: 'مشخصات کمیسیون',
      name: 'UMoshakhasatCommission',
      formKey: '35dd3d88-3e56-4dba-a051-cb9fed97cc89',
      main: true,
      workflowCompatible: true,

      activeTab: 'sendList',
      commissionList: [],
      model: { commissionData: { ...defaultModel } },
      getCommissionListInNidProcRes: null,
      loadCommissionRes: null,
      saveCommissionRes: null,
      lockBTN: true,
      selectedRow: null,
      showExpertTab: false,
      showVoteTab: false,
      showProtestTab: false,
      showOwnerTab: false,
      showArchiveTab: false,
      archiveBizCode: ''
    }
  },

  mounted () {
    this.loadObj()
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.getCommissionListInNidProc(
          { pNidProc: this.selectedRequest.NidProc },
          { config: { District: this.selectedDistrict } }
        )
        this.getCommissionListInNidProcRes = this.getResponse(data)
        if (this.getCommissionListInNidProcRes.success) {
          this.commissionList =
            this.getCommissionListInNidProcRes.data.CommissionList_InNidProc ||
            []
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بارگذاری اطلاعات کمیسیون برای درخواست شماره  ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
        }
      } catch {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async loadCommission () {
      try {
        this.showLoading()
        const { data } = await this.$services.SC.loadCommission(
          { pNidCommission: this.selectedRow.NidCommission },
          { config: { District: this.selectedDistrict } }
        )
        this.loadCommissionRes = this.getResponse(data)
        if (this.loadCommissionRes.success) {
          this.model.commissionData = this.loadCommissionRes.data
          this.lockBTN = false
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات کمیسیون با شماره  ${this.model.commissionData?.Commission_Info?.CommissionNo ?? "---"} انجام گردید.`
          })
        }
      } catch {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      try {
        this.showLoading()
        this.model.commissionData.Commission_Info.NidProc =
          this.selectedRequest.NidProc
        const payLoad = {
          pCommission: this.model.commissionData,
          pNidProc: this.selectedRequest.NidProc,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: '00000000-0000-0000-0000-000000000000',
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          },
          pIsDraft: false
        }
        console.log("saveCommissionPayload:", payLoad)
        const { data } = await this.$services.SC.saveCommission(payLoad, {
          config: { District: this.selectedDistrict }
        })
        this.saveCommissionRes = this.getResponse(data)
        if (this.saveCommissionRes.success) {
          this.isEditable = false
          this.showSuccess('اطلاعات با موفقیت ذخیره شد.')
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات کمیسیون با شماره  ${this.model.commissionData?.Commission_Info?.CommissionNo ?? "---"} انجام گردید.`
          })
          await this.loadCommission()
        }
      } catch (e) {
        this.serverError()
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    selectedChange (e) {
      this.model = { commissionData: { ...defaultModel } }
      this.selectedRow = e.dataItem
      this.loadCommission()
    },

    handleArchive () {
      this.showArchiveTab = true
      this.activeTab = 'commissiomArchive'
      this.updateArchiveBizCode(
        this.model.commissionData.Commission_ArchiveRoot
      )
    },
    handleOwnerVote () {
      this.showOwnerTab = true
      this.activeTab = 'commissiomOwner'
    },
    handleCommissionStatus () {
      this.commissionStatus = `پرونده در وضعیت  ${this.model.commissionData.Commission_Status} می باشد.`
      this.showSuccess(this.commissionStatus)
    },
    handleCommissionVote () {
      this.showVoteTab = true
      this.activeTab = 'commissiomVote'
    },
    handleCommissionExpert () {
      this.showExpertTab = true
      this.activeTab = 'commissiomExpert'
    },
    handleProtestVote () {
      this.showProtestTab = true
      this.activeTab = 'commissiomProtestVote'
    }
  },

  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCommission')
    }
  }
}
</script>
