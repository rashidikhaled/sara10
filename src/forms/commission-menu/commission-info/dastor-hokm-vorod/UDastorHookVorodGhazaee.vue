<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
  <form-wrapper :title="title">
    <template #header>
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
    </template>
    <internal-section title="تاریخ و شماره نامه مدیر منطقه">
      <form-row class="q-mb-sm">
        <form-control>
          <safa-datepicker
            label="تاریخ نامه"
            label-width="75px"
            m="r"
            v-model="
              model.ClsCommission_LegalProxy.Commission_LegalProxy.LetterDate
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
              model.ClsCommission_LegalProxy.Commission_LegalProxy.LetterNumber
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
              model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeDate
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
              model.ClsCommission_LegalProxy.Commission_LegalProxy.NoticeNumber
            "
            cdcName="NoticeNumber"
          />
        </form-control>
        <safa-datatable></safa-datatable>
      </form-row>
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
    </internal-section>

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
      title: "دستور حکم ورود و نیابت قضایی",
      name: "UDastorHookVorodGhazaee",
      formKey: "67e7876c-210c-4d2d-93ef-16dea5da4128",
      main: true,

      isView: false,
      loadObjRes: null,
      saveObjRes: null,
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
      baseNosaziCode: {}
    }
  },
  mounted () {
    if (this.selectedNidCommission !== null) {
      this.loadData(this.selectedNidCommission)
    } else {
      this.hideSidebar(this.name)
      return this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },
  methods: {
    loadData (NidCommission) {
      this.isEditable = false
      this.showLoading()
      this.$services.commissions
        .getAllCommissionDetails({ PRequest: { NIDCommission: NidCommission } })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.model = this.loadObjRes.data.GetAllCommissionDetailsResult
            this.baseNosaziCode = convertStringToNosaziCodeObject(
              this.model.CommissionInfo.CodeString
            )
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedNidCommission,
                bizCodeTitle: "NidCommission",
                nosaziCode: this.selectedCommission?.BizCode ?? '',
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} با شماره ارجاع ${
                  this.selectedCommission?.UrbanNidRequest ?? ""
                } انجام گردید.`
              })
            }
            this.isView = true
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
      this.showLoading()
      this.$services.commissions
        .saveCommissionLegalProxy({ pRequest: { ...this.model } })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.NidCommission,
              bizCodeTitle: "NidCommission",
              nosaziCode: this.selectedCommission?.BizCode ?? '',
              saveDesc: `ذخیره اطلاعات فرم ${this.title} با شماره ارجاع ${
                this.selectedCommission?.UrbanNidRequest ?? ""
              } انجام گردید.`
            })
            this.loadData(
              this.saveObjRes.data.SaveCommission_LegalProxyResult.CommissionInfo
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
