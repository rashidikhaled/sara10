<template>
  <fit>
    <safa-status :result="calcRes" />
    <safa-status :result="setIsSureRes" />
    <safa-status :result="deleteSessionRes" />
    <safa-status :result="getDutyCalculateDetailsRes" />
    <safa-status :result="calcHeadersRes" />

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
        v-model="NidList.length"
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
          @click="handleSelectAll(true)"
          label="انتخاب همه"
        ></q-btn>
      </span>
      <span>
        <q-btn
          color="primary"
          outline
          rounded
          size="sm"
          @click="handleSelectAll(false)"
          >عدم انتخاب همه</q-btn
        >
      </span>
      <span>|</span>
      <span>
        تعداد آیتم های انتخاب شده:&nbsp;
        <q-badge color="primary" outline>{{ allSelectedRowsDetailsCount }}</q-badge>
      </span>
      <span>|</span>
      <span
        :class="
          senfiSettings.SenfiSettingAvarez.ChkisSure ? 'isSure ' : 'notSure'
        "
      >
        وضعیت فعلی قطعیت در محاسبه:&nbsp;
        <q-badge outline rounded>{{
          senfiSettings.SenfiSettingAvarez.ChkisSure ? "قطعیت" : "عدم قطعیت"
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
    <q-separator />
    <fit>
      <div
        :class="$q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2'"
        class="duty-calculation-wrapper rounded-borders overflow fit"
      >
        <div
          class="duty-calculation-list full-height custom-scroll overflow-auto min-width: 300px"
          style="max-width: 100%"
          v-if="DutySessionHeaders"
        >
          <DutyCalculationHeader />
          <DutyCalculationRootItem
            v-for="(_, i) in DutySessionHeaders"
            :key="i"
            :list="DutySessionHeaders"
            :index="i"
            :district="District"
            @update:item="updateItem(i, $event)"
            @toggle:expanded="toggleExpanded(i)"
            @setSelectItem="setSelectItem(i, $event)"
            @loadDetails="loadDetails"
          />
        </div>
      </div>
    </fit>

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
import DutyCalculationHeader from "src/components/duty/DutyCalculationHeader.vue"
import DutyCalculationRootItem from "src/components/duty/DutyCalculationRootItem.vue"
import DutyAllCalculationExportFiches from "./DutyAllCalculationExportFiches.vue"
import DutyAllCalculationCalcAndExport from "./DutyAllCalculationCalcAndExport.vue"
import DutyAllCalculationManualFiche from "./DutyAllCalculationManualFiche.vue"
import ActiveJobs from "./ActiveJobs.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import xmlConverter from "xml-js"

export default {
  mixins: [baseFormMixin],
  components: {
    DutyCalculationHeader,
    DutyCalculationRootItem,
    DutyAllCalculationExportFiches,
    DutyAllCalculationCalcAndExport,
    DutyAllCalculationManualFiche,
    ActiveJobs
  },
  props: {
    NidList: Array,
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
  data () {
    return {
      calcRes: null,
      setIsSureRes: null,
      deleteSessionRes: null,
      getDutyCalculateDetailsRes: null,
      calcHeadersRes: null,

      loading: false,
      workItemList: [],
      isSelectedAll: false,
      isMomayezi: false,
      showFromSetting: true,
      isShowActiveJob: false,
      logDetail: [],
      jobRequestResult: null,
      jobNameObj: { JobNames: [] },
      selectedItemsArray: [],
      isShowFicheModal: false,
      isShowcalcAndExportModal: false,
      isShowexportFichesModal: false,
      isShowTempFicheModal: false,
      isShowManualFicheModal: false,
      tmpSessionExceptPayyOff: [],
      tmpSessionExceptPayyOff2: [],
      isTempFiche: null,
      dutyYear: 0,
      selectedInfoCategory: 0,
      calcDetailsResult: { DutySessionDetails: [] },
      fetchCalcDetails: null,
      nidSessionFromCalcDetails: [],
      selectedItem: null,
      nidWorkItemRequest: null,
      nidWorkItemObj: { NidWorkItems: [] },
      nidWorkItemMode: "r",
      selectedNidWorkItem: 0,
      showDutyAllCalculation: true,
      DutySessionHeaders: [],
      showActiveJobs: false,
      nidSelcetedJob: null,
      senfiSettings: {
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
    config () {
      return { config: { District: this.District } }
    },
    District () {
      return this.baseNosaziCode?.District ?? 1
    },
    allSelectedRows () {
      return this.DutySessionHeaders.filter(
        (x) => x.selected || x.details.some((s) => s.selected)
      )
    },
    allSelectedRowsDetailsCount () {
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
    updateItem (index, newItem) {
      this.$set(this.DutySessionHeaders, index, newItem)
    },
    async toggleExpanded (index) {
      const item = this.DutySessionHeaders[index]
      await this.loadDetails(item)
      item.expanded = !item.expanded
      this.$set(this.DutySessionHeaders, index, item)
    },
    async setSelectItem (index, selected) {
      const item = this.DutySessionHeaders[index]
      item.selected = selected
      item.expanded = selected
      await this.loadDetails(item)

      if (item.details) {
        item.details.forEach((detail) => {
          detail.selected = selected
        })
      }

      this.$set(this.DutySessionHeaders, index, item)
    },

    selctedJob (value) {
      this.nidSelcetedJob = value
    },

    async loadDetails (item) {
      if (item.childrenLoaded) return Promise.resolve()

      try {
        item.loading = true
        const payload = {
          pNid: item.NidFK,
          pDutyYear: item.CI_DutyYear,
          pSysCiDutyType: 2
        }
        const { data } = await this.$services.SB.getDutyCalculateDetails(
          payload,
          this.config
        )
        this.getDutyCalculateDetailsRes = this.getResponse(data)
        if (this.getDutyCalculateDetailsRes.success) {
          item.details =
            this.getDutyCalculateDetailsRes.data.DutySessionDetails.map(
              (child) => {
                return {
                  ...child,
                  selected: item.selected,
                  expanded: false,
                  logDetails: this.getChildLogDetails(child)
                }
              }
            )

          item.childrenLoaded = true
          this.$emit("load", item)
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        item.loading = false
      }
      return Promise.resolve()
    },

    handleSelectAll (isSelected) {
      this.DutySessionHeaders.forEach((item, i) => {
        this.setSelectItem(i, isSelected)
      })
    }, /**
     * xml log value parser
     * @param obj
     * @param field
     * @returns {*|string}
     */
    getFieldValue (obj, field) {
      if (!obj) return ""
      try {
        if (obj.hasOwnProperty(field)) return obj[field]?._text
      } catch (ex) {
        console.debug("getFieldValue", obj, field)
      }

      return ""
    },
    /**
     * parse xml logs to array of object
     * @param child
     */
    getChildLogDetails (child) {
      let list = []
      try {
        const arrayOfClsLog = xmlConverter.xml2json(child.CalculateLog, {
          compact: true
        })
        console.log("arrayOfClsLog", arrayOfClsLog)
        const clsLog = JSON.parse(arrayOfClsLog)
        console.log("clsLog", clsLog)
        const logObj = clsLog?.ArrayOfClsLog?.ClsLog
        if (logObj && Array.isArray(logObj)) {
          list = logObj.map((x) => {
            return {
              ...x,
              Subject: this.getFieldValue(x, "Subject"),
              Value: this.getFieldValue(x, "Value"),
              Comment: this.getFieldValue(x, "Comment")
            }
          })
        } else if (typeof logObj === "object") {
          const resultOfClsLog = {
            Subject: this.getFieldValue(logObj, "Subject"),
            Value: this.getFieldValue(logObj, "Value"),
            Comment: this.getFieldValue(logObj, "Comment")
          }
          list.push(resultOfClsLog)
        }
      } catch (ex) {
        debugger
        console.error(ex)
      }

      return list
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
    getNidWorkItems () {
      this.$emit('updateInnerLoading', true)
      this.workItemList = []
      let payload = {
        pNidFk: this.DutySessionHeaders[0].NidFK,
        pSysCiDutyType: 2
      }

      this.$services.SB.getNidWorkItems(payload, this.config)
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
          console.error(response)
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
      this.calcRes = null
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
        let payload = {
          pNid: this.selectedItem.NidFK,
          pDutyYear: this.selectedItem.CI_DutyYear,
          pSysCiDutyType: 2
        }
        console.log('show details: ', payload)

        this.$services.SB.getDutyCalculateDetails(payload, this.config)
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
            console.error(response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          }) */
    },
    fetchRootItems (NidList) {
      const payload = {
        pNidList: NidList || this.NidList,
        pSysCiDutyType: 2
      }
      this.$services.SB.getDutyCalculateHeaders(payload, this.config)
        .then(async ({ data }) => {
          this.calcHeadersRes = this.getResponse(data)
          if (this.calcHeadersRes.success) {
            const res = this.calcHeadersRes.data
            if (res && res.DutySessionHeaders) {
              const dataList = res.DutySessionHeaders
              let i = 0
              dataList.forEach((rootItem) => {
                rootItem.groupName =
                  this.infoGroupOptions.find(
                    (e) => e.ID === rootItem.EumDutyInfoGroup
                  )?.Title || ""

                rootItem.selected = false
                rootItem.expanded = false
                rootItem.loading = false
                rootItem.details = []
                rootItem.childrenLoaded = false
                rootItem.rowNum = i + 1
              })
              this.DutySessionHeaders = dataList
            }
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
        pNidJobList: this.results.NidList
      }

      this.$services.SB.getJobNames(payLoad, this.config)
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
          console.error(response)
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
        pSysCiDutyType: 2,
        pInfoGroup: this.selectedInfoCategory,
        pIsMomayezi: this.isMomayezi,
        pRevisit: pRequestNidRevisit,
        pNidWorkItem: pRequestNidWorkItem,
        pSelectedNidJob: this.nidSelcetedJob,
        pDoFinal: this.senfiSettings?.SenfiSettingAvarez?.ChkisSure ?? false
      }
      try {
        const { data } = await this.$services.SB.calculateDuty(payload, this.config)
        this.calcRes = this.getResponse(data)
        if (this.calcRes.success) {
          if (this.calcRes.data.IsCalculateOK) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.calculate,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
            this.showSuccess("محاسبه با موفقیت انجام پذیرفت.")
            this.fetchRootItems()
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
      if (!this.calculateCanExecute()) return

      this.isShowFicheModal = true
      this.isTempFiche = false
    },

    calcAndExport () {
      this.isShowcalcAndExportModal = true
    },

    calculateCanExecute (checkPayOff) {
      const hasSelected = this.allSelectedRowsDetailsCount > 0

      if (!hasSelected) {
        this.showError("هیچ محاسبه ای انتخاب نشده است.")
        return false
      }
      if (checkPayOff && this.isSelectedRowsPayOff) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
        return false
      }

      return true
    },

    tempFiche () {
      if (!this.calculateCanExecute()) return

      this.isShowTempFicheModal = true
      this.isTempFiche = false
    },

    async setIsSure (PIsSure) {
      if (!this.calculateCanExecute(false)) return

      this.showLoading()
      const PNidSessionList = this.allSelectedRowsDetailsItems.map(
        (s) => s.NidSession
      )
      const payload = {
        PNidSessionList,
        PIsSure
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
          if (PIsSure) {
            this.showSuccess("قطعیت محاسبات با موفقیت انجام پذیرفت.")
          } else {
            this.showSuccess("عدم قطعیت محاسبات با موفقیت انجام پذیرفت.")
          }
          await this.log({
            action: this.logActions.calculate,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.hideLoading()
          this.fetchRootItems()
        }
      } catch (e) {
        this.hideLoading()
        console.error(e)
      }
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
      if (!this.calculateCanExecute(false)) return
      this.showConfirm("آیا ازعدم قطعیت محاسبه مطمئن هستید؟").onOk(() => {
        this.setIsSure(false)
      })
    },

    deleteFiche () {
      const hasSelected = this.allSelectedRowsDetailsCount > 0

      if (!hasSelected) {
        return this.showError(
          "لطفا حداقل یک سال را برای حذف کردن انتخاب نمایید."
        )
      } else if (!this.isSelectedRowsPayOff) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.")
        return false
      }

      const isNotSureItems = this.allSelectedRows.filter((s) => !s.IsSure)
      if (isNotSureItems.length === 0) {
        return this.showError("محاسبات انتخاب شده قطعی شده اند.")
      }

      this.showConfirm("آیا از حذف محاسبات انتخاب شده اطمینان دارید؟").onOk(
        async () => {
          await this.deleteSession()
        }
      )
    },

    async deleteSession () {
      try {
        const pNidSessions = this.allSelectedRowsDetailsItems.map(
          (s) => s.NidSession
        )
        const { data } = await this.$services.SB.deleteSession(
          { pNidSessions },
          this.config
        )
        this.deleteSessionRes = this.getResponse(data)
        if (this.deleteSessionRes.success) {
          this.showSuccess("محاسبات انتخاب شده با موفقیت حذف شدند.")
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.delete,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی"
          })
          this.fetchRootItems()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
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
      this.senfiSettings = await this.loadFormSetting("SenfiSettings", {
        nidProc: GLOBAL_SETTINGS_GUID,
        defaultValue: this.senfiSettings
      })
      this.showActiveJobs =
        this.senfiSettings.SenfiSettingAvarez.ChkrightOfOpening || false
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
