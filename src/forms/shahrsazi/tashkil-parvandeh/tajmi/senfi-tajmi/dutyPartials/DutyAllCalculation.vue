<template>
  <safa-form
    id="4c39d37b-42a1-4cd5-af59-ef85f890e069"
    caption="صنفی موردی"
  >
    <!-- <div> -->
    <safa-status :result="calcResult"></safa-status>
    <fit>
      <div class="row q-col-gutter-md q-mb-sm">
        <div class="col-12 col-md-3 col-sm-6">
          <safa-combo
            label=" سال شروع محاسبه "
            domainName="CI_SaraM1"
            ciName="CI_DutyYear"
            v-model="dutyYear"
            :labelWidth="$q.screen.gt.sm ? 'auto' : '135px'"
            :sortFunc="sortCombo"
          >
          </safa-combo>
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-text
            label="تعداد کل شغل های یافت شده "
            v-model="results.NidJobList.length"
            m="r"
            :labelWidth="$q.screen.gt.sm ? 'auto' : '145px'"
          >
          </safa-text>
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-combo
            label="دسته اطلاعاتی "
            sourceType="local"
            :options="infoCategories"
            v-model="selectedInfoCategory"
            :m="categoryInfoMode"
            :labelWidth="$q.screen.gt.sm ? 'auto' : '135px'"
          >
          </safa-combo>
        </div>
        <div class="col-12 col-md-3 col-sm-6">
          <safa-text
            label="شماره درخواست "
            v-model="headerResults.NidWorkItems"
            m="r"
            :labelWidth="$q.screen.gt.sm ? 'auto' : '145px'"
          >
          </safa-text>
        </div>
      </div>
      <!-- <fit> -->
      <safa-datatable
        helper="senfiMoreidAllCalculation"
        v-model="headerResultsAllCalculate"
        :allowMultipleSelection="true"
        :show-selected-checkbox="true"
        @selectedChange="selectedChange"
        :hideHeader="true"
        detail="myTemplate"
        @expandchange="expandChange"
        :expand-field="'expanded'"
        fit
        min-height="200px"
        height="100%"
        title="تمام محاسبات"
      >
        <template v-slot:myTemplate="{ props }">
          <td :class="props.className">
            {{ props }}
            Master Details
          </td>
        </template>
      </safa-datatable>
      <!-- </fit> -->
      <!-- </fit> -->
      <!-- <div class="form-row">
        <safa-datatable
          helper="senfiMoreidAllCalculation"
          v-model="headerResults.DutySessionHeaders"
          :allowMultipleSelection="true"
          :show-selected-checkbox="true"
          @selectedChange="selectedChange"
          :hideHeader="true"
          detail="myTemplate"
          @expandchange="expandChange"
          :expand-field="'expanded'"
          maxHeight="30vh"
        >
          <template v-slot:myTemplate="{ props }">
            <td :class="props.className">
              {{ props }}
              Master Details
            </td>
          </template>
        </safa-datatable>
      </div> -->
      <!-- <template v-slot:footer></template> -->
      <div class="row q-gutter-sm q-mt-xs">
        <safa-securityPanel
          id="f75cd61e-4dc9-42ec-82e3-5a0406027d85"
          caption="محاسبه"
        >
          <btn-default
            label="محاسبه"
            @click="calculate()"
          ></btn-default>
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
        </safa-securityPanel>
        <safa-securityPanel
          id="40504904-94ef-45b0-a675-127892566077"
          caption="صدور فیش"
        >
          <btn-default
            label="صدور فیش"
            @click="fiche"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="43ae412e-13e2-437e-970a-94057226c669"
          caption="صدور قسطی"
        >
          <btn-default
            label="صدور قسطی"
            class="btn-default"
            @click="tempFiche"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="1e19af2f-4888-4705-8140-f341d4ed915b"
          caption="قطعیت محاسبه"
        >
          <btn-default
            label="قطعیت"
            class="btn-default"
            @click="certainty"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="e5ba5354-0f1b-4d26-9432-158b54c25543"
          caption="عدم قطعیت محاسبه"
        >
          <btn-default
            label="عدم قطعیت"
            class="btn-default"
            @click="uncertainty"
          ></btn-default>
        </safa-securityPanel>
        <safa-securityPanel
          id="e4e1f372-68b7-4f5a-a274-8d3d58707c6d"
          caption="حذف محاسبه"
        >
          <btn-delete @click="deleteFiche"></btn-delete>
        </safa-securityPanel>
      </div>
    </fit>
    <ShowModal
      width="30%"
      v-model="isShowCalculate"
      title="حق افتتاحیه شغلهای فعال"
      @onCloseModal="isShowCalculate = false"
    >
      <JobCalculation @closeExportFichesModal="isShowCalculate = false" />
       <template v-slot:footer>
        <div class="row q-gutter-sm q-my-sm ">
          <btn-save
            label="تایید"
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
      v-model="isShowFicheModal"
      title="صدور فیش"
      @onCloseModal="isShowFicheModal = false"
    >
      <DutyAllCalculationExportFiches
        @closeExportFichesModal="isShowFicheModal = false"
        :results="results"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        :isTempFiche="isTempFiche"
      />
    </ShowModal>
    <ShowModal
      :show="isShowcalcAndExportModal"
      @hide="isShowcalcAndExportModal = false"
      title="صدور فیش"
      @onCloseModal="isShowcalcAndExportModal = false"
    >
      <DutyAllCalculationCalcAndExport
        @closeExportFichesModal="isShowcalcAndExportModal = false"
        :results="results"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        :dutyYear="dutyYear"
      />
    </ShowModal>
    <ShowModal
      :show="isShowTempFicheModal"
      @hide="isShowTempFicheModal = false"
      title="صدور فیش"
      @onCloseModal="isShowTempFicheModal = false"
    >
      <DutyAllCalculationExportFiches
        @closeExportFichesModal="isShowTempFicheModal = false"
        :results="results"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        :isTempFiche="isTempFiche"
      />
    </ShowModal>
    <ShowModal
      :show="isShowManualFicheModal"
      @hide="isShowManualFicheModal = false"
      title="صدور فیش"
      @onCloseModal="isShowManualFicheModal = false"
    >
      <DutyAllCalculationManualFiche
        @closeManualFicheModal="isShowManualFicheModal = false"
        :results="results"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        :baseNosaziCode="baseNosaziCode"
      />
    </ShowModal>
    <!-- </div> -->
    <!-- </fit> -->
  </safa-form>
</template>
<script>
import DutyAllCalculationExportFiches from './DutyAllCalculationExportFiches'
import DutyAllCalculationCalcAndExport from './DutyAllCalculationCalcAndExport'
import DutyAllCalculationManualFiche from './DutyAllCalculationManualFiche'
import JobCalculation from './JobCalculation'
import loaderMixin from 'src/mixins/loaderMixin'
import messageMixin from 'src/mixins/messageMixin'
import baseFormMixin from 'src/mixins/baseFormMixin/'

export default {
  mixins: [loaderMixin, messageMixin, baseFormMixin],
  components: {
    DutyAllCalculationExportFiches,
    DutyAllCalculationCalcAndExport,
    DutyAllCalculationManualFiche,
    JobCalculation
  },
  data: function () {
    return {
      isShowCalculate: false,
      infoCategories: [
        {
          ID: 0,
          Title: 'اطلاعات پرونده'
        },
        {
          ID: 2,
          Title: 'بازدید'
        },
        {
          ID: 3,
          Title: ' مجاز پایانکار '
        }
      ],
      calcResult: null,
      selectedItemsArray: [],
      isShowFicheModal: false,
      isShowcalcAndExportModal: false,
      isShowTempFicheModal: false,
      isShowManualFicheModal: false,
      tmpSessionExceptPayyOff: [],
      tmpSessionExceptPayyOff2: [],
      isTempFiche: null,
      isSure: true,
      dutyYear: 1400,
      selectedInfoCategory: 0,
      test: []
    }
  },
  props: {
    headerResults: Object,
    results: Object,
    baseNosaziCode: Object,
    categoryInfoMode: String,
    headerResultsAllCalculate: Array
  },

  methods: {
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
      // // console.log(val)
    },
    expandChange (event) {
      // console.log(event)
      this.$set(event.dataItem, event.target.$props.expandField, event.value)
      // const list = this.headerResults.DutySessionHeaders.slice()
      // this.headerResults.DutySessionHeaders.findIndex()
    },
    selectedChange (selectedItems) {
      this.calcResult = null
      this.selectedItemsArray = selectedItems.selectedItems
      // console.log(this.selectedItemsArray)
    },
    calculate () {
      this.isShowCalculate = true
      let result = {
        pNidList: this.results.NidJobList
      }
      this.$services.SB.GetJobNames(result)
        .then(({ result }) => {
          this.jobNamesResult = this.getResponse(result)
          if (this.jobNamesResult.success) {
            this.showSuccess('لیست شغل ها بارگذاری شد.')
          }
        })
        .catch(response => {
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    //   this.calcResult = null
    //   this.showLoading()
    //   let data = {
    //     pNidProc: '00000000-0000-0000-0000-000000000000',
    //     pNidList: this.results.NidJobList,
    //     pFromYear: 1380,
    //     pUser: this.currentUser,
    //     pSysCiDutyType: 2,
    //     pInfoGroup: 0,
    //     pIsMomayezi: false,
    //     pRevisit: '00000000-0000-0000-0000-000000000000',
    //     pNidWorkItem: 0,
    //     pDoFinal: false,
    //     pSelectedNidJob: []
    //   }

    //   this.$services.SB.calculateDuty(data)
    //     .then(({ data }) => {
    //       this.calcResult = this.getResponse(data)

    //       if (this.calcResult.success) {
    //         this.showSuccess('محاسبه با موفقیت انجام پذیرفت.')
    //       }
    //     })
    //     .catch(response => {
    //       this.calcResult = this.getResponse(response)
    //       this.serverError()
    //     })
    //     .finally(() => {
    //       this.hideLoading()
    //     })

    fiche () {
      this.tmpSessionExceptPayyOff = []
      this.selectedItemsArray.forEach(item => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.selectedItemsArray.length === 0) {
        this.showError('هیچ محاسبه ای انتخاب نشده است.')
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError('محاسبه های انتخاب شده در سال تسویه هستند.')
      } else {
        this.isShowFicheModal = true
        this.isTempFiche = false
      }
    },

    calcAndExport () {
      this.isShowcalcAndExportModal = true
    },

    tempFiche () {
      this.tmpSessionExceptPayyOff = []
      this.selectedItemsArray.forEach(item => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.selectedItemsArray.length === 0) {
        this.showError('هیچ محاسبه ای انتخاب نشده است.')
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError('محاسبه های انتخاب شده در سال تسویه هستند.')
      } else {
        this.isShowTempFicheModal = true
        this.isTempFiche = true
      }
    },
    setIsSure (isSure) {
      this.showLoading()
      let nidSessionList = []
      this.selectedItemsArray.forEach((item) => {
        item.details.forEach(element => {
          nidSessionList.push(element.NidSession)
        })
      })
      let data = {
        PNidSessionList: nidSessionList,
        PIsSure: isSure
      }

      this.$services.SB.setIsSure(data)
        .then(({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            if (isSure) {
              this.showSuccess('قطعیت محاسبات با موفقیت انحام پذیرفت')
            } else {
              this.showSuccess(' عدم قطعیت محاسبات با موفقیت انحام پذیرفت')
            }
            this.$emit('reloadAllCalculation')
          }
        })
        .catch(response => {
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    certainty (isSure) {
      if (this.selectedItemsArray.length === 0) {
        this.showError('لطفا حداقل یک سال را برای قطعیت انتخاب نمایید.')
      } else {
        this.showConfirm('آیا از قطعی کردن محاسبه مطمئن هستید؟').onOk(() => {
          this.setIsSure(true)
        })
      }
    },
    uncertainty () {
      if (this.selectedItemsArray.length === 0) {
        this.showError('لطفا حداقل یک سال را برای عدم قطعیت انتخاب نمایید.')
      } else {
        this.showConfirm('آیا ازعدم قطعیت محاسبه مطمئن هستید؟').onOk(() => {
          this.setIsSure(false)
        })
      }
    },
    deleteFiche () {
      this.tmpSessionExceptPayyOff = []
      this.tmpSessionExceptPayyOff2 = []
      this.selectedItemsArray.forEach(item => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.selectedItemsArray.length === 0) {
        this.showError('هیچ محاسبه ای انتخاب نشده است.')
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError('محاسبه های انتخاب شده در سال تسویه هستند.')
      } else {
        this.tmpSessionExceptPayyOff.forEach(item => {
          if (!item.IsSure) {
            this.tmpSessionExceptPayyOff2.push(item)
          }
        })
        if (this.tmpSessionExceptPayyOff2.length === 0) {
          this.showError('محاسبات انتخاب شده قطعی شده اند.')
        } else {
          this.showConfirm('آیا از حذف محاسبات انتخاب شده اطمینان دارید؟').onOk(
            () => {
              let nidSessionList = []
              this.selectedItemsArray.forEach(item => {
                nidSessionList.push(item.NidSession)
              })
              let data = {
                pNidSessions: nidSessionList
              }

              this.$services.SB.deleteSession(data)
                .then(({ data }) => {
                  this.calcResult = this.getResponse(data)

                  if (this.calcResult.success) {
                    this.showSuccess('محاسبات انتخاب شده با موفقیت حذف شدند.')
                    this.$emit('reloadAllCalculation')
                  }
                })
                .catch(response => {
                  this.serverError()
                })
                .finally(() => {
                  this.hideLoading()
                })
            }
          )
        }
      }
    }
  }
}
</script>
