<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
    :padding="true"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getFilInfoRes" />
        <safa-status :result="getConfirmStartWorkRes" />
        <safa-status :result="calculateEngineerRes" />
        <safa-status :result="saveFilConfirmRes" />
        <safa-status :result="setFillInfoConfirmStartWorkRes" />
        <safa-status :result="cancelStartWorkRes" />
      </template>

      <fit>
        <internal-section
          title="اطلاعات پرونده"
          class="q-mb-md"
          v-if="filInfoShow"
        >
          <FormRow :sm="3" :md="3" :lg="3">
            <FormControl>
              <safa-text
                label="شماره ارجاع"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.NidWorkItem"
              />
            </FormControl>

            <FormControl class="col-8">
              <nosazi-code-input
                label="کد نوسازی"
                label-width="100px"
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="دبیرخانه شهرداری"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.StrNoTownDabir"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="منطقه"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_Region"
                domainName="engineer"
                ciName="CI_Region"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="نوع درخواست"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_RequestType"
                domainName="engineer"
                ciName="CI_RequestType"
              />
            </FormControl>

            <FormControl>
              <safa-datepicker
                label="تاریخ درخواست"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.EnterDate"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="کاربری ملک"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_UsingType"
                domainName="engineer"
                ciName="CI_UsingType"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="نوع سازه"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_SazehType"
                domainName="engineer"
                ciName="CI_SazehType"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="مرحله ساختمانی"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_ConstructionStage"
                domainName="engineer"
                ciName="CI_ConstructionStage"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="زیربنا"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.infrastructure"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="تعداد سقف"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.Floor"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="شهر"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_City"
                domainName="engineer"
                ciName="CI_City"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="نوع پرونده"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_FilesType"
                domainName="engineer"
                ciName="CI_FilesType"
              />
            </FormControl>

            <FormControl>
              <safa-datepicker
                label="تاریخ تشکیل پرونده"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.FileDate"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="زیرزمین"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.Underground"
              />
            </FormControl>

            <FormControl>
              <safa-combo
                label="سال کاری"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.CI_Years"
                domainName="engineer"
                ciName="CI_Years"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="کد پرونده مادر"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.MotherCode"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="کد رهگیری شهرداری"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.UrbanNidKartablItem"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="پلاک ثبتی"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.RegisterPlack"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="شماره مجوز"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.ExportLicenseNo"
              />
            </FormControl>

            <FormControl>
              <safa-text
                label="تاریخ مجوز"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.ExportLicenseDate"
              />
            </FormControl>

            <FormControl>
              <safa-datepicker
                label="تاریخ بایگانی دائم"
                label-width="100px"
                m="r"
                v-model="context.ClsFil_Info.Fil_Info.PermanentKartablDate"
              />
            </FormControl>

            <FormControl class="flex items-center q-gutter-x-sm">
              <safa-label>
                آیا ساختمان نیاز به اجرای سازه نگهبان دارد؟
              </safa-label>

              <safa-radio
                label="بلی"
                :val="true"
                v-model="forSazeNegahbanSecurity"
              />
              <safa-radio
                label="خیر"
                :val="false"
                v-model="forSazeNegahbanSecurity"
              />
            </FormControl>
          </FormRow>
        </internal-section>

        <safa-datatable
          title="مشخصات مالک"
          fit
          class="fit"
          min-height="400px"
          height="100%"
          max-height="100%"
          v-model="context.ClsFil_Info.Fil_Owner"
          helper="fil_OwnerColumns"
          m="r"
          paginate
          :take="20"
          :pageSize="20"
          :addRow="false"
          :allowCopy="false"
          :deleteRow="false"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          :showRowNumber="false"
        />
      </fit>
      <template v-slot:footer>
        <form-actions :showEditButton="false">
          <template #before>
            <!-- دسترسی های سکوریتی برای این دکمه ها هم باید اضافه شود #todo -->

            <btn-default
              v-show="btnOkShow"
              label="تایید پروانه"
              @click="btnOkClick"
            />

            <btn-default label="گزارش" @click="btnReportClick" />

            <btn-default
              label="گزارش شروع به کار"
              @click="btnStartReportClick"
            />

            <btn-default
              label="تایید شروع به کار"
              @click="btnStartConfirmClick"
              :disabled="isBtnStartConfirmDisabled"
            />
            <btn-default
              label="ابطال شروع به کار"
              @click="btnStartCancelClick"
            />

            <safa-label v-show="stOpShow" class="StOp q-ml-sm">
              این پرونده نیاز به تایید شما دارد
            </safa-label>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

// Utils
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],

  data () {
    return {
      title: "دبیرخانه مهندسین",
      formKey: "30437EFF-0606-4721-AD12-7B8B320CA0AA",
      name: "USecretariatOfEngineers",
      main: true,

      // Response
      getFilInfoRes: null,
      getConfirmStartWorkRes: null,
      calculateEngineerRes: null,
      saveFilConfirmRes: null,
      setFillInfoConfirmStartWorkRes: null,
      cancelStartWorkRes: null,

      // Models
      context: {
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",

        ClsFil_Confirm: {},
        ClsFil_Info: {
          Fil_Info: {}
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
      stOpShow: true,
      forSazeNegahbanSecurity: false,

      // Internal Sections
      filInfoShow: true,

      // Form Action Buttons
      btnOkShow: true,
      isBtnStartConfirmDisabled: false
    }
  },

  mounted () {
    if (this.canOpenWindow()) this.loadObj()
    // setTimeout(() => {
    // }, 250)
    // clearTimeout()
  },

  methods: {
    async loadObj () {
      if (!this.selectedExecRep || this.selectedExecRep.NIdFil === "00000000-0000-0000-0000-000000000000") return this.showError("شماره پرونده موجود نیست.")
      this.context.NidFil = this.selectedExecRep.NIdFil
      this.context.NidEng = this.getNidUser()
      try {
        this.$q.loading.show()
        const { data } = await this.$services.engineers.getFilInfo({
          pRequest: {
            NidFil: this.context.NidFil,
            NidEng: this.context.NidEng
          }
        })
        this.getFilInfoRes = this.getResponse(data)
        if (this.getFilInfoRes.success) {
          const res = this.getFilInfoRes.data.GetFil_InfoResult
          this.context.ClsFil_Info = res.ClsFil_Info
          this.context.ClsFil_Confirm = res.ClsFil_Confirm
          if (this.context.ClsFil_Info.Fil_Info.HasSupportedStructure ?? false) {
            this.forSazeNegahbanSecurity = true
          } else this.forSazeNegahbanSecurity = false
          this.baseNosaziCode = convertStringToNosaziCodeObject(this.context.ClsFil_Info.Fil_Info.CodeString)
          if (this.context?.ClsFil_Confirm?.Fil_Confirm?.ConfirmStartDate) {
            this.stOpShow = false
            this.btnOkShow = false
          }
          await this.onLoad()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.$q.loading.hide()
      }
    },

    async onLoad () {
      const results = await Promise.allSettled([
        this.calculateEngineer(),
        this.getConfirmStartWork()
      ])
      if (results[0].status === "fulfilled") {
        this.context.ClsFil_Info.Fil_Info.PermanentKartablDate = results[0].value?.DtoEngineer?.Sh_RequestInfo?.PermanentKartablDate ?? ''
      }
      if (results[1].status === "fulfilled") {
        if (results[1].value.ConfirmStartWorkInfo !== null) {
          this.isBtnStartConfirmDisabled = results[1].value.ConfirmStartWorkInfo.IsConfirmed ?? false
        }
      }
    },

    calculateEngineer () {
      return new Promise(async (resolve, reject) => {
        const { data } = await this.$services.SC.calculateEngineer(
          {
            pNidProc: this.context.ClsFil_Info.Fil_Info.NidProc || "00000000-0000-0000-0000-000000000000",
            pUser: this.currentUser,
            pDtoWorkflowData: {
              UserGuid: this.getNidUser(),
              UserName: this.currentUser.FullName
            }
          },
          { config: { District: this.baseNosaziCode.District } })
        this.calculateEngineerRes = this.getResponse(data)
        if (this.calculateEngineerRes.success) {
          return resolve(this.calculateEngineerRes.data)
        } else {
          return reject(data)
        }
      })
    },
    getConfirmStartWork () {
      return new Promise(async (resolve, reject) => {
        const { data } = await this.$services.engineers.getConfirmStartWork({
          NidFil: this.context.NidFil,
          NidEng: this.context.NidEng
        })
        this.getConfirmStartWorkRes = this.getResponse(data)
        if (this.getConfirmStartWorkRes.success) {
          return resolve(this.getConfirmStartWorkRes.data.GetConfirmStartWorkResult)
        } else {
          return reject(data)
        }
      })
    },

    btnOkClick () {
      this.showLoading()

      const payload = {
        pRequest: {
          ClsFil_Confirm: this.context.ClsFil_Confirm,
          NidFil: this.context.NidFil,
          NidEng: this.context.NidEng
        }
      }

      this.$services.engineers
        .saveFilConfirm(payload)
        .then(({ data: args }) => {
          this.saveFilConfirmRes = this.getResponse(args)

          if (
            this.saveFilConfirmRes.data.SaveFil_ConfirmResult?.ClsFil_Confirm
              ?.ErrorResult?.BizErrors !== null &&
            !this.saveFilConfirmRes.data.SaveFil_ConfirmResult.ClsFil_Confirm.ErrorResult.BizErrors.some(
              (p) => p.ErrorAction === 0
            )
          ) {
            this.stOpShow = false
            this.btnOkShow = false
          }
        })
        .catch((error) => {
          console.error(error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })

      this.context.ClsFil_Confirm.NIdFil = this.context.NidFil
      this.context.ClsFil_Confirm.NIdEng = this.context.NidEng
      this.context.ClsFil_Confirm.Fil_Confirm.NIdFil = this.context.NidFil
      this.context.ClsFil_Confirm.Fil_Confirm.NIdEng = this.context.NidEng
    },

    btnReportClick () {
      // const reportPath = "/Engineers/RptLicenseConfirm"
      const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptLicenseConfirm`
      const queryParams = {
        NidFil: this.context.NidFil,
        NidEng: this.context.NidEng
      }
      this.showReport(reportPath, queryParams)
    },

    btnStartReportClick () {
      // const reportPath = "/Engineers/RptStartWork"
      const reportPath = `${window.getConfigValue('engineersConfig.reportPath')}/RptStartWork`
      const queryParams = {
        NidFil: this.context.NidFil,
        NidEng: this.context.NidEng
      }
      this.showReport(reportPath, queryParams)
    },

    btnStartConfirmClick () {
      this.showConfirm("از تایید شروع به کار خود مطمئن هستید؟").onOk(() => {
        this.showLoading()

        const payload = {
          NidFil: this.context.NidFil,
          NidEng: this.context.NidEng,
          IsConfirmStartWork: true,
          HasSupportedStructure: this.forSazeNegahbanSecurity
        }

        this.$services.engineers
          .setFillInfoConfirmStartWork(payload)
          .then(({ data }) => {
            this.setFillInfoConfirmStartWorkRes = this.getResponse(data)

            if (this.setFillInfoConfirmStartWorkRes.success) {
              this.isBtnStartConfirmDisabled = true
              this.showSuccess("عملیات با موفقیت انجام شد")
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    btnStartCancelClick () {
      this.showConfirm("از ابطال شروع به کار خود مطمئن هستید؟").onOk(() => {
        this.showLoading()

        const payload = {
          NidFil: this.context.NidFil,
          NidEng: this.context.NidEng
        }

        this.$services.engineers
          .cancelStartWork(payload)
          .then(({ data }) => {
            this.cancelStartWorkRes = this.getResponse(data)
            if (this.cancelStartWorkRes.success) {
              this.showSuccess("عملیات با موفقیت انجام شد")
            }
          })
          .catch((error) => {
            console.error(error)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>

<style lang="scss">
.StOp {
  color: #975625;
  font-size: 14px;
  font-weight: 600;
  animation: StOp__ripple 2s infinite linear;
}

@keyframes StOp__ripple {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
