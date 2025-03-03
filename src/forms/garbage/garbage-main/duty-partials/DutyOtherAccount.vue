<template>
  <fit>
    <safa-status :result="oddmentResult" />
    <safa-status :result="payOfYearResult" />
    <safa-status :result="setPayOffyearResult" />
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          v-model="code"
          :options="nosaziCodeArray"
          cdcName="nosaziCode"
          label=" کد نوسازی"
          label-width="90px"
          sourceType="local"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="selectedDutyYear"
          cdcName="selectedDutyYear"
          ciName="CI_DutyYear"
          domainName="CI_SaraM1"
          label="سال تسویه "
          label-width="90px"
        />
        <!-- v-model="payOfYearResults.PayOffYear.CI_DutyYear_Payoff" -->
      </FormControl>
      <FormControl>
        <safa-text
          v-model="payOfYearResults.HousePayOffYear.CI_DutyYear_Payoff"
          cdcName="CI_DutyYear_Payoff"
          label="سال تسویه ملک"
          label-width="90px"
          m="r"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="payOfYearResults.PayOffYear.CI_DutyPayoffCause"
          cdcName="CI_DutyPayoffCause"
          ciName="CI_DutyPayoffCause"
          domainName="CI_SaraM1"
          label="علت تسویه "
          label-width="90px"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-checkbox
          v-model="loadCancelOddment"
          cdcName="loadCancelOddment"
          label="عدم نمایش حساب های باطله"
          @click="reloadOddmentDuty"
        />
      </FormControl>
    </FormRow>
    <safa-datatable
      v-model="oddmentResults.DutyOddmentAccount"
      cdcName="dutyOtherAccount"
      fit
      height="100%"
      helper="dutyOtherAccount"
      max-height="100%"
      minHeight="100px"
      title="حساب های متفرقه"
      @selectedChange="dutyOtherAccountClick"
      :show-selected-checkbox="true"
      :allowMultipleSelection="true"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      m="r"
    />
    <safa-popup
      v-model="showDutyOtherAccountNewModal"
      height="500"
      title="اضافه کردن حساب های متفرقه"
    >
      <form-wrapper :padding="false">
        <DutyOtherAccountNew
          ref="otherAccountNew"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :nidFk="oddmentResults.NidFk"
          :dutyOddmentAccount="oddmentResults.DutyOddmentAccount"
          :sysCiDutyType="oddmentResults.SysCiDutyType"
          :title="title"
          @reloadDutyOtherAccount="reloadDutyOtherAccount"
        />
        <template v-slot:footer>
          <btn-save class="q-mr-sm" label="ذخیره" @click="saveOtherAccount" />
          <btn-cancel label="انصراف" @click="cancelOtherAccount" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="showHistoryModal"
      title="تاریخچه ی سال تسویه"
      @hide="showHistoryModal = false"
      @onCloseModal="closeHistoryModal"
    >
      <DutyOtherAccountPayOffHisory
        :payOfHistory="payOfYearResults.Duty_PayOffHistory"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowRevokeModal"
      title="ابطال کردن حساب های متفرقه"
      width="350px"
      height="250px"
    >
      <DutyOtherAccountRevoke
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :title="title"
        :name="name"
        :selectedRow="selectedRow"
        @reloadOtherAccount="reloadOtherAccount"
      />
    </safa-popup>
  </fit>
</template>
<script>
import DutyOtherAccountNew from "./DutyOtherAccountNew.vue"
import DutyOtherAccountPayOffHisory from "./DutyOtherAccountPayOffHisory.vue"
import DutyOtherAccountRevoke from "./DutyOtherAccountRevoke.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { ClsEnumEumDutyType } from 'src/forms/garbage/config/enums.js'
export default {
  name: "DutyOtherAccount",
  mixins: [baseFormMixin],
  data: function () {
    return {
      code: 0,
      oddmentResult: null,
      payOfYearResult: null,
      setPayOffyearResult: null,
      payOfYearResults: {
        PayOffYear: {},
        Duty_PayOffHistory: [],
        HousePayOffYear: {}
      },
      oddmentResults: { DutyOddmentAccount: [] },
      showDutyOtherAccountNewModal: false,
      getClsEnumEumDutyType: ClsEnumEumDutyType,
      showHistoryModal: false,
      isShowRevokeModal: false,
      selectedDutyYear: 0,
      disableRevokeBtn: true,
      selectedRow: null,
      mainDutyYear: 0
    }
  },
  props: {
    results: Object,
    nosaziCodeArray: Array,
    loadCancelOddment: Boolean,
    activeShowOtherAccountTab: Boolean,
    formKey: String,
    title: String,
    name: String,
    baseNosaziCode: Object
  },
  components: {
    DutyOtherAccountNew,
    DutyOtherAccountPayOffHisory,
    DutyOtherAccountRevoke
  },
  mounted () {
    if (this.baseNosaziCode.District !== 0) {
      this.reloadOddmentDuty()
    }
  },
  watch: {
    loadCancelOddment () {
      this.reloadOddmentDuty()
    },
    code () {
      this.reloadOddmentDuty()
    }
  },
  methods: {
    saveOtherAccount () {
      this.$refs.otherAccountNew.save()
    },
    cancelOtherAccount () {
      this.$refs.otherAccountNew.cancel()
    },
    reloadOddmentDuty (value) {
      this.showLoading()
      value = this.code
      const payload = {
        pNid: this.results.NidList[value],
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pUnLoadCancelOddment: this.loadCancelOddment
      }
      this.$services.SB.getDutyOddmentAccount(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.oddmentResult = this.getResponse(data)
          if (this.oddmentResult.success) {
            debugger
            this.oddmentResults = this.oddmentResult.data
            this.oddmentResults.DutyOddmentAccount =
              this.oddmentResults.DutyOddmentAccount.map((x) => {
                if (x.IsCancel) {
                  x.class = "bg-red-2"
                }
                return x
              })
            await this.log({
              action: this.logActions.view,
              bizCode: this.results.NidList[this.code],
              bizCodeTitle: "Nid",
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
            this.reloadGetPayOffYear()
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
    reloadGetPayOffYear () {
      this.showLoading()
      const payload = {
        pNidFK: this.oddmentResults.NidFk,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value
      }
      this.$services.SB.getPayOffYear(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.payOfYearResult = this.getResponse(data)
          if (this.payOfYearResult.success) {
            this.payOfYearResults = this.payOfYearResult.data
            if (this.payOfYearResults.PayOffYear === null) {
              this.payOfYearResults.PayOffYear = {}
            } else {
              this.mainDutyYear =
                this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
            }
            if (this.payOfYearResults.HousePayOffYear === null) {
              this.payOfYearResults.HousePayOffYear = {}
            }
            await this.log({
              action: this.logActions.view,
              bizCode: this.oddmentResults.NidFk,
              bizCodeTitle: "NidFk",
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
            this.payOfYearResults.Duty_PayOffHistory.forEach((item) => {
              if (item.CI_DutyYear_Payoff === 0) {
                item.CI_DutyYear_Payoff = "نامشخص"
              }
            })
            this.selectedDutyYear =
              this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newAccount () {
      this.showDutyOtherAccountNewModal = true
    },
    closeModal () {
      this.showDutyOtherAccountNewModal = false
    },
    closeHistoryModal () {
      this.showHistoryModal = false
    },
    closeRevokeModal () {
      this.isShowRevokeModal = false
    },
    reloadDutyOtherAccount () {
      this.showDutyOtherAccountNewModal = false
      this.reloadOddmentDuty()
    },
    reloadOtherAccount () {
      this.isShowRevokeModal = false
      this.reloadOddmentDuty()
    },
    setPayOffYear (Year, isDeleted) {
      this.showLoading()
      const payload = {
        pNidFK: this.oddmentResults.NidFk,
        PPayOffYear: Year,
        PCI_DutyPayoffCause:
          this.payOfYearResults.PayOffYear.CI_DutyPayoffCause || 0,
        pSysCiDutyType: this.getClsEnumEumDutyType.Garbage.value,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pIsDeleted: isDeleted
      }
      this.$services.SB.setPayOffyear(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.setPayOffyearResult = this.getResponse(data)
          if (this.setPayOffyearResult.success) {
            if (!isDeleted) {
              this.showSuccess("تایید سال تسویه با موفقیت انجام پذیرفت.")
              await this.log({
                action: this.logActions.confirm,
                bizCode: this.oddmentResults.NidFk,
                bizCodeTitle: "NidFk",
                nosaziCode: convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )
              })
            } else {
              this.showSuccess("حذف سال تسویه با موفقیت انجام پذیرفت.")
              await this.log({
                action: this.logActions.cancel,
                bizCode: this.oddmentResults.NidFk,
                bizCodeTitle: "NidFk",
                nosaziCode: convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )
              })
            }
            this.reloadOddmentDuty()
            this.$emit("changeCalcStatus")
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
    accept () {
      this.showConfirm("آیا از تأیید سال تسویه اطمینان دارید؟").onOk(() => {
        if (this.selectedDutyYear <= this.mainDutyYear) {
          this.showError("ابتدا باید سال تسویه را حذف کنید.")
        } else {
          this.setPayOffYear(this.selectedDutyYear, false)
        }
      })
    },
    deletetYear () {
      this.showConfirm("آیا از حذف سال تسویه اطمینان دارید؟").onOk(() => {
        this.setPayOffYear(0, true)
      })
    },
    revoke () {
      if (this.selectedRow !== null) {
        this.showConfirm("آیا از ابطال حساب انتخاب شده اطمینان دارید؟").onOk(
          () => {
            this.isShowRevokeModal = true
          }
        )
      } else {
        this.showError("هیچ فیشی انتخاب نشده است.")
      }
    },
    history () {
      this.showHistoryModal = true
    },
    dutyOtherAccountClick ({ dataItem, selectedItems }) {
      this.selectedRow = selectedItems.length > 0 ? dataItem : null
    }
  },
  computed: {
    isDisableOteherAccountBtn () {
      if (!this.selectedRow) return true // true => disable buttons
      if (this.selectedRow.IsCancel) return true
      else if (!this.selectedRow.IsCancel) {
        return false
      }
      return true
    }
  }
}
</script>
