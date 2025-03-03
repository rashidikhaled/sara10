<template>
  <form-wrapper>
    <safa-status :result="saveResult"></safa-status>
    <div class="row items-center">
      <div class="col">
        <safa-combo-enum
          enum-name="EumPoseType"
          label="دستگاه پوز"
          v-model="model.selectedPose"
          cdcName="selectedPose"
        />
      </div>
    </div>
    <template v-slot:footer>
      <div class="q-gutter-sm">
        <btn-default label="تأیید" @click="confirmWithPose" />
        <btn-default label="انصراف" @click="cancel" />
      </div>
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import posMixin from "src/mixins/posMixin"

const EumDutyType = 6 // چنین اینامی نداریم اما برای ایجاد ساختار یکپارچه و تشخیص پوز حفاری این اینام ایجاد شد

export default {
  data: function () {
    return {
      saveResult: null,
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
      _GIDPoseFicheHistory: ""
    }
  },
  props: {
    selectedRow: Object,
    // config: Object,
    formKey: String,
    title: String,
    name: String
  },
  mixins: [baseFormMixin, posMixin],
  mounted () {
    this.loadFormSetting()
  },
  methods: {
    async loadFormSetting () {
      try {
        this.showLoading()
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "UPosDigSetting",
            defaultValue: this.model,
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
    confirmWithPose () { //
      this.showConfirm(
        " آیا از تأیید فیش با شماره " +
          `${this.selectedRow.FicheNo}` +
          " اطمینان دارید؟"
      ).onOk(() => {
        switch (this.model.selectedPose) {
          case 1: // BankShahr
            const { BankShahr } = this.posSetting
            console.log("BankShahr", BankShahr)
            this.shahrBankPos(BankShahr, this.selectedRow, EumDutyType, this.taskInfo, this.name)
            break

          case 2:
            const { BankMelli } = this.posSetting
            console.log("BankMelli", BankMelli)
            this.melliPos(
              BankMelli.serviceAddress,
              BankMelli.poseAddress,
              BankMelli.port,
              this.selectedRow,
              BankMelli.fichePayment,
              EumDutyType,
              BankMelli.merchantId,
              BankMelli.terminalId,
              this.taskInfo,
              this.name
            )
            break
          case 3:
            const { BankTejarat } = this.posSetting
            console.log("BankTejarat", BankTejarat)
            this.tejaratPos(BankTejarat, this.selectedRow, EumDutyType)
            break
          case 4:
            const { BankAnsar } = this.posSetting
            console.log("BankAnsar", BankAnsar)
            this.ansarPos(BankAnsar, this.selectedRow, EumDutyType)
            break
          case 5:
            const { PoseSettings } = this.posSetting
            console.log("asanPardakhtPose", PoseSettings)
            this.asanPardakhtPose(PoseSettings, this.selectedRow, EumDutyType)
            break
          case 6:
            const { BankMelat } = this.posSetting
            console.log("BankMelat", BankMelat)
            this.melatPos(
              BankMelat.serviceAddress,
              BankMelat.fichePayment,
              BankMelat.depositId,
              EumDutyType,
              this.selectedRow
            )
            break
          case 7:
            console.log("-----SamanKish---", this.posSetting.SamanKish)
            this.samanKishPos(this.posSetting.SamanKish, this.selectedRow, EumDutyType)
            break
          case 8:
            console.log("-----IranKish---", this.posSetting.IranKish)
            this.iranKishPos(this.posSetting.IranKish, this.selectedRow, EumDutyType)
            break
          case 9:
            console.log("-----PostBank---", this.posSetting.PostBank)
            this.postBankPos(this.posSetting.PostBank.poseAddress, this.selectedRow, EumDutyType)
            break

          default:
            break
        }
      })
    },
    cancel () {
      this.$emit("close")
    }
  }
}
</script>
