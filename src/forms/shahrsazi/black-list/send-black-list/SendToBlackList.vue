<template>
<safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
  <form-wrapper title="ارسال به لیست سیاه" vertical>
    <template #header>
      <form-header-by-nosazi-code
        v-model="baseNosaziCode"
        cdcName="baseNosaziCode"
        @fetched="fetched"
      />
      <safa-status :result="loadWorkflowListRes"/>
      <safa-status :result="getaNosaziCodeInBlackListRes"/>
      <safa-status :result="sendToBlackListRes"/>
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-combo
            v-model="entryCause"
            cdcName="blackListCause"
            ciName="CI_BlackListCause"
            domainName="CI_SaraM1"
            label="علت ورود به لیست سیاه"
            label-width="95px"
          />
        </FormControl>
        <FormControl>
          <safa-combo-enum
            v-model="selectedStatus"
            cdcName="selectedStatus"
            enum-name="EumBlackListControl"
            label="نوع کنترل"
            label-width="95px"
          />
        </FormControl>
      </FormRow>
      <safa-datatable
        v-model="model.Sh_WorkflowList"
        :addRow="false"
        :allowCopy="false"
        :allowMultipleSelection="true"
        :allowReload="false"
        :deleteRow="false"
        cdcName="shWorkflowList"
        fit
        height="100%"
        helper="sendToBlackList"
        max-height="100%"
        min-height="100px"
        paginate
        title=" درخواست های مجاز"
        @selectedChange="selectedChange"
      />
    </fit>
    <div class="q-mb-sm">
      <text-template
        v-model="comments"
        :rows="3"
        cdcName="comments"
        class="q-mt-sm"
        formKey="59fa1937-374a-419c-8ece-fb9f0ed1b3af"
        label="توضیحات ورود به لیست سیاه"
        label-width="95px"
        validations="required"
      />
    </div>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default label="ارسال" @click="getCodeAndSend"/>
        <btn-cancel label="انصراف" @click="cancel"/>
      </div>
    </template>
  </form-wrapper>
</safa-form>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import { GLOBAL_SETTINGS_GUID } from 'src/config/SETTINGS_CONSTs'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'ارسال به لیست سیاه',
      formKey: '59fa1937-374a-419c-8ece-fb9f0ed1b3af',
      name: 'SendToBlackList',
      main: true,
      sidebarCompatible: true,

      entryCause: 0,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      BuildingSettings: {
        ShahrsaziSettingsIncome: {
          Chk_CalculateIncomeFromSettings: true,
          Chk_HasDailyDeadlineType: false,
          Chk_DonotShowUserpriceColum: false,
          Chk_MablagheSystemWithDecimal: false,
          Chk_SeparatlyIntallment: false,
          Chk_JustIncomeCalculated: false,
          Dta_DeadlineDate: '',
          DayCount: 0
        },
        ShahrsaziSettings: {
          Chk_SendSMSInBlacklist: false,
          Chk_SendSMSExitFromBlacklist: false,
          Chk_SendSMSInTemporaryArchives: false,
          Chk_SendSMSInPermanentArchives: false,
          Chk_SendSMSRegisterRequest: false,
          SMSSignature: '',
          RevisitTimeFrom: '08:00',
          RevisitTimeTo: '22:00',
          RevisitDuration: 30,
          Chk_PreventRevisitInHolidays: false,
          Chk_CalculateZabeteh: false,
          Chk_SetMaoCode: false,
          Chk_FillUnregisteredCode: false,
          Chk_MissFoulUserChecking: false,
          Chk_RevisitAgentCopyChecking: false,
          Chk_CommissionFine: false,
          Chk_CommisionVoteChecking: false,
          Chk_IsComboRequesterName: false,
          Chk_IsMultipleSendToBlackList: false,
          Chk_IsCopyShArchiveFromParvandeh: false,
          Chk_IsCurrentDateForConfirmLicence: false,
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtWCF: false,
          Chk_IsCheckSabtJson: false,
          Chk_IsCheckMapInfo: false,
          Chk_IsChecExistBlock: false,
          Chk_IsChecUserInDutyCodes: false,
          Chk_PreventCancelRequest: false,
          LayerIdCommision5: '',
          UsingCount: 1,
          ArchiveParvanehEntityId: 1,
          ArchiveAnswerEstelamEntityId: 1,
          ArchivePayankarEntityId: 1,
          ArchiveMapCommandEntityId: 1,
          ArchiveCertificateOfContraryEntityId: 1,
          ArchivePrincipalAgreementEntityId: 1,
          Chk_IsCheckCommissionInExitTemporary: false,
          Chk_IsShowBaseDig: false,
          Chk_IsChangeNosaziCodeInSubSystems: false,
          Chk_DontCheckCroquisInRevisit: false,
          Chk_DontCheckPreCommissionInfo: false,
          Chk_IsSelectOnObjTypeInRevisit: false,
          Chk_AllowExitFromBlackListWithSameGroups: false,
          Chk_DontCheckRequestInConvertBuildingToHousSharing: false,
          Chk_DontCheckRequestInConvertHousSharingToBuilding: false,
          Chk_DontShowMomayeziGroup: false,
          Chk_DontValidationInBlackList: false,
          Chk_BackToStartInConvert: false,
          Chk_DontShowPenaltyGroup: false,
          Chk_GenerateDateAndConversionDateToYear: false,
          Chk_GenerateDateAndConversionDateToDate: false,
          Chk_GenerateYear: false
        }
      },
      loadWorkflowListRes: null,
      model: { Sh_WorkflowList: [] },
      getaNosaziCodeInBlackListRes: null,
      sendToBlackListRes: null,
      sendResults: null,
      selectedRows: [],
      validationResult: null,
      comments: '',
      exitBlackList: false,
      nosaziCodesInBlackList: { NosaziCodeInBlackList: [] },
      selectedStatus: 1
    }
  },
  async mounted () {
    await this.loadSettings()
  },
  methods: {
    fetched (value) {
      this.nosaziCode = value._NidNosaziCode
      this.loadWorkFlow()
    },
    loadWorkFlow () {
      const payload = {}
      this.showLoading()
      this.$services.SA.loadWorkflowList(payload, this.config)
        .then(async ({ data }) => {
          this.loadWorkflowListRes = this.getResponse(data)
          if (this.loadWorkflowListRes.success) {
            this.model = this.loadWorkflowListRes.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
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
    async loadSettings () {
      this.BuildingSettings = await this.loadFormSetting('BuildingSettings', {
        defaultValue: this.BuildingSettings,
        nidProc: GLOBAL_SETTINGS_GUID
      })
    },
    getCodeAndSend () {
      if (!this.isValidForm()) return
      const payload = { pNidNosaziCode: this.nosaziCode }
      this.$services.SA.getaNosaziCodeInBlackList(payload, this.config)
        .then(async ({ data }) => {
          this.getaNosaziCodeInBlackListRes = this.getResponse(data)
          if (this.getaNosaziCodeInBlackListRes.success) {
            this.nosaziCodesInBlackList =
              this.getaNosaziCodeInBlackListRes.data
            if (this.nosaziCodesInBlackList.NosaziCodeInBlackList.length > 0 && !this.BuildingSettings.ShahrsaziSettings.Chk_IsMultipleSendToBlackList) {
              this.showError('کد نوسازی وارد شده در لیست سیاه وجود دارد.')
            } else {
              this.sendToBlackList()
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی'
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
    sendToBlackList () {
      const payload = {
        pBlack: {
          CI_BlackListCause: this.entryCause,
          Domain: 'Sara8',
          EnterComments: this.comments,
          EnterDate: '',
          EnterTime: '',
          EumBlackListControl: this.selectedStatus,
          EumBlackListStatus: 0,
          ExitComments: '',
          ExitDate: '',
          ExitTime: '',
          NidBlack: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: this.nosaziCode,
          NidUserEnter: this.getNidUser(),
          NidUserExit: '00000000-0000-0000-0000-000000000000',
          UserEnter: this.getUserDisplayName(),
          UserExit: ''
        },
        pBlackWorkflow: this.selectedRows
      }
      this.$services.SA.sendToBlackList(payload, this.config)
        .then(async ({ data }) => {
          this.sendToBlackListRes = this.getResponse(data)
          if (this.sendToBlackListRes.success) {
            this.sendResults = this.sendToBlackListRes.data
            this.showSuccess('کد نوسازی با موفقیت به لیست سیاه افزوده شد.')
            await this.log({
              action: this.logActions.save,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: 'کد نوسازی'
            })
            // this.redirectToKartable()
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
    selectedChange (e) {
      this.selectedRows = e.selectedItems
    },
    cancel () {
      this.exitBlackList = true
      this.$emit('backToBlackListForm', this.exitBlackList)
      this.hideSidebar('SendToBlackList')
    }
  },

  computed: {
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District === 0
              ? 1
              : this.baseNosaziCode.District
        }
      }
    }
  }
}
</script>
