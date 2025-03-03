<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <fit>
        <internal-section title="تاریخ و شماره نامه مدیر منطقه">
          <form-row class="q-mb-sm">
            <form-control>
              <safa-datepicker
                label="تاریخ نامه"
                label-width="75px"
                m="r"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .LetterDate
                "
                cdcName="LetterDate"
              />
            </form-control>
            <form-control>
              <safa-text
                label="شماره نامه"
                label-width="75px"
                m="r"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .LetterNumber
                "
                cdcName="LetterNumber"
              />
            </form-control>
            <FormControl>
              <nosazi-code-input
                v-model="baseNosaziCode"
                label="کدنوسازی"
                label-width="70px"
                :actions="false"
                m="r"
                cdcName="baseNosaziCode"
              />
            </FormControl>
          </form-row>
        </internal-section>
        <internal-section title="مشخصات ملک">
          <form-row class="q-mb-sm">
            <form-control>
              <safa-text
                label="نام مالک"
                label-width="75px"
                m="r"
                v-model="model.CommissionInfo.OwnerName"
                cdcName="OwnerName"
              />
            </form-control>
          </form-row>
        </internal-section>

        <internal-section title="تاریخ و شماره رای کمیسیون ">
          <form-row class="q-mb-sm">
            <form-control>
              <safa-datepicker
                label="تاریخ رای"
                label-width="75px"
                m="r"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeDate
                "
                cdcName="NoticeDate"
              />
            </form-control>

            <form-control>
              <safa-text
                label="شماره رای"
                label-width="75px"
                m="r"
                v-model="
                  model.ClsCommission_LegalProxy.Commission_LegalProxy
                    .NoticeNumber
                "
                cdcName="NoticeNumber"
              />
            </form-control>
          </form-row>
        </internal-section>

        <safa-datatable
          v-model="grdExtension"
          cdcName="grdExtension"
          :columns="commissionColumns"
          fit
          height="100%"
          max-height="100%"
          min-height="100px"
          :m="mode"
          paginate
          class="q-mb-sm"
        />
      </fit>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="تاریخ صدور دستور"
            label-width="75px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderDate
            "
            cdcName="OrderDate"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="دائر بر"
            label-width="75px"
            :m="mode"
            domainName="Commission100"
            ciName="CI_Ruling"
            cdcName=""
          />
        </form-control>
        <form-control>
          <safa-text
            label="تعداد ورود"
            label-width="75px"
            :m="mode"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.EntryCount
            "
            cdcName="EntryCount"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره صدور دستور"
            label-width="75px"
            :m="mode"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.OrderNumber
            "
            cdcName="OrderNumber"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="در طول"
            label-width="75px"
            domainName="Commission100"
            ciName="CI_InTime"
            :m="mode"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.CI_InTime
            "
            cdcName="CI_InTime"
          />
        </form-control>
        <text-template label-width="75px" class="col-12" :m="mode" />
      </form-row>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @newInfo="clearData"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-default @click="confirmOrder" label="صدور دستور نیابت قضایی" />
            <btn-default @click="saveData" label="ابطال دستور نیابت قضایی" />
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

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      title: "دستور نیابت قضایی",
      name: "ULegalProsecutionOrder",
      formKey: "ddf15500-6541-457c-a45e-b0cfe99e93e7",
      main: true,
      commissionColumns: [
        { field: "Id", title: "کد تخلف", width: "100px" },
        { field: "Title", title: "عنوان تخلف", width: "150px" },
        { field: "Title", title: "عنوان تخلف", width: "150px" },
        { field: "CI_TrepassType_Group", title: "نوع تخلف", width: "150px" },
        { field: "CI_Years", title: "سال تخلف", width: "150px" },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ تخلف",
          width: "150px",
          editor: "date"
        },
        { field: "TrepassValue", title: "مقدار تخلف", width: "150px" },
        { field: "Floor", title: " طبقه تخلف", width: "150px" },
        {
          field: "CI_UsingTypeGroupMojaz",
          title: " کاربری اصلی موجود",
          width: "150px"
        },
        { field: "UsingTitle", title: " کاربری فرعی موجود", width: "150px" },
        { field: "CI_VoteType ", title: "نوع رای", width: "150px" },
        { title: "شماره کمیسیون", field: "CommissionText", width: "150px" },
        { title: "نوع کمیسیون", field: "CI_CommissionType", width: "150px" },
        { title: "شماره رای", field: "VoteNo", width: "150px" },
        { title: "عنوان رای", field: "CI_VoteType", width: "150px" },
        { title: "مقدار راي", field: "VoteValue", width: "150px" },
        { title: "شماره ارجاع", field: "UrbanNidKartablItem", width: "150px" },
        { title: "تاریخ راي", field: "VoteDate", width: "150px" },
        { title: "شرح راي", field: "Vote_Comments", width: "150px" },
        {
          title: "نتیجه اجرای رای(اصلی)/نتیجه اجرای رای(فرعی)",
          field: "UsingGroupType",
          width: "150px"
        },
        { title: "مقدار اجرا(متر)", field: "ExecuteVoteValue", width: "150px" },
        { title: "تاریخ اقدام", field: "ExecuteVoteDate", width: "150px" },
        { title: " شماره", field: "ExecuteVoteComments", width: "150px" },
        { title: " توضیحات", field: "ExecuteVoteDesc", width: "150px" }
      ],
      model: {
        CommissionInfo: {
          OwnerName: "",
          CodeString: ""
        },
        ClsCommission_LegalProxy: {
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
      },
      baseNosaziCode: {},
      grdExtension: []
    }
  },

  methods: {
    loadData (NidCommission) {
      this.isEditable = false
      this.showLoading()
      const payload = {
        PRequest: {
          NIDCommission: NidCommission
        }
      }
      this.$services.commissions
        .getAllCommissionDetails(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.model = res.data.GetAllCommissionDetailsResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.model.NidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید`
            })
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              res.data.GetAllCommissionDetailsResult.CommissionInfo.CodeString
            )
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveData () {
      if (this.selectedNidCommission === null) {
        return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      }
      const payload = { pRequest: { ...this.model } }
      this.showLoading()
      this.$services.commissions
        .saveCommissionLegalProxy(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.NidCommission,
              bizCodeTitle: "NidCommission",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید`
            })
            this.loadData(
              res.data.SaveCommission_LegalProxyResult.CommissionInfo
                .NidCommission
            )
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    confirmOrder () {
      return this.showError(
        "ابتدا می بایست تقاضای نیابت قضایی را در فرم مربوطه ثبت نمایید"
      )
    }
  }
}
</script>
