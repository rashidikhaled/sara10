<template>
  <fit>
    <div class="fit q-pa-sm">
      <safa-combo-enum
        v-model="model.selectedPose"
        cdcName="poseType"
        enum-name="EumPoseType"
      />
    </div>
    <div class="q-gutter-sm q-pa-sm">
      <btn-save label="تایید" @click="save"/>
      <btn-cancel label="انصراف" @click="cancel"/>
    </div>
  </fit>
</template>
<script>

import baseFormMixin from 'src/mixins/baseFormMixin'
import posMixin from 'src/mixins/posMixin'
// import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
//  public enum EumDutyType
//         {
//             [Description("نوسازی")]
//             Renovation = 1,
//             [Description("صنفی")]
//             Job = 2,
//             [Description("زباله")]
//             Garbage = 3
//         };
const EumDutyType = 1
export default {
  name: 'DutyFichePoseSelection',
  mixins: [baseFormMixin, posMixin],
  data: function () {
    return {
      model: {
        selectedPose: 0
      },
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
      _GIDPoseFicheHistory: ''
    }
  },
  props: {
    baseNosaziCode: Object,
    selectedRow: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    }
  },
  mounted () {
    this.loadFormSetting()
  },
  methods: {
    async loadFormSetting () {
      try {
        this.showLoading()
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'PosUserSettings',
            defaultValue: this.model,
            nidProc: this.getNidUser()
            // nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.model = require('src/utils/mergeSettings').default(
          this.model,
          settings
        )
        this.posSetting = { ...settings }
      } catch (e) {
        this.showError('خطا در سرویس توضیحات رخ داده است.')
      } finally {
        this.hideLoading()
      }
    },

    save () {
      this.showConfirm(
        'آیا از تأیید فیش انتخاب شده از طریق پوز اطمینان دارید؟'
      ).onOk(() => {
        this.showLoading()
        this.tmpPoseConfirmFiche = {
          // AH....Duty_Fiche به دلیل اینکه باید تبدیل شود به
          BankConfirmationDate: this.selectedRow.BankConfirmationDate,
          BankConfirmationTime: this.selectedRow.BankConfirmationTime,
          BankConfirmPrice:
            this.selectedRow.BankConfirmPrice !== null
              ? this.selectedRow.BankConfirmPrice
              : 0,
          BankFilePath: this.selectedRow.BankFilePath,
          BankPaymentDate: this.selectedRow.BankPaymentDate,
          BillID: this.selectedRow.BillID,
          CanceledDate: this.selectedRow.CanceledDate,
          CanceledTime: this.selectedRow.CanceledTime,
          CI_DutyFicheExportType:
            this.selectedRow.CI_DutyFicheExportType !== null
              ? this.selectedRow.CI_DutyFicheExportType
              : 0,
          ConfirmBankCode: this.selectedRow.ConfirmBankCode,
          DeleteDate: this.selectedRow.DeleteDate,
          DeletedNidUser: this.selectedRow.DeletedNidUser,
          DeletedUserName: this.selectedRow.DeletedUserName,
          DeleteTime: this.selectedRow.DeleteTime,
          EumDutyFicheStatus:
            this.selectedRow.EumDutyFicheStatus !== null
              ? this.selectedRow.EumDutyFicheStatus
              : 0,
          EumDutyPaymentType:
            this.selectedRow.EumDutyPaymentType !== null
              ? this.selectedRow.EumDutyPaymentType
              : 0,
          EumDutyType:
            this.selectedRow.EumDutyType !== null
              ? this.selectedRow.EumDutyType
              : 0,
          EumFicheConfirmMethode: this.selectedRow.EumFicheConfirmMethode,
          ExportationNo: this.selectedRow.ExportationNo,
          ExportDate: this.selectedRow.ExportDate,
          ExportTime: this.selectedRow.ExportTime,
          FicheExportTypeValue: this.selectedRow.FicheExportTypeValue,
          FicheNo: this.selectedRow.FicheNo,
          FromDate: this.selectedRow.FromDate,
          IsDeleted:
            this.selectedRow.IsDeleted !== null
              ? this.selectedRow.IsDeleted
              : false,
          // I:ShowTooltip = this.selectedRow.IsShowTooltip,
          NidFiche:
            this.selectedRow.NidFiche !== null
              ? this.selectedRow.NidFiche
              : '00000000-0000-0000-0000-000000000000',
          NidUserBankConfirmer: this.selectedRow.NidUserBankConfirmer,
          NidUserCanceler: this.selectedRow.NidUserCanceler,
          NidUserConfirmer: this.selectedRow.NidUserConfirmer,
          NidUserExporter: this.selectedRow.NidUserExporter,
          OtherFieldNew: this.selectedRow.OtherFieldNew,
          OtherFields: this.selectedRow.OtherFields,
          PayablePrice:
            this.selectedRow.PayablePrice !== null
              ? this.selectedRow.PayablePrice
              : 0,
          PaymentBreakDate: this.selectedRow.PaymentBreakDate,
          PaymentBreakDateReal: this.selectedRow.PaymentBreakDateReal,
          PaymentDate: this.selectedRow.PaymentDate,
          PaymentID: this.selectedRow.PaymentID,
          PaymentRahgiriCode: this.selectedRow.PaymentRahgiriCode,
          PaymentReferenceNo: this.selectedRow.PaymentReferenceNo,
          ToDate: this.selectedRow.ToDate,
          // T:oltipColor = this.selectedRow.TooltipColor,
          TotalPrice:
            this.selectedRow.TotalPrice !== null
              ? this.selectedRow.TotalPrice
              : 0,
          UserConfirmationDate: this.selectedRow.UserConfirmationDate,
          UserConfirmationTime: this.selectedRow.UserConfirmationTime,
          UserNameBankConfirmer: this.selectedRow.UserNameBankConfirmer,
          UserNameCanceler: this.selectedRow.UserNameCanceler,
          UserNameConfirmer: this.selectedRow.UserNameConfirmer,
          UserNameExporter: this.selectedRow.UserNameExporter
        }
        const payload = {
          pNidFiche: this.selectedRow.NidFiche,
          pFicheNo: this.selectedRow.FicheNo,
          pEumPoseType: this.model.selectedPose,
          pEumObjOnPrice: 2,
          pUserCode: this.getNidUser(),
          pUserName: this.getUserDisplayName()
        }
        this.$services.SB.addLogPose(payload, {
          config: { District: this.baseNosaziCode.District }
        })
          .then(async ({ data }) => {
            this.saveResult = this.getResponse(data)

            if (this.saveResult.success) {
              // this.showSuccess('فیش انتخاب شده با موفقیت تأیید شد.')
              this._GIDPoseFicheHistory =
                this.saveResult.data.GIDPoseFicheHistory
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.selectedRow.NidFiche,
                bizCodeTitle: 'NidFiche'
              })

              this.$emit('reloadDutyFiche')
            }
          })

          .catch(err => {
            console.error(err)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
        switch (this.model.selectedPose) {
          case 1: // BankShahr
            const { BankShahr } = this.posSetting
            console.log('BankShahr', BankShahr)
            this.shahrBankPos(BankShahr, this.selectedRow, EumDutyType) // ComPort: any, TerminalNo: any, BillID: any, PayID: any, Amount: any
            break

          case 2:
            const { BankMelli } = this.posSetting
            console.log('BankMelli', BankMelli)
            this.melliPos(
              BankMelli.serviceAddress,
              BankMelli.poseAddress,
              BankMelli.port,
              this.selectedRow,
              BankMelli.fichePayment,
              EumDutyType,
              BankMelli.merchantId,
              BankMelli.terminalId
            )
            break
          case 3:
            const { BankTejarat } = this.posSetting
            console.log('BankTejarat', BankTejarat)
            this.tejaratPos(
              BankTejarat,
              this.selectedRow,
              EumDutyType
            )
            break
          case 4:
            const { BankAnsar } = this.posSetting
            console.log('BankAnsar', BankAnsar)
            // this.ansarPos(
            //   BankAnsar
            // EumDutyType
            // );
            break
          case 5:
            const { PoseSettings } = this.posSetting
            console.log('asanPardakhtPose', PoseSettings)
            this.asanPardakhtPose(
              PoseSettings,
              this.selectedRow,
              EumDutyType
            )
            break
          case 6:
            const { BankMelat } = this.posSetting
            console.log('BankMelat', BankMelat)
            this.melatPos(
              BankMelat.serviceAddress,
              BankMelat.fichePayment,
              BankMelat.depositId,
              EumDutyType,
              this.selectedRow
            )
            break
          case 7:
            console.log('-----SamanKish---', this.posSetting.SamanKish)
            this.samanKishPos(this.posSetting.SamanKish, this.selectedRow, EumDutyType)
            break
          case 8:
            console.log('-----IranKish---', this.posSetting.IranKish)
            this.iranKishPos(this.posSetting.IranKish, this.selectedRow, EumDutyType)
            break
          case 9:
            console.log('-----PostBank---', this.posSetting.PostBank)
            this.postBankPos(this.posSetting.PostBank.poseAddress, this.selectedRow, EumDutyType)
            break

          default:
            break
        }
      })
    },
    cancel () {
      this.$emit('reloadDutyFiche')
    }
  }
}
</script>
