<template>
  <fit>
    <safa-form
      :id="formKey"
      :caption="title"
      appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    >
      <form-wrapper vertical :title="title">
        <template #header>
          <safa-status :result="getAllCommissionDetailsRes" />
          <safa-status :result="saveCommissionLegalProxyRes" />
        </template>
        <fit>
          <FormRow class="q-mb-sm">
            <FormControl>
              <!-- ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber   Commission_LegalProxy.NoticeDate-->
              <safa-datepicker
                v-model="
                  dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeDate
                "
                cdcName="NoticeDate"
                label="تاریخ رأی"
                label-width="100px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                v-model="
                  dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
                    .LetterDate
                "
                cdcName="LetterDate"
                label="تاریخ نامه منطقه"
                label-width="100px"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="
                  dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeNumber
                "
                cdcName="NoticeNumber"
                label="شماره رأی"
                label-width="100px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                v-model="
                  dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
                    .LetterNumber
                "
                cdcName="LetterNumber"
                type="number"
                label="شماره نامه منطقه"
                label-width="100px"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <nosazi-code-input
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
                m="r"
              />
            </FormControl>
          </FormRow>
          <!-- helper="requestJudicialRepresentation" -->
          <safa-datatable
            title="اجرای رای"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            v-model="grdTrepass"
            cdcName="grdTrepass"
            helper="requestJudicialRepresentation"
            :m="mode"
            :add-row="false"
            :allow-copy="false"
            :delete-row="false"
            :show-row-number="false"
            :selectable="false"
          />
          <q-file
            ref="fileUploader"
            :value="selectedFile"
            @input="fileChangeEvent"
            v-show="false"
          />
        </fit>
        <template #footer>
          <form-actions
            :m="mode"
            @edit="isEditable = true"
            @cancel="isEditable = false"
            @save="btnAcceptClick"
          >
            <template v-slot:after>
              <btn-save @click="btnUploadFileClick" label="بارگذاری فایل" />
            </template>
          </form-actions>
        </template>
      </form-wrapper>
    </safa-form>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import { currentDate, currentTime } from "src/utils/index"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "تقاضای نیابت قضایی",
      name: "URequestJudicialRepresentation",
      formKey: "26E7876C-210C-4D2D-93EF-16DEA5DA4544",
      main: true,

      grdTrepass: [],
      dataContext: {
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {
            NoticeNumber: ""
          }
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
      selectedFile: null,
      isView: false,

      // Responses
      getAllCommissionDetailsRes: null,
      saveCommissionLegalProxyRes: null
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      const payload = {
        PRequest: { NIDCommission: this.selectedNidCommission }
      }
      this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data: args }) => {
          this.getAllCommissionDetailsRes = this.getResponse(args)

          if (this.getAllCommissionDetailsRes.success) {
            this.dataContext =
              this.getAllCommissionDetailsRes.data.GetAllCommissionDetailsResult

            this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate = this.getAllCommissionDetailsRes.data.GetAllCommissionDetailsResult.Commission_VoteTrepasses[0].VoteDate
            this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber = this.getAllCommissionDetailsRes.data.GetAllCommissionDetailsResult.Commission_VoteTrepasses[0].VoteNo

            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.dataContext.CommissionInfo.CodeString
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.dataContext.CommissionInfo.CodeString,
                bizCodeTitle: "NosaziCode",
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
            if (
              this.dataContext?.ClsCommission_ExecutTrackingVote
                ?.Commission_ExecuteTracking &&
              this.dataContext.ClsCommission_ExecutTrackingVote
                .Commission_ExecuteTracking.length > 0
            ) {
              this.dataContext.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking.forEach(
                (items) => {
                  this.dataContext.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
                    (tmp) => {
                      if (items.NidVT === tmp.NidVT) {
                        tmp.CI_ExecuteMainVote = items.CI_ExecuteMainVote
                        tmp.CI_ExecuteSubsidiaryVote =
                          items.CI_ExecuteSubsidiaryVote

                        tmp.ExecuteVoteComments = items.ExecuteVoteComments
                        tmp.ExecuteVoteDate = items.ExecuteVoteDate
                        tmp.ExecuteVoteDesc = items.ExecuteVoteDesc
                        tmp.ExecuteVoteValue = parseFloat(
                          items.ExecuteVoteValue
                        )
                        tmp.NidCommission = items.NidCommission
                        tmp.NidVT = items.NidVT
                      }
                    }
                  )
                }
              )
            }
            this.grdTrepass =
              this.dataContext.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    btnAcceptClick () {
      if (
        !this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
          .LetterDate
      ) {
        this.showError("تاریخ نامه وارد نشده است.")
        return false
      } else if (
        !this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
          .LetterNumber
      ) {
        this.showError("شماره نامه وارد نشده است.")
        return false
      }

      this.showLoading()

      this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.NidCommission =
        this.selectedNidCommission
      if (
        !this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy
          .CreateUserId
      ) {
        this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.CreateUserId =
          this.getNidUser()
        this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.CreateDate =
          currentDate()
        this.dataContext.ClsCommission_LegalProxy.Commission_LegalProxy.CreateTime =
          currentTime()
      }
      const payload = {
        pRequest: {
          ClsCommission_LegalProxy: this.dataContext.ClsCommission_LegalProxy
        }
      }

      this.$services.commissions
        .saveCommissionLegalProxy(payload)
        .then(async ({ data: args }) => {
          this.saveCommissionLegalProxyRes = this.getResponse(args)

          if (this.saveCommissionLegalProxyRes.success) {
            this.isEditable = false
            this.showSuccess("ذخیره با موفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission ?? '',
              bizCodeTitle: "NidCommission",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.loadObj()
          }
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async monitoringLog () {
      await this.log({
        action: this.logActions.save,
        bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
        bizCodeTitle: "کد نوسازی"
      })
    },

    btnUploadFileClick () {
      this.$refs.fileUploader.pickFiles()
    },

    fileChangeEvent (file) {
      if (file) this.selectedFile = file
    }
  },

  async created () {
    if (
      !(await this.canOpenWindow("", { closeForm: false, redirect: false }))
    ) {
      return false
    }
    this.loadObj()
  }
}
</script>
