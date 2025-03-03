<template>
  <form-wrapper>
    <template v-slot:header>
      <formHeaderByNosaziCode
        v-model="baseNosaziCode"
        :taskInfo="taskInfo"
        cdcName="baseNosaziCode"
      />
    </template>
    <safa-status :result="baseLibResult" />
    <safa-status :result="result" />
    <safa-status :result="validationResult" />
    <safa-status :result="exitBlacKListResult" />
    <fit>
      <div class="row q-mb-sm">
        <safa-combo
          v-model="entryCause"
          cdcName="entryCause"
          ciName="CI_BlackListCause"
          class="col-12 col-md-3 col-sm-4"
          domainName="CI_SaraM1"
          label="علت ورود به لیست سیاه"
          m="r"
        ></safa-combo>
      </div>
      <safa-datatable
        ref="grid2"
        v-model="results.BlackListWorkflowExemption_IsEnter"
        cdcName="exitBlackList"
        class="fit"
        height="100%"
        helper="exitBlackList"
        max-height="100%"
        min-height="200px"
        title="درخواست های مجاز"
      />
      <div class="q-mt-sm">
        <text-template
          v-model="comments"
          :rows="2"
          cdcName="ExitComments"
          formKey="913DBD99-B9E5-44E1-9F5B-54CB21EAAF8"
          label="توضیحات خروج از لیست سیاه"
        />
      </div>
    </fit>
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <btn-default label="بلی" @click="accept" />
        <btn-cancel label=" خیر  " @click="cancle" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  data: function () {
    return {
      BuildingSettings: {
        ShahrsaziSettingsIncome: {
          Chk_CalculateIncomeFromSettings: true,
          Chk_HasDailyDeadlineType: false,
          Chk_DonotShowUserpriceColum: false,
          Chk_MablagheSystemWithDecimal: false,
          Chk_SeparatlyIntallment: false,
          Chk_JustIncomeCalculated: false,
          Dta_DeadlineDate: "",
          DayCount: 0
        },
        ShahrsaziSettings: {
          Chk_SendSMSInBlacklist: false,
          Chk_SendSMSExitFromBlacklist: false,
          Chk_SendSMSInTemporaryArchives: false,
          Chk_SendSMSInPermanentArchives: false,
          Chk_SendSMSRegisterRequest: false,
          SMSSignature: "",
          RevisitTimeFrom: "08:00",
          RevisitTimeTo: "22:00",
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
          LayerIdCommision5: "",
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
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: {},
        BuildingObj: {},
        Sh_RequestInfo: {}
      },
      ownerName: "",
      oldNosaziCode: "",
      result: null,
      results: { BlackListWorkflowExemption_IsEnter: [] },
      selectedRow: null,
      validationResult: null,
      comments: "",
      exitBlacKListResult: null,
      exitBlackList: false
    }
  },
  async created () {
    await this.loadFormSetting()
  },
  methods: {
    getBlackListWorkFlow () {
      let data = { pNidNosaziCode: this.nidNosaziCode }
      this.$services.SA.getBlackListWorkflowExemptionIsEnter(data)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.results = this.result.data
          }
        })
        .catch((response) => {
          console.log("getBlackListWorkFlow error .....", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    validationExit () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pDomain: "Sara8",
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SC.validationExitFromBlackList(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.validationResult = this.getResponse(data)
          if (this.validationResult.success) {
            this.exitBlackListMethod()
          }
        })
        .catch((response) => {
          console.error("validationExit error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadFormSetting () {
      try {
        this.BuildingSettings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "BuildingSettings",
            defaultValue: this.BuildingSettings,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
      } catch (e) {
        this.showError("خطا در دریافت تنظیمات شهرسازی.")
      }
    },
    exitBlackListMethod () {
      let data = {
        pNidNosaziCode: this.nidNosaziCode,
        pNidBlack: this.nidBlack,
        pComments: this.comments,
        pUserName: this.getUserDisplayName(),
        pUserCode: this.getNidUser(),
        // IsAdmin: true,
        IsAdmin:
          this.BuildingSettings.ShahrsaziSettings
            .Chk_AllowExitFromBlackListWithSameGroups || false,
        pDomain: "Sara8",
        pSignature: null
      }
      this.$services.SA.exitFromBlackList(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.exitBlacKListResult = this.getResponse(data)
          if (this.exitBlacKListResult.success) {
            this.showSuccess("خروج از لیست سیاه با موفقیت انجام شد.")
            this.cancle()
            await this.log({
              action: this.logActions.save,
              bizCode: this.nidBlack,
              bizCodeTitle: "pNidBlack",
              saveDesc: `خروج از لیست سیاه انجام گردید.`
            })
          }
        })
        .catch((response) => {
          console.error("exitBlackListMethod error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.validationExit()
    },
    cancle () {
      this.exitBlackList = true
      this.$emit("backToBlackListForm", this.exitBlackList)
    }
  },

  props: {
    nosaziCode: String,
    nidNosaziCode: String,
    entryCause: Number,
    nidBlack: String,
    passedData: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    baseNosaziCodeFromParent: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  mounted () {
    this.baseNosaziCode = convertStringToNosaziCodeObject(this.nosaziCode)
    this.getBlackListWorkFlow()
  }
}
</script>
