<template>
  <safa-form
    app-id="58819065-F293-4972-A718-E79C4E50D277"
    :id="formKey"
    caption="رفع تخلف"
  >
    <form-wrapper>
      <template #header>
        <safa-status :result="getWarningRes" />
        <safa-status :result="saveViolationFixRes" />
        <safa-status :result="getSMSNumberRes" />
        <safa-status :result="sendSMSRes" />
        <formHeaderByNosaziCode
          v-model="NosaziCode"
          cdcName="NosaziCode"
          m="r"
          ref="formHeaderRef"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm" :xl="4" :lg="4" :md="3" :sm="3">
          <FormControl>
            <safa-text
              label="شماره"
              m="r"
              label-width="100px"
              v-model="model.Warning.WarningNo"
              cdcName="WarningNo"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نوع اخطار"
              domainName="BuildingPolice"
              ciName="CI_WarningType"
              label-width="100px"
              v-model="model.Warning.CI_WarningType"
              cdcName="CI_WarningType"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="وضعیت اخطار"
              label-width="100px"
              v-model="model.Warning.EumWarningStatus"
              cdcName="EumWarningStatus"
              domainName="BuildingPolice"
              ciName="CI_EumWarningStatus"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ صدور"
              label-width="100px"
              v-model="model.Warning.WarningDate"
              cdcName="WarningDate"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مهلت اخطار (برحسب ساعت )"
              label-width="100px"
              v-model="model.Warning.BreakTime"
              cdcName="BreakTime"
              m="r"
            />
          </FormControl>
        </FormRow>
        <div class="row">
          <text-template
            label="توضیحات رفع تخلف"
            label-width="100px"
            v-model="model.Warning.ViolationFixComment"
            cdcName="ViolationFixComment"
            class="col-12"
          />
        </div>
      </fit>
      <template #footer>
        <btn-default label="تایید" class="q-mr-sm" @click="saveData" />
        <btn-default label="انصراف" />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import PersianDate from "persian-date"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "رفع تخلف",
      name: "FixViolation",
      formKey: "73a26d7e-4f08-4205-ac11-b4f1cdbbdd2c",

      getWarningRes: null,
      saveViolationFixRes: null,
      getSMSNumberRes: null,
      sendSMSRes: null,

      isView: false,
      activeTab: "FoundationData",
      model: {
        Warning: {
          WarningNo: 0,
          CI_WarningType: 0,
          EumWarningStatus: 0,
          WarningDate: "",
          BreakTime: "",
          ViolationFixComment: ""
        }
      },
      NosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      getSMSNumberResult: null
    }
  },
  props: {
    selectedRow: Object
  },
  methods: {
    loadForm () {
      this.NosaziCode = convertStringToNosaziCodeObject(
        this.selectedRow.NosaziCode
      )
      this.$nextTick(async () => {
        await this.$refs.formHeaderRef.load()
      })
      this.loadData()
    },
    loadData () {
      this.showLoading()
      const payload = {
        pNidWarning: this.selectedRow.NidWarning,
        pNidNosaziCodeSara: "00000000-0000-0000-0000-000000000000"
      }
      this.$services.SH.getWarning(payload)
        .then(async ({ data }) => {
          this.getWarningRes = this.getResponse(data)
          if (this.getWarningRes.success) {
            this.model = this.getWarningRes.data
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRow.NosaziCode,
                bizCodeTitle: "کدنوسازی",
                nosaziCode: this.selectedRow.NosaziCode,
                saveDesc: `نمایش رفع تخلف برای کد نوسازی ${this.selectedRow.NosaziCode} انجام گردید.`
              })
            }
            this.isView = true
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
    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        pNidWarnning: this.selectedRow.NidWarning,
        pCommentViolationFix: this.model.Warning.ViolationFixComment
      }
      this.$services.SH.saveViolationFix(payload)
        .then(async ({ data }) => {
          this.saveViolationFixRes = this.getResponse(data)
          if (this.saveViolationFixRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRow.NosaziCode,
              bizCodeTitle: "کدنوسازی",
              nosaziCode: this.selectedRow.NosaziCode,
              saveDesc: `ذخیره رفع تخلف برای کد نوسازی ${this.selectedRow.NosaziCode} انجام گردید.`
            })
            this.loadData()
            this.$emit("getAllwarningList")
            this.getSMSNumber()
            this.$emit("backToMainForm")
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
    getSMSNumber () {
      this.showLoading()
      const payload = {
        pDistrict: this.NosaziCode.District,
        pNidProc: "00000000-0000-0000-0000-000000000000",
        pNidNosaziCode_Sara: this.model.Warning.NidNosaziCode_Sara
      }
      this.$services.SH.getSMSNumber(payload)
        .then(async ({ data }) => {
          this.getSMSNumberRes = this.getResponse(data)
          if (this.getSMSNumberRes.success) {
            this.getSMSNumberResult = this.getSMSNumberRes.data
            await this.sendSMS()
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
    async sendSMS () {
      try {
        const payLoad = {
          pParameter: {
            AppName: "BuildingPolice",
            BizCode: this.selectedRow.NosaziCode || "",
            Number:
              this.getSMSNumberResult &&
              this.getSMSNumberResult.NumbersList[0].PhoneNumber,
            SMSType: "ثبت درخواست در سیستم پلیس ساختمان",
            ScheduleSendDate: new PersianDate().toLocale("en").format("L"),
            Text: "از ملک شما رفع تخلف شد.",
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        const { data } = await this.$services.sendSMS.SendSMS(payLoad)
        this.sendSMSRes = this.getResponse(data)
        if (this.sendSMSRes.success) this.showSuccess("پیامک با موفقیت ارسال شد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    }
  }
}
</script>
