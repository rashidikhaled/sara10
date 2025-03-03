<template>
  <form-wrapper :padding="true">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
    </template>
    <div>
      <safa-notice>
        مهلت پاسخگوئی به استعلام بر اساس مصوبه مورخ 94/5/25 کمیسیون نحوه هماهنگی
        و صدور مجوز حفاری ، حداکثر 15 روز می باشد . در صورت عدم پاسخ در مهلت
        مقرر امکان ارسال پرونده به شهرداری میسر و مسؤلیت عواقب آن بر عهده شرکت
        مخاطب استعلام خواهد بود .
      </safa-notice>
      <safa-notice>
        مهلت پاسخگوئی به استعلام مجدد ، حداکثر 5 روز می باشد . در صورت عدم پاسخ
        در مهلت مقرر امکان ارسال پرونده به شهرداری میسر و مسؤلیت عواقب آن بر
        عهده شرکت مخاطب استعلام خواهد بود .
      </safa-notice>
      <safa-notice :type="noticeType" v-if="selectedCombo !== 0">{{
        Txt_Subject
      }}</safa-notice>
      <FormRow>
        <FormControl>
          <safa-text
            v-model="TxtTell"
            cdcName="TxtTell"
            label="تلفن درخواست دهنده"
            label-width="110px"
            m="r"
          />
        </FormControl>

        <text-template
          label="شرایط خصوصی"
          class="col-12"
          type="textarea"
          cdcName="TxtComments"
          v-model="TxtComments"
          :validations="selectedCombo !== 3 ? 'required' : ''"
          label-width="110px"
          :rows="8"
        />
      </FormRow>
    </div>
    <template v-slot:footer>
      <div class="flex justify-between">
        <div class="flex items-center">
          <safa-combo2
            ciName="CI_TypeAcceptInquiry"
            domainName="Dig"
            v-model="selectedCombo"
            label="نوع پاسخ"
            label-width="70px"
            class="q-mr-sm"
            cdcName="CI_TypeAcceptInquiry"
            :validations="['required', validations.ciTypeAcceptInquiry]"
            style="min-width: 200px"
          />
          <btn-default class="q-mr-sm" @click="BtnReport"
            >پیش نمایش</btn-default
          >
          <span v-if="selectedCombo === 2" class="q-mx-sm" style="color: red"
            >توجه : پرونده پس از ذخیره توضیحات در کارتابل تایید پاسخ استعلام
            تاسیسات قرار می گیرد</span
          >
          <btn-save @click="acceptBtn(true, true)">تایید نهایی پاسخ</btn-save>
        </div>
        <div>
          <btn-default @click="showArchive">پیوست مدارک</btn-default>
        </div>
      </div>
    </template>
    <safa-popup
      title="بررسی استعلام"
      v-model="showUArchiveInquiry"
      width="900px"
      height="600px"
    >
      <UArchiveInquiry :selectedItem="selectedItem" />
    </safa-popup>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import UArchiveInquiry from "./partials/UArchiveInquiry"
import Joi from "joi"

export default {
  mixins: [baseFormMixin],
  components: {
    UArchiveInquiry
  },
  name: "",
  data () {
    return {
      TxtComments: "",
      Txt_Subject: "محل اجرای حفاری برابر استعلام مأخوذه مورد تایید است.",
      noticeType: "success",
      selectedCombo: 1,
      showUArchiveInquiry: false,
      loadObjRes: null,
      saveObjRes: null,
      model: {},
      TxtTell: "",
      validations: {
        ciTypeAcceptInquiry: Joi.custom(
          function (value, helper) {
            if (this.selectedCombo === 0) {
              return helper.message("نوع پاسخ استعلام نمی تواند نامشخص باشد")
            }
            return true
          }.bind(this)
        )
      }
    }
  },
  props: {
    selectedItem: Object
  },
  watch: {
    selectedCombo: function () {
      switch (this.selectedCombo) {
        case 1:
          this.Txt_Subject =
            "محل اجرای حفاری برابر استعلام مأخوذه مورد تایید است."
          this.noticeType = "success"
          break
        case 2:
          this.Txt_Subject =
            "محل اجرای حفاری با تاسیسات این شرکت تداخل داشته و امکان اجرا وجود ندارد."
          this.noticeType = "danger"
          break
        case 3:
          this.Txt_Subject =
            "محل اجرای حفاری نیاز به بررسی مجدد توسط درخواست کننده دارد (به توضیحات در خواست مراجعه شود)."
          this.noticeType = "warning"
          break

        default:
          this.Txt_Subject = " "
          this.noticeType = "info"
          break
      }
    }
  },
  mounted () {
    this.loadObj()
  },
  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        pRequest: { ...this.selectedItem }
      }

      this.$services.excavation
        .getAcceptInquiry(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            debugger
            this.model = this.loadObjRes.data.GetAcceptInquiryResult
            if (this.model.AcceptInquiry.Request_Inquiry != null) {
              this.TxtTell = this.model.AcceptInquiry?.Request_Inquiry?.Tell
              this.TxtComments =
                this.model.AcceptInquiry?.Request_Inquiry?.Description
              this.selectedCombo =
                this.model.AcceptInquiry?.Request_Inquiry?.CI_TypeAcceptInquiry
            } else {
              this.TxtTell = this.TxtTell =
                this.model.AcceptInquiry.RequestService_Inquiry.Tell
              this.TxtComments =
                this.model.AcceptInquiry.RequestService_Inquiry.Description
              this.selectedCombo =
                this.model.AcceptInquiry.RequestService_Inquiry.CI_TypeAcceptInquiry
            }

            // this.log({
            //   action: this.logActions.view,
            //   bizCode: "",
            //   bizCodeTitle: ""
            // })
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
    acceptBtn (isAccept, IsCloseTask) {
      if (!this.isValidForm()) return
      this.showConfirm("آیا برای تایید اطمینان دارید؟").onOk(() => {
        this.saveObj(isAccept, IsCloseTask)
      })
    },
    saveObj (IsAccept, IsCloseTask) {
      if (this.model.AcceptInquiry.Request_Inquiry) {
        if (this.selectedCombo === 2 && IsAccept === true) {
          this.model.AcceptInquiry.Request_Inquiry.IsAccept = false
          this.model.AcceptInquiry.CloseTask = false
        } else {
          this.model.AcceptInquiry.Request_Inquiry.IsAccept = IsAccept
          this.model.AcceptInquiry.CloseTask = IsCloseTask
        }
        this.model.AcceptInquiry.Request_Inquiry.CI_TypeAcceptInquiry =
          this.selectedCombo
        this.model.AcceptInquiry.Request_Inquiry.AcceptUserName =
          this.getUserDisplayName()
        this.model.AcceptInquiry.Request_Inquiry.AcceptNidUser =
          this.getNidUser()
        this.model.AcceptInquiry.Request_Inquiry.Description = this.TxtComments
      } else if (this.model.AcceptInquiry.RequestService_Inquiry) {
        if (this.selectedCombo === 2 && IsAccept === true) {
          this.model.AcceptInquiry.RequestService_Inquiry.IsAccept = false
          this.model.AcceptInquiry.CloseTask = false
        } else {
          this.model.AcceptInquiry.RequestService_Inquiry.IsAccept = IsAccept
          this.model.AcceptInquiry.CloseTask = IsCloseTask
        }
        this.model.AcceptInquiry.RequestService_Inquiry.CI_TypeAcceptInquiry =
          this.selectedCombo
        this.model.AcceptInquiry.RequestService_Inquiry.AcceptUserName =
          this.getUserDisplayName()
        this.model.AcceptInquiry.RequestService_Inquiry.AcceptNidUser =
          this.getNidUser()
        this.model.AcceptInquiry.RequestService_Inquiry.Description =
          this.TxtComments
      }

      this.showLoading()

      const payload = {
        pRequest: {
          AcceptInquiry: {
            ...this.model.AcceptInquiry
          }
        }
      }

      this.$services.excavation
        .acceptInquiry(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            debugger
            this.log({
              action: this.logActions.save,
              bizCode:
                this.model.AcceptInquiry.Request_Inquiry != null
                  ? this.model.AcceptInquiry.Request_Inquiry.NIdInquiry
                  : this.model.AcceptInquiry.RequestService_Inquiry
                    .NIdInquiryService,
              bizCodeTitle: "NIdInquiry",
              saveDesc: `تایید استعلام برای درخواست با NIdInquiry ${
                this.model.AcceptInquiry.Request_Inquiry != null
                  ? this.model.AcceptInquiry.Request_Inquiry.NIdInquiry
                  : this.model.AcceptInquiry.RequestService_Inquiry
              } انجام شد  `
            })
            this.$emit("hide")
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
    async BtnReport (data) {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`

      const queryParams = {
        NId:
          this.model.AcceptInquiry.Request_Inquiry != null
            ? this.model.AcceptInquiry.Request_Inquiry.NIdInquiry
            : this.model.AcceptInquiry.RequestService_Inquiry.NIdInquiryService,
        RequestType: "2"
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode:
          this.model.AcceptInquiry.Request_Inquiry != null
            ? this.model.AcceptInquiry.Request_Inquiry.NIdInquiry
            : this.model.AcceptInquiry.RequestService_Inquiry.NIdInquiryService,
        bizCodeTitle: "NIdInquiry"
      })
    },
    showArchive () {
      this.showUArchiveInquiry = true
    }
  }
}
</script>
