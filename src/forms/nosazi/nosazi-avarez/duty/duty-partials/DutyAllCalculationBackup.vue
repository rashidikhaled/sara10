<template>
  <!-- <form-wrapper :loading="loading"> -->
  <fit>
    <safa-status :result="calcRes" />
    <safa-status :result="setIsSureRes" />
    <safa-status :result="deleteSessionRes" />
    <safa-status :result="getNidWorkItemsRes" />
    <safa-status :result="getDutyCalculateDetailsRes" />
    <safa-status :result="calcHeadersRes" />

      <div class="row items-end q-col-gutter-lg q-mb-sm">
        <safa-combo
          ref="refDutyYear"
          v-model="dutyYear"
          :sortFunc="sortCombo"
          ciName="CI_DutyYear"
          class="col-12 col-md-3 col-sm-4"
          domainName="CI_SaraM1"
          label=" سال شروع محاسبه "
        />
        <safa-text
          v-model="NidList.length"
          class="col-12 col-md-3 col-sm-4"
          label="تعداد کل کدهای دریافت شده "
          m="r"
        />
        <template v-if="showFromSetting">
          <safa-combo
            v-if="isShowBaseInfoGroupCombo"
            v-model="selectedInfoCategory"
            :options="infoGroupOptions"
            class="col-12 col-md-3 col-sm-4"
            label="دسته اطلاعاتی"
            label-width="85px"
            sourceType="local"
            @input="infoGroupSelectedItemChanged"
          />
          <safa-combo
            ref="workItem"
            v-model="selectedNidWorkItem"
            :m="nidWorkItemMode"
            :options="workItemList"
            class="col-12 col-md-3 col-sm-4"
            label="شماره درخواست "
            sourceType="local"
          />
        </template>
      </div>
      <q-separator />
      <div class="q-my-sm q-gutter-x-sm">
        <span>
          <q-btn
            color="primary"
            label="انتخاب همه"
            rounded
            size="sm"
            @click="handelSelectAll(true)"
          />
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
          <q-badge color="primary" outline>
            {{ allSelectedRowsDetails }}
          </q-badge>
        </span>
        <span>|</span>
        <span>
          مجموع مبالغ: &nbsp;
          <q-badge color="primary" outline>
            {{ totalAmount }}
          </q-badge>
        </span>
        <span>|</span>
        <span>
          <q-btn
            color="primary"
            rounded
            outline
            size="sm"
            @click="handelReversAll()"
          >
            {{ reverseTxt }}
          </q-btn>
        </span>
      </div>
      <q-separator />
<!--      <div class="duty_cols_responsive">
        <div class="duty_cols_wrap flex flex-nowrap">
          <div class="duty_col_start col-auto"></div>
          <div class="duty_col_code"><small>کدنوسازی</small></div>
          <span class="duty_col_separator"></span>
          <div class="duty_col_date"><small>تاریخ و زمان</small></div>
          <span class="duty_col_separator"></span>
          <div class="duty_col_year"><small>سال</small></div>
          <span class="duty_col_separator"></span>
          <div class="duty_col_price"><small>قیمت</small></div>
          <span class="duty_col_separator"></span>
          <div class="duty_col_status"><small>وضعیت</small></div>
          <span class="duty_col_separator"></span>
          <div class="duty_col_user"><small>کاربر</small></div>
          <div class="duty_col_end"></div>
        </div>
      </div>
      <q-separator />-->
      <fit>
        <div
          :class="$q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2'"
          class="duty-calculation-wrapper rounded-borders overflow fit"
        >
          <div
            class="duty-calculation-list full-height custom-scroll overflow-auto min-width: 300px"
            style="max-width: 100%"
          >
            <div class="duty_cols_wrap flex flex-nowrap">
              <div class="duty_col_start col-auto"></div>
              <div class="duty_col_code"><small>کدنوسازی</small></div>
              <span class="duty_col_separator"></span>
              <div class="duty_col_date"><small>تاریخ و زمان</small></div>
              <span class="duty_col_separator"></span>
              <div class="duty_col_year"><small>سال</small></div>
              <span class="duty_col_separator"></span>
              <div class="duty_col_price"><small>قیمت</small></div>
              <span class="duty_col_separator"></span>
              <div class="duty_col_status"><small>وضعیت</small></div>
              <span class="duty_col_separator"></span>
              <div class="duty_col_user"><small>کاربر</small></div>
              <div class="duty_col_end"></div>
            </div>
            <!--<div v-if="!DutySessionHeaders || DutySessionHeaders.length === 0">
              <div :key="i" class="q-mb-md" v-for="i in 20">
                <q-skeleton height="56px" type="rect"/>
              </div>
            </div>-->
            <!-- {{DutySessionHeaders }} -->

            <q-intersection
              v-for="(item, i) in DutySessionHeaders"
              :key="i"
              :class="
                getDutyStatusClass(item) +
                (item.selected ||
                (item.details && item.details.some((x) => x.selected))
                  ? ' selected '
                  : '') +
                (item.expanded ? ' expanded ' : '')
              "
              class="duty-c-item"
              once
              style="min-height: 36px"
              transition="fade"
            >
              <div class="duty-row">
                <div class="duty__check text-center" style="min-width: 30px">
                  <q-checkbox
                    dense
                    size="sm"
                    :value="item.selected"
                    class="q-ma-none"
                    indeterminate-value="(item.details && item.details.some(x=> x.selected))"
                    @input="selectItemDetails($event, item)"
                  />
                </div>
                <div
                  style="
                    min-width: 24px;
                    text-align: center;
                    padding-top: 2px;
                  "
                >
                  <span class="flex items-center" dir="ltr" v-if="item.details"><small style="color:#2e51ff; font-weight: bold">{{ item.details.filter(s=> s.selected).length }}</small><small>/</small><small>{{item.details.length}}</small></span>
                  <span v-else>...</span>
                </div>
                <div
                  class="duty__expand text-center"
                  style="min-width: 34px"
                >
                  <q-spinner-ios
                    v-if="item.loading"
                    color="primary"
                    size="xs"
                  />
                  <q-btn
                    :icon="item.expanded ? 'indeterminate_check_box' : 'add_box'"
                    color="grey-6"
                    flat
                    v-else
                    dense
                    size="sm"
                    round
                    @click="item.expanded = !item.expanded"
                  />
                </div>
                <div class="duty-c-i-inner q-gutter-x-sm">
                  <div class="duty-bizcode" title="کدنوسازی">
                    <span class="text-no-wrap">
                      {{ getNosaziCode(item) }}
                    </span>
                    <!--                  <q-badge class="q-px-sm" color="primary" outline>
                                        {{ getNosaziCode(item) }}
                                      </q-badge>-->
                  </div>
                  <div class="duty-datetime-wrap q-px-sm text-center">
                    <span>{{ item.DateCalc }}</span>
                    <span>{{ item.TimeCalc }}</span>
                  </div>
                  <!--                <div class="duty-datetime text-dark">
                                    <p
                                      class="q-mb-none"
                                      style="font-size: 11px; font-weight: Bold"
                                    >
                                      <q-icon name="event" size="14px" />
                                      تاریخ محاسبه:&nbsp;{{ item.DateCalc }}
                                    </p>
                                  </div>
                                  <div class="duty-datetime text-dark">
                                    <p
                                      class="q-mb-none"
                                      style="font-size: 11px; font-weight: Bold"
                                    >
                                      <q-icon name="schedule" size="14px" />
                                      زمان محاسبه:&nbsp;{{ item.TimeCalc }}
                                    </p>
                                  </div>-->
                  <div class="duty-year-wrap" title="سال محاسبه">
                    <q-badge color="primary" outline>{{
                      item.CI_DutyYear
                    }}</q-badge>
                    <!--                  <q-badge :class="$q.dark.isActive ? 'bg-darken2' : 'bg-grey'">
                                        {{ item.CI_DutyYear }}
                                      </q-badge>-->
                  </div>
                  <div class="duty-price-wrap" title="قیمت">
                    <span>{{ item.Price.toLocaleString("fa-IR") }}</span>
                  </div>
                  <div class="duty-status">
                    <q-badge>{{ getDutyStatus(item) }}</q-badge>
                  </div>
                  <div class="ellipsis duty-user-wrap" :title="item.UserName">
                    <q-icon name="person" size="xs" />
                    {{ item.UserName }}
                  </div>
                  <div class="ellipsis duty-info-group">
                    <span> دسته اطلاعات:&nbsp;{{ item.groupName }} </span>
                  </div>
                  <div class="duty-workitem" title="شماره بازدید">
                    شماره بازدید:&nbsp;{{ item.NidWorkItem }}
                  </div>
                </div>
              </div>
              <q-separator />
              <q-slide-transition>
                <DutyAllCalculationSessionHeadersDetails
                  v-if="item.expanded"
                  :base-nosazi-code="baseNosaziCode"
                  :detailsResult="getDutyCalculateDetailsRes"
                  :formKey="formKey"
                  :item="item"
                  :name="name"
                  :title="title"
                  @loadData="loadData"
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
      v-model="isShowcalcAndExportModal"
      height="320px"
      title="محاسبه و صدور"
      width="450px"
    >
      <DutyAllCalculationCalcAndExport
        :baseNosaziCode="baseNosaziCode"
        :dutyYear="dutyYear"
        :formKey="formKey"
        :name="name"
        :results="results"
        :selectedInfoCategory="selectedInfoCategory"
        :title="title"
        :nosaziSetting="nosaziSetting"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        @closeExportFichesModal="isShowcalcAndExportModal = false"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowFicheModal"
      title="صدور فیش"
      width="400px"
      height="300px"
    >
      <form-wrapper>
        <DutyAllCalculationExportFiches
          :name="name"
          :title="title"
          :formKey="formKey"
          :baseNosaziCode="baseNosaziCode"
          :config="config"
          :dutyYear="dutyYear"
          :isTempFiche="isTempFiche"
          :results="results"
          :selectedDetails="allSelectedRowsDetailsItems"
          :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
          @closeExportFichesModal="isShowFicheModal = false"
          ref="exportFiche"
        />
        <template v-slot:footer>
          <btn-save class="q-mr-sm" label="تأیید" @click="saveExportFiche" />
          <btn-cancel label="انصراف" @click="cancelExportFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="isShowManualFicheModal"
      title="صدور فیش"
      width="800px"
      height="400px"
    >
      <DutyAllCalculationManualFiche
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :results="results"
        :selectedInfoCategory="selectedInfoCategory"
        :title="title"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        @closeManualFicheModal="isShowManualFicheModal = false"
      />
    </safa-popup>
    <safa-popup v-model="isShowTempFicheModal" title="صدور فیش" width="600px">
      <DutyAllCalculationManualFiche
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :isTempFiche="isTempFiche"
        :name="name"
        :results="results"
        :title="title"
        :tmpSessionExceptPayyOff="tmpSessionExceptPayyOff"
        @closeExportFichesModal="isShowTempFicheModal = false"
      />
    </safa-popup>
  </fit>
  <!-- </form-wrapper> -->
</template>
<script>
import DutyAllCalculationExportFiches from "./DutyAllCalculationExportFiches.vue"
import DutyAllCalculationCalcAndExport from "./DutyAllCalculationCalcAndExport.vue"
import DutyAllCalculationManualFiche from "./DutyAllCalculationManualFiche.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import converter from "xml-js"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import DutyAllCalculationSessionHeadersDetails from "./DutyAllCalculationSessionHeadersDetails"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

export default {
  name: "DutyAllCalculation",
  mixins: [baseFormMixin],
  data () {
    return {
      loading: false,
      calcRes: null,
      setIsSureRes: null,
      deleteSessionRes: null,
      getNidWorkItemsRes: null,
      getDutyCalculateDetailsRes: null,
      calcHeadersRes: null,
      EumInfoGroup: null, //  enum ClsEnumEumBaseInfoGroup //
      headerResults: {},
      workItemList: [],
      options: [],
      gridSplitter: 30,

      logDetail: [],
      infoCategories: [
        { ID: 0, Title: "اطلاعات پرونده" },
        { ID: 1, Title: "بازدید" },
        { ID: 3, Title: " مجاز پایانکار " }
      ],
      nosaziSetting: null,
      selectedItemsArray: [],
      isShowFicheModal: false,
      isShowcalcAndExportModal: false,
      isShowexportFichesModal: false,
      isShowTempFicheModal: false,
      isMomayezi: false,
      showFromSetting: true,
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
      nidWorkItemObj: { NidWorkItems: [] },
      nidWorkItemMode: "r",
      selectedNidWorkItem: null,
      showDutyAllCalculation: true,
      // results: {},
      DutySessionHeaders: [],
      isReverse: true
    }
  },

  computed: {
    reverseTxt () {
      return this.isReverse ? "نمایش صعودی" : "نمایش نزولی"
    },
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    },
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
    },
    totalAmount () {
      let price = 0
      this.DutySessionHeaders.map((x) => {
        if (
          !(
            x.CI_DutyYear < x.CI_DutyYear_Payoff ||
            x.CI_DutyYear === x.CI_DutyYear_Payoff
          )
        ) {
          price += x.Price
        }
      })
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%price .....", price.toMoney)
      return price
    }
  },
  props: {
    NidList: Array,
    baseNosaziCode: Object,
    results: Object,
    categoryInfoMode: String,
    formKey: String,
    title: String,
    name: String
  },
  components: {
    DutyAllCalculationSessionHeadersDetails,
    DutyAllCalculationExportFiches,
    DutyAllCalculationCalcAndExport,
    DutyAllCalculationManualFiche
  },
  watch: {
    async selectedInfoCategory () {
      this.nidWorkItemMode = "r"
      switch (this.selectedInfoCategory) {
        case 0:
          this.nidWorkItemMode = "e"
          this.EumInfoGroup = 0 // srvSB.ClsEnumEumBaseInfoGroup.Parvandeh
          break
        case 1:
          this.nidWorkItemMode = "e"
          await this.getNidWorkItems()
          if (
            this.nosaziSetting.AvarezSettings.isShowRevisitByLastRevisitDate ===
            true
          ) {
            this.nidWorkItemMode = "r"
          }
          if (this.workItemList.length > 0) {
            this.selectedNidWorkItem = this.workItemList[0].ID
          }
          this.EumInfoGroup = 1 /// srvSB.ClsEnumEumBaseInfoGroup.Revisit
          break
        case 3:
          this.nidWorkItemMode = "e"
          this.EumInfoGroup = 2 /// srvSB.ClsEnumEumBaseInfoGroup.MojazPayankar
          break
        case 100:
          this.nidWorkItemMode = "e"
          this.EumInfoGroup = 100 // srvSB.ClsEnumEumBaseInfoGroup.IsfahanNosazi
          break

        default:
          break
      }
      this.$emit("sendinfoCategory", this.selectedInfoCategory)
    }
  },
  async created () {
    this.nosaziSetting = await this.loadFormSetting("nosaziSettings", {
      nidProc: GLOBAL_SETTINGS_GUID
    })
    this.dutyYear = this.nosaziSetting.AvarezSettings.startYear
    if (
      this.nosaziSetting.AvarezSettings.isShowRevisitByLastRevisitDate === true
    ) {
      this.nidWorkItemMode = "r"
    }

    await this.getSettingData()
    //  console.log('nosaziSettings',await this.loadFormSetting('nosaziSettings'));
    //  console.log('SenfiSettings',await this.loadFormSetting('SenfiSettings'));
    //  console.log('commissionSettings',await this.loadFormSetting('commissionSettings'));
    //  console.log('BuildingSettings',await this.loadFormSetting('BuildingSettings')); // تنظیمات شهرسازی
    //  console.log('Sharsazi-PersonalSetting',await this.loadFormSetting('Sharsazi-PersonalSetting')); // تنظیمات شخصی
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
          this.showFromSetting = true
          this.isMomayezi = false
        }
      } catch (error) {
        console.log(error)
      }
    },
    getNosaziCode (item) {
      return (
        // (item.NickNameNid && item.NickNameNid.split("-").reverse().join("-")) ||
        (item.NickNameNid && item.NickNameNid.split("-").join("-")) || ""
      )
    },
    saveExportFiche () {
      this.$refs.exportFiche.save()
    },
    cancelExportFiche () {
      this.$refs.exportFiche.cancel()
    },

    handelSelectAll (isSelected) {
      this.DutySessionHeaders = this.DutySessionHeaders.map((m) => {
        return {
          ...m,
          selected: isSelected,
          details: null
        }
      })
      this.selectedItemsArray =
        this.DutySessionHeaders.filter((x) => x.selected) || []
      if (isSelected) {
        this.DutySessionHeaders.forEach((item) => this.loadDetails(item))
      } else {
        this.DutySessionHeaders = this.DutySessionHeaders.map((m) => {
          return {
            ...m,
            details: null
          }
        })
        this.nidSessionFromCalcDetails = []
      }
    },

    async selectItemDetails (selected, item) {
      // item.expanded = true;
      await this.loadDetails(item)
      item.selected = selected
      item.expanded = selected
      this.selectedItemsArray.push(item)

      // this.nidSessionFromCalcDetails.push(item.NidSession)
      if (item.details) {
        item.details.forEach((detail) => {
          detail.selected = selected
        })
        this.updateNidSession(item)
      }
    },
    loadData (item) {
      this.loadDetails(item)
    },
    loadDetails (item) {
      if (!item.details) {
        item.loading = true
        const payload = {
          pNid: item.NidFK,
          pDutyYear: item.CI_DutyYear,
          pSysCiDutyType: 1
        }
        this.$services.SB.getDutyCalculateDetails(payload, this.config)
          .then(({ data }) => {
            this.getDutyCalculateDetailsRes = this.getResponse(data)
            if (this.getDutyCalculateDetailsRes.success) {
              item.details =
                this.getDutyCalculateDetailsRes.data.DutySessionDetails.map(
                  (x) => {
                    return {
                      ...x,
                      selected: item.selected,
                      expanded: false,
                      logDetails: [],
                      logDetailsLoading: false
                    }
                  }
                )
              this.updateNidSession(item)
              this.$emit("load", item)
            }
          })
          .catch((e) => {
            console.error(e)
            this.serverError()
          })
          .finally(() => {
            item.loading = false
          })
        // this.$emit('load', { ...this.item, details: ['dsad', '32424', 'gfgdggg'] })
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
    getDutyStatusValue (item) {
      if (!item) return null
      if (
        item.CI_DutyYear < item.CI_DutyYear_Payoff ||
        item.CI_DutyYear === item.CI_DutyYear_Payoff
      ) {
        return 0
      } else if (item.IsSure) {
        return 1
      }
      return -1
    },
    getDutyStatus (item) {
      const val = this.getDutyStatusValue(item)
      if (val === 0) return "تسویه"
      if (val === 1) return "قطعیت"
      if (val === -1) return "عدم قطعیت"

      return "نامشخص"
    },
    getDutyStatusClass (item) {
      return `duty-status-${this.getDutyStatusValue(item)}`
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
    async getNidWorkItems () {
      try {
        this.showLoading()
        this.workItemList = []
        const payload = {
          pNidFk: this.NidList[0], // NidList.First()
          pSysCiDutyType: 1
        }

        const { data } = await this.$services.SB.getNidWorkItems(
          payload,
          this.config
        )
        this.getNidWorkItemsRes = this.getResponse(data)
        if (this.getNidWorkItemsRes.success) {
          this.nidWorkItemObj = this.getNidWorkItemsRes.data
          this.nidWorkItemObj.NidWorkItems.forEach((x) => {
            this.workItemList.push({
              ID: x.NidProc,
              Title: x.NidWorkItem,
              revisitID: x.NidRevisit
            })
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    infoGroupSelectedItemChanged (e) {
      this.$emit("infoGroupSelectedItemChanged", e)
    },
    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    },
    selectedChange (e) {
      this.selectedItemsArray = e.selectedItems
    },
    itemDetailClick (selectedItems) {
      this.showDutyAllCalculation = false
      this.selectedItemsArray.push(selectedItems.dataItem)
      this.selectedItem = selectedItems.dataItem
      this.getDutyCalculateDetails()
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
        const payload = {
          pNid: this.selectedItem.NidFK,
          pDutyYear: this.selectedItem.CI_DutyYear,
          pSysCiDutyType: 1
        }
        console.log('show details: ', payload)

        this.$services.SB.getDutyCalculateDetails(payload, this.config)
          .then(async ({ data }) => {
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
          .catch((e) => {
        console.error(e)
        this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          }) */
    },
    getDutyCalculateHeaders (NidList) {
      this.headerResults = {}
      const payload = {
        pNidList: NidList || this.NidList,
        pSysCiDutyType: 1
      }
      this.$services.SB.getDutyCalculateHeaders(payload, this.config)
        .then(async ({ data }) => {
          this.calcHeadersRes = this.getResponse(data)
          if (this.calcHeadersRes.success) {
            this.headerResults = this.calcHeadersRes.data
            if (this.headerResults && this.headerResults.DutySessionHeaders) {
              this.DutySessionHeaders =
                this.headerResults.DutySessionHeaders.map((x) => {
                  if (x.CI_DutyYear < x.CI_DutyYear_Payoff) {
                    x.class = "settlement-nosazi"
                  }
                  if (x.IsSure) {
                    x.class = "certainty-nosazi"
                  }
                  // eslint-disable-next-line eqeqeq
                  x.groupName =
                    this.infoGroupOptions.find(
                      (e) => e.ID === x.EumDutyInfoGroup
                    )?.Title || ""
                  x.selected = false
                  x.expanded = false
                  x.loading = false
                  x.details = null
                  return x
                })
            }
            this.handelSelectAll(false)
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {})
    },

    calculate () {
      let pRequestNidWorkItem = 0
      let pRequestNidProc = "00000000-0000-0000-0000-000000000000"
      let pRequestNidRevisit = "00000000-0000-0000-0000-000000000000"
      if (this.selectedNidWorkItem) {
        pRequestNidWorkItem = this.$refs.workItem.selectedItem.Title
        pRequestNidProc = this.$refs.workItem.selectedItem.ID
        pRequestNidRevisit = this.$refs.workItem.selectedItem.revisitID
      }
      if (!this.dutyYear) {
        this.showError("سال را مشخص نمایید ")
        return
      }
      const payload = {
        pNidProc: pRequestNidProc,
        pNidList: this.NidList,
        pFromYear: this.dutyYear,
        pUser: this.currentUser,
        pSysCiDutyType: 1,
        pInfoGroup: this.selectedInfoCategory,
        pIsMomayezi: this.isMomayezi,
        pRevisit: pRequestNidRevisit,
        pNidWorkItem: pRequestNidWorkItem,
        pSelectedNidJob: [],
        pDoFinal: this.nosaziSetting?.AvarezSettings?.doFinal ?? false
      }
      this.showLoading()
      this.$services.SB.calculateDuty(payload, this.config)
        .then(async ({ data }) => {
          this.calcRes = this.getResponse(data)
          if (this.calcRes.success) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.calculate,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
            this.showSuccess("محاسبه با موفقیت انجام پذیرفت.")
            this.getDutyCalculateHeaders()
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

    fiche () {
      const hasSelected = this.DutySessionHeaders.some((s) => s.selected)
      if (!hasSelected) {
        // this.DutySessionHeaders === 0
        this.showError("هیچ محاسبه ای انتخاب نشده است.")
        return
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
      this.selectedItemsArray.forEach((item) => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.selectedItemsArray.length === 0) {
        this.showError("هیچ محاسبه ای انتخاب نشده است.")
      } else if (this.tmpSessionExceptPayyOff.length === 0) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
      } else {
        this.isShowTempFicheModal = true
        this.isTempFiche = true
      }
    },

    async setIsSure (isSure) {
      debugger
      this.showLoading()
      let nidSessionList = []
      this.selectedItemsArray.forEach((item) => {
        item.details.forEach((element) => {
          nidSessionList.push(element.NidSession)
        })
      })
      const payload = {
        PNidSessionList: nidSessionList,
        PIsSure: isSure
      }
      try {
        const { data } = await this.$services.SB.setIsSure(
          payload,
          this.config
        )
        this.setIsSureRes = this.getResponse(data)
        if (this.setIsSureRes.success) {
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (isSure) {
            this.showSuccess("قطعیت محاسبات با موفقیت انجام پذیرفت.")
          } else {
            this.showSuccess("عدم قطعیت محاسبات با موفقیت انجام پذیرفت.")
          }
          await this.log({
            action: this.logActions.calculate,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.getDutyCalculateHeaders()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },

    certainty (isSure) {
      if (this.selectedItemsArray.length === 0) {
        this.showError("لطفا حداقل یک سال را برای قطعیت انتخاب نمایید.")
      } else {
        this.showConfirm("آیا از قطعی کردن محاسبه مطمئن هستید؟").onOk(() => {
          this.setIsSure(true)
        })
      }
    },

    uncertainty () {
      if (this.selectedItemsArray.length === 0) {
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
      this.selectedItemsArray.forEach((item) => {
        if (item.CI_DutyYear > item.CI_DutyYear_Payoff) {
          this.tmpSessionExceptPayyOff.push(item)
        }
      })
      if (this.selectedItemsArray.length === 0) {
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
            async () => {
              await this.deleteSession()
            }
          )
        }
      }
    },

    async deleteSession () {
      try {
        const { data } = await this.$services.SB.deleteSession(
          { pNidSessions: this.nidSessionFromCalcDetails },
          this.config
        )
        this.deleteSessionRes = this.getResponse(data)
        if (this.deleteSessionRes.success) {
          this.nidSessionFromCalcDetails = []
          this.showSuccess("محاسبات انتخاب شده با موفقیت حذف شدند.")
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.delete,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.getDutyCalculateHeaders()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    handelReversAll () {
      this.DutySessionHeaders.reverse()
      this.isReverse = !this.isReverse
    }
  }
}
</script>
