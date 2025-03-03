<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <fit>
      <safa-status :result="result" />
      <FormRow>
        <div class="col column items-end">
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label-width="70px"
            :actions="false"
            m="r"
          />
        </div>
      </FormRow>

      <div class="duty-row row">تاریخ و شماره نامه مدیر منطقه</div>
      <FormRow class="q-mt-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ نامه منطقه"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.LetterDate
            "
            cdcName="LetterDate"
          ></safa-datepicker>
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره نامه منطقه"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy
                .LetterNumber
            "
            cdcName="LetterNumber"
          />
        </FormControl>
      </FormRow>

      <div class="duty-row row">مشخصات ملک</div>
      <FormRow class="q-mt-sm">
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="100px"
            v-model="Context.CommissionInfo.OwnerName"
            cdcName="OwnerName"
          />
        </FormControl>
      </FormRow>
      <div class="duty-row row">تاریخ و شماره رأی کمیسیون</div>
      <FormRow class="q-mt-sm">
        <FormControl>
          <safa-datepicker
            label="تاریخ رأی"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate
            "
            cdcName="NoticeDate"
          ></safa-datepicker>
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره رأی"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy
                .NoticeNumber
            "
            cdcName="NoticeNumber"
          />
        </FormControl>

        <safa-datatable
          :columns="EntryOrderColumn"
          :m="mode"
          height="100%"
          :show-selected-checkbox="false"
          :allowMultipleSelection="false"
          fit
          max-height="200px"
          min-height="100%"
          v-model="SrvGetVoteTrepasses"
          cdcName="SrvGetVoteTrepasses"
          @CheckingDetailsClick="CheckingDetails"
          @CheckingInfoCalculatorClick="OnOpenCheckingInfoCalculator"
        >
        </safa-datatable>
        <FormControl>
          <safa-datepicker
            label="تاریخ صدور دستور"
            required
            label-width="100px"
            :validations="['required', 'dateFa']"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate
            "
            cdcName="OrderDate"
          ></safa-datepicker>
        </FormControl>
        <FormControl>
          <safa-combo
            label="دائر بر"
            :options="Rules"
            source-type="local"
            label-width="100px"
            required
            :validations="['required']"
            v-model="Context.ClsCommission_LegalProxy.Rules"
            cdcName="Rules"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="تعداد ورود"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.EntryCount
            "
            cdcName="EntryCount"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره صدور دستور"
            label-width="100px"
            required
            :validations="['required', 'string']"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber
            "
            cdcName="OrderNumber"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="در طول"
            ciName="CI_InTime"
            domainName="Commission"
            label-width="100px"
            v-model="
              Context.ClsCommission_LegalProxy.Commission_LegalProxy.CI_InTime
            "
            cdcName="CI_InTime"
          />
        </FormControl>
      </FormRow>
    </fit>
    <template #footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="isEditable = false"
        @save="saveData"
      >
        <template #after>
          <btn-default @click="accept" label="صدور دستور نیابت قضایی" />
          <btn-default @click="cancel" label="ابطال دستور نیابت قضایی" />
          <btn-default @click="print" label="چاپ" />
        </template>
      </form-actions>
    </template>
  </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate, currentTime } from "src/utils/index"

const defaultContext = {
  GroupVoteTrepass: [],
  CI_CommissionCapacity: [],
  ClsCommission_LegalProxy: {
    CommissionInfo: {
      OwnerName: "",
      CodeString: ""
    },
    Commission_LegalProxy: {
      LetterDate: "",
      LetterNumber: "",
      NoticeDate: "",
      NoticeNumber: "",
      Description: "",
      EntryCount: 0,
      OrderDate: "",
      OrderNumber: "",
      CI_InTime: 0,
      NidCommission: "00000000-0000-0000-0000-000000000000",
      CreateUserId: "00000000-0000-0000-0000-000000000000"
    }
  }
}
export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      title: " دستور حکم ورود و نیابت قضایی",
      formKey: "67E7876C-210C-4D2D-93EF-16DEA5DA4128",
      name: "ULegalProxyEntryOrder",
      main: true,
      nisCommission: "00000000-0000-0000-0000-000000000000",
      nidVote: "00000000-0000-0000-0000-000000000000",
      TmpA: null,
      result: null,
      SrvGetVoteTrepasses: [],
      Rules: [],

      Context: { ...defaultContext },
      EntryOrderColumn: [
        {
          field: "Id",
          title: "کد تخلف",
          width: "100px"
        },
        {
          field: "Title",
          title: "عنوان تخلف",
          width: "150px"
        },
        {
          field: "CI_TrepassType_Group",
          title: "نوع تخلف",
          width: "150px"
        },
        {
          field: "CI_Years",
          title: "سال تخلف",
          width: "150px"
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ تخلف",
          editor: "date",
          width: "150px"
        },
        {
          field: "TrepassValue",
          title: "مقدار تخلف",
          width: "150px"
        },
        {
          field: "Floor",
          title: " طبقه تخلف",
          width: "150px"
        },
        {
          field: "CI_UsingTypeGroupMojaz",
          title: " کاربری اصلی موجود",
          width: "150px"
        },
        {
          field: "UsingTitle",
          title: " کاربری فرعی موجود",
          width: "150px"
        },
        {
          field: "CI_VoteType",
          title: "نوع رای",
          editor: "combo",
          width: "150px",
          domain: "Commission"
        },
        {
          field: "CommissionText",
          title: "شماره کمیسیون",
          width: "150px"
        },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          editor: "combo",
          width: "150px",
          domain: "Commission"
        },
        {
          field: "VoteNo",
          title: "شماره رای",
          width: "150px"
        },
        {
          field: "CI_VoteType",
          title: "عنوان رای",
          editor: "combo",
          width: "150px",
          domain: "Commission"
        },
        {
          field: "VoteValue",
          title: "مقدار راي",
          width: "150px"
        },
        {
          field: "UrbanNidKartablItem",
          title: "شماره ارجاع",
          width: "150px"
        },
        {
          field: "VoteDate",
          title: "تاریخ راي",
          width: "150px",
          editor: "date"
        },
        {
          field: "Vote_Comments",
          title: "شرح راي",
          width: "150px"
        },
        {
          field: "UsingGroupType",
          title: "نتیجه اجرای رای(اصلی)/نتیجه اجرای رای(فرعی)",
          width: "150px"
        },
        {
          field: "ExecuteVoteValue",
          title: "مقدار اجرا(متر)",
          width: "150px"
        },
        {
          field: "ExecuteVoteDate",
          title: "تاریخ اقدام",
          width: "150px",
          editor: "date"
        },
        {
          field: "ExecuteVoteComments",
          title: "شماره ",
          width: "150px"
        },
        {
          field: "ExecuteVoteDesc",
          title: "توضیحات ",
          width: "250px"
        }
      ],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  methods: {
    accept () {
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate =
        currentDate()
      if (
        !this.Context.ClsCommission_LegalProxy.Commission_LegalProxy
          .LetterDate ||
        !this.Context.ClsCommission_LegalProxy.Commission_LegalProxy
          .LetterNumber
      ) {
        this.showError(
          "ابتدا می بایست تقاضای نیابت قضایی را در فرم مربوطه ثبت نمایید."
        )
        return
      }

      // Confirm
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsConfirm = true
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmDate =
        currentDate()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmTime =
        currentTime()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmUserName =
        this.getUserDisplayName()
      // Cancel
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsCancel =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelDate =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelTime =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelUserName =
        null
      // this.save()
    },
    cancel () {
      this.isEditable = false
      this.loadObj()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.NidCommission =
        this.selectedNidCommission
      if (
        this.Context.ClsCommission_LegalProxy.Commission_LegalProxy
          .CreateUserId == null
      ) {
        this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CreateUserId =
          this.getNidUser()
      }

      // System.Collections.ObjectModel.ObservableCollection<CI_Ruling> Rules = new System.Collections.ObjectModel.ObservableCollection<CI_Ruling>();
      // ComboRules.ForEach(r =>
      // {
      //    CI_Ruling Rule = new CI_Ruling();
      //    Rule.ID = Convert.ToInt16(r.Id);
      //    Rules.Add(Rule);
      // });
      // Confitrm
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsConfirm = false
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmDate =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmTime =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.ConfirmUserName =
        null
      // Cancel
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsCancel = true
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelDate =
        currentDate()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelTime =
        currentTime()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.CancelUserName =
        this.getUserDisplayName()
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate =
        null
      this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber =
        null
      this.saveData()
    },
    saveData () {
      if (this.selectedNidCommission === null) {
        return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      }
      if (!this.isValidForm()) return
      const payload = {
        pRequest: {
          ClsCommission_LegalProxy: this.context.ClsCommission_LegalProxy
        }
      }
      this.showLoading()
      this.$services.commissions
        .saveCommissionLegalProxy(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.context.NidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `ذخیره اطلاعات  ${this.title} انجام گردید.`
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
    loadObj () {
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: this.selectedNidCommission,
          NIDVote: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          ISRelapse: false,
          IsRegion: false,
          IsdeleteArchive: false,
          NidAgent: "00000000-0000-0000-0000-000000000000",
          NidTaskState: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000"
        }
      }
      // // eslint-disable-next-line no-unused-vars
      // let dataContext = {}
      this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            this.Context = this.result.data.GetAllCommissionDetails
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.Context.CommissionInfo.CodeString
            )
            // dataContext = this.Context
            this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber =
              !this.selectedCommission.UrbanNidRequest ?? ""
                ? this.selectedCommission.UrbanNidRequest.toString()
                : this.selectedCommission.NidWorkItem.toString() ?? ""

            if (this.selectedCommission.NidWorkItem.toString() ?? "") {
              this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber =
                this.selectedCommission.NidWorkItem.toString() ?? ""
            } else {
              this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber =
                this.selectedCommission.UrbanNidRequest.toString() ?? ""
            }

            if (this.Context.Commission_VoteList.length > 0) {
              this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber =
                this.Context.Commission_VoteList.OrderByDescending.sort(
                  (i) => i.VoteDate
                )[0].VoteNo
              this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate =
                this.Context.Commission_VoteList.sort(
                  (i) => i.VoteDate
                )[0].VoteDate
            }
            // Rules Combo
            this.Rules = this.Context.ClsCommission_LegalProxy.Rules

            // // Button Color // ToDo:
            // if (Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsConfirm == true)
            // {
            //     BtnAccept.Background = new SolidColorBrush(Color.FromArgb(255, 121, 212, 121));
            //     BtnCancel.Background = new SolidColorBrush();
            //     BtnEdit.Visibility = Visibility.Collapsed;
            // }
            // else if (Context.ClsCommission_LegalProxy.Commission_LegalProxy.IsCancel == true)
            // {
            //     BtnCancel.Background = new SolidColorBrush(Color.FromArgb(255, 247, 132, 132));
            //     BtnAccept.Background = new SolidColorBrush();
            //     BtnEdit.Visibility = Visibility.Visible;
            // }

            // VoteTreepasses
            if (
              this.Context.ClsCommission_ExecutTrackingVote
                .Commission_ExecuteTracking.length > 0
            ) {
              this.Context.ClsCommission_ExecutTrackingVote.Commission_ExecuteTracking.forEach(
                (items) => {
                  this.Context.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses.forEach(
                    (tmp) => {
                      // _NidVote = tmp.NidVote;
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
            this.SrvGetVoteTrepasses =
              this.Context.ClsCommission_ExecutTrackingVote.SrvGetVoteTrepasses
            this.Context.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate =
              currentDate()

            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
            })
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  }
}
</script>
