<template>
  <fit>
    <safa-status :result="calcResult" />
    <div class="row items-end q-col-gutter-lg q-mb-sm">
      <safa-combo
        :sortFunc="sortCombo"
        ciName="CI_DutyYear"
        class="col-12 col-md-3 col-sm-4"
        domainName="CI_SaraM1"
        label=" سال شروع محاسبه "
        v-model="dutyYear"
      />
      <safa-text
        class="col-12 col-md-3 col-sm-4"
        label="تعداد کل کدهای دریافت شده "
        m="r"
        v-model="NidJobList.length"
      ></safa-text>
      <template v-if="showFromSetting">
        <safa-combo
          class="col-12 col-md-3 col-sm-4"
          label="دسته اطلاعاتی"
          sourceType="local"
          :options="infoGroupOptions"
          v-model="selectedInfoCategory"
          label-width="85px"
          @input="infoGroupSelectedItemChanged"
          v-if="isShowBaseInfoGroupCombo"
        />

        <safa-combo
          class="col-12 col-md-3 col-sm-4"
          label="شماره درخواست "
          v-model="selectedNidWorkItem"
          sourceType="local"
          :options="workItemList"
        />
      </template>
    </div>
    <q-separator />
    <div class="q-my-sm q-gutter-x-sm">
      <span>
        <q-btn
          color="primary"
          rounded
          size="sm"
          @click="handelSelectAll(true)"
          label="انتخاب همه"
        ></q-btn>
      </span>
      <span>
        <q-btn
          color="primary"
          outline
          rounded
          size="sm"
          @click="handelSelectAll(false)"
          >عدم انتخاب همه</q-btn
        >
      </span>
      <span>|</span>
      <span>
        تعداد آیتم های انتخاب شده:&nbsp;
        <q-badge color="primary" outline>{{ allSelectedRowsDetails }}</q-badge>
      </span>
      <span>|</span>
      <span
        :class="
          senfiSetting.SenfiSettingAvarez.ChkisSure ? 'isSure ' : 'notSure'
        "
      >
        وضعیت فعلی قطعیت در محاسبه:&nbsp;
        <q-badge outline rounded>{{
          senfiSetting.SenfiSettingAvarez.ChkisSure ? "قطعیت" : "عدم قطعیت"
        }}</q-badge>
      </span>
      <span>
        <q-btn color="grey" rounded size="sm" @click="loadSettings"
          >بازآوری تنظیمات</q-btn
        >
      </span>
      <span>
        <q-btn color="grey" rounded outline size="sm" @click="showSenfiSettings"
          >مشاهده تنظیمات</q-btn
        >
      </span>
    </div>
    <fit>
      <div
        :class="[
          'duty-calculation-wrapper q-py-sm rounded-borders overflow-hidden fit',
          $q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2',
        ]"
      >
        <div class="duty-calculation-list full-height overflow-auto">
          <!--<div v-if="!DutySessionHeaders || DutySessionHeaders.length === 0">
            <div :key="i" class="q-mb-md" v-for="i in 20">
              <q-skeleton height="56px" type="rect"/>
            </div>
          </div>-->
          <!-- {{DutySessionHeaders }} -->

          <q-intersection
            :class="
              'duty-status-' +
              getDutyStatusClass(item) +
              (item.selected ||
              (item.details && item.details.some((x) => x.selected))
                ? ' selected '
                : '') +
              (item.expanded ? ' expanded ' : '')
            "
            :key="i"
            class="duty-c-item"
            once
            style="min-height: 36px"
            transition="slide-down"
            v-for="(item, i) in DutySessionHeaders"
          >
            <div
              class="duty-row"
              :class="`${getDutyStatus(item) === 'تسویه' ? 'bg-red-2' : ''} ${getDutyStatus(item) === 'قطعیت' ? 'bg-green-2' : ''}`"
            >
              <div class="duty__expand q-ml-md">
                <q-btn
                  :icon="item.expanded ? 'expand_less' : 'expand_more'"
                  @click="item.expanded = !item.expanded"
                  color="grey"
                  flat
                  round
                />
              </div>
              <div class="duty__check text-center" style="min-width: 50px">
                <q-spinner-ios color="green" size="18px" v-if="item.loading" />
                <q-checkbox
                  :indeterminate-value="
                    item.details && item.details.some((x) => x.selected)
                  "
                  class="q-ma-none"
                  v-else
                  :value="item.selected"
                  @input="selectItemDetails($event, item)"
                />
              </div>
              <div class="duty__rownumber" style="min-width: 40px">
                <span v-if="item.details">{{ item.details.length }}</span>
              </div>
              <div class="duty-c-i-inner q-gutter-x-md">
                <div
                  style="min-width: 170px; text-align: center;font-weight: Bold"
                  title="کدنوسازی"
                >
                  <q-badge class="q-px-sm" color="primary" outline
                    >کدنوسازی: {{ item.NickNameNid }}</q-badge
                  >
                </div>
                <div class="duty-datetime text-dark">
                  <p class="q-mb-none" style="font-size: 11px;font-weight: Bold">
                    <q-icon name="event" size="14px" />
                    &nbsp;تاریخ محاسبه: {{ item.DateCalc }}
                  </p>
                  <p class="q-mb-none" style="font-size: 11px;font-weight: Bold">
                    <q-icon name="schedule" size="14px" />
                    &nbsp;زمان محاسبه: {{ item.TimeCalc }}
                  </p>
                </div>
                <div
                  style="min-width: 50px; text-align: center;font-weight: Bold"
                  title="سال محاسبه"
                >
                  <q-badge
                    :class="$q.dark.isActive ? 'bg-darken2' : 'bg-grey'"
                    >{{ item.CI_DutyYear }}</q-badge
                  >
                </div>
                <div style="min-width: 110px; font-weight: Bold;text-align: center" title="قیمت" class="text-dark">
                    قیمت: {{ item.Price.toLocaleString('fa-IR') }}
                </div>
                <div
                  class="duty-user text-dark"
                  style="min-width: 250px;font-weight: Bold"
                  title="کاربر"
                >
                  <q-icon name="person" size="sm" />
                  &nbsp;کاربر: {{ item.UserName }}
                </div>
                <div
                  :class="
                    getDutyStatus(item) === 'عدم قطعیت'
                      ? 'notSure text-center'
                      : 'isSure text-center'
                  "
                  style="min-width: 120px"
                >
                  <q-badge outline>{{ getDutyStatus(item) }}</q-badge>
                </div>
                <div class="duty-workitem text-dark" title="شماره بازدید">
                  شماره بازدید: {{ item.NidWorkItem }}
                </div>
              </div>
            </div>
            <q-slide-transition>
              <DutyAllCalculationSessionHeadersDetails
                :base-nosazi-code="baseNosaziCode"
                :formKey="formKey"
                :item="item"
                :name="name"
                :title="title"
                @loadData="loadData"
                v-if="item.expanded"
              />
            </q-slide-transition>
          </q-intersection>
        </div>
      </div>
    </fit>
    <!--    <pre dir="ltr">{{headerResults}}</pre>-->
    <!-- <fit v-if="false">
       <safa-datatable
         :allowMultipleSelection="true"
         @itemDetailClick="itemDetailClick"
         @selectedChange="selectedChange"
         fit
         height="100%"
         helper="dutyAllCalculation"
         max-height="100%"
         minHeight="100%"
         v-if="showDutyAllCalculation"
         v-model="DutySessionHeaders"
       />
       <fit v-else>
         <div class="row">
           <btn-default
             @click="handleHideDetail"
             class="q-mb-sm"
             label="بازگشت به تمام محاسبات"
           />
         </div>
         <fit>
           <safa-splitter
             class="fit"
             margin="0"
             v-model="gridSplitter"
           >
             <template v-slot:before>
               <fit className="q-pr-xs">
                 <safa-datatable
                   :allowMultipleSelection="true"
                   :selectable="true"
                   @itemDetailClick="getformula"
                   fit
                   height="100%"
                   helper="DutySessionDetails"
                   max-height="100%"
                   minHeight="100%"
                   ref="grid2"
                   title="جزییات "
                   v-model="calcDetailsResult.DutySessionDetails"
                 ></safa-datatable>
               </fit>
             </template>
             <template v-slot:after>
               <fit className="q-pl-xs">
                 <safa-datatable
                   :allowMultipleSelection="true"
                   :selectable="true"
                   fit
                   height="100%"
                   helper="dutyAllCalculationComments"
                   max-height="100%"
                   minHeight="100%"
                   ref="grid2"
                   v-model="logDetail"
                 ></safa-datatable>
               </fit>
             </template>
           </safa-splitter>
         </fit>
       </fit>
    </fit>-->
    <safa-popup
      title="محاسبه و صدور"
      v-model="isShowcalcAndExportModal"
      width="450px"
      height="320px"
    >
      <form-wrapper :loading="calcAndExportLoading">
        <DutyAllCalculationCalcAndExport
          :baseNosaziCode="baseNosaziCode"
          :dutyYear="dutyYear"
          :formKey="formKey"
          :name="name"
          :results="results"
          :selectedInfoCategory="selectedInfoCategory"
          :title="title"
          :senfiSettings="senfiSettings"
          :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
          @closeExportFichesModal="isShowcalcAndExportModal = false"
          @updateInnerLoading="(state) => calcAndExportLoading = state"
          ref="calcAndExport"
        />
        <template v-slot:footer>
          <div class="row q-gutter-sm">
            <btn-save label="تأیید" @click="confirmCalculate" :disabled="calcAndExportLoading" />
            <btn-cancel label="انصراف" @click="cancelCalAndExport" :disabled="calcAndExportLoading" />
          </div>
        </template>
      </form-wrapper>
    </safa-popup>

    <safa-popup
      title="صدور فیش"
      v-model="isShowFicheModal"
      height="260px"
      width="400px"
    >
      <form-wrapper :loading="ficheLoading">
        <DutyAllCalculationExportFiches
          :baseNosaziCode="baseNosaziCode"
          :dutyYear="dutyYear"
          :formKey="formKey"
          :district="baseNosaziCode.District"
          :isTempFiche="isTempFiche"
          :isSelectedAll="isSelectedAll"
          :name="name"
          :results="results"
          :selectedDetails="allSelectedRowsDetailsItems"
          :title="title"
          :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
          @closeExportFichesModal="isShowFicheModal = false"
          @updateInnerLoading="(state) => ficheLoading = state"
          ref="exportFiches"
        />
        <template v-slot:footer>
          <div class="row q-gutter-sm">
            <btn-save label="تأیید" @click="saveExportFiche" :disabled="ficheLoading" />
            <btn-cancel label="انصراف" @click="cancelExportFiche" :disabled="ficheLoading" />
          </div>
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      title="صدور فیش"
      v-model="isShowManualFicheModal"
      width="600px"
      height="500px"
    >
      <form-wrapper>
        <DutyAllCalculationManualFiche
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :results="results"
          :district="baseNosaziCode.District"
          :selectedInfoCategory="selectedInfoCategory"
          :title="title"
          :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
          @closeManualFicheModal="isShowManualFicheModal = false"
        />
        <template v-slot:footer>
          <div class="row q-gutter-md">
            <btn-save
              label="ذخیره"
              @click="saveTempFiche"
              icon="done"
            ></btn-save>
            <btn-cancel
              label="انصراف"
              @click="cancelTempFiche"
              icon="arrow_right_alt"
            ></btn-cancel>
          </div>
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      title="صدور فیش"
      v-model="isShowTempFicheModal"
      width="600px"
      height="500px"
    >
      <form-wrapper>
        <DutyAllCalculationManualFiche
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :isTempFiche="isTempFiche"
          :name="name"
          :results="results"
          :title="title"
          :district="baseNosaziCode.District"
          :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
          @closeExportFichesModal="isShowTempFicheModal = false"
          ref="manualFiche"
        />
        <template v-slot:footer>
          <div class="row q-gutter-md">
            <btn-save
              label="ذخیره"
              @click="saveTempFiche"
              icon="done"
            ></btn-save>
            <btn-cancel
              label="انصراف"
              @click="cancelTempFiche"
              icon="arrow_right_alt"
            ></btn-cancel>
          </div>
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      title="حق افتتاحیه شغل های فعال"
      v-model="isShowActiveJob"
      width="400px"
      height="200px"
    >
      <form-wrapper>
        <ActiveJobs
          :jobNameList="jobNameObj.JobName"
          ref="activeJobRef"
          @selctedJob="selctedJob"
        />
        <template v-slot:footer>
          <btn-default label="تأیید" class="q-mr-sm" @click="acceptCalculate" />
          <btn-default label="انصراف" @click="cancelCalculate" />
        </template>
      </form-wrapper>
    </safa-popup>
  </fit>
</template>
<script>
import DutyAllCalculationExportFiches from "./DutyAllCalculationExportFiches.vue"
import DutyAllCalculationCalcAndExport from "./DutyAllCalculationCalcAndExport.vue"
import DutyAllCalculationManualFiche from "./DutyAllCalculationManualFiche.vue"
import ActiveJobs from "./ActiveJobs.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import DutyAllCalculationSessionHeadersDetails from "./DutyAllCalculationSessionHeadersDetails"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  name: "DutyAllCalculation",
  mixins: [baseFormMixin],
  data: function () {
    return {
      workItemList: [],
      isSelectedAll: false,
      isMomayezi: false,
      showFromSetting: true,
      gridSplitter: 30,
      isShowActiveJob: false,
      logDetail: [],
      jobRequestResult: null,
      jobNameObj: { JobNames: [] },
      infoCategories: [
        {
          ID: 0,
          Title: "اطلاعات پرونده"
        },
        {
          ID: 1,
          Title: "بازدید"
        },
        {
          ID: 3,
          Title: " مجاز پایانکار "
        }
      ],
      calcResult: null,
      selectedItemsArray: [],
      isShowFicheModal: false,
      isShowcalcAndExportModal: false,
      isShowexportFichesModal: false,
      isShowTempFicheModal: false,
      isShowManualFicheModal: false,
      tmpSessionExceptPayyOff: [],
      tmpSessionExceptPayyOff2: [],
      isTempFiche: null,
      isSure: true,
      dutyYear: 0,
      selectedInfoCategory: 0,
      calcDetailsResult: { DutySessionDetails: [] },
      fetchCalcDetails: null,
      nidSessionFromCalcDetails: [],
      // selectedItem: {
      //   NidFK: '070e2aca-0150-42d6-8387-44c0fd35ad99',
      //   CI_DutyYear: 0
      // },
      selectedItem: null,
      nidWorkItemRequest: null,
      nidWorkItemObj: { NidWorkItems: [] },
      nidWorkItemMode: "r",
      selectedNidWorkItem: 0,
      showDutyAllCalculation: true,
      // results: {},
      DutySessionHeaders: [],
      list: null,
      detailsResult: {},
      showActiveJobs: false,
      nidSelcetedJob: null,
      senfiSetting: {
        SenfiSettingAvarez: {
          startcalcYear: "",
          minPrice: 0,
          ChktotalPrice: false,
          noOfDay: "",
          paymentDate: "",
          ChkisSure: false,
          ChkrevokeFiche: false,
          ChkyearForConfirmedYearlyFiche: false,
          ChkyearForConfirmedAllFiche: false,
          ChkyearForConfirmedinstallmentFiche: false,
          ChkrevokeFicheWhenConfirm: false,
          ChkrightOfOpening: false,
          ChkcalculatingBasedOnRevisit: false,
          ChkotherAccountOfSenfi: false,
          ChkshowErrorOfFinancialSys: false,
          ChkrevokeConfirmedfiche: false
        },
        SenfiSettingUser: {
          ChkshowAvarezInNewWindow: false,
          ChkshowAllAvarezInNewWindow: false
        }
      },
      ficheLoading: false,
      calcAndExportLoading: false
    }
  },

  computed: {
    /* allSelectedRows () {
        return this.DutySessionHeaders.filter(x => x.selected).length
      }, */
    allSelectedRowsDetails () {
      return this.DutySessionHeaders.filter(
        (x) => x.details && x.details.length > 0
      ).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.details.filter((x) => x.selected).length,
        0
      )
    },
    allSelectedRowsDetailsItems () {
      return this.DutySessionHeaders.filter(
        (x) => x.details && x.details.length > 0
      ).reduce((accumulator, item) => {
        if (item && item.details) {
          const selectedItems = item.details.filter((x) => x.selected)
          accumulator = [...accumulator, ...selectedItems]
        }
        return accumulator
      }, [])
    },
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").isShowBaseInfoGroupCombo
    },
    infoGroupOptions () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").infoGroupOptions
    }
  },
  props: {
    NidJobList: Array,
    baseNosaziCode: Object,
    results: Object,
    categoryInfoMode: String,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    }
  },
  components: {
    DutyAllCalculationSessionHeadersDetails,
    DutyAllCalculationExportFiches,
    DutyAllCalculationCalcAndExport,
    DutyAllCalculationManualFiche,
    ActiveJobs
  },
  watch: {
    async selectedInfoCategory () {
      this.$emit("sendinfoCategory", this.selectedInfoCategory)
      this.nidWorkItemMode = "r"
      if (this.selectedInfoCategory === 1) {
        this.nidWorkItemMode = "e"
        await this.getNidWorkItems()
        if (this.workItemList.length > 0) {
          this.selectedNidWorkItem = this.workItemList[0].ID
        }
      }
    }
  },

  methods: {
    async getSettingData () {
      try {
        const getSettingDataResult = await this.loadFormSetting(
          "Sharsazi-PersonalSetting"
        )
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.showFromSetting = false
          this.isMomayezi = true
        } else {
          this.isMomayezi = false
          this.showFromSetting = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    selctedJob (value) {
      this.nidSelcetedJob = value
    },
    loadData (item) {
      this.loadDetails(item)
    },
    async loadDetails (item) {
      return new Promise((resolve) => {
        if (!item.details) {
          item.loading = true
          this.nidSessionFromCalcDetails = []
          let payload = {
            pNid: item.NidFK,
            pDutyYear: item.CI_DutyYear,
            pSysCiDutyType: 2
          }
          this.$services.SB.getDutyCalculateDetails(payload, {
            config: { District: this.baseNosaziCode.District }
          })
            .then(async ({ data }) => {
              this.detailsResult = this.getResponse(data)

              if (this.detailsResult.success) {
                // console.log('detailsResult', this.detailsResult)
                item.details = this.detailsResult.data.DutySessionDetails.map(
                  (x) => {
                    return {
                      ...x,
                      selected: item.selected
                    }
                  }
                )
                // this.nidSessionFromCalcDetails = item.details.map(x => x.NidSession)
                this.updateNidSession(item)
                await this.log({
                  action: this.logActions.view,
                  bizCode: '',
                  bizCodeTitle: '',
                  saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
                })
              }
            })
            .catch((err) => {
              this.serverError()
              console.error(err)
            })
            .finally(() => {
              item.loading = false
              return resolve()
            })
        } else {
          return resolve()
        }
      })
    },
    handelSelectAll (isSelected) {
      // this.DutySessionHeaders = this.DutySessionHeaders.map(m => {
      //   return {
      //     ...m,
      //     selected: isSelected,
      //     details: null
      //   }
      // })
      // if (isSelected) {
      //   this.DutySessionHeaders.forEach(item => this.loadDetails(item))
      // } else {
      //   this.DutySessionHeaders = this.DutySessionHeaders.map(m => {
      //     return {
      //       ...m,
      //       details: null
      //     }
      //   })
      // }
      this.isSelectedAll = true
      this.DutySessionHeaders.forEach((item) => {
        this.selectItemDetails(isSelected, item)
      })
    },
    saveTempFiche () {
      this.$refs.manualFiche.save()
    },
    cancelTempFiche () {
      this.$refs.manualFiche.cancel()
    },
    saveExportFiche () {
      this.$refs.exportFiches.save()
    },
    cancelExportFiche () {
      this.$refs.exportFiches.cancel()
    },
    confirmCalculate () {
      this.$refs.calcAndExport.save()
    },
    cancelCalAndExport () {
      this.$refs.calcAndExport.cancel()
    },
    async selectItemDetails (selected, item) {
      item.selected = selected
      // if (!item.details) item.expanded = true
      if (!item.details) {
        await this.loadDetails(item)
      }
      this.selectedItemsArray.push(item)
      if (item.details) {
        item.details.forEach((detail) => {
          detail.selected = selected
        })
        this.updateNidSession(item)
      }
    },
    updateNidSession (item) {
      if (item.selected) {
        if (item.details && item.details.length > 0) {
          item.details.forEach((j) => {
            this.nidSessionFromCalcDetails.push(j.NidSession)
          })
        }
      } else {
        if (item.details && item.details.length > 0) {
          item.details.forEach((j) => {
            this.nidSessionFromCalcDetails =
              this.nidSessionFromCalcDetails.filter(
                (id) => id !== j.NidSession
              )
          })
        }
      }
    },
    getDutyStatus (item) {
      // if item.CI_DutyYear < item.CI_DutyYear_Payoff
      if (
        item.CI_DutyYear < item.CI_DutyYear_Payoff ||
        item.CI_DutyYear === item.CI_DutyYear_Payoff
      ) {
        return "تسویه"
      } else if (item.IsSure) {
        return "قطعیت"
      } else {
        return "عدم قطعیت"
      }
    },
    getDutyStatusClass (item) {
      if (item.CI_DutyYear < item.CI_DutyYear_Payoff) {
        return "0"
      } else if (item.IsSure) {
        return "1"
      } else {
        return "-1"
      }
    },
    getformula (e) {
      let arrayOfClsLog = converter.xml2json(e.dataItem.CalculateLog)
      const clsLog = JSON.parse(arrayOfClsLog)
      this.logDetail = clsLog.ArrayOfClsLog.ClsLog
      this.logDetail = this.logDetail.map((x) => {
        return {
          ...x,
          Subject: x.Subject._text,
          Value: x.Value._text,
          Comment: x.Comment._text
        }
      })
    },
    getNidWorkItems () {
      this.$emit('updateInnerLoading', true)
      this.workItemList = []
      let payload = {
        pNidFk: this.DutySessionHeaders[0].NidFK,
        pSysCiDutyType: 2
      }

      this.$services.SB.getNidWorkItems(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.nidWorkItemRequest = this.getResponse(data)

          if (this.nidWorkItemRequest.success) {
            this.nidWorkItemObj = this.nidWorkItemRequest.data
            this.nidWorkItemObj.NidWorkItems.forEach((x) => {
              this.workItemList.push({
                ID: x.NidProc,
                Title: x.NidWorkItem,
                revisitID: x.NidRevisit
              })
            })
            this.selectedNidWorkItem = this.workItemList[0]
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.$emit('updateInnerLoading', false)
        })
    },
    infoGroupSelectedItemChanged (e) {
      this.$emit("infoGroupSelectedItemChanged", e)
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
      // // console.log(val)
    },
    selectedChange (e) {
      this.selectedItemsArray = e.selectedItems
    },
    itemDetailClick (selectedItems) {
      this.showDutyAllCalculation = false
      this.calcResult = null
      this.selectedItemsArray.push(selectedItems.dataItem)
      this.selectedItem = selectedItems.dataItem
      this.getDutyCalculateDetails()

      // console.log('////@@@@this.selectedNidWorkItem', this.selectedNidWorkItem)
      //
      // console.log('////@@@@this.selectedItem', selectedItems)

      if (!this.selectedItem.NidWorkItem) {
        this.selectedNidWorkItem = 0
      } else if (this.selectedItem.NidWorkItem) {
        this.selectedNidWorkItem = this.selectedItem.NidWorkItem
      }
    },
    handleHideDetail () {
      this.showDutyAllCalculation = true
    },
    getDutyCalculateDetails () {
      /* this.showDutyAllCalculation = false
        this.showLoading()
        let payload = {
          pNid: this.selectedItem.NidFK,
          pDutyYear: this.selectedItem.CI_DutyYear,
          pSysCiDutyType: 2
        }
        console.log('show details: ', payload)

        this.$services.SB.getDutyCalculateDetails(payload, { config: { District: this.baseNosaziCode.District } })
          .then(({ data }) => {
            this.fetchCalcDetails = this.getResponse(data)

            console.log('getDutyCalculateDetails: ', this.fetchCalcDetails)
            if (this.fetchCalcDetails.success) {
              this.calcDetailsResult = this.fetchCalcDetails.data
              this.calcDetailsResult.DutySessionDetails.map((x) => {
                this.nidSessionFromCalcDetails.push(x.NidSession)
                x.selected = true
                return x
              }
              )
              // console.log('*********************', this.nidSessionFromCalcDetails)
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )

              await this.log({
                action: this.logActions.calculate,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی'
              })
            }
          })
          .catch((response) => {
            this.calcResult = this.getResponse(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          }) */
    },
    getDutyCalculateHeaders (NidJobList) {
      debugger
      let payload = {
        pNidList: NidJobList || this.NidJobList,
        pSysCiDutyType: 2
      }
      this.$services.SB.getDutyCalculateHeaders(payload, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.headerResult = this.getResponse(data)

          if (this.headerResult.success) {
            this.headerResults = data
            if (this.headerResults && this.headerResults.DutySessionHeaders) {
              this.DutySessionHeaders =
                this.headerResults.DutySessionHeaders.map((x) => {
                  if (x.CI_DutyYear < x.CI_DutyYear_Payoff) {
                    x.class = "settlement-nosazi"
                  }
                  if (x.IsSure) {
                    x.class = "certainty-nosazi"
                  }
                  x.selected = false
                  x.expanded = false
                  x.loading = false
                  x.details = null
                  return x
                })
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {})
    },

    calculate () {
      if (this.showActiveJobs) {
        this.isShowActiveJob = true
        this.getJobName()
      } else {
        this.calculateDuty()
      }
    },
    getJobName () {
      this.$emit('updateInnerLoading', true)

      let payLoad = {
        pNidJobList: this.results.NidJobList
      }

      this.$services.SB.getJobNames(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.jobRequestResult = this.getResponse(data)

          if (this.jobRequestResult.success) {
            this.jobNameObj = this.jobRequestResult.data
            this.jobNameObj.JobName = this.jobNameObj.JobNames.map((x) => {
              return {
                ...x,
                ID: x.NidJob,
                Title: x.JobUnitName
              }
            })
            if (this.jobNameObj.JobNames.some(jobName => jobName !== undefined)) {
              this.$refs.activeJobRef.$refs.jobcmbRef.selectOption(this.jobNameObj.JobNames.map(x => x.NidJob)[0], 0)
            }

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          }
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.$emit('updateInnerLoading', false)
        })
    },
    acceptCalculate () {
      this.isShowActiveJob = false
      this.calculateDuty()
    },
    cancelCalculate () {
      this.isShowActiveJob = false
      this.calculateDuty()
    },
    async calculateDuty () {
      debugger
      this.calcResult = null
      let pRequestNidWorkItem = 0
      let pRequestNidProc = "00000000-0000-0000-0000-000000000000"
      let pRequestNidRevisit = "00000000-0000-0000-0000-000000000000"
      if (this.selectedNidWorkItem) {
        pRequestNidWorkItem = this.selectedNidWorkItem.Title
        pRequestNidProc = this.selectedNidWorkItem.ID
        pRequestNidRevisit = this.selectedNidWorkItem.revisitID
      }
      this.$emit('updateInnerLoading', true)
      const payload = {
        pNidProc: pRequestNidProc,
        pNidList: this.NidJobList,
        pFromYear: this.dutyYear,
        pUser: this.currentUser,
        pSysCiDutyType: 2,
        pInfoGroup: this.selectedInfoCategory,
        pIsMomayezi: this.isMomayezi,
        pRevisit: pRequestNidRevisit,
        pNidWorkItem: pRequestNidWorkItem,
        pSelectedNidJob: this.nidSelcetedJob,
        // pDoFinal: typeof this.senfiSetting?.SenfiSettingAvarez?.ChkisSure === 'boolean' ? this.senfiSetting?.SenfiSettingAvarez?.ChkisSure : false
        pDoFinal: this.senfiSetting?.SenfiSettingAvarez?.ChkisSure ?? false
      }
      try {
        // this.$services.SB.calculateDuty(data, { config: { District: this.baseNosaziCode.District } })
        //   .then(async ({ data }) => {
        //     this.calcResult = this.getResponse(data)

        const { data } = await this.$services.SB.calculateDuty(payload, {
          config: { District: this.baseNosaziCode.District }
        })
        this.calcResult = this.getResponse(data)
        if (this.calcResult.success) {
          if (this.calcResult.data.IsCalculateOK) {
            this.showSuccess("محاسبه با موفقیت انجام پذیرفت.")
            this.getDutyCalculateHeaders()
          } else {
            this.showError('محاسبه انجام نشد.')
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.$emit('updateInnerLoading', false)
      }
    },
    fiche () {
      if (this.allSelectedRowsDetails === 0) {
        this.showError("هیچ محاسبه ای انتخاب نشده است.")
      } else if (
        !this.DutySessionHeaders.some(
          (x) => x.CI_DutyYear > x.CI_DutyYear_Payoff
        )
      ) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
      } else {
        this.isShowFicheModal = true
        this.isTempFiche = false
      }
      this.tmpSessionExceptPayyOff = this.allSelectedRowsDetailsItems
      // if (this.allSelectedRowsDetailsItems.length > 0) {
      //   this.allSelectedRowsDetailsItems.forEach((item) => {
      //     if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
      //       this.tmpSessionExceptPayyOff.push(item)
      //     }
      //   })
      // }
      /*
        if (this.selectedItemsArray.length === 0) {
          this.showError('هیچ محاسبه ای انتخاب نشده است.')
        } else if (this.tmpSessionExceptPayyOff.length === 0) {
          this.showError('محاسبه های انتخاب شده در سال تسویه هستند.')
        } else {
          this.isShowFicheModal = true
          this.isTempFiche = false
        } */
    },

    calcAndExport () {
      this.isShowcalcAndExportModal = true
    },

    tempFiche () {
      this.tmpSessionExceptPayyOff = []
      this.allSelectedRowsDetailsItems.forEach((item) => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.allSelectedRowsDetailsItems.length === 0) {
        this.showError("هیچ محاسبه ای انتخاب نشده است.")
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
      } else {
        this.isShowTempFicheModal = true
        this.isTempFiche = true
      }
    },

    setIsSure (isSure) {
      this.showLoading()
      let nidSessionList = []
      // this.selectedItemsArray
      debugger
      this.selectedItemsArray.forEach((item) => {
        item.details.forEach((element) => {
          nidSessionList.push(element.NidSession)
        })
      })
      let data = {
        PNidSessionList: nidSessionList,
        PIsSure: isSure
      }

      this.$services.SB.setIsSure(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.calcResult = this.getResponse(data)

          if (this.calcResult.success) {
            if (isSure) {
              this.showSuccess("قطعیت محاسبات با موفقیت انحام پذیرفت")
            } else {
              this.showSuccess(" عدم قطعیت محاسبات با موفقیت انحام پذیرفت")
            }
            this.getDutyCalculateHeaders()
          }
        })
        .catch((response) => {
          this.calcResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    certainty () {
      if (this.allSelectedRowsDetailsItems.length === 0) {
        this.showError("لطفا حداقل یک سال را برای قطعیت انتخاب نمایید.")
      } else {
        this.showConfirm("آیا از قطعی کردن محاسبه مطمئن هستید؟").onOk(() => {
          this.setIsSure(true)
        })
      }
    },

    uncertainty () {
      if (this.allSelectedRowsDetailsItems.length === 0) {
        this.showError("لطفا حداقل یک سال را برای عدم قطعیت انتخاب نمایید.")
      } else {
        this.showConfirm("آیا ازعدم قطعیت محاسبه مطمئن هستید؟").onOk(() => {
          this.setIsSure(false)
        })
      }
    },
    deleteFiche () {
      this.tmpSessionExceptPayyOff = []
      this.tmpSessionExceptPayyOff2 = []
      this.allSelectedRowsDetailsItems.forEach((item) => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.allSelectedRowsDetailsItems.length === 0) {
        this.showError("لطفا حداقل یک سال را برای حذف کردن انتخاب نمایید.")
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
      } else {
        this.tmpSessionExceptPayyOff.forEach((item) => {
          if (!item.IsSure) {
            this.tmpSessionExceptPayyOff2.push(item)
          }
        })
        if (this.tmpSessionExceptPayyOff2.length === 0) {
          this.showError("محاسبات انتخاب شده قطعی شده اند.")
        } else {
          this.showConfirm("آیا از حذف محاسبات انتخاب شده اطمینان دارید؟").onOk(
            () => {
              let payload = {
                pNidSessions: this.nidSessionFromCalcDetails
              }

              this.$services.SB.deleteSession(payload, {
                config: { District: this.baseNosaziCode.District }
              })
                .then(async ({ data }) => {
                  this.calcResult = this.getResponse(data)

                  if (this.calcResult.success) {
                    this.nidSessionFromCalcDetails = []
                    this.showSuccess("محاسبات انتخاب شده با موفقیت حذف شدند.")
                    this.getDutyCalculateHeaders()
                  }
                })
                .catch((response) => {
                  this.serverError()
                })
                .finally(() => {
                  this.hideLoading()
                })
            }
          )
        }
      }
    },
    showSenfiSettings () {
      this.showSidebar("USenfiSettingsTabs", {
        popup: true,
        title: "تنظیمات صنفی",
        width: "400px",
        height: "650px"
      })
    },
    async loadSettings () {
      this.senfiSetting = await this.loadFormSetting("SenfiSettings", {
        nidProc: GLOBAL_SETTINGS_GUID,
        defaultValue: this.senfiSetting
      })
      this.showActiveJobs =
        this.senfiSetting.SenfiSettingAvarez.ChkrightOfOpening || false
    }
  },
  async created () {
    const result = await this.loadFormSetting("SenfiSettings", {
      nidProc: GLOBAL_SETTINGS_GUID
    })
    this.dutyYear = parseInt(result.SenfiSettingAvarez.startcalcYear)
    await this.loadSettings()
  }
}
</script>
<style lang="scss">
.isSure .q-badge {
  border-color: #00c853;
  color: #00c853;
}

.notSure .q-badge {
  border-color: #ffc107;
  color: #ffc107;
}
</style>
