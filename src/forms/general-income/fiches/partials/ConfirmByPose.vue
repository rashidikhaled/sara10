<template>
  <form-wrapper :title="title" vertical>
    <template #header>
      <safa-status :result="saveResult" />
    </template>
    <fit>
      <div class="q-mb-sm">
        <safa-combo-enum
          label="دستگاه پوز"
          label-width="70px"
          enum-name="EumPoseType"
          v-model="model.selectedPose"
          cdcName="poseType"
        />
      </div>
    </fit>
    <form-actions :showEditButton="false">
      <template v-slot:before>
        <btn-save label="تایید" @click="save" />
        <btn-cancel label="انصراف" @click="$emit('hide')" />
      </template>
    </form-actions>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import posMixin from "src/mixins/posMixin"
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

const EumDutyType = 7
export default {
  mixins: [baseFormMixin, posMixin],
  data () {
    return {
      name: "ConfirmByPose",
      title: "انتخاب کردن پوز",
      model: {
        selectedPose: 0
      },
      saveResult: null,
      posSetting: {
        BankMelat: {},
        BankMelli: {},
        BankAnsar: {},
        BankShahr: {},
        BankTejarat: {},
        IranKish: {},
        PostBank: {},
        SamanKish: {}
      },
      tmpPoseConfirmFiche: null,
      // eslint-disable-next-line vue/no-reserved-keys
      _GIDPoseFicheHistory: ""
    }
  },
  props: {
    selectedRegion: Number,
    value: Object,
    formKey: {
      type: String,
      default: "",
      required: true
    }
  },
  mounted () {
    this.loadFormSetting()
  },
  methods: {
    async loadFormSetting () {
      try {
        debugger
        this.showLoading()
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "PosUserSettingsForIncome",
            defaultValue: this.model,
            // nidProc: GLOBAL_SETTINGS_GUID
            nidProc: this.getNidUser()
          }
        )
        this.model = require("src/utils/mergeSettings").default(
          this.model,
          settings
        )
        this.posSetting = { ...settings }
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.hideLoading()
      }
    },
    save () {
      this.showConfirm(
        "آیا از تأیید فیش انتخاب شده از طریق پوز اطمینان دارید؟"
      ).onOk(() => {
        this.showLoading()
        this.tmpPoseConfirmFiche = {
          // AH....Duty_Fiche به دلیل اینکه باید تبدیل شود به
          BankConfirmationDate: this.value.BankConfirmationDate,
          BankConfirmationTime: this.value.BankConfirmationTime,
          BankConfirmPrice:
            this.value.BankConfirmPrice !== null
              ? this.value.BankConfirmPrice
              : 0,
          BankFilePath: this.value.BankFilePath,
          BankPaymentDate: this.value.BankPaymentDate,
          BillID: this.value.BillID,
          CanceledDate: this.value.CanceledDate,
          CanceledTime: this.value.CanceledTime,
          CI_DutyFicheExportType:
            this.value.CI_DutyFicheExportType !== null
              ? this.value.CI_DutyFicheExportType
              : 0,
          ConfirmBankCode: this.value.ConfirmBankCode,
          DeleteDate: this.value.DeleteDate,
          DeletedNidUser: this.value.DeletedNidUser,
          DeletedUserName: this.value.DeletedUserName,
          DeleteTime: this.value.DeleteTime,
          EumDutyFicheStatus:
            this.value.EumDutyFicheStatus !== null
              ? this.value.EumDutyFicheStatus
              : 0,
          EumDutyPaymentType:
            this.value.EumDutyPaymentType !== null
              ? this.value.EumDutyPaymentType
              : 0,
          EumDutyType:
            this.value.EumDutyType !== null
              ? this.value.EumDutyType
              : 0,
          EumFicheConfirmMethode: this.value.EumFicheConfirmMethode,
          ExportationNo: this.value.ExportationNo,
          ExportDate: this.value.ExportDate,
          ExportTime: this.value.ExportTime,
          FicheExportTypeValue: this.value.FicheExportTypeValue,
          FicheNo: this.value.FicheNo,
          FromDate: this.value.FromDate,
          IsDeleted:
            this.value.IsDeleted !== null
              ? this.value.IsDeleted
              : false,
          // I:ShowTooltip = this.value.IsShowTooltip,
          NidFiche:
            this.value.NidFiche !== null
              ? this.value.NidFiche
              : '00000000-0000-0000-0000-000000000000',
          NidUserBankConfirmer: this.value.NidUserBankConfirmer,
          NidUserCanceler: this.value.NidUserCanceler,
          NidUserConfirmer: this.value.NidUserConfirmer,
          NidUserExporter: this.value.NidUserExporter,
          OtherFieldNew: this.value.OtherFieldNew,
          OtherFields: this.value.OtherFields,
          PayablePrice:
            this.value.PayablePrice !== null
              ? this.value.PayablePrice
              : 0,
          PaymentBreakDate: this.value.PaymentBreakDate,
          PaymentBreakDateReal: this.value.PaymentBreakDateReal,
          PaymentDate: this.value.PaymentDate,
          PaymentID: this.value.PaymentID,
          PaymentRahgiriCode: this.value.PaymentRahgiriCode,
          PaymentReferenceNo: this.value.PaymentReferenceNo,
          ToDate: this.value.ToDate,
          // T:oltipColor = this.value.TooltipColor,
          TotalPrice:
            this.value.TotalPrice !== null
              ? this.value.TotalPrice
              : 0,
          UserConfirmationDate: this.value.UserConfirmationDate,
          UserConfirmationTime: this.value.UserConfirmationTime,
          UserNameBankConfirmer: this.value.UserNameBankConfirmer,
          UserNameCanceler: this.value.UserNameCanceler,
          UserNameConfirmer: this.value.UserNameConfirmer,
          UserNameExporter: this.value.UserNameExporter
        }
        const payload = {
          pNidFiche: this.value.NidFiche,
          pFicheNo: this.value.FicheNo,
          pEumPoseType: this.model.selectedPose,
          pEumObjOnPrice: EumDutyType,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.$services.SB.addLogPose(payload, {
          config: { District: this.selectedRegion }
        })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              // this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.value.NidFiche,
                bizCodeTitle: "NidFiche"
              })

              this.$emit("reloadDutyFiche")
            }
          })
          .catch((response) => {
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
        switch (this.model.selectedPose) {
          case 1: // BankShahr
            const { BankShahr } = this.posSetting
            console.log("BankShahr", BankShahr)
            this.shahrBankPos(BankShahr, this.value, EumDutyType) // ComPort: any, TerminalNo: any, BillID: any, PayID: any, Amount: any
            break

          case 2:
            const { BankMelli } = this.posSetting
            console.log("BankMelli", BankMelli)
            this.melliPos(
              BankMelli.serviceAddress,
              BankMelli.poseAddress,
              BankMelli.port,
              this.value,
              BankMelli.fichePayment,
              EumDutyType,
              BankMelli.merchantId,
              BankMelli.terminalId
            )
            break
          case 3:
            const { BankTejarat } = this.posSetting
            console.log("BankTejarat", BankTejarat)
            this.tejaratPos(
              BankTejarat,
              this.value,
              EumDutyType
            )
            break
          case 4:
            const { BankAnsar } = this.posSetting
            console.log("BankAnsar", BankAnsar)
            // this.ansarPos(
            //   BankAnsar
            // EumDutyType
            // );
            break
          case 5:
            const { PoseSettings } = this.posSetting
            console.log("asanPardakhtPose", PoseSettings)
            this.asanPardakhtPose(
              PoseSettings,
              this.value,
              EumDutyType
            )
            break
          case 6:
            const { BankMelat } = this.posSetting
            console.log("BankMelat", BankMelat)
            this.melatPos(
              BankMelat.serviceAddress,
              BankMelat.fichePayment,
              BankMelat.depositId,
              EumDutyType,
              this.value
            )
            break
          case 7:
            console.log("-----SamanKish---", this.posSetting.SamanKish)
            this.samanKishPos(this.posSetting.SamanKish, this.value, EumDutyType)
            break
          case 8:
            console.log("-----IranKish---", this.posSetting.IranKish)
            this.iranKishPos(this.posSetting.IranKish, this.value, EumDutyType)
            break
          case 9:
            console.log("-----PostBank---", this.posSetting.PostBank)
            this.postBankPos(this.posSetting.PostBank.poseAddress, this.value, EumDutyType)
            break

          default:
            break
        }
      })
    }
  }
}
</script>
