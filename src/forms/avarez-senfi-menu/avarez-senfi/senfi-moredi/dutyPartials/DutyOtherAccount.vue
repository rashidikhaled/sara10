<template>

  <safa-form
    id="4c39d37b-42a1-4cd5-af59-ef85f890e069"
    caption="صنفی موردی"
  >
    <fit v-if=mainForm>
      <form-row class="q-col-gutter-sm">
        <form-control>
          <safa-combo
            label=" عنوان شغلی"
            sourceType="local"
            :options="nosaziCode"
            v-model="code"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="سال تسویه "
            domainName="CI_SaraM1"
            ciName="CI_DutyYear"
            :sortFunc="sortCombo"
            v-model="selectedDutyYear"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="سال تسویه ملک"
            domainName="CI_SaraM1"
            :sortFunc="sortCombo"
            ciName="CI_DutyYear"
          />
        </form-control>
        <form-control>
          <safa-combo
            label="علت تسویه "
            domainName="CI_SaraM1"
            ciName="CI_DutyPayoffCause"
            v-model="payOfYearResults.PayOffYear.CI_DutyPayoffCause"
          />
        </form-control>
      </form-row>
      <form-row class="q-my-sm">
        <safa-checkbox
          label="عدم نمایش حساب های باطله"
          v-model="loadCancelOddment"
          @click="reloadOddmentDuty"
        ></safa-checkbox>
      </form-row>
      <safa-datatable
        helper="dutyOtherAccount"
        v-model="oddmentResults.DutyOddmentAccount"
        @row-click="click"
        :hideToolbar="true"
        :addRow="true"
        height="100%"
        max-height="100%"
        min-height="100px"
        title="حساب های متفرقه"
        fit
        :m="mode"
      />

    </fit>

    <safa-popup
      title="اضافه کردن حساب های متفرقه"
      v-model="isShowOtherAccounts"
    >
      <form-wrapper :padding="false">
        <DutyOtherAccountNew
          @reloadDutyOtherAccount="reloadDutyOtherAccount"
          :nidFk="oddmentResults.NidFk"
          :district="baseNosaziCode.District"
          v-if="isShowOtherAccounts"
          :formKey="formKey"
          :title="title"
          :name="name"
          ref="DutyOtherAccountNew"
        />
        <template v-slot:footer>
          <div class="row q-gutter-sm q-my-sm ">
            <btn-save
              label="ذخیره"
              @click="saveForm"
            />
            <btn-cancel
              label="انصراف"
              @click="backMainForm"
            />
          </div>
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="isShowHistoryModal"
      title="تاریخچه ی سال تسویه"
    >
      <form-wrapper :padding="false">
        <DutyOtherAccountPayOffHisory :payOfHistory="payOfYearResults.Duty_PayOffHistory" />
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="isShowRevokeModal"
      title="ابطال کردن حساب های متفرقه"
      width="400px"
      height="200px"
    >
      <form-wrapper>
        <DutyOtherAccountRevoke
          @reloadOtherAccount="reloadOtherAccount"
          :district="baseNosaziCode.District"
          :selectedRow="selectedRow"

          :formKey="formKey"
          :title="title"
          :name="name"
          ref="revokeAccount"
        />
        <template v-slot:footer>
          <div class="q-gutter-sm">
            <btn-save
              label="ذخیره"
              color="green"
              @click="saveRevoke"
            />
            <btn-cancel
              label="انصراف"
              color="grey-13"
              @click="cancelRevoke"
              icon="arrow_right_alt"
            />
          </div>
        </template>
      </form-wrapper>
    </safa-popup>
    <!-- </div> -->
  </safa-form>

</template>
<script>
import DutyOtherAccountNew from "./DutyOtherAccountNew"
import DutyOtherAccountPayOffHisory from "./DutyOtherAccountPayOffHisory"
import DutyOtherAccountRevoke from "./DutyOtherAccountRevoke"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  data: function () {
    return {
      nosaziCode: [],
      code: 0,
      oddmentResult: {},
      payOfYearResult: null,
      payOfYearResults: {
        PayOffYear: {},
        Duty_PayOffHistory: [],
        HousePayOffYear: {}
      },
      oddmentResults: { DutyOddmentAccount: [] },
      isShowModal: false,
      isShowHistoryModal: false,
      isShowRevokeModal: false,
      selectedDutyYear: 0,
      setPayOffyearResult: null,
      disableRevokeBtn: true,
      selectedRow: {},
      isShowOtherAccounts: false,
      mainForm: true
    }
  },
  props: {
    formKey: String,
    title: String,
    name: String,
    results: Object,
    loadCancelOddment: Boolean,
    baseNosaziCode: Object
  },
  components: {
    DutyOtherAccountNew,
    DutyOtherAccountPayOffHisory,
    DutyOtherAccountRevoke
  },
  mounted () {
    this.nosaziCode = []
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach(item => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
  },
  methods: {
    saveRevoke () {
      this.$refs.revokeAccount.save()
    },
    cancelRevoke () {
      this.$refs.revokeAccount.cancel()
    },
    saveForm () {
      this.$refs.DutyOtherAccountNew.save()
    },
    backMainForm () {
      this.mainForm = true
      this.isShowOtherAccounts = false
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    reloadOddmentDuty () {
      this.nosaziCode = []
      let i = 0
      let nosaziCodeArray = this.results.NickNameNids
      nosaziCodeArray.forEach(item => {
        this.nosaziCode.push({ ID: i++, Title: item })
      })
      this.showLoading()
      let data = {
        pNid: this.results.NidJobList[this.code],
        pSysCiDutyType: 2,
        pUnLoadCancelOddment: this.loadCancelOddment
      }
      this.$services.SB.getDutyOddmentAccount(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.oddmentResult = this.getResponse(data)

          if (this.oddmentResult.success) {
            this.oddmentResults = this.oddmentResult.data
            this.oddmentResults.DutyOddmentAccount = this.oddmentResults.DutyOddmentAccount.map(
              x => {
                if (x.IsCancel) {
                  x.class = "revoke-other-account"
                }
                return x
              }
            )
            this.reloadGetPayOffYear()
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch(response => {
          console.log("error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    reloadGetPayOffYear () {
      this.showLoading()
      let data = {
        pNidFK: this.oddmentResults.NidFk,
        pSysCiDutyType: 2
      }
      this.$services.SB.getPayOffYear(data, { config: { District: this.baseNosaziCode.District } })
        .then(({ data }) => {
          this.payOfYearResult = this.getResponse(data)

          if (this.payOfYearResult.success) {
            this.payOfYearResults = this.payOfYearResult.data
            this.payOfYearResults.Duty_PayOffHistory.forEach(item => {
              if (item.CI_DutyYear_Payoff === 0) {
                item.CI_DutyYear_Payoff = "نامشخص"
              }
            })
            this.payOfYearResults.PayOffYear =
              this.payOfYearResults.PayOffYear || {}
            this.selectedDutyYear = this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newAccount () {
      this.isShowOtherAccounts = true
    },
    closeModal () {
      this.isShowModal = false
    },
    closeHistoryModal () {
      this.isShowHistoryModal = false
    },
    closeRevokeModal () {
      this.isShowRevokeModal = false
    },
    reloadDutyOtherAccount () {
      this.isShowOtherAccounts = false
      this.reloadOddmentDuty()
    },
    reloadOtherAccount () {
      this.isShowRevokeModal = false
      this.reloadOddmentDuty()
    },
    setPayOffYear (Year, isDeleted) {
      this.showLoading()
      let data = {
        pNidFK: this.oddmentResults.NidFk,
        PPayOffYear: Year,
        PCI_DutyPayoffCause: this.payOfYearResults.PayOffYear
          .CI_DutyPayoffCause,
        pSysCiDutyType: 2,
        pUserCode: this.getNidUser(),
        pUserName: this.getUserDisplayName(),
        pIsDeleted: isDeleted
      }
      this.$services.SB.setPayOffyear(data, { config: { District: this.baseNosaziCode.District } })
        .then(async ({ data }) => {
          this.setPayOffyearResult = this.getResponse(data)

          if (this.setPayOffyearResult.success) {
            if (!isDeleted) {
              this.showSuccess("تایید سال تسویه با موفقیت انجام پذیرفت")
            } else {
              this.showSuccess("حذف سال تسویه با موفقیت انجام پذیرفت")
            }

            await this.log({
              action: this.logActions.save,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
            this.reloadOddmentDuty()
          }
        })
        .catch(response => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.showConfirm("آیا از تأیید سال تسویه اطمینان دارید؟").onOk(() => {
        if (
          this.selectedDutyYear <=
          this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
        ) {
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
      this.showConfirm("آیا از ابطال حساب انتخاب شده اطمینان دارید؟").onOk(
        () => {
          if (this.selectedRow !== null) {
            this.isShowRevokeModal = true
          } else {
            this.showError("هیچ فیشی انتخاب نشده است")
          }
        }
      )
    },
    history () {
      this.isShowHistoryModal = true
    },
    click (dataItem) {
      this.selectedRow = dataItem
      if (dataItem.IsCancel) {
        this.disableRevokeBtn = true
      } else {
        this.disableRevokeBtn = false
      }
    }
  },

  watch: {
    // baseNosaziCode () {
    //   this.reloadOddmentDuty()
    // },
    loadCancelOddment () {
      this.reloadOddmentDuty()
    },
    code () {
      this.reloadOddmentDuty()
    }
  }
}
</script>
