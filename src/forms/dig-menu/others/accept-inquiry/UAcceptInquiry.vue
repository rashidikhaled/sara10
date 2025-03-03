<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="375C0F92-A167-4AA4-BFD4-FD32D9A93902"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <div class="q-mb-sm">
          <safa-notice>
            مهلت پاسخگوئی به استعلام بر اساس مصوبه مورخ 94/5/25 کمیسیون نحوه
            هماهنگی و صدور مجوز حفاری ، حداکثر 15 روز می باشد . در صورت عدم پاسخ
            در مهلت مقرر امکان ارسال پرونده به شهرداری میسر و مسؤلیت عواقب آن بر
            عهده شرکت مخاطب استعلام خواهد بود .
          </safa-notice>
        </div>
        <div class="q-mb-sm">
          <safa-notice>
            مهلت پاسخگوئی به استعلام مجدد ، حداکثر 5 روز می باشد . در صورت عدم
            پاسخ در مهلت مقرر امکان ارسال پرونده به شهرداری میسر و مسؤلیت عواقب
            آن بر عهده شرکت مخاطب استعلام خواهد بود .
          </safa-notice>
        </div>
        <div class="q-mb-sm" v-if="showTxtdesc">
          <safa-notice> درج توضیحات الزامی میباشد. </safa-notice>
        </div>
        <div class="q-mb-sm">
          <span class="color-green" v-if="textColor === 'Green'">TxtSubject </span>
          <span class="color-red" v-if="textColor === 'Red'">TxtSubject</span>
          <span class="color-orange" v-if="textColor === 'Orange'">TxtSubject</span>
        </div>
        <div class="q-mb-sm"  v-if="showTxtMessage">
          <safa-notice>
            توجه : پرونده پس از ذخیره توضیحات در کارتابل تایید پاسخ استعلام
            تاسیسات قرار می گیرد.
          </safa-notice>
        </div>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="نوع پاسخ"
              ciName="CI_TypeAcceptInquiry"
              label-width="80px"
              v-model="model.RequestService_Info.CI_TypeAcceptInquiry"
              cdcName="CI_TypeAcceptInquiry"
              :m="m"
              domain-name="Dig"
              @input="comboCITypeAcceptInquirySelectionChanged"
              ref="ciTypeAcceptInquiryRef"
            />
          </FormControl>
        </FormRow>
        <text-template
          label-width="80px"
          v-model="model.AcceptInquiry.Request_Inquiry.Description"
          cdcName="Description"
          type="textarea"
          :rows="3"
          :m="m"
        />
      </fit>
      <template v-slot:footer>
        <div class="q-gutter-sm">
          <btn-default label="ذخیره توضیحات" @click="saveClick"></btn-default>
          <btn-default label="پیش نمایش" @click="previewClick"></btn-default>
          <btn-default
            label="تایید نهایی پاسخ"
            @click="acceptClick1"
          ></btn-default>
          <btn-default label="تداخل با طرح" @click="cancelClick1"></btn-default>
          <btn-default
            label="پیوست مدارک"
            @click="archiveClick"
            v-if="false"
          ></btn-default>
        </div>
      </template>
      <safa-popup
        v-model="isShowcalcAndExportModal"
        height="320px"
        title="آرشیو"
        width="450px"
        v-if="showArchive"
      >
        <ArchiveWrap
          :name="archiveConfig.username"
          :pass="archiveConfig.password"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      name: "UAcceptInquiry",
      title: "پاسخ استعلام",
      formKey: "B33E3849-71C0-435C-AECF-E5232FF3A907",
      main: true,
      workflowCompatible: true,

      // #variabels
      model: {
        RequestService_Info: { CI_TypeAcceptInquiry: 0 },
        AcceptInquiry: { Request_Inquiry: { Description: "" } }
      },
      IsCloseTask: false,
      TxtSubject: null,
      showTxtDesc: null,
      showTxtMessage: null,
      TxtComments: "",
      OldValueDesc: "",
      OldValueTyprInquiry: "",
      TxtTell: "",
      showArchive: false,
      textColor: "Green",

      // #services
      getAcceptInquiryRes: null,
      acceptInquiryRes: null
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    loadObj () {
      let payload = {
        pRequest: {
          NIdTask: this.selectedRequest?.NidTask,
          NidProc: this.selectedRequest?.NidProc,
          NIdRequest: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.showTxtMessage = true
      this.NidWorkItem = this.taskInfo?.NidWorkItem
      this.showLoading()
      this.$services.excavation
        .getAcceptInquiry(payload)
        .then(async ({ data }) => {
          this.getAcceptInquiryRes = this.getResponse(data)
          debugger
          if (this.getAcceptInquiryRes.success) {
            this.model = this.getAcceptInquiryRes.data.GetAcceptInquiryResult
            if (this.model.AcceptInquiry.Request_Inquiry !== null) {
              this.TxtComments =
                this.model.AcceptInquiry.Request_Inquiry.Description
              this.OldValueDesc =
                this.model.AcceptInquiry.Request_Inquiry.Description
              this.model.RequestService_Info.CI_TypeAcceptInquiry =
                parseInt(
                  this.model.AcceptInquiry.Request_Inquiry.CI_TypeAcceptInquiry.toString()
                ) === 3
                  ? 2
                  : parseInt(
                    this.model.AcceptInquiry.Request_Inquiry.CI_TypeAcceptInquiry.toString()
                  )
              this.OldValueTyprInquiry =
                this.$refs.ciTypeAcceptInquiryRef.selectedItem.Title
            } else if (
              this.model.AcceptInquiry.RequestService_Inquiry !== null
            ) {
              this.TxtComments =
                this.model.AcceptInquiry.RequestService_Inquiry.Description
              this.OldValueDesc =
                this.model.AcceptInquiry.RequestService_Inquiry.Description
              this.model.RequestService_Info.CI_TypeAcceptInquiry =
                parseInt(
                  this.model.AcceptInquiry.RequestService_Inquiry.CI_TypeAcceptInquiry.toString()
                ) === 3
                  ? 2
                  : parseInt(
                    this.model.AcceptInquiry.RequestService_Inquiry.CI_TypeAcceptInquiry.toString()
                  )
              this.OldValueTyprInquiry =
                this.$refs.ciTypeAcceptInquiryRef.selectedItem.Title
            }
            this.TxtTell = `("تلفن درخواست دهنده : {0}", ${this.model.AcceptInquiry.Tell})`

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} نمایش داده شد.`
            })
          }
          // ApplicationCommon.ClsCommon.FrmTaskList.LoadObj();
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj (IsAccept, IsCloseTask) {
      const payload = {
        pRequest: {
          AcceptInquiry: this.model.AcceptInquiry
        }
      }
      let DoNotSaveFullUserNameInInquiry =
        window.getConfigValue("esupParams")?.ClsDigParams
          ?.DoNotSaveFullUserNameInInquiry ?? false
      if (this.model.RequestService_Info.CI_TypeAcceptInquiry > 0) {
        if (this.model.RequestService_Info.CI_TypeAcceptInquiry !== 3) {
          if (this.TxtComments === null) {
            this.showError("توضیحات استعلام نمی تواند خالی باشد")
            return
          }
        }
      } else {
        this.showError("نوع پاسخ استعلام نمی تواند نامشخص باشد")
        return
      }

      this.showLoading()
      this.$services.excavation
        .acceptInquiry(payload)
        .then(async ({ data }) => {
          this.acceptInquiryRes = this.getResponse(data)
          if (this.acceptInquiryRes.success) {
            if (this.model.AcceptInquiry.Request_Inquiry !== null) {
              this.model.AcceptInquiry.Request_Inquiry.Description =
                this.TxtComments
              if (
                this.model.RequestService_Info.CI_TypeAcceptInquiry === 2 &&
                IsAccept === true
              ) {
                this.model.AcceptInquiry.Request_Inquiry.IsAccept = false
              } else {
                this.model.AcceptInquiry.Request_Inquiry.IsAccept = IsAccept
              }
              try {
                if (DoNotSaveFullUserNameInInquiry) {
                  let tmpUserName =
                    this.currentUser.FirstName +
                    " " +
                    this.currentUser.LastName
                  this.model.AcceptInquiry.Request_Inquiry.AcceptUserName =
                    tmpUserName
                } else {
                  this.model.AcceptInquiry.Request_Inquiry.AcceptUserName =
                    this.currentUser.UserName
                }
              } catch (e) {
                this.model.AcceptInquiry.Request_Inquiry.AcceptUserName =
                  this.currentUser.UserName
              }
              this.model.AcceptInquiry.Request_Inquiry.AcceptNidUser =
                this.getNidUser().toString()
              this.TmpID =
                this.model.AcceptInquiry.Request_Inquiry.CI_RedirectName
            } else if (
              this.model.AcceptInquiry.RequestService_Inquiry !== null
            ) {
              this.model.AcceptInquiry.RequestService_Inquiry.Description =
                this.TxtComments
              if (
                this.model.AcceptInquiry.Request_Inquiry
                  .CI_TypeAcceptInquiry === 2 &&
                IsAccept === true
              ) {
                this.model.AcceptInquiry.RequestService_Inquiry.IsAccept = false
              } else {
                this.model.AcceptInquiry.RequestService_Inquiry.IsAccept =
                  IsAccept
              }

              try {
                if (DoNotSaveFullUserNameInInquiry) {
                  let tmpUserName =
                    this.currentUser.FirstName +
                    " " +
                    this.currentUser.LastName
                  this.model.AcceptInquiry.RequestService_Inquiry.AcceptUserName =
                    tmpUserName
                } else {
                  this.model.AcceptInquiry.RequestService_Inquiry.AcceptUserName =
                    this.currentUser.UserName
                }
              } catch (e) {
                this.model.AcceptInquiry.RequestService_Inquiry.AcceptUserName =
                  this.currentUser.UserName
              }
              this.model.AcceptInquiry.RequestService_Inquiry.AcceptNidUser =
                this.getNidUser().toString()
              this.model.AcceptInquiry.CloseTask = IsCloseTask
            }
            this.loadObj()
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `برای شماره در خواست ${this.selectedRequest.NidWorkItem}  اطلاعات فرم ${this.title} ذخیره شد.`
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
    acceptClick1 () {
      this.showConfirm("آیا برای تایید اطمینان دارید؟").onOk(async () => {
        this.saveObj(true, true)
      })
    },
    async reportHandler () {
      const reportPath = `${window.getConfigValue('dig.digReportPath')}/RptShowInquiry`
      const queryParams = {
        NId:
          this.model.AcceptInquiry.Request_Inquiry.NIdInquiry !== null
            ? this.model.AcceptInquiry.Request_Inquiry.NIdInquiry.toString()
            : this.model.AcceptInquiry.RequestService_Inquiry.NIdInquiryService.toString(),
        RequestType: "2" // این قسمت ااز زمل به صورت هارد کد قرار داده شده
      }
      await this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.selectedRequest.NIdWorkItem,
        bizCodeTitle: "NIdWorkItem"
      })
    },
    cancelClick1 () {
      this.showConfirm("آیا برای ادامه اطمینان دارید؟").onOk(async () => {
        this.saveObj(false, this.IsCloseTask)
      })
    },
    archiveClick () {
      this.showArchive = true
    },
    comboCITypeAcceptInquirySelectionChanged () {
      if (this.TxtSubject !== null) {
        this.TxtSubject = ""
        let TmpSelect = this.model.RequestService_Info.CI_TypeAcceptInquiry
        if (TmpSelect !== null) {
          switch (TmpSelect) {
            case 1: {
              this.TxtSubject =
                "محل اجرای حفاری برابر استعلام مأخوذه مورد تایید است."
              this.showTxtDesc = true
              if (this.ShowAcceptClick1 === false) {
                this.showTxtMessage = true
              } else {
                this.showTxtMessage = false
              }
              this.textColor = "Green"
              break
            }
            case 2: {
              this.TxtSubject =
                "محل اجرای حفاری با تاسیسات این شرکت تداخل داشته و امکان اجرا وجود ندارد."
              this.showTxtDesc = true
              this.showTxtMessage = true
              this.textColor = "Red"

              break
            }
            case 3: {
              this.TxtSubject.Text =
              "محل اجرای حفاری نیاز به بررسی مجدد توسط درخواست کننده دارد (به توضیحات در خواست مراجعه شود)."
              this.showTxtDesc = false
              this.showTxtMessage = false
              this.textColor = "Orange"
            }
          }
        }
      }
    },
    saveClick () {
      this.saveObj(null, false)
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  }
}
</script>
