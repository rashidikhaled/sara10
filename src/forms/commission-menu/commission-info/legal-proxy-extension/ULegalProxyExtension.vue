<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper vertical :title="title">
      <template #header>
        <safa-status :result="getAllCommissionDetailsRes" />
        <safa-status :result="saveCommissionLegalProxyExtensionRes" />
        <safa-status :result="getCommissionInfoByNidVoteRes" />
        <safa-status :result="addProxyExtensionToArchiveReportRes" />
        <safa-status :result="deleteProxyExtensionDataFileRes" />
        <safa-status :result="deleteCommissionLegalProxyExtensionRes" />
        <safa-status :result="saveCommissionLegalProxyRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
          :actions="false"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <!-- ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber   Commission_LegalProxy.NoticeDate-->
            <safa-datepicker
              v-model="
                model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate
              "
              cdcName="NoticeDate"
              label="تاریخ رأی"
              label-width="90px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="
                model.ClsCommission_LegalProxy.Commission_LegalProxy
                  .NoticeNumber
              "
              cdcName="NoticeNumber"
              label="شماره رأی"
              label-width="90px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="
                model.ClsCommission_LegalProxy.Commission_LegalProxy.LetterDate
              "
              cdcName="LetterDate"
              label="تاریخ نامه منطقه"
              label-width="90px"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="
                model.ClsCommission_LegalProxy.Commission_LegalProxy
                  .LetterNumber
              "
              cdcName="LetterNumber"
              type="number"
              label="شماره نامه منطقه"
              label-width="90px"
              :m="mode"
            />
          </FormControl>
        </FormRow>
        <safa-splitter class="fit" margin="0" vertical v-model="gridSplitter">
          <template v-slot:before>
            <!-- helper="requestJudicialRepresentation" -->
            <safa-grid
              title="اجرای رای"
              v-model="grdTrepass"
              cdcName="grdTrepass"
              :columns="grdTrepassColumns"
              fit
              :m="mode"
              paginate
            />
          </template>
          <template #after>
            <safa-grid
              title="لیست عملیات"
              v-model="grdExtension"
              cdcName="grdExtension"
              :columns="grdExtensionColumns"
              fit
              :m="mode"
              paginate
            />
          </template>
        </safa-splitter>

        <FormRow class="q-mt-sm">
          <FormControl>
            <safa-datepicker
              v-model="letterDate"
              cdcName="letterDate"
              label="تاریخ نامه"
              label-width="90px"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="letterNumber"
              cdcName="letterNumber"
              type="number"
              label="شماره نامه"
              label-width="90px"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="fromDate"
              cdcName="fromDate"
              label="از تاریخ"
              label-width="90px"
              m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="toDate"
              cdcName="toDate"
              label="تا تاریخ"
              label-width="90px"
              m="r"
            />
          </FormControl>
        </FormRow>
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
          :showEditButton="!isConfirmLegalProxy && isEditable"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="BtnSave_Click"
        >
          <template v-slot:after>
            <btn-save
              label="ایجاد"
              @click="BtnCreate_Click"
              :disabled="!isConfirmLegalProxy"
              v-if="!isEditable"
            />
            <btn-default
              label="صدور تمدید نیابت قضایی"
              @click="BtnAccept_Click"
              spId="ecdeacca-786c-48a7-aad9-00d715e8b175"
              spCaption="دکمه صدور تمدید نیابت قضایی"
              :disabled="isConfirmLegalProxy"
            />
            <btn-default
              label="ابطال تمدید نیابت قضایی"
              @click="BtnCancel_Click"
              spId="6d8ebc51-76cd-441d-81a3-c4e6805af1bf"
              spCaption="دکمه ابطال تمدید نیابت قضایی"
              :disabled="isConfirmLegalProxy"
              color="primary"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

import PersianDate from "persian-date"
import { currentDate, currentTime } from "src/utils/index"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],

  data () {
    return {
      title: "تمدید نیابت قضایی",
      name: "ULegalProxyExtension",
      formKey: "0F98C7E0-31BA-4B5D-B354-1FA2785A1131",
      main: true,
      sidebarCompatible: false,
      workflowCompatible: true,

      // #region services
      getAllCommissionDetailsRes: null,
      saveCommissionLegalProxyExtensionRes: null,
      getCommissionInfoByNidVoteRes: null,
      addProxyExtensionToArchiveReportRes: null,
      deleteProxyExtensionDataFileRes: null,
      deleteCommissionLegalProxyExtensionRes: null,
      saveCommissionLegalProxyRes: null,

      // #region variables
      gridSplitter: 50,
      isConfirmLegalProxy: false,
      grdTrepass: [],
      grdExtension: [],
      model: {
        Commission_LegalProxyExtension: null,
        ClsCommission_LegalProxy: {
          Commission_LegalProxy: {
            NoticeNumber: ""
          },
          Commission_LegalProxyExtensions: []
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
      letterDate: "",
      letterNumber: "",
      grdTrepassColumns: [
        {
          field: "Id",
          title: "کد تخلف",
          width: "100px"
        },
        {
          field: "Title",
          title: "عنوان تخلف",
          width: "160px"
        },
        {
          field: "CI_TrepassType_Group",
          title: "نوع تخلف",
          width: "100px"
        },
        {
          field: "CI_Years",
          title: "سال تخلف",
          width: "100px"
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ تخلف",
          width: "100px"
        },
        {
          field: "TrepassValue",
          title: "مقدار تخلف",
          width: "100px"
        },
        {
          field: "Floor",
          title: "طبقه تخلف",
          width: "100px"
        },
        {
          field: "UsingGroupTitle",
          title: "کاربری اصلی موجود",
          width: "120px"
        },
        {
          field: "UsingTitle",
          title: "کاربری فرعی موجود",
          width: "120px"
        },
        {
          field: "CI_UsingGroup",
          title: "کاربری اصلی مجاز",
          width: "120px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_UsingGroup"
        },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          width: "100px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_VoteType"
        },
        {
          field: "CommissionText",
          title: "شماره کمیسیون",
          width: "100px"
        },
        {
          ciName: "CI_CommissionType",
          domain: "Commission100",
          editor: "combo",
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          width: "100px"
        },
        {
          field: "VoteNo",
          title: "شماره رای",
          width: "120px"
        },
        {
          ciName: "CI_VoteType",
          domain: "Commission100",
          editor: "combo",
          field: "CI_VoteType",
          title: "عنوان رای",
          width: "120px"
        },
        {
          field: "VoteValue",
          title: "مقدار راي",
          width: "120px"
        },
        {
          field: "UrbanNidKartablItem",
          title: "شماره ارجاع",
          width: "100px"
        },
        {
          field: "VoteDate",
          title: "تاریخ راي",
          width: "100px"
        },
        {
          field: "UsingGroupType",
          title: "شرح راي",
          width: "100px"
        },
        {
          ciName: "CI_ExecuteMainVote",
          domain: "Commission100",
          editor: "combo",
          field: "CI_ExecuteSubsidiaryVote",
          title: "نتیجه اجرای رای(اصلی)/نتیجه اجرای رای",
          width: "220px"
        },
        {
          field: "ExecuteVoteValue",
          title: "مقدار اجرا (متر)",
          width: "90px"
        },
        {
          field: "ExecuteVoteDate",
          title: "تاریخ اقدام",
          width: "100px"
        },
        {
          field: "ExecuteVoteComments",
          title: "شماره",
          width: "100px"
        },
        {
          field: "ExecuteVoteDesc",
          title: "توضیحات",
          width: "180px"
        }
      ],
      grdExtensionColumns: [
        {
          field: "Title",
          title: "نوع عملیات",
          width: "200px"
        },
        {
          field: "OrderNumber",
          title: "شماره صدور دستور",
          width: "120px"
        },
        {
          field: "OrderDate",
          title: "تاریخ ایجاد",
          width: "100px"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ صدور",
          width: "100px"
        },
        {
          field: "CreateUsername",
          title: "کاربر ایجاد کننده",
          width: "180px"
        },
        {
          field: "ValidFromDate",
          title: "مدت اعتبار از تاریخ",
          width: "120px"
        },
        {
          field: "ValidTillDate",
          title: "مدت اعتبار تا تاریخ",
          width: "120px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "300px"
        },
        {
          field: "IsRemovable",
          title: "حذف",
          editor: "action",
          width: "80px",
          //   lockPosition: true,
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0,
            color: "red"
          },
          btnTitle: "حذف",
          btnIcon: "delete",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.handleIsRemovable(params)
        },
        {
          field: "IsPrintable",
          title: "چاپ",
          editor: "action",
          width: "80px",
          //   lockPosition: true,
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0,
            color: "blue"
          },
          btnTitle: "چاپ",
          btnIcon: "print",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.handleIsPrintable(params)
        }
      ],
      fromDate: "",
      toDate: ""
    }
  },

  async created () {
    if (this.isSelectedRequest()) {
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.getAllCommissionDetails({
            PRequest: { NIDCommission: this.selectedNidCommission } // "cbb9aa98-e12a-4622-8e97-6eeaf686cc54"
          })

        this.getAllCommissionDetailsRes = this.getResponse(data)
        if (this.getAllCommissionDetailsRes.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید`
          })
          this.model =
            this.getAllCommissionDetailsRes.data.GetAllCommissionDetailsResult

          const obj = this.model?.Commission_VoteTrepasses[0] ?? {}

          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate =
            obj?.VoteDate ?? ""
          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber =
            obj?.VoteNo ?? ""

          this.baseNosaziCode = convertStringToNosaziCodeObject(
            this.model?.CommissionInfo?.CodeString ?? "0-0-0-0-0-0-0"
          )

          if (
            this.model?.ClsCommission_ExecutTrackingVote
              ?.Commission_ExecuteTracking &&
            this.model.ClsCommission_ExecutTrackingVote
              .Commission_ExecuteTracking.length > 0
          ) {
            this.model.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking.forEach(
              (items) => {
                this.model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
                  (tmp) => {
                    if (items.NidVT === tmp.NidVT) {
                      tmp.CI_ExecuteMainVote = items.CI_ExecuteMainVote
                      tmp.CI_ExecuteSubsidiaryVote =
                        items.CI_ExecuteSubsidiaryVote

                      tmp.ExecuteVoteComments = items.ExecuteVoteComments
                      tmp.ExecuteVoteDate = items.ExecuteVoteDate
                      tmp.ExecuteVoteDesc = items.ExecuteVoteDesc
                      tmp.ExecuteVoteValue = parseFloat(items.ExecuteVoteValue)
                      tmp.NidCommission = items.NidCommission
                      tmp.NidVT = items.NidVT
                    }
                  }
                )
              }
            )
          }
          this.grdTrepass =
            this.model.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses
          this.grdExtension =
            this.model.ClsCommission_LegalProxy
              ?.Commission_LegalProxyExtensions ?? []
          this.letterDate =
            this.lastObjOfArray(this.grdExtension).LetterDate ?? ""
          this.letterNumber =
            this.lastObjOfArray(this.grdExtension).LetterNumber ?? ""

          this.model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate =
            currentDate()
          if (
            this.model.ClsCommission_LegalProxy.Commission_LegalProxy ===
              null ||
            this.model.ClsCommission_LegalProxy.Commission_LegalProxy
              .IsConfirm !== true
          ) {
            this.isConfirmLegalProxy = true
            this.showError("تقاضای نیابت قضایی ثبت یا صادر نشده است.")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    lastObjOfArray (t) {
      if (t.length === 0) return {}
      //   return t[t.length - 1]
      return t[0]
    },

    btnUploadFileClick () {
      this.$refs.fileUploader.pickFiles()
    },

    fileChangeEvent (file) {
      if (file) this.selectedFile = file
    },

    handleIsPrintable (params) {
      this.printReport(params, false)
    },
    async printReport (selectedExtension, pAddToArchive = false) {
      const obj = selectedExtension ?? this.lastObjOfArray(this.grdExtension)
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.getCommissionInfoByNidVote({
            _NidVote: obj._NidVote
          })
        this.getCommissionInfoByNidVoteRes = this.getResponse(data)
        if (this.getCommissionInfoByNidVoteRes.success) {
          const res = this.getCommissionInfoByNidVoteRes.data
          const queryParams = {
            NidLegalProxy: obj.NidLegalProxy,
            NidLegalProxyExtension: obj.NidLegalProxyExtension,
            NidUser: this.getNidUser(),
            NidProc: this.selectedRequest.NidProc,
            NidProc2: res.NidProc,
            VoteNo: obj.VoteNo,
            District: this.baseNosaziCode.District
          }
          if (!pAddToArchive) {
            const reportPath =
              "/Sara8Reports/RptLegalProxyOrder"
            this.showReport(reportPath, queryParams)
            await this.log({
              action: this.logActions.printReport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              saveDesc: `بارگذاری گزارش در فرم ${this.title} انجام گردید`
            })
          } else {
            this.addProxyExtensionToArchiveReport(obj, queryParams)
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async addProxyExtensionToArchiveReport (obj, utmpobj) {
      // AddProxyExtensionToArchiveReport
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.addProxyExtensionToArchiveReport({
            NidLegalProxyExtension: obj.NidLegalProxyExtension,
            ReportParams: utmpobj.ReportParams,
            ReportName: utmpobj.ReportName,
            // RootSubject: tmpArchiveDomain.RootSubject,
            NisCommission: utmpobj._NisCommission,
            Commission: "Commission",
            UserName: this.getUserDisplayName(),
            GUID: this.getNidUser()
          })
        this.addProxyExtensionToArchiveReportRes = this.getResponse(data)
        if (this.addProxyExtensionToArchiveReportRes.success) {
          await this.log({
            action: this.logActions.save,
            bizCode: utmpobj._NisCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `بارگذاری اطلاعات در آرشیو در فرم ${this.title} انجام گردید`
          })
          this.showError("با موفقیت در آرشیو درج گردید.")
        } else {
          this.showError("اشکال در درج آرشیو")
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    handleIsRemovable (params) {
      if (params.IsConfirm === true) {
        this.showError(
          "شما نمی توانید تمدید نیابت قضایی تایید شده را حذف کنید."
        )
      } else if (params.Title === "صدور دستور نیابت قضایی") {
        this.showError("شما نمی توانید دستور اصلی نیابت قضایی را حذف کنید.")
      } else {
        this.deleteExtension(params)
      }
    },

    async deleteExtension (selectedExtension) {
      try {
        const { data } =
          await this.$services.commissions.deleteCommissionLegalProxyExtension({
            ClsCommission_LegalProxy: selectedExtension,
            Commission_LegalProxyExtension:
              this.model.Commission_LegalProxyExtension
          })
        this.deleteCommissionLegalProxyExtensionRes = this.getResponse(data)
        if (this.deleteCommissionLegalProxyExtensionRes.success) {
          this.showSuccess("حذف تمدید نیابت قضایی با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.delete,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `حذف تمدید نیابت قضایی در فرم ${this.title} انجام گردید`
          })
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async BtnSave_Click () {
      try {
        this.model.Commission_LegalProxyExtension.OrderDate = currentDate()
        // var now_Days30 = DateTime.Now.AddDays(-30).GetPersianDate()
        if (this.grdExtension.length < 1) {
          this.showError(
            "برای تمدید نیابت قضایی ، باید دستور نیابت قضایی وجود داشته باشد یا صادر شده باشد"
          )
          return
        } else if (this.lastObjOfArray(this.grdExtension).IsConfirm !== true) {
          this.showError("تقاضا/تمدید نیابت قضایی پیشیین صادر نشده است.")
          return
        }
        // else if (
        //   string.Compare(
        //     now_Days30,
        //     this.lastObjOfArray(this.grdExtension).ConfirmDate
        //   ) < 0
        // ) {
        //   this.showError(
        //     "حداقل بایذ  یکماه از تاریخ صدور نوبت قبلی گذشته باشد"
        //   )
        //   return
        // }
        if (
          !this.model.Commission_LegalProxyExtension.ValidFromDate ||
          this.model.Commission_LegalProxyExtension.ValidFromDate === ""
        ) {
          this.showError("لطفا تاریخ شروع اعتبار تمدید را وارد کنید")
        } else if (
          !this.model.Commission_LegalProxyExtension.ValidTillDate ||
          this.model.Commission_LegalProxyExtension.ValidTillDate === ""
        ) {
          this.showError("لطفا تاریخ پایان اعتبار تمدید را وارد کنید")
        }
        this.model.ClsCommission_LegalProxy.Commission_LegalProxy.NidCommission =
          this.selectedNidCommission
        if (this.model.Commission_LegalProxyExtension.CreateUserId == null) {
          this.model.Commission_LegalProxyExtension.CreateUserId =
            this.getNidUser()
        }

        if (this.model.Commission_LegalProxyExtension.CreateUsername == null) {
          this.model.Commission_LegalProxyExtension.CreateUsername =
            this.getUserDisplayName()
        }
        if (this.model.Commission_LegalProxyExtension.Title == null) {
          this.model.Commission_LegalProxyExtension.Title =
            "تمدید نوبت " +
            "/" +
            this.model.ClsCommission_LegalProxy.Commission_LegalProxyExtensions.Count.ToString()
        }
        const { data } =
          await this.$services.commissions.saveCommissionLegalProxyExtension({
            ClsCommission_LegalProxy: this.model.ClsCommission_LegalProxy,
            Commission_LegalProxyExtension:
              this.model.Commission_LegalProxyExtension
          })
        this.saveCommissionLegalProxyExtensionRes = this.getResponse(data)

        if (this.saveCommissionLegalProxyExtensionRes.success) {
          await this.log({
            action: this.logActions.confirmOutput,
            bizCode:
              this.model.ClsCommission_LegalProxy.Commission_LegalProxy
                .NidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `صدور تمدید نیابت قضایی در فرم ${this.title} انجام گردید`
          })
          this.showSuccess("صدور تمدید نیابت قضایی با موفقیت انجام شد")
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    BtnCreate_Click () {
      this.fromDate = currentDate()
      this.toDate = this.addDayToCurrentDate()
      this.isEditable = true
    },

    async BtnAccept_Click () {
      if (this.grdExtension < 2) {
        return this.showError(
          "ابتدا می بایست تقاضای نیابت قضایی را در فرم مربوطه ثبت نمایید"
        )
      }
      if (this.lastObjOfArray(this.grdExtension)?.IsConfirm === true) {
        return this.showError("تقاضای تمدید نیابت قضایی صادر شده است")
      }

      const obj = this.lastObjOfArray(this.grdExtension)
      // Confirm
      obj.IsConfirm = true
      obj.ConfirmDate = currentDate()
      obj.ConfirmTime = currentTime().slice(0, 5) // "HH:mm"
      obj.ConfirmUserName = this.getUserDisplayName()
      // Cancel
      obj.IsCancel = null
      obj.CancelDate = null
      obj.CancelTime = null
      obj.CancelUserName = null
      try {
        this.showLoading()
        const { data } =
          await this.$services.commissions.saveCommissionLegalProxyExtension({
            pRequest: {
              ClsCommission_LegalProxy: this.model.ClsCommission_LegalProxy,
              Commission_LegalProxyExtension: obj
            }
          })
        this.saveCommissionLegalProxyExtensionRes = this.getResponse(data)

        if (this.saveCommissionLegalProxyExtensionRes.success) {
          // this.showSuccess("صدور تمدید نیابت قضایی با موفقیت انجام شد")
          await this.log({
            action: this.logActions.confirmOutput,
            bizCode:
              this.model.ClsCommission_LegalProxy.Commission_LegalProxy
                .NidCommission,
            bizCodeTitle: "NidCommission",
            saveDesc: `صدور تمدید نیابت قضایی در فرم ${this.title} انجام گردید`
          })
          this.loadObj()
          this.printReport(obj, true)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async BtnCancel_Click () {
      const obj = this.lastObjOfArray(this.grdExtension)
      if (obj?.IsCancel === true) {
        return this.showError("تقاضای تمدید نیابت قضایی ابطال شده است")
      }
      if (obj?.IsConfirm === true) {
        return this.showError("تقاضای تمدید نیابت قضایی صادر شده است")
      }
      await this.removeReportFromArchive()
      await this.loadObj()
      if (
        this.model.ClsCommission_LegalProxy.Commission_LegalProxyExecutionOrders.Any(
          (a) =>
            a.NidLegalProxyExtension === obj?.NidLegalProxyExtension &&
            a.IsConfirm === true
        )
      ) {
        return this.showError(
          "برای این دستور تمدید نیابت قضایی، دستور صادر شده است."
        )
      }

      if (obj?.CreateUserId == null) {
        obj.CreateUserId = this.getNidUser()
      }
      // Confirm
      obj.IsConfirm = false
      obj.ConfirmDate = null
      obj.ConfirmTime = null
      obj.ConfirmUserName = null
      // ancel
      obj.IsCancel = true
      obj.CancelDate = currentDate()
      obj.CancelTime = currentTime().slice(0, 5) // "HH:mm"
      obj.CancelUserName = this.getUserDisplayName()
      try {
        this.showLoading()
        const payload = {
          pRequest: {
            ClsCommission_LegalProxy: this.model.ClsCommission_LegalProxy,
            Commission_LegalProxyExtension: obj
          }
        }
        const { data } =
          await this.$services.commissions.saveCommissionLegalProxyExtension(
            payload
          )
        this.saveCommissionLegalProxyExtensionRes = this.getResponse(data)

        if (this.saveCommissionLegalProxyExtensionRes.success) {
          await this.log({
            action: this.logActions.cancel,
            bizCode:
              this.model?.ClsCommission_LegalProxy?.Commission_LegalProxy
                ?.NidCommission ?? "",
            bizCodeTitle: "NidCommission",
            saveDesc: `ابطال تمدید نیابت قضایی در فرم ${this.title} انجام گردید`
          })
          this.showSuccess("ابطال تمدید نیابت قضایی با موفقیت انجام شد")
          this.loadObj()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async removeReportFromArchive () {
      return new Promise(async (resolve, reject) => {
        try {
          const { data } =
            await this.$services.commissions.deleteProxyExtensionDataFile({
              NidLegalProxyExtension: this.lastObjOfArray(this.grdExtension)
                .NidLegalProxyExtension,
              UserName: this.getUserDisplayName(),
              GUID: this.getNidUser()
            })
          this.deleteProxyExtensionDataFileRes = this.getResponse(data)
          if (this.deleteProxyExtensionDataFileRes.success) {
            await this.log({
              action: this.logActions.delete,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `عملیات حذف از آرشیو در فرم ${this.title} انجام گردید`
            })
            this.showSuccess("با موفقیت از آرشیو حذف گردید.")
            return resolve()
          } else {
            return reject(this.deleteProxyExtensionDataFileRes.errors[0].text)
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
        }
      })
    },

    addDayToCurrentDate () {
      const tmp = currentDate().split("/")
      let y = parseInt(tmp[0])
      let m = parseInt(tmp[1])
      let d = parseInt(tmp[2])
      let today = new PersianDate([y, m, d])
      return today.add("months", 1)
    }
  }
}
</script>
