<template>

  <safa-form
    id="4c39d37b-42a1-4cd5-af59-ef85f890e069"
    caption="صنفی موردی"
  >
    <fit v-if=mainForm>
      <div class="row q-col-gutter-sm">
        <div class="col-12 col-md-3 col-sm-4">
          <safa-combo
            label=" عنوان شغلی"
            sourceType="local"
            :options="nosaziCode"
            v-model="code"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-4">
          <safa-combo
            label="سال تسویه "
            domainName="CI_SaraM1"
            ciName="CI_DutyYear"
            :sortFunc="sortCombo"
            v-model="selectedDutyYear"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-4">
          <safa-combo
            label="سال تسویه ملک"
            domainName="CI_SaraM1"
            :sortFunc="sortCombo"
            ciName="CI_DutyYear"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-4">
          <safa-combo
            label="علت تسویه "
            domainName="CI_SaraM1"
            ciName="CI_DutyPayoffCause"
            v-model="payOfYearResults.PayOffYear.CI_DutyPayoffCause"
          />
        </div>
      </div>
      <div class="row q-my-sm">
        <safa-checkbox
          label="عدم نمایش حساب های باطله"
          v-model="loadCancelOddment"
          @click="reloadOddmentDuty"
        />
      </div>
      <!-- <div class="form-row"> -->
      <safa-datatable
        helper="dutyOtherAccount"
        v-model="oddmentResults.DutyOddmentAccount"
        @click="click"
        :hideToolbar="true"
        :addRow="true"
        height="100%"
        max-height="100%"
        min-height="100px"
        title="حساب های متفرقه"
        fit
        :m="mode"
      />
      <!-- </div> -->
      <!-- <template v-slot:footer>
        <FormActions
          :m="mode"
          :showEditButton="false"
          :showNewButton="true"
          @cancel="isEditable = false"
          @edit="isEditable = true"
          @newInfo="newAccount"
          @save="saveData"
        ></FormActions>
      </template> -->
          <div class="row q-gutter-x-sm q-mt-xs">
            <btn-new
              label="جدید"
              @click="isShowOtherAccounts=true"
              :m="mode"
            />
            <safa-securityPanel
              id="991b1226-bf37-48b1-b3de-ca2a6ff88434"
              caption="ابطال حسابهای متفرقه"
            >
              <btn-cancel
                label="ابطال"
                @click="revoke"
                :disable="disableRevokeBtn"
              />
            </safa-securityPanel>
            <safa-securityPanel
              id="de3bf177-6412-4d59-8fcd-1aa76e941c1e"
              caption="تایید سال تسویه"
            >
              <btn-save
                label="تأیید سال تسویه"
                @click="accept"
              />
            </safa-securityPanel>
            <safa-securityPanel
              id="6c0af577-6c53-4a87-afcc-31ee266eeed2"
              caption="حذف سال تسویه"
            >
              <btn-delete
                label="حذف سال تسویه"
                @click="deletetYear"
              />
            </safa-securityPanel>
            <safa-securityPanel
              id="b18ff2c1-911a-4a39-b2bf-05cac2cd4ac7"
              caption="تاریخچه سال تسویه"
            >
              <btn-default
                label="تاریخچه ی سال تسویه"
                @click="history"
              />
            </safa-securityPanel>
          </div>
    </fit>
    <ShowModal
      title="اضافه کردن حساب های متفرقه"
      v-model="isShowOtherAccounts"
    >
      <DutyOtherAccountNew
        @reloadDutyOtherAccount="reloadDutyOtherAccount"
        :nidFk="oddmentResults.NidFk"
        v-if="isShowOtherAccounts"
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
    </ShowModal>
    <ShowModal
      :show="isShowHistoryModal"
      @hide="isShowHistoryModal = false"
      title="تاریخچه ی سال تسویه"
      @onCloseModal="closeHistoryModal"
    >
      <DutyOtherAccountPayOffHisory :payOfHistory="payOfYearResults.Duty_PayOffHistory" />
    </ShowModal>
    <ShowModal
      :show="isShowRevokeModal"
      @hide="isShowRevokeModal = false"
      title="ابطال کردن حساب های متفرقه"
      @onCloseModal="closeRevokeModal"
    >
      <DutyOtherAccountRevoke
        @reloadOtherAccount="reloadOtherAccount"
        :selectedRow="selectedRow"
      />

    </ShowModal>
  </safa-form>

</template>
<script>
import DutyOtherAccountNew from './DutyOtherAccountNew'
import DutyOtherAccountPayOffHisory from './DutyOtherAccountPayOffHisory'
import DutyOtherAccountRevoke from './DutyOtherAccountRevoke'
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin'
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
    results: Object,
    loadCancelOddment: Boolean
  },
  components: {
    DutyOtherAccountNew,
    DutyOtherAccountPayOffHisory,
    DutyOtherAccountRevoke
  },
  mounted () {
    let i = 0
    let nosaziCodeArray = this.results.NickNameNids
    nosaziCodeArray.forEach((item) => {
      this.nosaziCode.push({ ID: i++, Title: item })
    })
    this.reloadOddmentDuty()
  },
  methods: {
    saveForm () {
      this.$refs.DutyOtherAccountNew.save()
    },
    backMainForm () {
      this.mainForm = true
      this.isShowOtherAccounts = false
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
      // // console.log(val)
    },
    reloadOddmentDuty () {
      this.showLoading()
      let data = {
        pNid: this.results.NidJobList[this.code],
        pSysCiDutyType: 2,
        pUnLoadCancelOddment: this.loadCancelOddment
      }
      this.$services.SB.getDutyOddmentAccount(data)
        .then(({ data }) => {
          this.oddmentResult = this.getResponse(data)

          if (this.oddmentResult.success) {
            this.oddmentResults = this.oddmentResult.data
            this.reloadGetPayOffYear()
          }
        })
        .catch((response) => {
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
      this.$services.SB.getPayOffYear(data)
        .then(({ data }) => {
          this.payOfYearResult = this.getResponse(data)

          if (this.payOfYearResult.success) {
            this.payOfYearResults = this.payOfYearResult.data
            this.payOfYearResults.Duty_PayOffHistory.forEach((item) => {
              if (item.CI_DutyYear_Payoff === 0) {
                item.CI_DutyYear_Payoff = 'نامشخص'
              }
            })
            this.payOfYearResults.PayOffYear =
              this.payOfYearResults.PayOffYear || {}
            this.selectedDutyYear = this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newAccount () {
      this.isShowModal = true
      this.isEditable = true
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
      this.isShowModal = false
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
      this.$services.SB.setPayOffyear(data)
        .then(({ data }) => {
          this.setPayOffyearResult = this.getResponse(data)

          if (this.setPayOffyearResult.success) {
            if (!isDeleted) {
              this.showSuccess('تایید سال تسویه با موفقیت انجام پذیرفت')
            } else {
              this.showSuccess('حذف سال تسویه با موفقیت انجام پذیرفت')
            }
            this.reloadOddmentDuty()
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    accept () {
      this.showConfirm('آیا از تأیید سال تسویه اطمینان دارید؟').onOk(() => {
        if (
          this.selectedDutyYear <=
          this.payOfYearResults.PayOffYear.CI_DutyYear_Payoff
        ) {
          this.showError('ابتدا باید سال تسویه را حذف کنید.')
        } else {
          this.setPayOffYear(this.selectedDutyYear, false)
        }
      })
    },
    deletetYear () {
      this.showConfirm('آیا از حذف سال تسویه اطمینان دارید؟').onOk(() => {
        this.setPayOffYear(0, true)
      })
    },
    revoke () {
      this.showConfirm('آیا از ابطال حساب انتخاب شده اطمینان دارید؟').onOk(
        () => {
          if (this.selectedRow !== null) {
            this.isShowRevokeModal = true
          } else {
            this.showError('هیچ فیشی انتخاب نشده است')
          }
        }
      )
    },
    history () {
      this.isShowHistoryModal = true
    },
    click (event, dataItem, target) {
      this.selectedRow = dataItem
      if (dataItem.IsCancel) {
        this.disableRevokeBtn = true
      } else {
        this.disableRevokeBtn = false
      }
    }
  },

  watch: {
    loadCancelOddment () {
      this.reloadOddmentDuty()
    },
    code () {
      this.reloadOddmentDuty()
    }
  }
}
</script>
