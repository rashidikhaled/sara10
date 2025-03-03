<template>
  <safa-form :id="formKey" :caption="title" app-id="d7491b0e-0044-4a37-adbe-e81005baf68d">
    <form-wrapper vertical :title="title" :padding="false">
      <template #header>
        <safa-status :result="getCommissionListInNidProcRes" />
        <safa-status :result="loadCommissionRes" />
      </template>
      <fit>
        <!-- <internal-section>
      <div class="row q-coسl-gutter-md q-mt-sm">
        <safa-combo
          label="گروه آرشیو"
          ciName="CI_ArchiveGroup"
          domainName="CI_SaraM1"
          class="col-12 col-md-3"
          label-width="60px"
          v-model="selectedArchiveGrp"
          cdcName="ArchiveGroup"
        />
        <safa-text
          label="کلید آرشیو"
          v-model="baseLibResults.ArchiveWrapper.BizCode"
          class="col-12 col-md-3"
          label-width="60px"
          cdcName="BizCode"
        />
        <safa-text
          label="پلاک ثبتی"
          class="col-12 col-md-3"
          label-width="60px"
          v-model="baseLibResults.Base_RegisterPlack_Str"
          cdcName="Base_RegisterPlack_Str"
        />
      </div>
    </internal-section> -->
        <ArchiveWrap v-if="showArchive" :name="archiveConfig.username" :pass="archiveConfig.password"
          :options="archiveOptions" :biz-code="archiveBizCode"></ArchiveWrap>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
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
  }
}
export default {
  mixins: [baseFormMixin],
  components: {
    // FormActions,
  },

  data () {
    return {
      title: 'آرشیو کمیسیون',
      formKey: "ca170d51-edcb-40f6-b6b6-e20de97da117",
      archiveOptions: {
        showToolbar: false
      },
      model: { commissionData: { ...defaultModel } },
      pNidCommission: null,
      getCommissionListInNidProcRes: null,
      loadCommissionRes: null,
      showArchive: false,
      selectedArchiveGrp: 1,
      archiveWrapperModel: null,
      /* sidebarCompatible: true,
      workflowCompatible: true, */
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {},
        Base_RegisterPlack_Str: null
      },
      resourcePermissionResult: null,
      resourceResult: null,
      ciResult: null,
      ciArchiveGroup: [],
      payLoad: {
        pNidNosaziCode: null,
        pCI_ArchiveGroup: null
      },
      archiveBizCode: ''
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      // eslint-disable-next-line no-undef
      // console.log(archiveStore)
    }
    // async loadObj () {   داخل پرنت صدا زده شده بعد تست حذف شود
    //   try {
    //     this.showLoading()
    //     const { data } = await this.$services.SC.getCommissionListInNidProc(
    //       { pNidProc: this.selectedRequest.NidProc },
    //       { config: { District: this.selectedDistrict } }
    //     )
    //     this.getCommissionListInNidProcRes = this.getResponse(data)
    //     if (this.getCommissionListInNidProcRes.success) {
    //       if (this.getCommissionListInNidProcRes?.data?.CommissionList_InNidProc.length > 0) {
    //         this.pNidCommission = this.getCommissionListInNidProcRes?.data?.CommissionList_InNidProc[0].NidCommission
    //         await this.loadCommission()
    //         await this.log({
    //           action: this.logActions.view,
    //           bizCode: this.selectedRequest.NidProc,
    //           bizCodeTitle: 'NidProc'
    //         })
    //       } else {
    //         this.showError('پرونده ای در زیر سیستم کمیسیون یافت نشد.')
    //       }
    //     }
    //   } catch {
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // },
    // async loadCommission () {
    //   try {
    //     this.showLoading()
    //     const { data } = await this.$services.SC.loadCommission(
    //       { pNidCommission: this.pNidCommission },
    //       { config: { District: this.selectedDistrict } }
    //     )
    //     this.loadCommissionRes = this.getResponse(data)
    //     if (this.loadCommissionRes.success) {
    //       this.model.commissionData = this.loadCommissionRes.data
    //       this.showArchive = true
    //       this.updateArchiveBizCode(
    //         this.model.commissionData.Commission_ArchiveRoot
    //       )
    //       this.lockBTN = false
    //       await this.log({
    //         action: this.logActions.view,
    //         bizCode: this.pNidCommission,
    //         bizCodeTitle: 'NidCommission'
    //       })
    //     }
    //   } catch {
    //     this.serverError()
    //   } finally {
    //     this.hideLoading()
    //   }
    // }
    // getArchiveWrapper
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCommission')
    }
  }
}
</script>
